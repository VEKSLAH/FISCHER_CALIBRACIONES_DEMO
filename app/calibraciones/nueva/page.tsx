export const dynamic = "force-dynamic";

import { prisma } from "@/src/lib/prisma";
import { crearCalibracion } from "@/src/actions/calibraciones";
import Link from "next/link";

export default async function NuevaCalibracionPage() {
  const equipos = await prisma.equipo.findMany({
    include: {
      cliente: true,
    },
  });

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-4xl mx-auto p-8">

        {/* HEADER */}
        <div className="bg-[#003B49] rounded-[32px] p-8 text-white shadow-2xl mb-8">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-[#B6E05A] uppercase tracking-widest text-sm font-semibold">
                Fischer Instrumentación y Control
              </p>

              <h1 className="text-4xl font-bold mt-2">
                Registrar Calibración
              </h1>

              <p className="text-slate-300 mt-2">
                Registro y trazabilidad de intervenciones.
              </p>
            </div>

            <Link
              href="/"
              className="bg-white text-[#003B49] px-5 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
            >
              ← Dashboard
            </Link>

          </div>

        </div>

        {/* FORM */}
        <div className="bg-white rounded-[32px] shadow-xl p-8">

          <form
            action={crearCalibracion}
            className="space-y-6"
          >

            {/* EQUIPO */}
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Equipo
              </label>

              <select
                name="equipoId"
                required
                className="w-full border border-slate-300 rounded-xl p-3"
              >
                {equipos.map((equipo) => (
                  <option
                    key={equipo.id}
                    value={equipo.id}
                  >
                    {equipo.tag} - {equipo.descripcion}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Fecha
                </label>

                <input
                  name="fecha"
                  type="date"
                  required
                  className="w-full border border-slate-300 rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Técnico
                </label>

                <input
                  name="tecnico"
                  type="text"
                  required
                  placeholder="Luis Zarate"
                  className="w-full border border-slate-300 rounded-xl p-3"
                />
              </div>

            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Resultado
              </label>

              <select
                name="resultado"
                required
                className="w-full border border-slate-300 rounded-xl p-3"
              >
                <option value="Aprobado">
                  Aprobado
                </option>

                <option value="Requiere Ajuste">
                  Requiere Ajuste
                </option>

                <option value="Fuera de Servicio">
                  Fuera de Servicio
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Observaciones
              </label>

              <textarea
                name="observaciones"
                rows={4}
                className="w-full border border-slate-300 rounded-xl p-3"
                placeholder="Observaciones de la calibración..."
              />
            </div>

            <div className="pt-4 border-t">

              <button
                type="submit"
                className="bg-[#003B49] hover:bg-[#002F3A] text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
              >
                Guardar Calibración
              </button>

            </div>

          </form>

        </div>

      </div>
    </main>
  );
}