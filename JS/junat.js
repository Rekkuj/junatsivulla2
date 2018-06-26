var dokumentinlista = document.getElementById("junalistaus");
var lahto = document.getElementById("lahtoAsema");
var paate = document.getElementById("paateAsema");
var timeSettings = {hour: "2-digit", minute: '2-digit', hour12: false};


var req = new XMLHttpRequest();
var req2 = new XMLHttpRequest();

var asemienNimet = [];
var stationShortCodes = [];
var asemienTiedot = {};

req.onreadystatechange = function () {
    if (req.readyState === 4) {
        if (req.status === 200) {
            var asemat = JSON.parse(req.responseText);
            console.log(asemat);
            for (var i = 0; i < asemat.length; i++) {
                var station = asemat[i].stationName;
                var shortCode = asemat[i].stationShortCode;
                var latitude = asemat[i].latitude;
                var longitude = asemat[i].longitude;
                var stationCode = asemat[i].stationUICCode;
                if (asemat[i].passengerTraffic === true) {
                    asemienTiedot[station] = {
                        shortCode: shortCode,
                        longitude: longitude,
                        latitude: latitude,
                        stationCode: stationCode
                    };
                    asemienNimet.push(station);
                    stationShortCodes.push(shortCode);
                }
            }
            console.log(asemienNimet);
            console.log(asemienTiedot);

            var options = {
                data: asemienNimet,
                list: {
                    maxNumberOfElements: 10,
                    match:
                        {
                            enabled: true
                        }
                }
            };
            $("#lahtoAsema").easyAutocomplete(options);
            $("#paateAsema").easyAutocomplete(options);

        } else {
            alert("Lataaminen epäonnistui.");
        }
    }
}

function haeKaikkiAsemat() {
    req.open('GET', 'https://rata.digitraffic.fi/api/v1/metadata/stations', true);
    req.send(null);
}

haeKaikkiAsemat()

req2.onreadystatechange = function () {
    if (req2.readyState === 4) {
        if (req2.status === 200) {
            while (dokumentinlista.firstChild) {
                dokumentinlista.removeChild(dokumentinlista.firstChild);
            }
            var junaTaulukko = JSON.parse(req2.responseText);
            console.log(junaTaulukko);
            lisaaListaan(junaTaulukko);
        } else {
            alert("Lataaminen epäonnistui.");
        }
    }
}


function haedata() {
    var lahto = document.getElementById("lahtoAsema");
    var paate = document.getElementById("paateAsema");
    var url = 'https://rata.digitraffic.fi/api/v1/live-trains/station/'
        + asemienTiedot[lahto.value].shortCode + '/' + asemienTiedot[paate.value].shortCode;
    req2.open('GET', url, true);
    req2.send(null);

    // console.log(asemienTiedot[lahto.value].lyhenne);

}


function lisaaListaan(lista) {

    var lengthOrTen = Math.min(lista.length, 8);

    for (var i = 0; i < lengthOrTen; i++) {
        var juna = lista[i];
        var asetukset = {hour: "2-digit", minute: '2-digit', hour12: false};
        var lahtoaika = new Date(juna.timeTableRows[0].scheduledTime);
        var saapumisaika = new Date(juna.timeTableRows[juna.timeTableRows.length - 1].scheduledTime);

        var idouter = "train" + i;

        $("<li></li>", {id: idouter})
            .append(juna.trainType + juna.trainNumber
                + ", Lähtöaika: " + lahtoaika.toLocaleTimeString('fi', asetukset)
                + ", Saapumisaika: " + saapumisaika.toLocaleTimeString('fi', asetukset))
            .appendTo(dokumentinlista);
        // console.log(document.getElementById(idouter));

        printTableRow(idouter, juna, i);

        // var listanOsa = document.createElement("li");
        // var tekstinode = document.createTextNode(juna.trainType + juna.trainNumber
        //     + ", Lähtöaika: " + lahtoaika.toLocaleTimeString('fi', timeSettings)
        //     + ", Saapumisaika: " + saapumisaika.toLocaleTimeString('fi', timeSettings));
        // listanOsa.appendChild(tekstinode);
        // dokumentinlista.appendChild(listanOsa);


    }
}

function printTableRow(idouter, train, i) {
    var trainId = train.trainNumber + train.trainType + i;
    $("<ul></ul>", {id: trainId}).appendTo(document.getElementById(idouter));
    outer:
        for (var j = 1; j < train.timeTableRows.length; j = j + 2) {
            if (train.timeTableRows[j].stationShortCode == asemienTiedot[paate.value].shortCode) {
                break outer;
            }
            if (stationShortCodes.indexOf(train.timeTableRows[j].stationShortCode) < 0) {
                continue outer;
            }
            if (train.timeTableRows[j].trainStopping == false) {
                continue outer;
            }
            var stationCode = train.timeTableRows[j].stationShortCode;
            var index = stationShortCodes.indexOf(stationCode);
            var departureTime = new Date(train.timeTableRows[j].scheduledTime);

            $("<li></li>").append(asemienNimet[index]
                + ": "
                + departureTime.toLocaleTimeString('fi', timeSettings))
                .appendTo(document.getElementById(trainId));
        }


}



