import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const ypf = await prisma.cliente.create({
    data: {
      nombre: "YPF",
    },
  });

  const tecpetrol = await prisma.cliente.create({
    data: {
      nombre: "Tecpetrol",
    },
  });

  const equipo1 = await prisma.equipo.create({
    data: {
      tag: "PT-101",
      descripcion: "Transmisor de Presión",
      ubicacion: "Planta Norte",
      fechaUltimaCalibracion: new Date("2025-01-15"),
      frecuenciaMeses: 6,
      clienteId: ypf.id,
    },
  });

  const equipo2 = await prisma.equipo.create({
    data: {
      tag: "TT-201",
      descripcion: "Transmisor de Temperatura",
      ubicacion: "Compresor 3",
      fechaUltimaCalibracion: new Date("2025-03-01"),
      frecuenciaMeses: 12,
      clienteId: tecpetrol.id,
    },
  });

  await prisma.calibracion.create({
    data: {
      fecha: new Date("2025-01-15"),
      tecnico: "Luis Martinez",
      resultado: "OK",
      observaciones: "Calibración dentro de tolerancia",
      equipoId: equipo1.id,
    },
  });

  await prisma.calibracion.create({
    data: {
      fecha: new Date("2025-03-01"),
      tecnico: "Juan Perez",
      resultado: "Ajustado",
      observaciones: "Se detectó desviación de 1.5%",
      equipoId: equipo2.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });