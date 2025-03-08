const express = require('express');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");

const app = express();

// Enable CORS
app.use(cors());

// Use the routes
app.use("/api", userRoutes);

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
