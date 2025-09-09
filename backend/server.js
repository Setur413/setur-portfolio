const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // allow requests from your frontend

// Routes
const contactRoute = require("./routes/contact");
app.use("/api/contact", contactRoute);

// Start server
const PORT = process.env.PORT || 5000; // backend runs on 5000 for example
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
