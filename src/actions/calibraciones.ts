"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function crearCalibracion(formData: FormData) {
  const equipoId = Number(formData.get("equipoId"));

  const fecha = new Date(formData.get("fecha") as string);

  const tecnico = formData.get("tecnico") as string;

  const resultado = formData.get("resultado") as string;

  const observaciones = formData.get("observaciones") as string;

  await prisma.calibracion.create({
    data: {
      equipoId,
      fecha,
      tecnico,
      resultado,
      observaciones,
    },
  });

  if (resultado === "Aprobado") {
    await prisma.equipo.update({
      where: {
        id: equipoId,
      },
      data: {
        fechaUltimaCalibracion: fecha,
      },
    });
  }

  revalidatePath("/");

  redirect("/");
}