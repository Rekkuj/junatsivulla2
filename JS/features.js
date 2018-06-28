/*
 * Features
 * @author Reija Jokinen (http://github.com/Rekkuj)
 */

function showTrainlist() {
    $("#trlist").removeClass("hide");
}

function hideTrainlist() {
    $("#trlist").addClass("hide");
}

function showWelcome() {
    hideLogin();
    $("#logout").removeClass("hide");
}

function hideLogin() {
    $("#login").addClass("hide");
}