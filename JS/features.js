/*
 * Features
 * @author Miika Huhtanen, Elmo Visuri, Reija Jokinen
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
    $("#logout").addClass("logout");
}

function hideLogin() {
    $("#login").addClass("hide");
}

function switshFromTo(){
    var temp = document.getElementById("fromSt").value;
    document.getElementById("fromSt").value = document.getElementById("toSt").value;
    document.getElementById("toSt").value = temp;
}

function switchImg(){
    $("#arrows").attr('src','../IMAGES/arrows_bw.png');
}

function switchImgBack(){
    $("#arrows").attr('src','../IMAGES/arrows.png');
}