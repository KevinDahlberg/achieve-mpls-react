/**
* @desc generate the random pwd
* @param the length of the pwd
* @return Interger -> String
*/
function dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
  }
  
  export function generateId(len) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }