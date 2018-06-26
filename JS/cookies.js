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
    console.log("Cookies saved");
    console.log(document.cookie);
}

function loadCookies() {
    console.log("loading cookies");
    if (myCookies === undefined || myCookies.length == 0) {
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

function deleteCookies() {
    console.log("Cookies will be removed")
    var exCookies = myCookies;
    var size = exCookies.getLength();
    for (var i = 0; i < size; i++) {
        delete myCookies[i]
    }
    console.log("Cookies removed")
}


