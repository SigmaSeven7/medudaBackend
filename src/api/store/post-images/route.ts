
// import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
// import FormData from 'form-data';
// import fetch from 'node-fetch';


// export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
//   console.log(req.body, "req.body");
//     //@ts-ignore:next-line
//   let formData = JSON.parse(req.body); // Ensure req.body is already parsed if coming as JSON
//   const form = new FormData();
//   form.append("file", Buffer.from(formData.image, "base64"), {
//     filename: "upload.png",
//     contentType: "image/png"
//   });
//   form.append("metadata", formData.metadata);
//   form.append("requireSignedURLs", formData.requireSignedURLs);

//   const options = {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`,
     
//     },
//     body: form
//   };

//   try {
//     const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v1`, options);
//     console.log(response, "response");
//     console.log(options, "options")
//     const responseJson = await response.json();
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     res.status(200).json(responseJson);
//   } catch (error) {
//     console.error("Failed to upload image:", error);
//     res.status(500).json({ message: "Failed to upload image." });
//   }
// };



// import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
// import FormData from 'form-data';
// import fetch from 'node-fetch';


// export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
//   console.log(req.body, "req.body");
//     //@ts-ignore:next-line
//   let formData = JSON.parse(req.body); // Ensure req.body is already parsed if coming as JSON
//   const form = new FormData();
//   form.append("file", Buffer.from(formData.image, "base64"), {
//     filename: "upload.png",
//     contentType: "image/png"
//   });
//   form.append("metadata", formData.metadata);
//   form.append("requireSignedURLs", formData.requireSignedURLs);

//   const options = {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`,
     
//     },
//     body: form
//   };

//   try {
//     const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v1`, options);
//     console.log(response, "response");
//     console.log(options, "options")
//     const responseJson = await response.json();
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     res.status(200).json(responseJson);
//   } catch (error) {
//     console.error("Failed to upload image:", error);
//     res.status(500).json({ message: "Failed to upload image." });
//   }
// };


// import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
// import multiparty from 'multiparty';
// import fetch from 'node-fetch';
// import fs from 'fs';
// import path from 'path';

// export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
//   const form = new multiparty.Form();
// console.log(req.body, "req.body");
//   form.parse(req, async (err, fields, files) => {
//     console.log(fields, "fields");
//     console.log(files, "files");
//     if (err) {
//       return res.status(500).json({ message: "Failed to parse form data." });
//     }

//     try {
//       const file = files.image[0];
//       const metadata = fields.metadata[0];
//       const requireSignedURLs = fields.requireSignedURLs[0];


//       const filePath = file.path;
//       const fileContent = fs.readFileSync(filePath);
//       const base64File = fileContent.toString('base64');
//       console.log(base64File, "base64File");
//       const formData = new FormData();
//       // formData.append("file", base64File);
//       form.append("file", Buffer.from(file, "base64"), {
//             filename: "upload.png",
//             contentType: "image/png"
//           });
//       formData.append("metadata", metadata);
//       formData.append("requireSignedURLs", requireSignedURLs);

//       const options = {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`,
//         },
//         body: formData
//       };

//       const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v1`, options);
//       const responseJson = await response.json();
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       res.status(200).json(responseJson);
//     } catch (error) {
//       console.error("Failed to upload image:", error);
//       res.status(500).json({ message: "Failed to upload image." });
//     }
//   });
// };


import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import multiparty from 'multiparty';
import fetch from 'node-fetch';
import fs from 'fs';
import FormData from 'form-data';

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const form = new multiparty.Form();
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: "Failed to parse form data." });
    }

    try {
      const file = files.image[0];
      const metadata = fields.metadata[0];
      const requireSignedURLs = fields.requireSignedURLs[0];

      // Read the file from the temporary path and convert it to base64
      const filePath = file.path;
      const fileContent = fs.readFileSync(filePath);
      const base64File = fileContent.toString('base64');
  

      const formData = new FormData();
      formData.append("file", Buffer.from(base64File, "base64"), {
        filename: file.originalFilename,
        contentType: file.headers['content-type']
      });
      formData.append("metadata", metadata);
      formData.append("requireSignedURLs", requireSignedURLs);

      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`,
        },
        body: formData
      };

      const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v1`, options);
      const responseJson = await response.json();
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      res.status(200).json(responseJson);
    } catch (error) {
      console.error("Failed to upload image:", error);
      res.status(500).json({ message: "Failed to upload image." });
    }
  });
};
