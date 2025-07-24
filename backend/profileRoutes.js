const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const S3Client = require("@aws-sdk/client-s3");
const PutObjectCommand = require("@aws-sdk/client-s3");
const getSignedUrl = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto");

// localhost:5000/codelearner/profile-image/url
router.post("/url", upload.any(), async (req, res) => {
  console.log(req.files[0]); // Debug: ensuring FormData object is valid

  // Generates random key value for the name of the user's image
  const id = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

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
    Key: id(),
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
});

module.exports = router;
