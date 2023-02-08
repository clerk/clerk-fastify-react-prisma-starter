import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { getApartments, claimApartment } from "@cfrp/db";
import { clerkPreHandler } from "../auth/clerkHandler";
import { getAuth } from "@clerk/fastify";

const ApartmentRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get("/apartments", {}, async (_, reply) => {
    const apartments = await getApartments();
    return reply.send(apartments);
  });

  server.post(
    "/apartments/claim",
    {
      preHandler: clerkPreHandler,
    },
    async (request, reply) => {
      const auth = getAuth(request);
      const userId = auth.userId as string;
      const apartmentId = JSON.parse(request.body as string).apartmentId;
      const updatedApartment = await claimApartment(apartmentId, userId);

      return reply.send(updatedApartment);
    }
  );
};

export default fp(ApartmentRoutes);
