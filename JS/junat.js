var listOfTrains = document.getElementById("trainlist");
var fromSt = document.getElementById("fromSt");
var toSt = document.getElementById("toSt");
var timeSettings = {hour: "2-digit", minute: '2-digit', hour12: false};
var dateSettings = {weekday: 'short', day: 'numeric', month: 'numeric'};
var closestStation;

var req = new XMLHttpRequest();
var req2 = new XMLHttpRequest();

var stationNames = [];
var stationShortCodes = [];
var stationInfo = {};

/** Function read's info of all stations and
 * create's two lists and an object.
 *    - only stations with passenger traffic
 * Lists: stationNames and stationShortCodes.
 * Object: key - Station name, properties - shortCode, longitude, latitude, stationCode (numeric)
 * */

function getAllStations() {
    req.open('GET', 'https://rata.digitraffic.fi/api/v1/metadata/stations', true);
    req.send(null);
}

getAllStations();

req.onreadystatechange = function () {
    if (req.readyState === 4) {
        if (req.status === 200) {
            var stations = JSON.parse(req.responseText);
            // console.log(stations);
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
                    $("<option></option>")
                        .text(station)
                        .appendTo(fromSt);
                    $("<option></option>")
                        .text(station)
                        .appendTo(toSt);
                }

            }

            console.log(stationNames);
            console.log(stationInfo);
            //
            // var options = {
            //     data: stationNames,
            //     list: {
            //         maxNumberOfElements: 10,
            //         match:
            //             {
            //                 enabled: true
            //             }
            //     }
            // };
            // // $("#fromSt").easyAutocomplete(options);
            // $("#toSt").easyAutocomplete(options);

        } else {
            alert("Lataaminen epäonnistui.");
        }
    }
}

req2.onreadystatechange = function () {
    if (req2.readyState === 4) {
        if (req2.status === 200) {
            while (listOfTrains.firstChild) {
                listOfTrains.removeChild(listOfTrains.firstChild);
            }
            var trainTable = JSON.parse(req2.responseText);
            console.log(trainTable);
            addToList(trainTable);
            console.log(distance(stationInfo[fromSt.value],stationInfo[toSt.value]));
        } else {
            alert("Lataaminen epäonnistui.");
        }
    }
}

/** Function get's trains between two stations
 *
 * */

function getTrains() {
    var url = 'https://rata.digitraffic.fi/api/v1/live-trains/station/'
        + stationInfo[fromSt.value].shortCode + '/' + stationInfo[toSt.value].shortCode;
    req2.open('GET', url, true);
    req2.send(null);
}

/** Add a list of trains between two spesific stations to HTML-page */

function addToList(table) {

    var lengthOrMax = Math.min(table.length, 5);

    for (var i = 0; i < lengthOrMax; i++) {
        var train = table[i];

        // Find a indeces of fromSt and toSt from the timeTableRows
        var indexOfDeparture;
        var indexOfArriving;

        for (var j = 0; j < train.timeTableRows.length; j++) {
            //fromSt
            if (train.timeTableRows[j].stationShortCode === stationInfo[fromSt.value].shortCode){
                if (j===0) {
                    indexOfDeparture = j;
                } else{
                    indexOfDeparture = j+1;
                    j++; //Index of leaving the station
                }
            }
            //toSt
            if (train.timeTableRows[j].stationShortCode === stationInfo[toSt.value].shortCode) {
                indexOfArriving = j;
                break;
            }
        }



        var departureTime = new Date(train.timeTableRows[indexOfDeparture].scheduledTime);
        var arrivalTime = new Date(train.timeTableRows[indexOfArriving].scheduledTime);

        var idouter = "train" + i;


        $("<p></p>", {id: idouter})
            .append("<span>" + fromSt.value + " - " + toSt.value + ": " + train.trainType + train.trainNumber + "</span>"
                + "<br>Lähtöaika: " + departureTime.toLocaleDateString('fi',dateSettings)
                + " klo " + departureTime.toLocaleTimeString('fi',timeSettings)
                + "<br>Saapumisaika: " + arrivalTime.toLocaleDateString('fi',dateSettings)
                + "klo " + arrivalTime.toLocaleTimeString('fi', timeSettings))
            .click(function () {
                $(this.lastChild).toggleClass("hide");
            })
            .appendTo(listOfTrains);

        printTableRow(idouter, train, i, indexOfDeparture);

    }
}

/** Print timetable of a train to the HTML-page */

function printTableRow(idouter, train, i, startingIndex) {
    var trainId = train.trainNumber + train.trainType + i;
    $("<ul></ul>", {id: trainId}).addClass("hide").appendTo(document.getElementById(idouter));


    for (var j = startingIndex+1; j < train.timeTableRows.length; j = j + 2) {

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
        if (stopLength === 1){
            stopLengthWord = " minuutti";
        } else {
            stopLengthWord = " minuuttia";
        }
        $("<li></li>").append(stationNames[index]
            + ": "
            + departureTime.toLocaleTimeString('fi', timeSettings)
            + ", pysähdys " + stopLength + stopLengthWord)
            .appendTo(document.getElementById(trainId));
    }
}
