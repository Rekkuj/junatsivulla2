function distance(point1, point2) {
    var earthR = 6371e3;
    var lati1 = deg2Rad(point1.latitude);
    var lati2 = deg2Rad(point2.latitude);

    var longi1 = deg2Rad(point1.longitude);
    var longi2 = deg2Rad(point2.longitude);

    var a = Math.sin((lati1 - lati2) / 2) * Math.sin((lati1 - lati2) / 2)
        + Math.cos(lati1) * Math.cos(lati2)
        * Math.sin((longi1 - longi2) / 2) * Math.sin((longi1 - longi2) / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return c * earthR;
}

function deg2Rad(degrees) {
    return Math.PI / 180 * degrees;
}


