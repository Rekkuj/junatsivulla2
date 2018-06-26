var listOfTrains = document.getElementById("trainlist");
var fromSt = document.getElementById("fromSt");
var toSt = document.getElementById("toSt");
var timeSettings = {hour: "2-digit", minute: '2-digit', hour12: false};


var req = new XMLHttpRequest();
var req2 = new XMLHttpRequest();

var stationNames = [];
var stationShortCodes = [];
var stationInfo = {};

req.onreadystatechange = function () {
    if (req.readyState === 4) {
        if (req.status === 200) {
            var stations = JSON.parse(req.responseText);
            console.log(stations);
            for (var i = 0; i < stations.length; i++) {
                var station = stations[i].stationName;
                var shortCode = stations[i].stationShortCode;
                var latitude = stations[i].latitude;
                var longitude = stations[i].longitude;
                var stationCode = stations[i].stationUICCode;
                if (stations[i].passengerTraffic === true) {
                    stationInfo[station] = {
                        shortCode: shortCode,
                        longitude: longitude,
                        latitude: latitude,
                        stationCode: stationCode
                    };
                    stationNames.push(station);
                    stationShortCodes.push(shortCode);
                }
            }
            console.log(stationNames);
            console.log(stationInfo);

            var options = {
                data: stationNames,
                list: {
                    maxNumberOfElements: 10,
                    match:
                        {
                            enabled: true
                        }
                }
            };
            $("#fromSt").easyAutocomplete(options);
            $("#toSt").easyAutocomplete(options);

        } else {
            alert("Lataaminen epäonnistui.");
        }
    }
}

function getAllStations() {
    req.open('GET', 'https://rata.digitraffic.fi/api/v1/metadata/stations', true);
    req.send(null);
}

getAllStations();

req2.onreadystatechange = function () {
    if (req2.readyState === 4) {
        if (req2.status === 200) {
            while (listOfTrains.firstChild) {
                listOfTrains.removeChild(listOfTrains.firstChild);
            }
            var trainTable = JSON.parse(req2.responseText);
            console.log(trainTable);
            addToList(trainTable);
        } else {
            alert("Lataaminen epäonnistui.");
        }
    }
}


function getTrains() {
    var url = 'https://rata.digitraffic.fi/api/v1/live-trains/station/'
        + stationInfo[fromSt.value].shortCode + '/' + stationInfo[toSt.value].shortCode;
    req2.open('GET', url, true);
    req2.send(null);
}


function addToList(table) {

    var lengthOrMax = Math.min(table.length, 5);

    for (var i = 0; i < lengthOrMax; i++) {
        var train = table[i];
        var departureTime = new Date(train.timeTableRows[0].scheduledTime);
        var arrivalTime = new Date(train.timeTableRows[train.timeTableRows.length - 1].scheduledTime);

        var idouter = "train" + i;

        $("<li></li>", {id: idouter})
            .append(train.trainType + train.trainNumber
                + ", Lähtöaika: " + departureTime.toLocaleTimeString('fi', timeSettings)
                + ", Saapumisaika: " + arrivalTime.toLocaleTimeString('fi', timeSettings))
            .appendTo(listOfTrains);

        printTableRow(idouter, train, i);

    }
}

function printTableRow(idouter, train, i) {
    var trainId = train.trainNumber + train.trainType + i;
    $("<ul></ul>", {id: trainId}).appendTo(document.getElementById(idouter));
    outer:
        for (var j = 1; j < train.timeTableRows.length; j = j + 2) {

            if (stationShortCodes.indexOf(train.timeTableRows[j].stationShortCode) < 0) {
                continue outer;
            }
            if (train.timeTableRows[j].trainStopping == false) {
                continue outer;
            }
            var stationCode = train.timeTableRows[j].stationShortCode;
            var index = stationShortCodes.indexOf(stationCode);
            var departureTime = new Date(train.timeTableRows[j].scheduledTime);

            $("<li></li>").append(stationNames[index]
                + ": "
                + departureTime.toLocaleTimeString('fi', timeSettings))
                .appendTo(document.getElementById(trainId));
            if (train.timeTableRows[j].stationShortCode == stationInfo[toSt.value].shortCode) {
                break outer;
            }
        }

}



