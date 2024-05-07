const express = require("express");
const PORT = 8080;
const app = express();
const axios = require("axios");

// Set view engine
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
    res.render("index", {weather: null, error: null});
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apiKey = "bd5e378503939ddaee76f12ad7a97608";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    let weather;
    let error = null;
    try {
        const response = await axios.get(url);
        weather = response.data;
    } catch (error) {
        weather = null;
        error = "Error, Please try again";
    }
    res.render("index", {weather, error});
});

// Start the server
app.listen(PORT, ()=>{console.log(`Server is running on http://localhost:${PORT}`)});