function login() {

    var user = document.getElementById('user');
    var pass = document.getElementById('pass');

    var testuser = "testi";
    var testpass = "testisalaus";
    console.log("Data saved" + user.value + pass.value)


    if (user.value == testuser) {

        if (pass.value == testpass) {

            window.confirm("You are logged in as " + user.value + "Click ok to continue");
        } else {

            window.confirm("Username or Password is incorrect \nPlease check username and password(click cancel)"  );
        }
    } else {
        window.confirm("Username or Password is incorrect \nPlease check your username and password(click cancel)\nClick ok, if you want to ergister as a user"  );
    }

}

var users = {};
// var un = document.getElementById("user");
// var pw = document.getElementById("pass");

function saveUser() {
    users["_user"] = document.getElementById("user").value;
    users["_pass"] = document.getElementById("pass").value;
    console.log("getElementById")
    console.log(users)

    document.user = "";
    var expires = new Date(Date.now()+24*60*60*1000).toString();
    console.log("Expiring date")
    var userString = "";
    for (var key in users) {
        userString = key + "=" +users[key]+";"+expires+";";
        document.user = userString;
    }
    console.log(document.user);
    console.log("User saved");
    console.log(users)
}


