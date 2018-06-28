var loginMap = new Map();
var user;
var pass;

function setNewUserToMap() {
    user = document.getElementById("user");
    pass = document.getElementById("pass");

    console.log(user + pass);

    //Caesar function??
    // for (var [key, value] of loginMap) {
    //     console.log(key + ' = ' + value);
    // }

    // for (var key of loginMap.keys()) {
    //     console.log(key);
    //     if(key.has(user)) {
    //         console.log("name is already used")
    //         return alert("Username is alreade used"),clearNameAndPass();
    //     }
    //
    //     loginMap.set(user.value, pass.value);
    //     console.log("User and pass saved");
    //
    // }

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

    // for (var [key, value] of loginMap) {
    //     if(key.contains(user)) {
    //         console.log(user.getValue());
    //         if(this.user(value).equals(pass,pass.value)) {
    //             console.log("User and pass match");
    //             welcome();
    //         } else {
    //             return "Tarkista nimi ja salasana";
    //         }
    //     return "Tarkista nimi ja salasana";
    //     }
    // }

}

function welcome() {
    return alert("Tervetuloa" + user);
}