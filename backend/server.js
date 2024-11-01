
const express = require("express");

const cors = require("cors");
require("dotenv").config();
const connectDB = require('./config/db'); 
const superheroRoutes = require('./routes/superheroes');

const app = express();
const port = process.env.PORT || 4000;


connectDB();


app.use(express.json());
app.use(cors());


app.use('/api/superheroes', superheroRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
