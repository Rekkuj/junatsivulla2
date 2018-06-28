var encrypt = function(plaintext, shiftAmount) {
    var ciphertext = "";
    for(var i = 0; i < plaintext.length; i++) {
        var plainCharacter = plaintext.charCodeAt(i);
        if(plainCharacter >= 97 && plainCharacter <= 122) {
            ciphertext += String.fromCharCode((plainCharacter - 97 + shiftAmount) % 26 + 97);
        } else if(plainCharacter >= 65 && plainCharacter <= 90) {
            ciphertext += String.fromCharCode((plainCharacter - 65 + shiftAmount) % 26 + 65);
        } else {
            ciphertext += String.fromCharCode(plainCharacter);
        }
    }
    console.log(ciphertext);
    return ciphertext;
}

var decrypt = function(ciphertext, shiftAmount) {
    var plaintext = "";
    for(var i = 0; i < ciphertext.length; i++) {
        var cipherCharacter = ciphertext.charCodeAt(i);
        if(cipherCharacter >= 97 && cipherCharacter <= 122) {
            plaintext += String.fromCharCode((cipherCharacter - 97 - shiftAmount + 26) % 26 + 97);
        } else if(cipherCharacter >= 65 && cipherCharacter <= 90) {
            plaintext += String.fromCharCode((cipherCharacter - 65 - shiftAmount + 26) % 26 + 65);
        } else {
            plaintext += String.fromCharCode(cipherCharacter);
        }
    }
    console.log(plaintext);
    return plaintext;
}