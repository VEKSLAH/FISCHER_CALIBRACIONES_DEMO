// import { prisma } from "@/src/lib/prisma";
// import { Cliente, Prisma } from "@prisma/client/edge";

// type EquipoConCliente = Prisma.EquipoGetPayload<{
//   include: {
//     cliente: true;
//   };
// }>;

// type CalibracionConEquipo = Prisma.CalibracionGetPayload<{
//   include: {
//     equipo: true;
//   };
// }>;

// export default async function Home() {
//   const clientes: Cliente[] = await prisma.cliente.findMany();

//   const equipos: EquipoConCliente[] = await prisma.equipo.findMany({
//     include: {
//       cliente: true,
//     },
//   });

//   const totalClientes = clientes.length;
//   const totalEquipos = equipos.length;

//   const calibraciones: CalibracionConEquipo[] =
//     await prisma.calibracion.findMany({
//       include: {
//         equipo: true,
//       },
//       orderBy: {
//         fecha: "desc",
//       },
//     });

//   const totalCalibraciones = await prisma.calibracion.count();

//   const hoy = new Date();

//   const vencidos = equipos.filter((equipo) => {
//     const proxima = new Date(equipo.fechaUltimaCalibracion);

//     proxima.setMonth(proxima.getMonth() + equipo.frecuenciaMeses);

//     return proxima < hoy;
//   }).length;

//   const proximos = equipos.filter((equipo) => {
//     const proxima = new Date(equipo.fechaUltimaCalibracion);

//     proxima.setMonth(proxima.getMonth() + equipo.frecuenciaMeses);

//     const diferencia =
//       (proxima.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);

//     return diferencia >= 0 && diferencia <= 30;
//   }).length;

//   const alDia = totalEquipos - vencidos - proximos;

//   function obtenerEstado(equipo: EquipoConCliente) {
//     const hoy = new Date();

//     const proxima = new Date(equipo.fechaUltimaCalibracion);

//     proxima.setMonth(proxima.getMonth() + equipo.frecuenciaMeses);

//     const dias = (proxima.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);

//     if (dias < 0) return "🔴 Vencido";

//     if (dias <= 30) return "🟡 Próximo";

//     return "🟢 Al día";
//   }

//   function obtenerProximaCalibracion(equipo: EquipoConCliente) {
//     const proxima = new Date(equipo.fechaUltimaCalibracion);

//     proxima.setMonth(proxima.getMonth() + equipo.frecuenciaMeses);

//     return proxima.toLocaleDateString("es-AR");
//   }

//   return (
//     <main className="min-h-screen p-8 bg-slate-100">
//       <h1 className="text-4xl font-bold mb-8">
//         Sistema de Gestión de Calibraciones
//       </h1>

//       {/* KPI */}
//       <div className="grid grid-cols-6 gap-4 mb-8">
//         <div className="bg-white rounded-xl shadow p-4">
//           <p className="text-gray-500">Clientes</p>

//           <h2 className="text-3xl font-bold">{totalClientes}</h2>
//         </div>

//         <div className="bg-white rounded-xl shadow p-4">
//           <p className="text-gray-500">Equipos</p>

//           <h2 className="text-3xl font-bold">{totalEquipos}</h2>
//         </div>

//         <div className="bg-white rounded-xl shadow p-4">
//           <p className="text-gray-500">Calibraciones</p>

//           <h2 className="text-3xl font-bold">{totalCalibraciones}</h2>
//         </div>

//         <div className="bg-white rounded-xl shadow p-4">
//           <p className="text-gray-500">Vencidos</p>

//           <h2 className="text-3xl font-bold">{vencidos}</h2>
//         </div>

//         <div className="bg-white rounded-xl shadow p-4">
//           <p className="text-gray-500">Próximos</p>

//           <h2 className="text-3xl font-bold">{proximos}</h2>
//         </div>

//         <div className="bg-white rounded-xl shadow p-4">
//           <p className="text-gray-500">Al Día</p>

//           <h2 className="text-3xl font-bold">{alDia}</h2>
//         </div>
//       </div>

//       {/* CLIENTES */}
//       <div className="bg-white rounded-xl shadow p-6 mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Clientes</h2>

//         <table className="w-full">
//           <thead>
//             <tr className="border-b">
//               <th className="text-left py-2">ID</th>

//               <th className="text-left py-2">Nombre</th>
//             </tr>
//           </thead>

//           <tbody>
//             {clientes.map((cliente) => (
//               <tr key={cliente.id} className="border-b">
//                 <td className="py-2">{cliente.id}</td>

//                 <td className="py-2">{cliente.nombre}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* EQUIPOS */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h2 className="text-2xl font-semibold mb-4">Equipos</h2>

//         <table className="w-full">
//           <thead>
//             <tr className="border-b">
//               <th className="text-left py-2">Tag</th>

//               <th className="text-left py-2">Descripción</th>

//               <th className="text-left py-2">Cliente</th>

//               <th className="text-left py-2">Estado</th>

//               <th className="text-left py-2">Próxima Calibración</th>
//               <th className="text-left py-2">Ubicación</th>
//             </tr>
//           </thead>

//           <tbody>
//             {equipos.map((equipo) => (
//               <tr key={equipo.id} className="border-b">
//                 <td className="py-2">{equipo.tag}</td>

//                 <td className="py-2">{equipo.descripcion}</td>

//                 <td className="py-2">{equipo.cliente.nombre}</td>

//                 <td className="py-2">{obtenerEstado(equipo)}</td>

//                 <td className="py-2">{obtenerProximaCalibracion(equipo)}</td>

//                 <td className="py-2">{equipo.ubicacion}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/*  */}
//       <div className="bg-white rounded-xl shadow p-6 mt-8">
//         <h2 className="text-2xl font-semibold mb-4">
//           Historial de Calibraciones
//         </h2>

//         <table className="w-full">
//           <thead>
//             <tr className="border-b">
//               <th className="text-left py-2">Fecha</th>

//               <th className="text-left py-2">Equipo</th>

//               <th className="text-left py-2">Técnico</th>

//               <th className="text-left py-2">Resultado</th>
//             </tr>
//           </thead>

//           <tbody>
//             {calibraciones.map((cal) => (
//               <tr key={cal.id} className="border-b">
//                 <td className="py-2">
//                   {new Date(cal.fecha).toLocaleDateString("es-AR")}
//                 </td>

//                 <td className="py-2">{cal.equipo.tag}</td>

//                 <td className="py-2">{cal.tecnico}</td>

//                 <td className="py-2">{cal.resultado}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// }

import { prisma } from "@/src/lib/prisma";
import { Cliente, Prisma } from "@prisma/client/edge";
import FischerLogo from "./componets/fischerLogo";

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
      return <span className="font-semibold text-red-600">🔴 Vencido</span>;
    }

    if (dias <= 30) {
      return <span className="font-semibold text-amber-600">🟡 Próximo</span>;
    }

    return <span className="font-semibold text-emerald-600">🟢 Al día</span>;
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
        <div className="bg-[#003B49] rounded-[32px] p-10 text-white shadow-2xl mb-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <FischerLogo className="w-16 h-16" />

                <div>
                  <p className="text-[#B6E05A] font-semibold uppercase tracking-widest">
                    Fischer Instrumentación y Control
                  </p>

                  <p className="text-slate-300">Demo Técnica</p>
                </div>
              </div>

              <h1 className="text-5xl font-bold mb-3">
                Centro de Control de Calibraciones
              </h1>

              <p className="text-slate-300 text-lg max-w-2xl">
                Seguimiento de instrumentos, vencimientos, trazabilidad y
                control operativo para clientes industriales.
              </p>

              <div className="flex gap-3 mt-6">
                <span className="bg-[#B6E05A] text-black px-3 py-1 rounded-full text-sm font-medium">
                  PostgreSQL
                </span>

                <span className="bg-[#B6E05A] text-black px-3 py-1 rounded-full text-sm font-medium">
                  Prisma
                </span>

                <span className="bg-[#B6E05A] text-black px-3 py-1 rounded-full text-sm font-medium">
                  Next.js
                </span>

                <span className="bg-[#B6E05A] text-black px-3 py-1 rounded-full text-sm font-medium">
                  TypeScript
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
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
          <h2 className="text-3xl font-bold text-[#003B49] mb-1">
            Instrumentos en Servicio
          </h2>

          <p className="text-slate-500 mb-6">
            Estado operativo y planificación de calibraciones
          </p>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Tag</th>
                <th>Descripción</th>
                <th>Ubicación</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Próxima Calibración</th>
              </tr>
            </thead>

            <tbody>
              {equipos.map((equipo) => (
                <tr key={equipo.id} className="border-b hover:bg-slate-50">
                  <td className="py-4 font-semibold">{equipo.tag}</td>

                  <td>{equipo.descripcion}</td>

                  <td>{equipo.ubicacion}</td>

                  <td>{equipo.cliente.nombre}</td>

                  <td>{obtenerEstado(equipo)}</td>

                  <td>{obtenerProximaCalibracion(equipo)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* HISTORIAL */}
        <div className="bg-white rounded-[32px] shadow-xl p-8">
          <h2 className="text-3xl font-bold text-[#003B49] mb-1">
            Trazabilidad Histórica
          </h2>

          <p className="text-slate-500 mb-6">
            Registro de intervenciones y calibraciones realizadas
          </p>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Fecha</th>
                <th>Equipo</th>
                <th>Técnico</th>
                <th>Resultado</th>
                <th>Observaciones</th>
              </tr>
            </thead>

            <tbody>
              {calibraciones.map((cal) => (
                <tr key={cal.id} className="border-b hover:bg-slate-50">
                  <td className="py-4">
                    {new Date(cal.fecha).toLocaleDateString("es-AR")}
                  </td>

                  <td className="font-semibold">{cal.equipo.tag}</td>

                  <td>{cal.tecnico}</td>

                  <td>{cal.resultado}</td>

                  <td>{cal.observaciones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
