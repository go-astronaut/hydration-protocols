import express from "express";
import cors from "cors";
import compression from "compression";
import waterTrackerRoutes from "./Routes/WaterTracker";
import userRoutes from "./Routes/User";
import { HTTPStatusCodes } from "./Constants/Constants";

const app = express();

const port = process.env.PORT || 5000;

// List of allowed origins
const allowedOrigins = ["http://localhost:3000"];

// CORS options
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // For legacy browser support
  optionsSuccessStatus: HTTPStatusCodes.OK,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(compression());

app.use("/water-tracker", waterTrackerRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});
