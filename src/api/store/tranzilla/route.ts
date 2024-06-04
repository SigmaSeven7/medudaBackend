
import { Request, Response } from 'express';
// import {headers} from "../../../admin/utils/tranzilla-headers"
import axios from 'axios';


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


 var time = Math.floor(Date.now() / 1000);
 var nonce = makeid(80)
 var key =
   "XZyY6L8EwC4MiRZOAQdnEQ3Acq25ayXNOiITJzfHdPP1sRwKvjYp1VpeTWQwZheKIzTPLw9q0ln"
 var privateKey = "tE07ITwV8o"
 var hash = CryptoJS.HmacSHA256(key, privateKey + time + nonce).toString(
   CryptoJS.enc.Hex
 )


export const headers = { 
  'X-tranzila-api-app-key':key,
  'X-tranzila-api-request-time':time,
  'X-tranzila-api-nonce':nonce,
  'X-tranzila-api-access-token':hash
}




export const POST = async (req: Request, res: Response) => {
    try {
        console.log("req.body", req.body);
        console.log("headers", headers);
        // Make the external API request
        const response = await axios.post('https://api.tranzila.com/v1/transaction/credit_card/create', req.body, {
            headers: headers
        });
        const data = response.data;
        // console.log(data);

        // Return the data from the external API to your client
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.error(error);

        // Error handling: Check if error is AxiosError for better error responses
        if (axios.isAxiosError(error)) {
            // If the error comes from Axios, it's likely from the external API request
            const status = error.response?.status || 500;
            const message = error.response?.data || 'External API error';
            res.status(status).json({
                success: false,
                message: message
            });
        } else {
            // General error (could be a coding error, or something else not related to Axios)
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
};
