/*
 * Cookies
 * @author Miika Huhtanen, Elmo Visuri, Reija Jokinen
 */

var myCookies = {};
myCookies = document.cookie;
console.log(myCookies);
var fromSt = document.getElementById("fromSt");
var toSt = document.getElementById("toSt");

function saveCookies() {
    // resetStations();
    myCookies["_fromSt"] = document.getElementById("fromSt").value;
    myCookies["_toSt"] = document.getElementById("toSt").value;
    console.log(myCookies);
    console.log("getElementById")

    document.cookie = "";

    var expires = new Date(Date.now()+60*60*1000).toString();

    console.log("Expiring date")
    var cookieString = "";
    for (var key in myCookies) {
        cookieString = key + "=" + myCookies[key] + ";" + expires + ";";
        document.cookie = cookieString;
    }
    console.log("Dokumentin keksit: " + document.cookie);
    console.log("Cookies saved");
    console.log(myCookies)
}

function loadCookies() {
    console.log("loading cookies");

    console.log(document.cookie);

    console.log(myCookies)
    if (myCookies === undefined || myCookies.length == null) {
        console.log("TThheeeeeeeere is noooooooooo coookies")
        // resetStations();
        return false;
    }

    myCookies = {};
    var kv = document.cookie.split(";");
    for (var id in kv) {
        var cookie = kv[id].split("=");
        myCookies[cookie[0].trim()] = cookie[1];
    }

    console.log("Cookie sisältää: " + myCookies);
    // document.getElementById("fromSt").value = myCookies["_fromSt"];
    // document.getElementById("toSt").value = myCookies ["_toSt"];
}

function resetStations() {
    fromSt.value = 'Valitse asema';
    toSt.value = 'Valitse asema';
    while (listOfTrains.firstChild) {
        listOfTrains.removeChild(listOfTrains.firstChild);
    }
}

function getFromStCookie() {

    var fromSt = myCookies["_fromSt"];
    console.log(fromSt);
    return fromSt;
}

function getToStCookie() {
    var toSt = myCookies ["_toSt"];
    return toSt;
}

// function deleteCookies() {
//     console.log("Cookies will be removed")
//
// delete myCookies['_fromSt'];
// delete myCookies ['_toSt'];
// for (var i = 0; i < myCookies.length; i++) {
//     delete myCookies.v
// }
//     while (listOfTrains.firstChild) {
//         listOfTrains.removeChild(listOfTrains.firstChild);
//     }
//     //window.location = "";
//     console.log("Cookies removed")
//     console.log(myCookies)
// }

