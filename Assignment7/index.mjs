import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import movies from "./routes/movies.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /movies routes
app.use("/api/movies/", movies);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occurred.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}, try a GET Request in your browser http://localhost:${PORT}/api/movies`);
});
