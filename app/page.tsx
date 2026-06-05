import { prisma } from "@/src/lib/prisma";
import { Cliente, Prisma } from "@prisma/client/edge";
import FischerLogo from "./componets/fischerLogo";
import Link from "next/link";

type EquipoConCliente = Prisma.EquipoGetPayload<{
  include: {
    cliente: true;
  };
}>;

type CalibracionConEquipo = Prisma.CalibracionGetPayload<{
  include: {
    equipo: true;
  };
}>;

export default async function Home() {
  const clientes: Cliente[] = await prisma.cliente.findMany();

  const equipos: EquipoConCliente[] = await prisma.equipo.findMany({
    include: {
      cliente: true,
    },
  });

  const calibraciones: CalibracionConEquipo[] =
    await prisma.calibracion.findMany({
      include: {
        equipo: true,
      },
      orderBy: {
        fecha: "desc",
      },
    });

  const totalClientes = clientes.length;
  const totalEquipos = equipos.length;
  const totalCalibraciones = calibraciones.length;

  const hoy = new Date();

  const vencidos = equipos.filter((equipo) => {
    const proxima = new Date(equipo.fechaUltimaCalibracion);

    proxima.setMonth(proxima.getMonth() + equipo.frecuenciaMeses);

    return proxima < hoy;
  }).length;

  const proximos = equipos.filter((equipo) => {
    const proxima = new Date(equipo.fechaUltimaCalibracion);

    proxima.setMonth(proxima.getMonth() + equipo.frecuenciaMeses);

    const diferencia =
      (proxima.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);

    return diferencia >= 0 && diferencia <= 30;
  }).length;

  const alDia = totalEquipos - vencidos - proximos;

  function obtenerEstado(equipo: EquipoConCliente) {
    const hoy = new Date();

    const proxima = new Date(equipo.fechaUltimaCalibracion);

    proxima.setMonth(proxima.getMonth() + equipo.frecuenciaMeses);

    const dias = (proxima.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);

    if (dias < 0) {
      return (
        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
          Vencido
        </span>
      );
    }

    if (dias <= 30) {
      return (
        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
          Próximo
        </span>
      );
    }

    return (
      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
        Al día
      </span>
    );
  }

  function obtenerProximaCalibracion(equipo: EquipoConCliente) {
    const proxima = new Date(equipo.fechaUltimaCalibracion);

    proxima.setMonth(proxima.getMonth() + equipo.frecuenciaMeses);

    return proxima.toLocaleDateString("es-AR");
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-8">
        {/* HERO */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#003B49] via-[#004958] to-[#003B49] rounded-[32px] p-8 text-white shadow-2xl mb-8">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#B6E05A]/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* IZQUIERDA */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <FischerLogo className="w-12 h-12" />

                  <div>
                    <p className="text-[#B6E05A] text-xs font-semibold uppercase tracking-[0.25em]">
                      Fischer Instrumentación y Control
                    </p>

                    <p className="text-slate-300 text-sm">
                      Plataforma de Gestión de Calibraciones
                    </p>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Centro de Control de Calibraciones
                </h1>

                <p className="text-slate-300 max-w-2xl">
                  Seguimiento de instrumentos, vencimientos, trazabilidad y
                  control operativo.
                </p>
              </div>

              {/* DERECHA */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/equipos/nuevo"
                  className="bg-[#B6E05A] hover:bg-[#c6ee6c] text-black px-5 py-3 rounded-xl font-semibold transition"
                >
                  + Nuevo Equipo
                </Link>

                <Link
                  href="/calibraciones/nueva"
                  className="bg-white text-[#003B49] hover:bg-slate-100 px-5 py-3 rounded-xl font-semibold transition"
                >
                  + Registrar Calibración
                </Link>
              </div>
            </div>

            {/* KPIs rápidos */}
            <div className="flex flex-wrap gap-8 mt-6 pt-6 border-t border-white/10">
              <div>
                <p className="text-slate-400 text-xs uppercase">Clientes</p>

                <p className="text-2xl font-bold">{totalClientes}</p>
              </div>

              <div>
                <p className="text-slate-400 text-xs uppercase">Equipos</p>

                <p className="text-2xl font-bold">{totalEquipos}</p>
              </div>

              <div>
                <p className="text-slate-400 text-xs uppercase">
                  Calibraciones
                </p>

                <p className="text-2xl font-bold">{totalCalibraciones}</p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg border-l-8 border-[#B6E05A]">
            <p className="text-gray-500">Clientes</p>

            <h2 className="text-5xl font-bold text-[#003B49] mt-2">
              {totalClientes}
            </h2>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-lg border-l-8 border-[#B6E05A]">
            <p className="text-gray-500">Equipos</p>

            <h2 className="text-5xl font-bold text-[#003B49] mt-2">
              {totalEquipos}
            </h2>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-lg border-l-8 border-[#B6E05A]">
            <p className="text-gray-500">Calibraciones</p>

            <h2 className="text-5xl font-bold text-[#003B49] mt-2">
              {totalCalibraciones}
            </h2>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-lg border-l-8 border-red-500">
            <p className="text-gray-500">Vencidos</p>

            <h2 className="text-5xl font-bold text-red-600 mt-2">{vencidos}</h2>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-lg border-l-8 border-amber-500">
            <p className="text-gray-500">Próximos</p>

            <h2 className="text-5xl font-bold text-amber-600 mt-2">
              {proximos}
            </h2>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-lg border-l-8 border-emerald-500">
            <p className="text-gray-500">Al Día</p>

            <h2 className="text-5xl font-bold text-emerald-600 mt-2">
              {alDia}
            </h2>
          </div>
        </div>

        {/* EQUIPOS */}
        <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#003B49] mb-1">
                Instrumentos en Servicio
              </h2>

              <p className="text-slate-500">
                Estado operativo y planificación de calibraciones
              </p>
            </div>

            <span className="mt-3 md:mt-0 bg-slate-100 px-4 py-2 rounded-xl text-sm font-medium">
              {equipos.length} registros
            </span>
          </div>

          <div className="max-h-[450px] overflow-y-auto overflow-x-auto overscroll-y-contain rounded-xl border border-slate-200">
            <table className="table-auto w-full text-sm align-middle">
              <thead className="sticky top-0 bg-slate-50 z-10 shadow-sm">
                <tr className="border-b text-left">
                  <th className="px-4 py-4 whitespace-nowrap">Tag</th>
                  <th className="px-4 py-4 whitespace-nowrap">Descripción</th>
                  <th className="px-4 py-4 whitespace-nowrap">Ubicación</th>
                  <th className="px-4 py-4 whitespace-nowrap">Cliente</th>
                  <th className="px-4 py-4 whitespace-nowrap">Estado</th>
                  <th className="px-4 py-4 whitespace-nowrap">
                    Próxima Calibración
                  </th>
                </tr>
              </thead>

              <tbody>
                {equipos.map((equipo) => (
                  <tr
                    key={equipo.id}
                    className="border-b hover:bg-[#B6E05A]/10 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap font-semibold">
                      {equipo.tag}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {equipo.descripcion}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {equipo.ubicacion}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {equipo.cliente.nombre}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {obtenerEstado(equipo)}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {obtenerProximaCalibracion(equipo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HISTORIAL */}
        <div className="bg-white rounded-[32px] shadow-xl p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#003B49] mb-1">
                Trazabilidad Histórica
              </h2>

              <p className="text-slate-500">
                Registro de intervenciones y calibraciones realizadas
              </p>
            </div>

            <span className="mt-3 md:mt-0 bg-slate-100 px-4 py-2 rounded-xl text-sm font-medium">
              {calibraciones.length} registros
            </span>
          </div>

          <div className="max-h-[350px] overflow-y-auto overflow-x-auto overscroll-y-contain rounded-xl border border-slate-200">
            <table className="table-auto w-full text-sm align-middle">
              <thead className="sticky top-0 bg-slate-50 z-10 shadow-sm">
                <tr className="border-b text-left">
                  <th className="px-4 py-4 whitespace-nowrap">Fecha</th>
                  <th className="px-4 py-4 whitespace-nowrap">Equipo</th>
                  <th className="px-4 py-4 whitespace-nowrap">Técnico</th>
                  <th className="px-4 py-4 whitespace-nowrap">Resultado</th>
                  <th className="px-4 py-4 whitespace-nowrap">Observaciones</th>
                </tr>
              </thead>

              <tbody>
                {calibraciones.map((cal) => (
                  <tr
                    key={cal.id}
                    className="border-b hover:bg-[#B6E05A]/10 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      {new Date(cal.fecha).toLocaleDateString("es-AR")}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap font-semibold">
                      {cal.equipo.tag}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {cal.tecnico}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {cal.resultado}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {cal.observaciones}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
