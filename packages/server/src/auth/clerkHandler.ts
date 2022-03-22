import { withAuth, WithAuthProp } from "@clerk/clerk-sdk-node";
import { FastifyRequest } from "fastify";

export function clerkPreHandler() {
  return withAuth((request: WithAuthProp<FastifyRequest<any>>, reply: any) => {
    const {sessionId} = request.auth;
    if (!sessionId) {
      reply.status(401);
      reply.end(  { error: "User could not be verified" });
    }
  });
}

