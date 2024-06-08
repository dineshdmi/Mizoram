import * as bodyParser from "body-parser";
import express from "express";
import http from "http";
import cors from "cors";
import * as packageInfo from "../package.json";
import { mongooseConnection } from "./database";
import { router } from "./routes";
import { onConnect } from "./helpers/socket";
import path from 'path';

const app = express();
app.use(mongooseConnection);

// Set up cors middleware to allow requests from specified origins
app.use(cors({
  origin: "*", // Update this to specific origins if needed
}));

let server = http.createServer(app);
let io = require("socket.io")(server, {
  cors: { origin: "*" } // Ensure Socket.IO CORS settings match your requirements
});
io.on("connection", onConnect);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/upload", express.static("upload"));

// Health check routes
const health = (req, res) => {
  return res.status(200).json({
    message: "Read It Out Node.js Server is Running",
    app: packageInfo.name,
    version: packageInfo.version,
    description: packageInfo.description,
    author: packageInfo.author,
    license: packageInfo.license,
    homepage: packageInfo.homepage,
    repository: packageInfo.repository,
    contributors: packageInfo.contributors,
  });
};

app.get("/", health);
app.get("/health", health);
app.get("/isServerUp", (req, res) => {
  res.send("Server is running ");
});

app.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;
