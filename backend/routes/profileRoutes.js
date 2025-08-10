const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const S3Client = require("@aws-sdk/client-s3");
const PutObjectCommand = require("@aws-sdk/client-s3");
const getSignedUrl = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto");
const { Client } = require("pg");
const config = require("../config.js");

// localhost:5000/codelearner/profile-image/url
router.post("/url", upload.any(), async (req, res) => {
  console.log(req.files[0]); // Debug: ensuring FormData object sent is valid

  // Generates random key value for the name of the user's image
  const uniqueId = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

  try {
    const s3 = new S3Client.S3Client({
      region: process.env.AWS_BUCKET_REGION,
      signatureVersion: "v4",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const putObjectCommand = new PutObjectCommand.PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: uniqueId(),
    });
    const signedURL = await getSignedUrl.getSignedUrl(s3, putObjectCommand, {});

    // Sends image data stored in buffer back to s3 bucket
    await fetch(signedURL, {
      method: "PUT",
      body: req.files[0].buffer,
      headers: {
        "Content-Type": req.files[0].type,
      },
    });

    const realUrl = signedURL.split("?"); // Without splitting string, presigned url would still be used
    console.log(realUrl[0]); // Debug: Shows complete public url of user's image
    res.send(realUrl[0]);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error creating image url" });
  }
});

// localhost:5000/codelearner/profile-image/upload/:user_id
router.put("/upload/:user_id", async (req, res) => {
  try {
    const { url } = req.body; // url sent back as an object to access the image url
    const client = new Client(config);
    await client.connect();

    const result = await client.query(`UPDATE codelearner.users
                                 SET image = '${url}'
                                 WHERE user_id = ${req.params.user_id}`);
    res.status(200).json({ message: "Successful update to user's image" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error storing image url in database" });
  }
});

module.exports = router;
