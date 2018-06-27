<<<<<<< HEAD
var myCookies = {};
// var fromSt = document.getElementById("fromSt");
// var toSt = document.getElementById("toSt")

function saveCookies() {
    myCookies["_fromSt"] = document.getElementById("fromSt").value;
    myCookies["_toSt"] = document.getElementById("toSt").value;
    console.log("getElementById")

    document.cookie = "";
    var expires = new Date(Date.now()+60*1000).toString();
    console.log("Expiring date")
    var cookieString = "";
    for (var key in myCookies) {
        cookieString = key + "=" +myCookies[key]+";"+expires+";";
        document.cookie = cookieString;
    }
    console.log(document.cookie);
    console.log("Cookies saved");
    console.log(myCookies)
}

function loadCookies() {
    console.log("loading cookies");
    console.log(myCookies)
    if (myCookies === undefined || myCookies.length == 0) {
        return false;
        console.log("TThheeeeeeeere is noooooooooo coookies")
    }
    myCookies = {};
    var kv = document.cookie.split(";");
    for (var id in kv) {
        var cookie = kv[id].split("=");
        myCookies[cookie[0].trim()] = cookie[1];
    }
    document.getElementById("fromSt").value = myCookies["_fromSt"];
    document.getElementById("toSt").value = myCookies ["_toSt"];
}

// function deleteCookies() {
//     console.log("Cookies will be removed")

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


=======
var myCookies = {};
var fromSt = document.getElementById("fromSt");
var toSt = document.getElementById("toSt");

function saveCookies() {
    myCookies["_fromSt"] = document.getElementById("fromSt").value;
    myCookies["_toSt"] = document.getElementById("toSt").value;
    console.log("getElementById")

    document.cookie = "";
    var expires = new Date(Date.now()+60*1000).toString();
    console.log("Expiring date")
    var cookieString = "";
    for (var key in myCookies) {
        cookieString = key + "=" +myCookies[key]+";"+expires+";";
        document.cookie = cookieString;
    }
    console.log(document.cookie);
    console.log("Cookies saved");
    console.log(myCookies)
}

function loadCookies() {
    console.log("loading cookies");
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
    document.getElementById("fromSt").value = myCookies["_fromSt"];
    document.getElementById("toSt").value = myCookies ["_toSt"];
}

function resetStations() {
    fromSt.value = '';
    toSt.value = '';
}

function loadPage(){
    resetStations();
    loadCookies();
}

// function deleteCookies() {
//     console.log("Cookies will be removed")

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
>>>>>>> 8b608eea04cded277b82010507e8c5046992cdab
