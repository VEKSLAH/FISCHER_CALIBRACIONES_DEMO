export const dynamic = "force-dynamic";

import { prisma } from "@/src/lib/prisma";
import { crearEquipo } from "@/src/actions/equipos";
import Link from "next/link";

export default async function NuevoEquipoPage() {
  const clientes = await prisma.cliente.findMany();

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
                Nuevo Equipo
              </h1>

              <p className="text-slate-300 mt-2">
                Alta de instrumentos para gestión y seguimiento de calibraciones.
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

        {/* FORMULARIO */}
        <div className="bg-white rounded-[32px] shadow-xl p-8">

          <form
            action={crearEquipo}
            className="space-y-6"
          >

            <div className="grid md:grid-cols-2 gap-6">

              {/* TAG */}
              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Tag
                </label>

                <input
                  name="tag"
                  type="text"
                  required
                  placeholder="PT-101"
                  className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#B6E05A]"
                />
              </div>

              {/* CLIENTE */}
              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Cliente
                </label>

                <select
                  name="clienteId"
                  required
                  className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#B6E05A]"
                >
                  {clientes.map((cliente) => (
                    <option
                      key={cliente.id}
                      value={cliente.id}
                    >
                      {cliente.nombre}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* DESCRIPCIÓN */}
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Descripción
              </label>

              <input
                name="descripcion"
                type="text"
                required
                placeholder="Transmisor de Presión"
                className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#B6E05A]"
              />
            </div>

            {/* UBICACIÓN */}
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Ubicación
              </label>

              <input
                name="ubicacion"
                type="text"
                placeholder="Planta Norte - Sector Compresión"
                className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#B6E05A]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {/* FRECUENCIA */}
              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Frecuencia de Calibración
                </label>

                <input
                  name="frecuenciaMeses"
                  type="number"
                  defaultValue={12}
                  required
                  className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#B6E05A]"
                />
              </div>

              {/* FECHA */}
              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Última Calibración
                </label>

                <input
                  name="fechaUltimaCalibracion"
                  type="date"
                  required
                  className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#B6E05A]"
                />
              </div>

            </div>

            <div className="pt-4 border-t">

              <button
                type="submit"
                className="bg-[#003B49] hover:bg-[#002F3A] text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
              >
                Guardar Equipo
              </button>

            </div>

          </form>

        </div>

      </div>
    </main>
  );
}