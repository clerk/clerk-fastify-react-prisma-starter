import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { getUserApartments, getApartmentById, updateApartment } from "@cfrp/db";
import { clerkPreHandler } from "../auth/clerkHandler";

const UserRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get(
    "/user/apartments", // @ts-ignore
    { preHandler: clerkPreHandler() },
    async (request, reply) => {
      const userId = request.session?.userId as string;
      const userApartments = await getUserApartments(userId);

      return reply.send(userApartments);
    }
  );

  server.post(
    "/user/forego", // @ts-ignore
    { preHandler: clerkPreHandler() },
    async (request, reply) => {
      const userId = request.session?.userId as string;
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
