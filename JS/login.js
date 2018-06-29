/*
 * Login
 * @author Miika Huhtanen, Elmo Visuri, Reija Jokinen
 */

var loginMap = new Map();
var user;
var pass;

function setNewUserToMap() {
    user = document.getElementById("user").value;
    pass = document.getElementById("pass").value;

    console.log(user + pass);
    console.log(users);

    if (user in users) {
        console.log("User is already used");
        return window.confirm("Käyttäjänimi on jo käytössä, ole hyvä ja vaihda nimi.")
    }

    // if(loginMap.has(user.value)) {
    //     console.log("User is already used");
    //     return window.confirm("Käyttäjänimi on jo käytössä, ole hyvä ja vaihda nimi.")
    // }

    users[user] = pass;
    console.log(users[user]);
    console.log(users);

    // loginMap.set(user.value, pass.value);
    // console.log("User and pass saved")
    // console.log(loginMap);
    // console.log(loginMap.toString());
    registration();
}

function clearNameAndPass() {
    setNewUser("miika");
    setNewPass("miika");
}

function login() {
    var user = myCookies["_lastUser"];
    console.log("Viimeisin käyttäjä: " + user);
    console.log(users);
    if (user === "undefined") {
        return;
    }
    console.log("Tänne ei pitäisi päästä!");
    if (users == null) {
        alert("Käyttäjää ei löydy")
        return;
    }
    var pass = myCookies["_lastPass"];
    var kw = users[user];
    console.log(kw);
    console.log(pass);
    console.log(kw === pass);

    // var kwc = kw.caesar();

    if (kw === pass) {
        console.log("Login ok");
        welcome(user);
        showWelcome();
    } else {
        console.log("Something went wrooong");
        alert("Tarkista nimi ja salasana");
    }
}

function registration() {
    var user = myCookies["_lastUser"];
    console.log("Viimeisin käyttäjä: " + user);
    console.log(users);
    if (user === "undefined") {
        return;
    }
    console.log("Tänne ei pitäisi päästä!");
    if (users == null) {
        alert("Käyttäjää ei löydy")
        return;
    }
    var pass = myCookies["_lastPass"];
    var kw = users[user];
    console.log(kw);
    console.log(pass);
    console.log(kw === pass);

    // var kwc = kw.caesar();

    if (kw === pass) {
        console.log("Login ok");
        regCompleted(user);
        showWelcome();
    } else {
        console.log("Something went wrooong");
        alert("Tarkista nimi ja salasana");
    }
    resetStations();
}

function loginAsLastUser() {
    var lu = getLastUser();
    console.log("last user" + lu);
    console.log("Login as a last user");
    console.log(document.cookie["_lastPass"]);

    if (lu === undefined) {
        return;
    }
    login();
}

function regCompleted(user) {
    $("<h3></h3>").text("Rekisteröityminen onnistui. Tervetuloa " + user + "!").prependTo("#welcome");
}

function welcome(user) {
    $("<h3></h3>").text("Tervetuloa " + user + "!").appendTo("#welcome");
}

function logOut() {
    // clearNameAndPass();
    writeUserFile();
    deleteCookies();
    window.location.href = '../HTML/loggedout.html';
}