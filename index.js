const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use("/api", require("./src/routes/index")());

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.static("public"));
app.get("*.webp", (req, res) => {
  res.sendFile(req.url, { root: "./public" });
});
app.use("/", router);

app.listen(8080, () => {
  console.info(`Listening on port 8080`);
  mongoose.connect("mongodb://127.0.0.1:27017/swiper-for-clothes").then(() => {
    console.info("Connected to MongoDB");
  });
});
