
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import FormData from 'form-data';
import fetch from 'node-fetch';


export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  let formData = JSON.parse(req.body); // Ensure req.body is already parsed if coming as JSON
  const form = new FormData();
  form.append("file", Buffer.from(formData.image, "base64"), {
    filename: "upload.png",
    contentType: "image/png"
  });
  form.append("metadata", formData.metadata);
  form.append("requireSignedURLs", formData.requireSignedURLs);

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`,
     
    },
    body: form
  };

  try {
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
};
