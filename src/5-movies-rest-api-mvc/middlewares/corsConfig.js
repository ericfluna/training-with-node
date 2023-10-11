import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://127.0.0.1:5500"
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: function (origin, callback) {
      if (acceptedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  });