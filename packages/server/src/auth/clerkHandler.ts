import { withSession } from "@clerk/clerk-sdk-node";

export function clerkPreHandler() {
  // @ts-ignore
  return withSession((request, reply, done) => {
    if (!request.session) {
      reply.status(401);
      reply.end({ error: "User could not be verified" });
    }
  });
}
