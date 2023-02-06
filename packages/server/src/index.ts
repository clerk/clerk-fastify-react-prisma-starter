import dotenv from "dotenv";
dotenv.config();

import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {clerkPlugin} from "@clerk/fastify";
import ApartmentRoutes from "./routes/apartments";
import UserRoutes from "./routes/user";

const server = fastify();

const start = async () => {
  try {
    await server.register(clerkPlugin);
    await server.register(fastifyCors, {
      origin: process.env.CLIENT_ORIGIN,
      allowedHeaders: ["Authorization"],
    });

    await server.register(ApartmentRoutes);
    await server.register(UserRoutes);
    console.log('Listening to port: ', process.env.SERVER_PORT)
    await server.listen({ port: Number(process.env.SERVER_PORT) });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
