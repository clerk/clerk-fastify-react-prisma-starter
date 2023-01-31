import { withAuth, WithAuthProp } from "@clerk/clerk-sdk-node";
import { FastifyRequest, FastifyReply } from "fastify";

export function clerkPreHandler(req: FastifyRequest, reply: FastifyReply) {
  return withAuth((request: any, reply: any) => {
    const { sessionId } = request.auth;

    if (!sessionId) {
      reply.status(401);
      reply.send({ error: "User could not be verified" });
    }
  })(req.raw, reply.raw);
}
