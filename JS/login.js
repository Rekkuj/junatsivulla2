var loginMap = new Map();
var user;
var pass;

function setNewUserToMap() {
    user = document.getElementById("user");
    pass = document.getElementById("pass");

    console.log(user + pass);

    if(loginMap.has(user.value)) {
        console.log("User is already used");
        return window.confirm("Käyttäjänimi on jo käytössä, ole hyvä ja vaihda nimi.")
    }


    loginMap.set(user.value, pass.value);
    console.log("User and pass saved")
    console.log(loginMap);
    clearNameAndPass();
    console.log("User and password fields")
}

function clearNameAndPass() {
    user.value='';
    pass.value='';
}

function login() {
    var user = document.getElementById("user");
    var pass = document.getElementById("pass");
    var kw = loginMap.get(user.value);
    console.log(kw);
    console.log(pass.value);

    // var kwc = kw.caesar();

    if (kw === pass.value) {
        console.log("Login ok");
        welcome();
    } else {
        console.log("Something went wrooong");
        alert("Tarkista nimi ja salasana");
    }

}

function welcome() {
    return alert("Tervetuloa" + user);
}