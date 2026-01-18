import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { Action, useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { UserController } from "./controllers/UserController";
import { connectMongoDB } from "./config/db";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { ErrorHandler } from "./middlewares/errorHandler";
import { mongooseSerializer } from "./interceptors/serialize.interceptor";
import { LocationController } from "./controllers/LocationController";
import { AuthMiddleware, authorizationChecker } from "./middlewares/authMiddleware";
import { HotelController } from "./controllers/HotelController";
import { BookingController } from "./controllers/BookingController";
import { RoomController } from "./controllers/RoomController";
import { FileController } from "./controllers/FileController";

dotenv.config();

useContainer(Container);

export const startServer = async () => {
  try {
    const app = express();

    app.use(cookieParser());

    // Connect DB
    await connectMongoDB();

    app.use(mongooseSerializer);

    useExpressServer(app, {
      controllers: [UserController, LocationController, FileController],
      middlewares: [ErrorHandler, AuthMiddleware],
      authorizationChecker: authorizationChecker,
      currentUserChecker: async (action: Action) => {
        const req = action.request;
        return (req as any).user;
      },
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      },
      validation: {
        whitelist: true,
        forbidNonWhitelisted: true,
      },
      routePrefix: "/api",
      defaultErrorHandler: false,
    });

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};
