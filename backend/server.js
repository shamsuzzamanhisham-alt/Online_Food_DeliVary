import express from "express";
import 'dotenv/config';
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodroute.js";

// 1. App Config
const app = express();
const port = process.env.PORT || 4000;


// 4. API Endpoints
app.use("/api/food", foodRouter);

// 6. Test Route
app.get("/", (req, res) => {
    res.send("API Working Successfully");
});

// 7. Start Server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);

});
