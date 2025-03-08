const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Enable CORS
app.use(cors());

// Use the routes
app.use("/api", userRoutes);

// Root Route (For Testing)
app.get("/", (req, res) => {
  res.send("Fake User API is running");
});

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; // Export for Vercel
