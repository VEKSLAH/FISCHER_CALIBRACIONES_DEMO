"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function crearEquipo(
  formData: FormData
) {
  const tag = formData.get("tag") as string;

  const descripcion =
    formData.get("descripcion") as string;

  const ubicacion =
    formData.get("ubicacion") as string;

  const clienteId = Number(
    formData.get("clienteId")
  );

  const frecuenciaMeses = Number(
    formData.get("frecuenciaMeses")
  );

  const fechaUltimaCalibracion =
    new Date(
      formData.get(
        "fechaUltimaCalibracion"
      ) as string
    );

  await prisma.equipo.create({
    data: {
      tag,
      descripcion,
      ubicacion,
      clienteId,
      frecuenciaMeses,
      fechaUltimaCalibracion,
    },
  });

  revalidatePath("/");

  redirect("/");
}