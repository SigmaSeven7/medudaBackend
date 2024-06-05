// import CryptoJS from "crypto-js";




// function makeid(length) {
//     var result           = '';
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//        result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//  }


//  var time = Math.floor(Date.now() / 1000);
//  var nonce = makeid(80)
//  var key =
//    "XZyY6L8EwC4MiRZOAQdnEQ3Acq25ayXNOiITJzfHdPP1sRwKvjYp1VpeTWQwZheKIzTPLw9q0ln"
//  var privateKey = "tE07ITwV8o"
//  var hash = CryptoJS.HmacSHA256(key, privateKey + time + nonce).toString(
//    CryptoJS.enc.Hex
//  )


// export const headers = { 
//   'X-tranzila-api-app-key':key,
//   'X-tranzila-api-request-time':time,
//   'X-tranzila-api-nonce':nonce,
//   'X-tranzila-api-access-token':hash
// }

import CryptoJS from "crypto-js";

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateHeaders() {
  var time = Math.floor(Date.now() / 1000);
  var nonce = makeid(80);
  var key = "XZyY6L8EwC4MiRZOAQdnEQ3Acq25ayXNOiITJzfHdPP1sRwKvjYp1VpeTWQwZheKIzTPLw9q0ln";
  var privateKey = "tE07ITwV8o";
  var hash = CryptoJS.HmacSHA256(key, privateKey + time + nonce).toString(CryptoJS.enc.Hex);

  return {
    'X-tranzila-api-app-key': key,
    'X-tranzila-api-request-time': time,
    'X-tranzila-api-nonce': nonce,
    'X-tranzila-api-access-token': hash
  };
}

export default generateHeaders;