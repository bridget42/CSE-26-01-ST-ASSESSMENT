const express = require("express");
const router = express.Router();
const multer = require("multer");

// Image upload configurations
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/dashboard", async (req, res) => {
  res.render("dashboard");
});

router.get("/dashboard", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    console.log(products);
    res.render("dashboard", { products });
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/dashboard", upload.single("image"), async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body, image: req.file.path });
    await newProduct.save();
    // console.log(newProduct);
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;


