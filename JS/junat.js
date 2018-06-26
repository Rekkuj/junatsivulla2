var listOfTrains = document.getElementById("trainlist");
var fromSt = document.getElementById("fromSt");
var toSt = document.getElementById("toSt");
var timeSettings = {hour: "2-digit", minute: '2-digit', hour12: false};
var dateSettings = {weekday: 'short', day: 'numeric', month: 'numeric'};


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

        var indexOfArriving;

        for (var j = 0; j < train.timeTableRows.length; j++) {
            if (train.timeTableRows[j].stationShortCode === stationInfo[toSt.value].shortCode) {
                indexOfArriving = j;
                break;
            }
        }


        var departureDate = new Date(train.departureDate);
        var departureTime = new Date(train.timeTableRows[0].scheduledTime);
        var arrivalTime = new Date(train.timeTableRows[indexOfArriving].scheduledTime);

        var idouter = "train" + i;

        $("<li></li>", {id: idouter})
            .append("<strong>" + fromSt.value + " - " + toSt.value + ": " + train.trainType + train.trainNumber + "</strong>"
                + "<br>Lähtö: " + departureDate.toLocaleDateString('fi', dateSettings)
                + " klo. " + departureTime.toLocaleTimeString('fi', timeSettings)
                + "<br>Perillä: " + arrivalTime.toLocaleTimeString('fi', timeSettings))
            .click(function () {
                $(this.childNodes).toggleClass("hide");
            })
            .appendTo(listOfTrains);


        // $("<li></li>", {id: idouter})
        //     .append(fromSt.value + " - " + toSt.value + ": ")
        //     .append(train.trainType + train.trainNumber
        //         + "<br>Lähtö: " + departureDate.toLocaleDateString('fi',dateSettings)
        //         + " klo. " + departureTime.toLocaleTimeString('fi', timeSettings)
        //         + "<br>Saapumisaika: " + arrivalTime.toLocaleTimeString('fi', timeSettings))
        //     .click(function () {
        //         $(this.childNodes).toggleClass("hide");
        //     })
        //     .appendTo(listOfTrains);

        printTableRow(idouter, train, i);

    }
}

function printTableRow(idouter, train, i) {
    var trainId = train.trainNumber + train.trainType + i;
    $("<ul></ul>", {id: trainId}).addClass("hide").appendTo(document.getElementById(idouter));

    for (var j = 1; j < train.timeTableRows.length; j = j + 2) {

        if (stationShortCodes.indexOf(train.timeTableRows[j].stationShortCode) < 0) {
            continue;
        }
        if (train.timeTableRows[j].trainStopping === false) {
            continue;
        }

        var stationCode = train.timeTableRows[j].stationShortCode;
        var index = stationShortCodes.indexOf(stationCode);
        var departureTime = new Date(train.timeTableRows[j].scheduledTime);

        if (train.timeTableRows[j].stationShortCode === stationInfo[toSt.value].shortCode) {
            $("<li></li>").append(stationNames[index]
                + ": "
                + departureTime.toLocaleTimeString('fi', timeSettings))
                .appendTo(document.getElementById(trainId));
            break;
        }

        var arrivalTime = new Date(train.timeTableRows[j+1].scheduledTime);
        var stopLength = parseInt((arrivalTime-departureTime)/(1000*60));
        var stopLengthWord;
        if (stopLength == 1){
            stopLengthWord = "minuutti.";
        } else {
            stopLengthWord = "minuuttia.";
        }
        $("<li></li>").append(stationNames[index]
            + ": "
            + departureTime.toLocaleTimeString('fi', timeSettings)
            + " , pysähdys " + stopLength + stopLengthWord)
            .appendTo(document.getElementById(trainId));
    }
}

