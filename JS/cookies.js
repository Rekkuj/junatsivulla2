/*
 * Cookies
 * @author Miika Huhtanen, Elmo Visuri, Reija Jokinen
 */

var myCookies = {};
myCookies = document.cookie;
console.log(myCookies);
var fromSt = document.getElementById("fromSt");
var toSt = document.getElementById("toSt");
var users = {};
console.log(users);
// var lastUser = document.getElementById("user");
// var lastPass = document.getElementById("pass");


function saveCookies() {
    // resetStations();
    myCookies["_fromSt"] = document.getElementById("fromSt").value;
    myCookies["_toSt"] = document.getElementById("toSt").value;
    myCookies["_lastUser"] = document.getElementById("user").value;
    myCookies["_lastPass"] = document.getElementById("pass").value;
    console.log(document.getElementById("user").value);
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
    console.log("Minun keksit" + myCookies);
}

function loadCookies() {
    console.log("loading cookies");

    console.log(document.cookie);


    // if (myCookies === undefined || myCookies.length == null) {
    //     console.log("TThheeeeeeeere is noooooooooo coookies")
    //     // resetStations();
    //     return false;
    // }

    myCookies = {};
    var kv = document.cookie.split(";");
    for (var id in kv) {
        var cookie = kv[id].split("=");
        myCookies[cookie[0].trim()] = cookie[1];
    }

    console.log("Cookie sisältää: " + myCookies.value);
    // document.getElementById("fromSt").value = myCookies["_fromSt"];
    // document.getElementById("toSt").value = myCookies ["_toSt"];
}

function resetStations() {
        $("<option></option>")
            .text("Valitse asema")
            .attr('selected', true)
            .attr('hidden', 'hidden')
            .prop('disabled', true)
            .appendTo(fromSt);
        $("<option></option>")
            .text("Valitse asema")
            .attr('selected', true)
            .attr('hidden', 'hidden')
            .prop('disabled', true)
            .appendTo(toSt);
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

function getLastUser() {
    var lu = myCookies ["_lastUser"];
    return lu;
}

function getLastPass() {
    var pw = myCookies["_lastPass"];
    return pw;
}

function setNewUser(user) {
    myCookies["_lastUser"] = user.value;
}

function setNewPass(pass) {
    myCookies["_lastPass"] = pass.value;
}

function saveLastUser() {

    lastUser = document.getElementById("user").value;
    lastPass = document.getElementById("pass").value;
    console.log("save last user" + lastUser + lastPass);
}

function checkLastUser() {
    var lastUser = myCookies["_lastUser"];
    console.log(lastUser)
    if (lastUser === '' || lastUser === undefined) {
        return;
    }
    loginAsLastUser();
}


function deleteCookies() {
    console.log("Cookies will be removed")

    myCookies['_lastUser'] = undefined;
    myCookies ['_lastPass'] = undefined;
    console.log("Minnun keksit" + myCookies["_lastUser"]);
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
    console.log("Minun keksit" + myCookies);
// for (var i = 0; i < myCookies.length; i++) {
//     delete myCookies.v
}
//     while (listOfTrains.firstChild) {
//         listOfTrains.removeChild(listOfTrains.firstChild);
//     }
//     //window.location = "";
//     console.log("Cookies removed")
//     console.log(myCookies)
// }

function writeUserFile() {

    localStorage.setItem('users',JSON.stringify(users));

    // var fileName = "../users.txt";
    // // var file = new File(fileName);
    // var fh = fopen(fileName,3);
    //
    // if (fh!=-1){
    //     for (var [user, pass] of loginMap) {
    //         var line = user + " : " + pass;
    //         fwrite(fh, line);
    //     }
    //     fclose(fh);
    // }

    //
    // for (var [user, pass] of loginMap){
    //     var line = user + " : " + pass;
    //     file.writeln(line);
    // }
    // file.close();
}

function getOldUsers(){
    var usersTry = JSON.parse(localStorage.getItem('users'));
    if (usersTry != null) {
        users = usersTry;
    }
    console.log(users);
}
