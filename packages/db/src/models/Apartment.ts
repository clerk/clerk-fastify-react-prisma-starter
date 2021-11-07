import type { Prisma } from ".prisma/client";
import prisma from "../index";

export async function getApartments() {
  return await prisma.apartment.findMany();
}

export async function claimApartment(id: string, userId: string) {
  return await prisma.apartment.update({
    where: { id },
    data: { claimedBy: userId },
  });
}

export async function getUserApartments(userId: string) {
  return await prisma.apartment.findMany({ where: { claimedBy: userId } });
}

export async function getApartmentById(id: string) {
  return await prisma.apartment.findUnique({ where: { id } });
}

export async function updateApartment(
  id: string,
  data: Prisma.ApartmentUpdateInput
) {
  return await prisma.apartment.update({
    where: { id },
    data,
  });
}
