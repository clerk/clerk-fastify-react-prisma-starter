import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { getUserApartments, getApartmentById, updateApartment } from "@cfrp/db";
import { clerkPreHandler } from "../auth/clerkHandler";
import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { FastifyRequest } from "fastify";

const UserRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get(
    "/user/apartments", // @ts-ignore
    { preHandler: clerkPreHandler() },
    async (request: WithAuthProp<FastifyRequest<any>>, reply) => {
      const {userId} = request.auth;
      const userApartments = await getUserApartments(userId as string);
      return reply.send(userApartments);
    }
  );

  server.post(
    "/user/forego", // @ts-ignore
    { preHandler: clerkPreHandler() },
    async (request: WithAuthProp<FastifyRequest<any>>, reply) => {
      const {userId} = request.auth;
      const apartmentId = JSON.parse(request.body as string).apartmentId;
      const apartmentToForego = await getApartmentById(apartmentId);

      if (!apartmentToForego || userId !== apartmentToForego.claimedBy) {
        reply.status(401);
        return reply.send({ error: "Apartment not found" });
      }

      await updateApartment(apartmentId, { claimedBy: null });
      return reply.send({ success: true });
    }
  );
};

export default fp(UserRoutes);
