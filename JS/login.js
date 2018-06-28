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
    //     if(key.contains(user)) {
    //         console.log("name is already used")
    //         return alert("Username is alreade used"),clearNameAndPass();
    //     }
    //
    // }

    if(loginMap.has(user)) {
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

    for (var [key, value] of loginMap) {
        if(key.contains(user)) {
            console.log(user.getName());
        }
    }

}