import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import fetch from 'node-fetch';


export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const { imageId } = req.body;  // Extracting imageId from the request body

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`
    }
  };

  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v1/${imageId}`, options);
    const data = await response.json(); // Parsing the JSON response
    // Handle based on the success field in the response
    if (response.ok) {
      // Assuming the response includes a success field that indicates the outcome
      res.status(200).json({ success: true, message: "Image successfully deleted." });
    } else {
      // Send appropriate error response based on the Cloudflare API feedback
      res.status(400).json({ success: false, message: "Failed to delete image", details: data });
    }
  } catch (err) {
    console.error("Error during image deletion:", err);
    res.status(500).json({ success: false, message: "Server error occurred while deleting the image." });
  }
};
