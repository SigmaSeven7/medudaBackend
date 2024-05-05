import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import axios from "axios";


const verifyRecaptcha = async (token:string) => {
  const secretKey = process.env.NEXT_RECAPTCHA_PRIVATE_KEY;

  var verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    token;

  return await axios.post(verificationUrl);
};



export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const token = req.body.gRecaptchaToken;
 
     // Recaptcha response
     const response = await verifyRecaptcha(token);
     // Checking if the reponse sent by reCaptcha success or not and if the score is above 0.5
     // In ReCaptcha v3, a score sent which tells if the data sent from front end is from Human or from Bots. If score above 0.5 then it is human otherwise it is bot
     // For more info check, https://developers.google.com/recaptcha/docs/v3
     // ReCaptcha v3 response, {
     //     "success": true|false,      // whether this request was a valid reCAPTCHA token for your site
     //     "score": number             // the score for this request (0.0 - 1.0)
     //     "action": string            // the action name for this request (important to verify)
     //     "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
     //     "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
     //     "error-codes": [...]        // optional
     //   }
     if (response.data.success && response.data.score >= 0.6) {
      return res.json({
        status: "success",
        message: "success!",
      });
     } else {
       return res.json({
         status: "error",
         message: "Something went wrong, please try again!!!",
       });
     }
   } catch (error) {
     console.log("ERRRRROr", error);
     res.json({
       status: "error",
       message: "Something went wrong, please try again!!!",
     });
   }
};


