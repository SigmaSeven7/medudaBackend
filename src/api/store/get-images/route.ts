import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import fetch from 'node-fetch';


export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { imageId } = JSON.parse(req.body); // Parsing the JSON body
  

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`
    }
  };

  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v1/${imageId}`, options);
    const data = await response.json();
    // Check if the success property in the response is true
    if (data.success) {
      res.json({ success: true });  // HTTP 200 with success true
    } else {
      // Here, consider sending a different HTTP status code to reflect the unsuccessful operation
      res.status(404).json({ success: false, error: "Image retrieval was not successful", details: data });
    }
  } catch (err) {
    console.error("Error fetching image data:", err);
    res.status(500).json({ success: false, error: "Server error occurred while fetching image data." });
  }
};