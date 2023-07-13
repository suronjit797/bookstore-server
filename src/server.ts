import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLog, successLog } from "./shared/logger";
import { Server } from "http";

let server: Server;

process.on("uncaughtException", (error) => {
  console.log("uncaughtException: " + error.message);
  process.exit(1);
});

const bootFunction = async () => {
  try {
    await mongoose.connect(config.db_uri);
    successLog("🛢 Database connection established...");
    server = app.listen(config.port, () => {
      successLog("Server is listening on port: " + config.port);
      successLog(config.db_uri);
    });
  } catch (error) {
    errorLog(error as string);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        errorLog("unhandledRejection");
        console.log(error);
        process.exit(1);
      });
    }
  });
};

bootFunction();

process.on("SIGALRM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});
