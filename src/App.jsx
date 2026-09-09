import React, { useState, useMemo, useRef, useEffect } from "react";
import { supabase } from "./supabaseClient";
import {
  CreditCard,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Filter,
  ShoppingBag,
  Utensils,
  Car,
  Home,
  Heart,
  Zap,
  Film,
  MoreHorizontal,
  Search,
  Menu,
  X,
  LayoutDashboard,
  Wallet,
  Receipt,
  LineChart,
  Settings,
  GripVertical,
  Plus,
  PiggyBank,
  DollarSign,
  Landmark,
  Lock,
  Delete,
  ShieldCheck,
  TrendingDown,
  RefreshCw,
  CheckCircle2,
  Clock,
  Moon,
  Tag,
  User,
  Pencil,
  Check,
  Calculator,
  Smartphone,
  Copy,
  ExternalLink,
  MessageCircle,
  HandCoins,
  PieChart,
  Sliders,
  Sparkles,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

// ---------- Datos de ejemplo (reemplazar con datos reales del Excel) ----------

const TARJETAS = [
  {
    id: "visa-ariel",
    nombre: "VISA ARIEL",
    banco: "Banco Galicia",
    titular: "Ariel",
    ultimos4: "4821",
    saldo: 187430,
    limite: 450000,
    gradiente: "from-[#1E3A8A] via-[#1E40AF] to-[#312E81]",
    vencimiento: "12/28",
  },
  {
    id: "visa-cielo",
    nombre: "VISA CIELO",
    banco: "Banco Galicia",
    titular: "Cielo",
    ultimos4: "7734",
    saldo: 94210,
    limite: 300000,
    gradiente: "from-[#7C2D12] via-[#9A3412] to-[#78350F]",
    vencimiento: "03/27",
  },
  {
    id: "cabal-cielo",
    nombre: "CABAL CIELO",
    banco: "Banco Provincia",
    titular: "Cielo",
    ultimos4: "1092",
    saldo: 52680,
    limite: 200000,
    gradiente: "from-[#134E4A] via-[#115E59] to-[#0F766E]",
    vencimiento: "07/27",
  },
  {
    id: "cabal-ariel",
    nombre: "CABAL ARIEL",
    banco: "Banco Provincia",
    titular: "Ariel",
    ultimos4: "5563",
    saldo: 138900,
    limite: 350000,
    gradiente: "from-[#581C87] via-[#6B21A8] to-[#3B0764]",
    vencimiento: "09/28",
  },
];

const CATEGORIAS = {
  supermercado: { label: "Supermercado", icon: ShoppingBag, color: "#2DD4BF" },
  comida: { label: "Restaurantes", icon: Utensils, color: "#FB923C" },
  transporte: { label: "Transporte", icon: Car, color: "#60A5FA" },
  hogar: { label: "Hogar", icon: Home, color: "#A78BFA" },
  salud: { label: "Salud", icon: Heart, color: "#F472B6" },
  servicios: { label: "Servicios", icon: Zap, color: "#FBBF24" },
  ocio: { label: "Ocio", icon: Film, color: "#4ADE80" },
  otros: { label: "Otros", icon: MoreHorizontal, color: "#94A3B8" },
};

const TRANSACCIONES = [
  { id: 1, tarjeta: "visa-ariel", comercio: "Carrefour", categoria: "supermercado", monto: 38450, fecha: "28 ago", cuotas: null },
  { id: 2, tarjeta: "visa-cielo", comercio: "Netflix", categoria: "ocio", monto: 4990, fecha: "27 ago", cuotas: null },
  { id: 3, tarjeta: "cabal-ariel", comercio: "YPF", categoria: "transporte", monto: 22100, fecha: "26 ago", cuotas: null },
  { id: 4, tarjeta: "visa-ariel", comercio: "Farmacity", categoria: "salud", monto: 15680, fecha: "25 ago", cuotas: null },
  { id: 5, tarjeta: "cabal-cielo", comercio: "Easy Hogar", categoria: "hogar", monto: 67300, fecha: "24 ago", cuotas: "3/6" },
  { id: 6, tarjeta: "visa-cielo", comercio: "La Cabrera", categoria: "comida", monto: 29800, fecha: "23 ago", cuotas: null },
  { id: 7, tarjeta: "visa-ariel", comercio: "Edenor", categoria: "servicios", monto: 18200, fecha: "22 ago", cuotas: null },
  { id: 8, tarjeta: "cabal-ariel", comercio: "Sodimac", categoria: "hogar", monto: 94500, fecha: "20 ago", cuotas: "2/12" },
  { id: 9, tarjeta: "visa-ariel", comercio: "Coto", categoria: "supermercado", monto: 41200, fecha: "19 ago", cuotas: null },
  { id: 10, tarjeta: "cabal-cielo", comercio: "Cinemark", categoria: "ocio", monto: 8900, fecha: "17 ago", cuotas: null },
  { id: 11, tarjeta: "visa-cielo", comercio: "Farmacia del Sol", categoria: "salud", monto: 6300, fecha: "16 ago", cuotas: null },
  { id: 12, tarjeta: "visa-ariel", comercio: "Uber", categoria: "transporte", monto: 5400, fecha: "15 ago", cuotas: null },
];

// ---------- Sistema de diseño ----------
// Paleta copiada de la referencia: teal + violeta, fondo gris muy claro, cards blancas.
// Los "acentos" (colores semánticos) son fijos; bg/surface/text/muted cambian con el modo oscuro.
const ACCENTS = {
  gold: "#0F766E", // acento primario (teal) — se mantiene el nombre de key "gold" para no romper referencias
  goldSoft: "rgba(15,118,110,0.10)",
  blue: "#6366F1", // acento secundario (violeta/índigo)
  purple: "#6366F1",
  purpleSoft: "rgba(99,102,241,0.12)",
  green: "#16A34A",
  greenSoft: "rgba(22,163,74,0.12)",
  orange: "#F59E0B",
  orangeSoft: "rgba(245,158,11,0.12)",
  danger: "#EF4444",
  redSoft: "rgba(239,68,68,0.12)",
};

const PALETA_CLARA = {
  bg: "#F1F5F9",
  surface: "#FFFFFF",
  surfaceBorder: "rgba(15,23,42,0.08)",
  text: "#0F172A",
  muted: "#64748B",
};

const PALETA_OSCURA = {
  bg: "#0B1220",
  surface: "#131C2E",
  surfaceBorder: "rgba(255,255,255,0.08)",
  text: "#F1F5F9",
  muted: "#94A3B8",
};

function FontImport() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
      .ff-display { font-family: 'Poppins', sans-serif; }
      .ff-body { font-family: 'Inter', sans-serif; }
      .tabular { font-variant-numeric: tabular-nums; }
      .scrollbar-thin::-webkit-scrollbar { height: 6px; width: 6px; }
      .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
      .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(15,23,42,0.15); border-radius: 999px; }
      .scrollbar-thin { scrollbar-width: thin; scrollbar-color: rgba(15,23,42,0.15) transparent; }
    `}</style>
  );
}

// ---------- Detalle de tarjetas: meses visibles y cargos de ejemplo ----------

const MESES = ["Ago 2026", "Sep 2026", "Oct 2026", "Nov 2026", "Dic 2026", "Ene 2027", "Feb 2027", "Mar 2027", "Abr 2027"];

const CARGOS_INICIALES = {
  "visa-ariel": [
    { id: "c1", nombre: "Spotify", monto: 7500, cuotaTotal: null },
    { id: "c2", nombre: "Netflix", monto: 15600, cuotaTotal: null },
    { id: "c3", nombre: "MERPAGO*MELI", monto: 20990, cuotaTotal: null },
    { id: "c4", nombre: "Seguro Auto", monto: 139930, cuotaTotal: null },
    { id: "c5", nombre: "Play", monto: 62500, cuotaTotal: 5 },
    { id: "c6", nombre: "Lavarropas", monto: 45833, cuotaTotal: 6 },
  ],
  "visa-cielo": [
    { id: "c7", nombre: "Gimnasio", monto: 22000, cuotaTotal: null },
    { id: "c8", nombre: "iCloud", monto: 3200, cuotaTotal: null },
    { id: "c9", nombre: "Celular nuevo", monto: 58900, cuotaTotal: 12 },
  ],
  "cabal-cielo": [
    { id: "c10", nombre: "Seguro Hogar", monto: 42712, cuotaTotal: null },
    { id: "c11", nombre: "Tv Cocina", monto: 17500, cuotaTotal: 5 },
  ],
  "cabal-ariel": [
    { id: "c12", nombre: "Bonacorsi", monto: 16454, cuotaTotal: null },
    { id: "c13", nombre: "Notebook", monto: 94500, cuotaTotal: 12 },
    { id: "c14", nombre: "Colchón", monto: 38200, cuotaTotal: 3 },
  ],
};

// Valor de un cargo en un mes dado: recurrente se repite desde que arranca,
// con cuotas se apaga al terminar. Respeta el mes de inicio de cada cargo
// (antes de eso, o después de terminar, no aparece).
function valorCargoEnMes(cargo, mesIndex) {
  const inicio = cargo.mesInicio || 0;
  if (mesIndex < inicio) return null;
  if (cargo.cuotaTotal == null) return cargo.monto;
  return mesIndex < inicio + cargo.cuotaTotal ? cargo.monto : null;
}

// Suma de todos los cargos de una tarjeta en un mes dado (para el total que alimenta Gastos Mensuales).
function totalTarjetaEnMes(cargosTarjeta, mesIndex) {
  return (cargosTarjeta || []).reduce((acc, c) => acc + (valorCargoEnMes(c, mesIndex) || 0), 0);
}

const fmt = (n) =>
  n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

const fmtUSD = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const fmtMoneda = (n, moneda) => (moneda === "USD" ? fmtUSD(n) : fmt(n));

const SECCIONES = [
  { id: "dashboard", label: "Panel de Control", icon: LayoutDashboard },
  { id: "ingresos", label: "Ingresos", icon: HandCoins },
  { id: "tarjetas", label: "Cuotas de Tarjetas", icon: CreditCard },
  { id: "gastos", label: "Gastos Mensuales", icon: PieChart },
  { id: "calculos", label: "Cálculos Adicionales", icon: Calculator },
  { id: "inversion", label: "Inversión", icon: LineChart },
  { id: "configuracion", label: "Configuración", icon: Sliders },
];

// ---------- Componente principal ----------

export default function FinanzasFamiliares() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const TOKENS = { ...ACCENTS, ...(modoOscuro ? PALETA_OSCURA : PALETA_CLARA) };

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("dashboard");
  const [cardIndex, setCardIndex] = useState(0);
  const [filtroTarjeta, setFiltroTarjeta] = useState("todas");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const [mesIndex, setMesIndex] = useState(1); // arranca en "Sep 2026" (mes actual del sistema)

  // ---- Detalle de tarjetas ----
  const [cargosPorTarjeta, setCargosPorTarjeta] = useState(CARGOS_INICIALES);
  const [saldosTarjetas, setSaldosTarjetas] = useState({}); // { [tarjetaId]: saldo } — viene de la tabla "tarjetas", mantenida por tu trigger
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [arrastrando, setArrastrando] = useState(null); // { tarjetaId, cargoId }
  const [editando, setEditando] = useState(null); // "tarjetaId:cargoId:campo"
  const [modalNuevaCarga, setModalNuevaCarga] = useState(false);
  const [formCarga, setFormCarga] = useState({
    tarjetaId: TARJETAS[0].id,
    tipo: "cuotas", // "cuotas" | "recurrente"
    descripcion: "",
    montoTotal: "",
    cantidadCuotas: "",
    mesInicio: 1,
  });

  const valorEnMes = valorCargoEnMes;

  // ---- Categorías de Gastos (Configuración → se reflejan acá agrupando la lista) ----
  const [categorias, setCategorias] = useState([
    { id: "cat-debitos", nombre: "Débitos", color: TOKENS.blue, fijo: true },
    { id: "cat-pagos", nombre: "Pagos Directos", color: TOKENS.orange, fijo: true },
    { id: "cat-transferencias", nombre: "Transferencias", color: TOKENS.green, fijo: true },
    { id: "cat-tarjetas", nombre: "Tarjetas de crédito", color: TOKENS.gold, fijo: true },
  ]);
  const [formCategoria, setFormCategoria] = useState({ nombre: "", color: "#0F766E" });

  // ============================================================
  // Carga inicial desde Supabase (una sola vez al montar) + siembra:
  // si las tablas están vacías (primera vez que corre la app),
  // insertamos los datos de ejemplo que ya veníamos usando.
  // ============================================================
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Saldo real de cada tarjeta (columna mantenida por tu trigger de Postgres)
        const { data: tarjetasDb } = await supabase.from("tarjetas").select("id, saldo");
        if (tarjetasDb && tarjetasDb.length > 0) {
          const saldos = {};
          tarjetasDb.forEach((t) => (saldos[t.id] = Number(t.saldo) || 0));
          setSaldosTarjetas(saldos);
        }

        // Categorías
        const { data: catsDb } = await supabase.from("categorias_gasto").select("*");
        if (catsDb && catsDb.length > 0) {
          setCategorias(catsDb.map((c) => ({ id: c.id, nombre: c.nombre, color: c.color, fijo: c.fijo })));
        } else {
          const catsIniciales = [
            { id: "cat-debitos", nombre: "Débitos", color: TOKENS.blue, fijo: true },
            { id: "cat-pagos", nombre: "Pagos Directos", color: TOKENS.orange, fijo: true },
            { id: "cat-transferencias", nombre: "Transferencias", color: TOKENS.green, fijo: true },
            { id: "cat-tarjetas", nombre: "Tarjetas de crédito", color: TOKENS.gold, fijo: true },
          ];
          await supabase.from("categorias_gasto").insert(catsIniciales);
        }

        // Cargos de tarjeta
        const { data: cargosDb } = await supabase.from("cargos_tarjeta").select("*").order("orden");
        if (cargosDb && cargosDb.length > 0) {
          const agrupados = {};
          TARJETAS.forEach((t) => (agrupados[t.id] = []));
          cargosDb.forEach((c) => {
            if (!agrupados[c.tarjeta_id]) agrupados[c.tarjeta_id] = [];
            agrupados[c.tarjeta_id].push({ id: c.id, nombre: c.nombre, monto: Number(c.monto), cuotaTotal: c.cuota_total, mesInicio: c.mes_inicio || 0 });
          });
          setCargosPorTarjeta(agrupados);
        } else {
          const filas = [];
          Object.entries(CARGOS_INICIALES).forEach(([tarjetaId, lista]) => {
            lista.forEach((c, i) =>
              filas.push({ id: c.id, tarjeta_id: tarjetaId, nombre: c.nombre, monto: c.monto, cuota_total: c.cuotaTotal, orden: i })
            );
          });
          await supabase.from("cargos_tarjeta").insert(filas);
        }

        // Gastos mensuales
        const { data: gastosDb } = await supabase.from("gastos_mensuales").select("*");
        if (gastosDb && gastosDb.length > 0) {
          setGastosMensuales(
            gastosDb.map((g) => ({
              id: g.id,
              nombre: g.nombre,
              monto: Number(g.monto),
              esTarjeta: g.es_tarjeta,
              tarjetaId: g.tarjeta_id,
              categoriaId: g.categoria_id,
              pagado: g.pagado,
            }))
          );
        } else {
          const iniciales = TARJETAS.map((t) => ({
            id: `gm-${t.id}`,
            tarjeta_id: t.id,
            nombre: t.nombre,
            monto: totalTarjetaEnMes(CARGOS_INICIALES[t.id], 0),
            es_tarjeta: true,
            categoria_id: "cat-tarjetas",
            pagado: false,
          }));
          await supabase.from("gastos_mensuales").insert(iniciales);
        }
      } catch (err) {
        console.error("Error cargando datos de Supabase, se sigue con los datos locales:", err);
      } finally {
        setCargandoDatos(false);
      }
    };
    cargarDatos();
  }, []);

  const agregarCategoria = () => {
    if (!formCategoria.nombre.trim()) return;
    const nueva = { id: `cat${Date.now()}`, nombre: formCategoria.nombre.trim(), color: formCategoria.color, fijo: true };
    setCategorias((prev) => [...prev, nueva]);
    setFormCategoria({ nombre: "", color: "#0F766E" });
    supabase.from("categorias_gasto").insert(nueva).then(({ error }) => {
      if (error) console.error("Error guardando categoría:", error);
    });
  };

  const toggleFijoCategoria = (id) => {
    let nuevoValor;
    setCategorias((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          nuevoValor = !c.fijo;
          return { ...c, fijo: nuevoValor };
        }
        return c;
      })
    );
    supabase.from("categorias_gasto").update({ fijo: nuevoValor }).eq("id", id).then(({ error }) => {
      if (error) console.error("Error actualizando categoría:", error);
    });
  };

  const eliminarCategoria = (id) => {
    setCategorias((prev) => prev.filter((c) => c.id !== id));
    // Por decisión tuya: al borrar una categoría, se borran también los gastos que tenía adentro.
    setGastosMensuales((prev) => prev.filter((g) => g.categoriaId !== id));
    supabase.from("categorias_gasto").delete().eq("id", id).then(({ error }) => {
      if (error) console.error("Error eliminando categoría:", error);
    });
    supabase.from("gastos_mensuales").delete().eq("categoria_id", id).then(({ error }) => {
      if (error) console.error("Error eliminando gastos de la categoría:", error);
    });
  };

  // ---- Apps Móviles (Configuración) ----
  const [enlacesApps, setEnlacesApps] = useState({
    ariel: "https://finanzas-ariel.netlify.app",
    cielo: "https://finanzas-cielo.netlify.app",
  });
  const [editandoEnlace, setEditandoEnlace] = useState(null); // "ariel" | "cielo" | null
  const [copiado, setCopiado] = useState(null); // "ariel" | "cielo" | null — feedback temporal

  const actualizarEnlaceApp = (persona, valor) => {
    setEnlacesApps((prev) => ({ ...prev, [persona]: valor }));
  };

  const copiarEnlaceApp = async (persona) => {
    const link = enlacesApps[persona];
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // si el navegador bloquea el portapapeles, seguimos sin romper la UI
    }
    setCopiado(persona);
    setTimeout(() => setCopiado(null), 2000);
  };

  const compartirEnlaceApp = (persona) => {
    const link = enlacesApps[persona];
    window.open(`https://wa.me/?text=${encodeURIComponent(link)}`, "_blank", "noopener,noreferrer");
  };

  // ---- Gastos Mensuales ----
  // Lista plana que se repite igual todos los meses: arranca con el total de
  // cada tarjeta (tomado de "Tarjetas") y a partir de ahí es 100% editable —
  // se puede agregar, eliminar y modificar cualquier ítem. Cada gasto pertenece
  // a una categoría (definida en Configuración), que es lo que arma los grupos.
  const [gastosMensuales, setGastosMensuales] = useState(() =>
    TARJETAS.map((t) => ({
      id: `gm-${t.id}`,
      tarjetaId: t.id,
      nombre: t.nombre,
      monto: totalTarjetaEnMes(CARGOS_INICIALES[t.id], 0),
      esTarjeta: true,
      categoriaId: "cat-tarjetas",
      pagado: false,
    }))
  );
  const [editandoGasto, setEditandoGasto] = useState(null); // "gastoId:campo"
  const [modalNuevoGasto, setModalNuevoGasto] = useState(false);
  const [formGasto, setFormGasto] = useState({ nombre: "", monto: "", categoriaId: "cat-pagos" });

  const actualizarCampoGastoMensual = (gastoId, campo, valor) => {
    setGastosMensuales((prev) => prev.map((g) => (g.id === gastoId ? { ...g, [campo]: valor } : g)));
    supabase.from("gastos_mensuales").update({ [campo]: valor }).eq("id", gastoId).then(({ error }) => {
      if (error) console.error("Error actualizando gasto mensual:", error);
    });
  };

  const togglePagadoGasto = (gastoId) => {
    let nuevoValor;
    setGastosMensuales((prev) =>
      prev.map((g) => {
        if (g.id === gastoId) {
          nuevoValor = !g.pagado;
          return { ...g, pagado: nuevoValor };
        }
        return g;
      })
    );
    supabase.from("gastos_mensuales").update({ pagado: nuevoValor }).eq("id", gastoId).then(({ error }) => {
      if (error) console.error("Error actualizando pagado:", error);
    });
  };

  const eliminarGastoMensual = (gastoId) => {
    setGastosMensuales((prev) => prev.filter((g) => g.id !== gastoId));
    supabase.from("gastos_mensuales").delete().eq("id", gastoId).then(({ error }) => {
      if (error) console.error("Error eliminando gasto mensual:", error);
    });
  };

  const agregarGastoMensual = () => {
    if (!formGasto.nombre.trim() || !formGasto.monto) return;
    const nuevo = {
      id: `gm${Date.now()}`,
      nombre: formGasto.nombre.trim(),
      monto: Number(formGasto.monto),
      esTarjeta: false,
      categoriaId: formGasto.categoriaId,
      pagado: false,
    };
    setGastosMensuales((prev) => [...prev, nuevo]);
    supabase
      .from("gastos_mensuales")
      .insert({
        id: nuevo.id,
        nombre: nuevo.nombre,
        monto: nuevo.monto,
        es_tarjeta: false,
        categoria_id: nuevo.categoriaId,
        pagado: false,
      })
      .then(({ error }) => {
        if (error) console.error("Error guardando gasto mensual:", error);
      });
    setFormGasto({ nombre: "", monto: "", categoriaId: formGasto.categoriaId });
    setModalNuevoGasto(false);
  };

  // ---- Ingresos ----
  // Cada persona guarda un valor de sueldo POR MES: al aplicar un aumento, se
  // propaga desde el mes elegido hacia adelante, pero los meses anteriores
  // quedan intactos con lo que tenían.
  const [sueldos, setSueldos] = useState({
    ariel: { titular: "Ariel", montosPorMes: Array(MESES.length).fill(850000), aumentoPorc: "", aumentosPorMes: {} },
    cielo: { titular: "Cielo", montosPorMes: Array(MESES.length).fill(620000), aumentoPorc: "", aumentosPorMes: {} },
  });
  const [editandoSueldo, setEditandoSueldo] = useState(null); // "ariel" | "cielo" | null
  const [editandoAumento, setEditandoAumento] = useState(null); // "ariel" | "cielo" | null — toggle del lápiz

  const actualizarSueldoMonto = (persona, valor) => {
    setSueldos((prev) => {
      const s = prev[persona];
      const nuevos = [...s.montosPorMes];
      nuevos[mesIndex] = valor; // corrige solo el mes que se está viendo
      return { ...prev, [persona]: { ...s, montosPorMes: nuevos } };
    });
  };

  const actualizarAumentoPorc = (persona, valor) => {
    setSueldos((prev) => ({ ...prev, [persona]: { ...prev[persona], aumentoPorc: valor } }));
  };

  const aplicarAumento = (persona) => {
    setSueldos((prev) => {
      const s = prev[persona];
      const porc = Number(s.aumentoPorc);
      if (!porc) return prev;
      const montoAnterior = s.montosPorMes[mesIndex];
      const nuevoMonto = Math.round(montoAnterior * (1 + porc / 100));
      const nuevosMontos = [...s.montosPorMes];
      for (let i = mesIndex; i < nuevosMontos.length; i++) nuevosMontos[i] = nuevoMonto; // se propaga hacia adelante
      return {
        ...prev,
        [persona]: {
          ...s,
          montosPorMes: nuevosMontos,
          aumentosPorMes: { ...s.aumentosPorMes, [mesIndex]: { porc, anterior: montoAnterior, nuevo: nuevoMonto } },
          aumentoPorc: "",
        },
      };
    });
    setEditandoAumento(null);
  };

  // ---- Otros ingresos (además de los sueldos de Ariel y Cielo) ----
  const [ingresosExtra, setIngresosExtra] = useState([]); // { id, nombre, monto }
  const [modalNuevoIngreso, setModalNuevoIngreso] = useState(false);
  const [formIngreso, setFormIngreso] = useState({ nombre: "", monto: "" });
  const [editandoIngresoExtra, setEditandoIngresoExtra] = useState(null); // "id:campo"

  const actualizarCampoIngresoExtra = (id, campo, valor) => {
    setIngresosExtra((prev) => prev.map((ig) => (ig.id === id ? { ...ig, [campo]: valor } : ig)));
  };

  const eliminarIngresoExtra = (id) => {
    setIngresosExtra((prev) => prev.filter((ig) => ig.id !== id));
  };

  const agregarIngresoExtra = () => {
    if (!formIngreso.nombre.trim() || !formIngreso.monto) return;
    setIngresosExtra((prev) => [...prev, { id: `ig${Date.now()}`, nombre: formIngreso.nombre.trim(), monto: Number(formIngreso.monto) }]);
    setFormIngreso({ nombre: "", monto: "" });
    setModalNuevoIngreso(false);
  };

  // ---- Cálculos Adicionales (persistido en localStorage) ----
  // Cada cuadro: { id, titulo, montoInicial, filas: [{ id, descripcion, importe }] }
  const LS_KEY_CALCULOS = "finanzas_familiares_calculos_adicionales_v1";

  const [calculosAdicionales, setCalculosAdicionales] = useState(() => {
    try {
      if (typeof window === "undefined") return [];
      const guardado = window.localStorage.getItem(LS_KEY_CALCULOS);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LS_KEY_CALCULOS, JSON.stringify(calculosAdicionales));
      }
    } catch {
      // si falla (por ejemplo, localStorage deshabilitado), seguimos igual en memoria
    }
  }, [calculosAdicionales]);

  const agregarCuadroCalculo = () => {
    setCalculosAdicionales((prev) => [
      ...prev,
      { id: `calc${Date.now()}`, titulo: "Nuevo cálculo", montoInicial: 0, filas: [] },
    ]);
  };

  const eliminarCuadroCalculo = (cuadroId) => {
    setCalculosAdicionales((prev) => prev.filter((c) => c.id !== cuadroId));
  };

  const actualizarCuadroCalculo = (cuadroId, campo, valor) => {
    setCalculosAdicionales((prev) => prev.map((c) => (c.id === cuadroId ? { ...c, [campo]: valor } : c)));
  };

  const agregarFilaCalculo = (cuadroId) => {
    setCalculosAdicionales((prev) =>
      prev.map((c) =>
        c.id === cuadroId
          ? { ...c, filas: [...c.filas, { id: `fila${Date.now()}`, descripcion: "", importe: 0 }] }
          : c
      )
    );
  };

  const actualizarFilaCalculo = (cuadroId, filaId, campo, valor) => {
    setCalculosAdicionales((prev) =>
      prev.map((c) =>
        c.id === cuadroId
          ? { ...c, filas: c.filas.map((f) => (f.id === filaId ? { ...f, [campo]: valor } : f)) }
          : c
      )
    );
  };

  const eliminarFilaCalculo = (cuadroId, filaId) => {
    setCalculosAdicionales((prev) =>
      prev.map((c) => (c.id === cuadroId ? { ...c, filas: c.filas.filter((f) => f.id !== filaId) } : c))
    );
  };

  // ---- Inversión ----
  const [inversiones, setInversiones] = useState([
    { id: "inv1", nombre: "Dólares en fondos comunes", moneda: "USD", monto: 2500, icono: "fondo" },
    { id: "inv2", nombre: "Pesos en fondo común", moneda: "ARS", monto: 850000, icono: "fondo" },
    { id: "inv3", nombre: "Dólares en custodia", moneda: "USD", monto: 4000, icono: "custodia" },
    { id: "inv4", nombre: "Plazo fijo", moneda: "ARS", monto: 600000, icono: "plazo" },
    { id: "inv5", nombre: "Acciones / CEDEARs", moneda: "USD", monto: 1200, icono: "acciones" },
  ]);
  const [editandoInversion, setEditandoInversion] = useState(null); // "id:campo"
  const [modalNuevaInversion, setModalNuevaInversion] = useState(false);
  const [formInversion, setFormInversion] = useState({ nombre: "", moneda: "USD", monto: "" });

  const actualizarCampoInversion = (id, campo, valor) => {
    setInversiones((prev) => prev.map((inv) => (inv.id === id ? { ...inv, [campo]: valor } : inv)));
  };

  const cambiarMonedaInversion = (id) => {
    setInversiones((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, moneda: inv.moneda === "USD" ? "ARS" : "USD" } : inv))
    );
  };

  const eliminarInversion = (id) => {
    setInversiones((prev) => prev.filter((inv) => inv.id !== id));
  };

  const agregarInversion = () => {
    if (!formInversion.nombre.trim() || !formInversion.monto) return;
    setInversiones((prev) => [
      ...prev,
      {
        id: `inv${Date.now()}`,
        nombre: formInversion.nombre.trim(),
        moneda: formInversion.moneda,
        monto: Number(formInversion.monto),
        icono: "otro",
      },
    ]);
    setFormInversion({ nombre: "", moneda: "USD", monto: "" });
    setModalNuevaInversion(false);
  };



  const moverCargo = (tarjetaId, desdeId, haciaId) => {
    setCargosPorTarjeta((prev) => {
      const lista = [...prev[tarjetaId]];
      const desdeIdx = lista.findIndex((c) => c.id === desdeId);
      const haciaIdx = lista.findIndex((c) => c.id === haciaId);
      if (desdeIdx === -1 || haciaIdx === -1) return prev;
      const [item] = lista.splice(desdeIdx, 1);
      lista.splice(haciaIdx, 0, item);
      // Actualiza el "orden" de todos los cargos de esa tarjeta en Supabase
      lista.forEach((c, i) => {
        supabase.from("cargos_tarjeta").update({ orden: i }).eq("id", c.id).then(({ error }) => {
          if (error) console.error("Error reordenando cargo:", error);
        });
      });
      return { ...prev, [tarjetaId]: lista };
    });
  };

  const eliminarCargo = (tarjetaId, cargoId) => {
    setCargosPorTarjeta((prev) => ({
      ...prev,
      [tarjetaId]: prev[tarjetaId].filter((c) => c.id !== cargoId),
    }));
    supabase.from("cargos_tarjeta").delete().eq("id", cargoId).then(({ error }) => {
      if (error) console.error("Error eliminando cargo:", error);
    });
  };

  const actualizarCampoCargo = (tarjetaId, cargoId, campo, valor) => {
    setCargosPorTarjeta((prev) => ({
      ...prev,
      [tarjetaId]: prev[tarjetaId].map((c) =>
        c.id === cargoId ? { ...c, [campo]: valor } : c
      ),
    }));
    const campoDb = campo === "cuotaTotal" ? "cuota_total" : campo; // nombre | monto
    supabase.from("cargos_tarjeta").update({ [campoDb]: valor }).eq("id", cargoId).then(({ error }) => {
      if (error) console.error("Error actualizando cargo:", error);
    });
  };

  // Cada tabla de tarjeta guarda su propio contenedor scrolleable acá
  const refsTablas = useRef({});

  // Al cambiar el mes del selector global, desplazamos cada tabla de Tarjetas
  // para que el mes elegido quede pegado a la columna fija de la izquierda.
  useEffect(() => {
    Object.values(refsTablas.current).forEach((el) => {
      if (!el) return;
      const ths = el.querySelectorAll("thead th");
      const stickyTh = ths[0];
      const targetTh = ths[mesIndex + 1];
      if (stickyTh && targetTh) {
        const stickyWidth = stickyTh.getBoundingClientRect().width;
        el.scrollTo({ left: targetTh.offsetLeft - stickyWidth, behavior: "smooth" });
      }
    });
  }, [mesIndex, seccionActiva]);


  const cuotaMensualCalculada =
    formCarga.tipo === "cuotas" && Number(formCarga.montoTotal) > 0 && Number(formCarga.cantidadCuotas) > 0
      ? Number(formCarga.montoTotal) / Number(formCarga.cantidadCuotas)
      : null;

  const agregarCarga = () => {
    if (!formCarga.descripcion.trim() || !formCarga.montoTotal) return;
    const esCuotas = formCarga.tipo === "cuotas";
    const cuotas = esCuotas ? Number(formCarga.cantidadCuotas) || 1 : null;
    const montoPorMes = esCuotas ? Number(formCarga.montoTotal) / cuotas : Number(formCarga.montoTotal);
    const mesInicio = Number(formCarga.mesInicio) || 0;

    const nuevo = {
      id: `c${Date.now()}`,
      nombre: formCarga.descripcion.trim(),
      monto: montoPorMes,
      cuotaTotal: cuotas,
      mesInicio,
    };
    setCargosPorTarjeta((prev) => ({
      ...prev,
      [formCarga.tarjetaId]: [...(prev[formCarga.tarjetaId] || []), nuevo],
    }));
    supabase
      .from("cargos_tarjeta")
      .insert({
        id: nuevo.id,
        tarjeta_id: formCarga.tarjetaId,
        nombre: nuevo.nombre,
        monto: nuevo.monto,
        cuota_total: nuevo.cuotaTotal,
        mes_inicio: mesInicio,
        orden: (cargosPorTarjeta[formCarga.tarjetaId] || []).length,
      })
      .then(({ error }) => {
        if (error) console.error("Error guardando cargo:", error);
      });
    setFormCarga({ tarjetaId: formCarga.tarjetaId, tipo: "cuotas", descripcion: "", montoTotal: "", cantidadCuotas: "", mesInicio });
    setModalNuevaCarga(false);
  };

  const totalDeuda = TARJETAS.reduce((acc, t) => acc + t.saldo, 0);
  const totalLimite = TARJETAS.reduce((acc, t) => acc + t.limite, 0);
  const usoGlobal = Math.round((totalDeuda / totalLimite) * 100);

  const datosCategorias = useMemo(() => {
    const acc = {};
    TRANSACCIONES.forEach((t) => {
      acc[t.categoria] = (acc[t.categoria] || 0) + t.monto;
    });
    return Object.entries(acc)
      .map(([key, value]) => ({
        key,
        name: CATEGORIAS[key].label,
        value,
        color: CATEGORIAS[key].color,
      }))
      .sort((a, b) => b.value - a.value);
  }, []);

  const totalGastado = datosCategorias.reduce((acc, c) => acc + c.value, 0);

  const transaccionesFiltradas = useMemo(() => {
    return TRANSACCIONES.filter((t) => {
      if (filtroTarjeta !== "todas" && t.tarjeta !== filtroTarjeta) return false;
      if (filtroCategoria !== "todas" && t.categoria !== filtroCategoria) return false;
      if (busqueda && !t.comercio.toLowerCase().includes(busqueda.toLowerCase())) return false;
      return true;
    });
  }, [filtroTarjeta, filtroCategoria, busqueda]);

  const tarjetaActiva = TARJETAS[cardIndex];

  // ---- Cálculos para el Dashboard ----
  const gastosTarjetasEnMes = (i) =>
    TARJETAS.reduce((acc, t) => acc + totalTarjetaEnMes(cargosPorTarjeta[t.id], i), 0);
  const gastosFijosMensuales = gastosMensuales.filter((g) => !g.esTarjeta).reduce((acc, g) => acc + g.monto, 0);
  // Suma del campo "saldo" de la tabla tarjetas — se mantiene solo con tu trigger de Postgres
  // cada vez que se inserta un cargo, así que este es el total real y actualizado de las 4 tarjetas.
  const sumaSaldosTarjetas = Object.values(saldosTarjetas).reduce((acc, s) => acc + (Number(s) || 0), 0);

  const ingresoArielMes = sueldos.ariel.montosPorMes[mesIndex];
  const ingresoCieloMes = sueldos.cielo.montosPorMes[mesIndex];
  const totalIngresosExtra = ingresosExtra.reduce((acc, ig) => acc + ig.monto, 0);
  const ingresosTotalesMes = ingresoArielMes + ingresoCieloMes + totalIngresosExtra;
  const gastosTarjetasMes = sumaSaldosTarjetas;
  const gastosTotalesMes = gastosTarjetasMes + gastosFijosMensuales;
  const ahorroProyectado = ingresosTotalesMes - gastosTotalesMes;
  const pagadoMes = gastosMensuales.filter((g) => g.pagado).reduce((acc, g) => acc + g.monto, 0);
  const pendienteMes = gastosTotalesMes - pagadoMes;
  const ahorroReal = ingresosTotalesMes - pagadoMes;
  const aporteAriel = ingresosTotalesMes > 0 ? gastosTotalesMes * (ingresoArielMes / ingresosTotalesMes) : 0;
  const aporteCielo = ingresosTotalesMes > 0 ? gastosTotalesMes * (ingresoCieloMes / ingresosTotalesMes) : 0;

  const coloresDona = [TOKENS.gold, TOKENS.blue, TOKENS.green, TOKENS.orange, "#5EEAD4"];
  const datosDona = [
    ...TARJETAS.map((t) => ({ name: t.nombre, value: totalTarjetaEnMes(cargosPorTarjeta[t.id], mesIndex) })),
    { name: "Gastos fijos", value: gastosFijosMensuales },
  ]
    .filter((d) => d.value > 0)
    .map((d, i) => ({ ...d, color: coloresDona[i % coloresDona.length] }));
  const totalDona = datosDona.reduce((acc, d) => acc + d.value, 0);

  const datosIngresosVsAportes = [
    { name: "Ariel", Ingreso: ingresoArielMes, Aporte: aporteAriel },
    { name: "Cielo", Ingreso: ingresoCieloMes, Aporte: aporteCielo },
  ];

  const datosComparativaMensual = MESES.map((m, i) => ({
    mes: m.split(" ")[0],
    Ingresos: sueldos.ariel.montosPorMes[i] + sueldos.cielo.montosPorMes[i],
    Gastos: gastosTarjetasEnMes(i) + gastosFijosMensuales,
  }));

  // ---- Seguridad: PIN de 4 dígitos ----
  const [pin, setPin] = useState("1234");
  const [desbloqueado, setDesbloqueado] = useState(false);
  const [pinIngresado, setPinIngresado] = useState("");
  const [pinError, setPinError] = useState(false);

  const ingresarDigitoPin = (d) => {
    if (pinError) setPinError(false);
    setPinIngresado((prev) => {
      if (prev.length >= 4) return prev;
      const nuevo = prev + d;
      if (nuevo.length === 4) {
        if (nuevo === pin) {
          setTimeout(() => setDesbloqueado(true), 120);
        } else {
          setTimeout(() => {
            setPinError(true);
            setPinIngresado("");
          }, 300);
        }
      }
      return nuevo;
    });
  };

  const borrarDigitoPin = () => {
    setPinError(false);
    setPinIngresado((prev) => prev.slice(0, -1));
  };

  // ---- Configuración: cambiar PIN ----
  const [formPin, setFormPin] = useState({ actual: "", nuevo: "", confirmar: "" });
  const [mensajePin, setMensajePin] = useState(null); // { tipo: "ok" | "error", texto }

  const cambiarPin = () => {
    if (formPin.actual !== pin) {
      setMensajePin({ tipo: "error", texto: "El PIN actual no es correcto." });
      return;
    }
    if (!/^\d{4}$/.test(formPin.nuevo)) {
      setMensajePin({ tipo: "error", texto: "El nuevo PIN debe tener 4 dígitos." });
      return;
    }
    if (formPin.nuevo !== formPin.confirmar) {
      setMensajePin({ tipo: "error", texto: "Los dos PIN nuevos no coinciden." });
      return;
    }
    setPin(formPin.nuevo);
    setFormPin({ actual: "", nuevo: "", confirmar: "" });
    setMensajePin({ tipo: "ok", texto: "PIN actualizado correctamente." });
  };

  // Fila reutilizable dentro de un grupo de Gastos Mensuales (Tarjetas de crédito / Pagos Directos)
  const FilaGastoMensual = ({ g, conBorde }) => (
    <div
      className="flex items-start gap-3 px-4 py-3"
      style={conBorde ? { borderBottom: `1px solid ${TOKENS.surfaceBorder}` } : undefined}
    >
      {/* Checkbox de pagado */}
      <button
        onClick={() => togglePagadoGasto(g.id)}
        className="shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-colors mt-0.5"
        style={
          g.pagado
            ? { background: "#FEF9C3" }
            : { background: "transparent", border: `2px solid ${TOKENS.surfaceBorder}` }
        }
        aria-label={g.pagado ? `Marcar ${g.nombre} como sin pagar` : `Marcar ${g.nombre} como pagado`}
      >
        {g.pagado && <CheckCircle2 size={14} style={{ color: "#CA8A04" }} strokeWidth={3} />}
      </button>

      <div
        className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
        style={{ background: g.esTarjeta ? TOKENS.goldSoft : TOKENS.purpleSoft }}
      >
        {g.esTarjeta ? (
          <CreditCard size={17} style={{ color: TOKENS.gold }} />
        ) : (
          <Receipt size={17} style={{ color: TOKENS.blue }} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          {editandoGasto === `${g.id}:nombre` ? (
            <input
              autoFocus
              type="text"
              value={g.nombre}
              onChange={(e) => actualizarCampoGastoMensual(g.id, "nombre", e.target.value)}
              onBlur={() => setEditandoGasto(null)}
              onKeyDown={(e) => e.key === "Enter" && setEditandoGasto(null)}
              className="text-sm md:text-base font-medium rounded px-1.5 py-0.5 outline-none border w-full"
              style={{ color: TOKENS.text, borderColor: TOKENS.gold, background: TOKENS.bg }}
            />
          ) : (
            <p
              className="text-sm md:text-base font-medium cursor-text rounded px-1 -mx-1 hover:bg-black/5 transition-colors break-words"
              style={{
                color: g.pagado ? TOKENS.muted : TOKENS.text,
                textDecoration: g.pagado ? "line-through" : "none",
              }}
              onClick={() => setEditandoGasto(`${g.id}:nombre`)}
              title="Tocar para editar"
            >
              {g.nombre}
            </p>
          )}
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 tracking-wide"
            style={
              g.pagado
                ? { background: "#FEF9C3", color: "#CA8A04" }
                : g.esTarjeta
                ? { background: TOKENS.goldSoft, color: TOKENS.gold }
                : { background: TOKENS.orangeSoft, color: TOKENS.orange }
            }
          >
            {g.pagado ? "PAGADO" : g.esTarjeta ? "AUTO" : "SIN PAGAR"}
          </span>
        </div>
      </div>

      {editandoGasto === `${g.id}:monto` ? (
        <input
          autoFocus
          type="number"
          defaultValue={g.monto}
          onBlur={(e) => {
            const n = Number(e.target.value);
            if (!isNaN(n) && n >= 0) actualizarCampoGastoMensual(g.id, "monto", n);
            setEditandoGasto(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
            if (e.key === "Escape") setEditandoGasto(null);
          }}
          className="w-24 md:w-32 text-right rounded px-1.5 py-1 text-sm md:text-base outline-none border tabular shrink-0 mt-0.5"
          style={{ color: TOKENS.text, borderColor: TOKENS.gold, background: TOKENS.bg }}
        />
      ) : (
        <span
          className="text-sm md:text-base font-medium tabular shrink-0 cursor-text rounded px-1 hover:bg-black/5 transition-colors mt-0.5"
          style={{
            color: g.pagado ? TOKENS.muted : TOKENS.text,
            textDecoration: g.pagado ? "line-through" : "none",
          }}
          onClick={() => setEditandoGasto(`${g.id}:monto`)}
          title="Tocar para editar"
        >
          {fmt(g.monto)}
        </span>
      )}

      <button
        onClick={() => eliminarGastoMensual(g.id)}
        className="ml-1 mt-1 opacity-40 hover:opacity-90 transition-opacity shrink-0"
        aria-label={`Eliminar ${g.nombre}`}
      >
        <X size={14} style={{ color: TOKENS.muted }} />
      </button>
    </div>
  );

  if (!desbloqueado) {
    return (
      <div
        className="min-h-screen w-full ff-body flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: TOKENS.bg, color: TOKENS.text }}
      >
        <FontImport />
        <div
          className="h-14 w-14 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: TOKENS.gold }}
        >
          <Lock size={24} className="text-white" />
        </div>
        <h1 className="ff-display text-lg font-semibold mb-1" style={{ color: TOKENS.text }}>
          Finanzas Familiar
        </h1>
        <p className="text-sm mb-8" style={{ color: pinError ? TOKENS.danger : TOKENS.muted }}>
          {pinError ? "PIN incorrecto, intentá de nuevo" : "Ingresá tu PIN de 4 dígitos"}
        </p>

        {/* Indicadores de dígitos */}
        <div className="flex gap-4 mb-10">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-3.5 w-3.5 rounded-full transition-colors"
              style={{
                background: i < pinIngresado.length ? (pinError ? TOKENS.danger : TOKENS.gold) : "transparent",
                border: `2px solid ${i < pinIngresado.length ? (pinError ? TOKENS.danger : TOKENS.gold) : TOKENS.surfaceBorder}`,
              }}
            />
          ))}
        </div>

        {/* Teclado numérico */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
            <button
              key={d}
              onClick={() => ingresarDigitoPin(d)}
              className="h-16 rounded-full text-xl font-medium ff-display flex items-center justify-center border transition-colors active:scale-95"
              style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
            >
              {d}
            </button>
          ))}
          <div />
          <button
            onClick={() => ingresarDigitoPin("0")}
            className="h-16 rounded-full text-xl font-medium ff-display flex items-center justify-center border transition-colors active:scale-95"
            style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
          >
            0
          </button>
          <button
            onClick={borrarDigitoPin}
            className="h-16 rounded-full flex items-center justify-center transition-colors active:scale-95"
            style={{ color: TOKENS.muted }}
            aria-label="Borrar"
          >
            <Delete size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full ff-body"
      style={{ backgroundColor: TOKENS.bg, color: TOKENS.text }}
    >
      <FontImport />
      {/* Overlay del menú vertical */}
      {menuAbierto && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          style={{ backdropFilter: "blur(2px)" }}
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* Panel del menú vertical */}
      <aside
        className="fixed top-0 left-0 h-full w-64 z-50 border-r transition-transform duration-300 ease-out"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: TOKENS.surfaceBorder,
          boxShadow: "4px 0 24px rgba(16,23,40,0.06)",
          transform: menuAbierto ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-8">
          <div className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center"
              style={{ background: TOKENS.gold }}
            >
              <Wallet size={15} className="text-white" />
            </div>
            <span className="ff-display font-semibold text-sm" style={{ color: TOKENS.text }}>
              Finanzas Familiar
            </span>
          </div>
          <button
            onClick={() => setMenuAbierto(false)}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={16} style={{ color: TOKENS.muted }} />
          </button>
        </div>
        <nav className="px-3 space-y-1">
          {SECCIONES.map((s) => {
            const Icon = s.icon;
            const activa = seccionActiva === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setSeccionActiva(s.id);
                  setMenuAbierto(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-colors border"
                style={
                  activa
                    ? { background: TOKENS.goldSoft, color: TOKENS.gold, borderColor: "rgba(201,162,75,0.3)" }
                    : { color: TOKENS.muted, borderColor: "transparent" }
                }
              >
                <Icon size={17} />
                <span>{s.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-3 md:px-6 pt-6 pb-24 md:mx-auto">
        {/* Barra superior: logo + nombre de la app + modo oscuro + candado */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="h-11 w-11 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: TOKENS.blue }}
            >
              <Home size={20} className="text-white" />
            </div>
            <div>
              <h1 className="ff-display text-lg font-bold leading-tight" style={{ color: TOKENS.text }}>
                Finanzas Familiar
              </h1>
              <p className="text-xs" style={{ color: TOKENS.muted }}>Gestión Financiera Familiar</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setModoOscuro((v) => !v)}
              className="h-10 w-10 rounded-full flex items-center justify-center border transition-colors"
              style={{ borderColor: TOKENS.surfaceBorder, background: TOKENS.surface }}
              aria-label="Cambiar modo claro/oscuro"
            >
              <Moon size={16} style={{ color: TOKENS.muted }} />
            </button>
            <button
              onClick={() => setDesbloqueado(false)}
              className="h-10 w-10 rounded-full flex items-center justify-center border transition-colors"
              style={{ borderColor: TOKENS.surfaceBorder, background: TOKENS.surface }}
              aria-label="Bloquear app"
            >
              <Lock size={16} style={{ color: TOKENS.muted }} />
            </button>
          </div>
        </div>

        {/* Botón de menú */}
        <button
          onClick={() => setMenuAbierto(true)}
          className="h-10 w-10 rounded-full flex items-center justify-center border transition-colors mb-5"
          style={{ borderColor: TOKENS.surfaceBorder, background: TOKENS.surface }}
          aria-label="Abrir menú"
        >
          <Menu size={16} style={{ color: TOKENS.muted }} />
        </button>

        {/* Título de la sección */}
        <h2 className="ff-display text-[26px] font-bold tracking-tight mb-2" style={{ color: TOKENS.text }}>
          {SECCIONES.find((s) => s.id === seccionActiva)?.label}
        </h2>
        {cargandoDatos && (
          <p className="text-xs mb-3 flex items-center gap-1.5" style={{ color: TOKENS.muted }}>
            <Sparkles size={12} className="animate-pulse" />
            Sincronizando con la base de datos...
          </p>
        )}
        {!cargandoDatos && <div className="mb-5" />}

        {/* Selector de mes — global, afecta todas las secciones */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={() => setMesIndex((i) => Math.max(0, i - 1))}
            disabled={mesIndex === 0}
            className="h-8 w-8 rounded-full flex items-center justify-center border transition-colors disabled:opacity-30"
            style={{ borderColor: TOKENS.surfaceBorder, background: TOKENS.surface }}
            aria-label="Mes anterior"
          >
            <ChevronLeft size={15} style={{ color: TOKENS.muted }} />
          </button>
          <span
            className="ff-display text-sm font-semibold px-4 py-1.5 rounded-full"
            style={{ background: TOKENS.goldSoft, color: TOKENS.gold }}
          >
            {MESES[mesIndex]}
          </span>
          <button
            onClick={() => setMesIndex((i) => Math.min(MESES.length - 1, i + 1))}
            disabled={mesIndex === MESES.length - 1}
            className="h-8 w-8 rounded-full flex items-center justify-center border transition-colors disabled:opacity-30"
            style={{ borderColor: TOKENS.surfaceBorder, background: TOKENS.surface }}
            aria-label="Mes siguiente"
          >
            <ChevronRight size={15} style={{ color: TOKENS.muted }} />
          </button>
        </div>

        {seccionActiva !== "dashboard" && seccionActiva !== "tarjetas" && seccionActiva !== "gastos" && seccionActiva !== "ingresos" && seccionActiva !== "inversion" && seccionActiva !== "configuracion" && seccionActiva !== "calculos" && (
          <div
            className="rounded-3xl p-8 text-center border mt-4"
            style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(16,23,40,0.05)" }}
          >
            {(() => {
              const Icon = SECCIONES.find((s) => s.id === seccionActiva)?.icon;
              return Icon ? <Icon size={28} className="mx-auto mb-3" style={{ color: TOKENS.gold }} /> : null;
            })()}
            <p className="text-sm" style={{ color: TOKENS.text }}>
              Esta sección todavía no está desarrollada.
            </p>
            <p className="text-xs mt-1" style={{ color: TOKENS.muted }}>
              La armamos en el próximo paso.
            </p>
          </div>
        )}

        {seccionActiva === "ingresos" && (
          <div className="mt-2">
            <div className="flex items-start justify-between mb-6 gap-3">
              <div>
                <h2 className="ff-display text-xl font-semibold" style={{ color: TOKENS.text }}>
                  Ingresos
                </h2>
                <p className="text-xs mt-1" style={{ color: TOKENS.muted }}>
                  Tocá el monto o el lápiz para editar. Mes: {MESES[mesIndex]}.
                </p>
              </div>
              <button
                onClick={() => setModalNuevoIngreso(true)}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-white shrink-0 whitespace-nowrap"
                style={{ background: TOKENS.gold }}
              >
                <Plus size={14} /> Agregar ingreso
              </button>
            </div>

            {/* Dos tarjetas de sueldo, estilo "Salario base / Aumento / Proyectado / Aporte" */}
            <div className="space-y-4 mb-6">
              {Object.entries(sueldos).map(([key, s]) => {
                const montoMes = s.montosPorMes[mesIndex];
                const porcPendiente = Number(s.aumentoPorc) || 0;
                const montoAumento = (montoMes * porcPendiente) / 100;
                const salarioProyectado = montoMes + montoAumento;
                const aporteRequerido = key === "ariel" ? aporteAriel : aporteCielo;
                const editandoEsteAumento = editandoAumento === key;

                return (
                  <div
                    key={key}
                    className="rounded-[24px] p-5 border"
                    style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(16,23,40,0.05)" }}
                  >
                    {/* Header: avatar + nombre + lápiz */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-11 w-11 rounded-2xl flex items-center justify-center shrink-0"
                          style={{ background: TOKENS.purpleSoft }}
                        >
                          <User size={20} style={{ color: TOKENS.blue }} />
                        </div>
                        <div>
                          <p className="ff-display text-base font-bold" style={{ color: TOKENS.text }}>{s.titular}</p>
                          <p className="text-xs" style={{ color: TOKENS.muted }}>Ingreso mensual</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditandoAumento(editandoEsteAumento ? null : key)}
                        className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: TOKENS.bg }}
                        aria-label="Editar aumento"
                      >
                        <Pencil size={16} style={{ color: TOKENS.muted }} />
                      </button>
                    </div>

                    {/* Salario base */}
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-sm" style={{ color: TOKENS.muted }}>Salario base</span>
                      {editandoSueldo === key ? (
                        <input
                          autoFocus
                          type="number"
                          defaultValue={montoMes}
                          onBlur={(e) => {
                            const n = Number(e.target.value);
                            if (!isNaN(n) && n >= 0) actualizarSueldoMonto(key, n);
                            setEditandoSueldo(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.blur();
                            if (e.key === "Escape") setEditandoSueldo(null);
                          }}
                          className="w-32 text-right rounded-lg px-2 py-1 text-sm font-semibold border outline-none tabular ff-display"
                          style={{ color: TOKENS.text, borderColor: TOKENS.gold, background: TOKENS.bg }}
                        />
                      ) : (
                        <span
                          className="ff-display tabular text-lg font-bold cursor-text rounded px-1 hover:bg-black/5 transition-colors"
                          style={{ color: TOKENS.text }}
                          onClick={() => setEditandoSueldo(key)}
                          title="Tocar para editar"
                        >
                          {fmt(montoMes)}
                        </span>
                      )}
                    </div>

                    {/* Aumento */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm flex items-center gap-1.5" style={{ color: TOKENS.muted }}>
                        <TrendingUp size={14} style={{ color: TOKENS.blue }} />
                        Aumento {editandoEsteAumento ? "" : `(${porcPendiente || 0}%)`}
                      </span>
                      {editandoEsteAumento ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            autoFocus
                            type="number"
                            step="0.01"
                            value={s.aumentoPorc}
                            onChange={(e) => actualizarAumentoPorc(key, e.target.value)}
                            placeholder="0"
                            className="w-16 text-right rounded-lg px-2 py-1 text-sm border outline-none tabular"
                            style={{ color: TOKENS.text, borderColor: TOKENS.blue, background: TOKENS.bg }}
                          />
                          <span className="text-sm" style={{ color: TOKENS.muted }}>%</span>
                          <button
                            onClick={() => aplicarAumento(key)}
                            disabled={!porcPendiente}
                            className="h-7 w-7 rounded-full flex items-center justify-center disabled:opacity-30 transition-opacity"
                            style={{ background: TOKENS.blue }}
                            aria-label="Aplicar aumento"
                          >
                            <Check size={14} className="text-white" strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <span className="ff-display tabular text-base font-semibold" style={{ color: TOKENS.blue }}>
                          +{fmt(montoAumento)}
                        </span>
                      )}
                    </div>

                    <div className="h-px my-3" style={{ background: TOKENS.surfaceBorder }} />

                    {/* Salario proyectado */}
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-sm font-medium" style={{ color: TOKENS.text }}>Salario proyectado</span>
                      <span className="ff-display tabular text-xl font-bold" style={{ color: TOKENS.gold }}>
                        {fmt(salarioProyectado)}
                      </span>
                    </div>

                    {/* Aporte requerido */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: TOKENS.muted }}>Aporte requerido</span>
                      <span className="ff-display tabular text-base font-semibold" style={{ color: TOKENS.orange }}>
                        {fmt(aporteRequerido)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Otros ingresos */}
            {ingresosExtra.length > 0 && (
              <>
                <h3 className="text-sm font-semibold mb-3" style={{ color: TOKENS.text }}>
                  Otros ingresos <span className="font-normal" style={{ color: TOKENS.muted }}>({ingresosExtra.length})</span>
                </h3>
                <div
                  className="rounded-[24px] border overflow-hidden"
                  style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(15,23,42,0.04)" }}
                >
                  {ingresosExtra.map((ig, i, arr) => (
                    <div
                      key={ig.id}
                      className="flex items-center gap-3 px-4 py-3"
                      style={i < arr.length - 1 ? { borderBottom: `1px solid ${TOKENS.surfaceBorder}` } : undefined}
                    >
                      <div className="h-9 w-9 rounded-full flex items-center justify-center shrink-0" style={{ background: TOKENS.greenSoft }}>
                        <Wallet size={16} style={{ color: TOKENS.green }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        {editandoIngresoExtra === `${ig.id}:nombre` ? (
                          <input
                            autoFocus
                            type="text"
                            value={ig.nombre}
                            onChange={(e) => actualizarCampoIngresoExtra(ig.id, "nombre", e.target.value)}
                            onBlur={() => setEditandoIngresoExtra(null)}
                            onKeyDown={(e) => e.key === "Enter" && setEditandoIngresoExtra(null)}
                            className="text-sm font-medium rounded px-1.5 py-0.5 outline-none border w-full"
                            style={{ color: TOKENS.text, borderColor: TOKENS.gold, background: TOKENS.bg }}
                          />
                        ) : (
                          <p
                            className="text-sm font-medium cursor-text rounded px-1 -mx-1 hover:bg-black/5 transition-colors break-words"
                            style={{ color: TOKENS.text }}
                            onClick={() => setEditandoIngresoExtra(`${ig.id}:nombre`)}
                            title="Tocar para editar"
                          >
                            {ig.nombre}
                          </p>
                        )}
                      </div>
                      {editandoIngresoExtra === `${ig.id}:monto` ? (
                        <input
                          autoFocus
                          type="number"
                          defaultValue={ig.monto}
                          onBlur={(e) => {
                            const n = Number(e.target.value);
                            if (!isNaN(n) && n >= 0) actualizarCampoIngresoExtra(ig.id, "monto", n);
                            setEditandoIngresoExtra(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.blur();
                            if (e.key === "Escape") setEditandoIngresoExtra(null);
                          }}
                          className="w-24 text-right rounded px-1.5 py-1 text-sm outline-none border tabular shrink-0"
                          style={{ color: TOKENS.text, borderColor: TOKENS.gold, background: TOKENS.bg }}
                        />
                      ) : (
                        <span
                          className="text-sm font-medium tabular shrink-0 cursor-text rounded px-1 hover:bg-black/5 transition-colors"
                          style={{ color: TOKENS.text }}
                          onClick={() => setEditandoIngresoExtra(`${ig.id}:monto`)}
                          title="Tocar para editar"
                        >
                          {fmt(ig.monto)}
                        </span>
                      )}
                      <button
                        onClick={() => eliminarIngresoExtra(ig.id)}
                        className="ml-1 opacity-40 hover:opacity-90 transition-opacity shrink-0"
                        aria-label={`Eliminar ${ig.nombre}`}
                      >
                        <X size={14} style={{ color: TOKENS.muted }} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Modal: nuevo ingreso extra */}
        {modalNuevoIngreso && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            style={{ background: "rgba(16,23,40,0.35)" }}
            onClick={() => setModalNuevoIngreso(false)}
          >
            <div
              className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 border"
              style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="ff-display text-base font-semibold" style={{ color: TOKENS.text }}>
                  Nuevo ingreso
                </h3>
                <button
                  onClick={() => setModalNuevoIngreso(false)}
                  className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={16} style={{ color: TOKENS.muted }} />
                </button>
              </div>

              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Descripción</label>
              <input
                type="text"
                value={formIngreso.nombre}
                onChange={(e) => setFormIngreso({ ...formIngreso, nombre: e.target.value })}
                placeholder="Ej: Alquiler que cobramos, Freelance..."
                className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-3 border outline-none"
                style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
              />

              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Monto mensual</label>
              <input
                type="number"
                value={formIngreso.monto}
                onChange={(e) => setFormIngreso({ ...formIngreso, monto: e.target.value })}
                placeholder="0"
                className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-4 border outline-none tabular"
                style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
              />

              <button
                onClick={agregarIngresoExtra}
                className="w-full rounded-full py-3 text-sm font-medium text-white"
                style={{ background: TOKENS.gold }}
              >
                ✓ Guardar
              </button>
            </div>
          </div>
        )}

        {seccionActiva === "gastos" && (
          <div className="mt-2">
            <div className="flex items-start justify-between mb-6 gap-3">
              <div>
                <h2 className="ff-display text-xl font-semibold" style={{ color: TOKENS.text }}>
                  Gastos Mensuales
                </h2>
                <p className="text-xs mt-1" style={{ color: TOKENS.muted }}>
                  Se repiten igual todos los meses. Tocá para editar detalle o monto.
                </p>
              </div>
              <button
                onClick={() => setModalNuevoGasto(true)}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-white shrink-0 whitespace-nowrap"
                style={{ background: TOKENS.gold }}
              >
                <Plus size={14} /> Nuevo Gasto
              </button>
            </div>

            {/* Resumen: Total / Pagado / Pendiente */}
            {(() => {
              const totalGeneral = gastosMensuales.reduce((acc, g) => acc + g.monto, 0);
              const pagadoGeneral = gastosMensuales.filter((g) => g.pagado).reduce((acc, g) => acc + g.monto, 0);
              const pendienteGeneral = totalGeneral - pagadoGeneral;
              const saldoRestanteGeneral = ingresosTotalesMes - totalGeneral;
              return (
                <>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="rounded-2xl px-3 py-3 border text-center" style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder }}>
                      <p className="text-xs mb-1" style={{ color: TOKENS.muted }}>Total</p>
                      <p className="ff-display tabular text-base font-bold" style={{ color: TOKENS.text }}>{fmt(totalGeneral)}</p>
                    </div>
                    <div className="rounded-2xl px-3 py-3 border text-center" style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder }}>
                      <p className="text-xs mb-1" style={{ color: TOKENS.muted }}>Pagado</p>
                      <p className="ff-display tabular text-base font-bold" style={{ color: TOKENS.green }}>{fmt(pagadoGeneral)}</p>
                    </div>
                    <div className="rounded-2xl px-3 py-3 border text-center" style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder }}>
                      <p className="text-xs mb-1" style={{ color: TOKENS.muted }}>Pendiente</p>
                      <p className="ff-display tabular text-base font-bold" style={{ color: TOKENS.orange }}>{fmt(pendienteGeneral)}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="rounded-2xl px-3 py-3 border text-center" style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder }}>
                      <p className="text-xs mb-1" style={{ color: TOKENS.muted }}>Total Ingresos</p>
                      <p className="ff-display tabular text-base font-bold" style={{ color: TOKENS.blue }}>{fmt(ingresosTotalesMes)}</p>
                    </div>
                    <div className="rounded-2xl px-3 py-3 border text-center" style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder }}>
                      <p className="text-xs mb-1" style={{ color: TOKENS.muted }}>Saldo Restante</p>
                      <p
                        className="ff-display tabular text-base font-bold"
                        style={{ color: saldoRestanteGeneral >= 0 ? TOKENS.green : TOKENS.danger }}
                      >
                        {fmt(saldoRestanteGeneral)}
                      </p>
                    </div>
                  </div>
                </>
              );
            })()}

            {gastosMensuales.length === 0 && (
              <div className="text-center py-10 text-sm" style={{ color: TOKENS.muted }}>
                Todavía no hay gastos mensuales cargados
              </div>
            )}

            {/* Un grupo por cada categoría configurada — "Tarjetas de crédito" siempre arriba */}
            {[...categorias]
              .sort((a, b) => (a.id === "cat-tarjetas" ? -1 : b.id === "cat-tarjetas" ? 1 : 0))
              .map((cat) => {
              const items = gastosMensuales.filter((g) => g.categoriaId === cat.id);
              if (items.length === 0) return null;
              return (
                <div key={cat.id} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: cat.color }} />
                    <h3 className="text-sm font-semibold" style={{ color: TOKENS.text }}>
                      {cat.nombre}{" "}
                      <span className="font-normal" style={{ color: TOKENS.muted }}>({items.length})</span>
                    </h3>
                  </div>
                  <div
                    className="rounded-[24px] border overflow-hidden"
                    style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(15,23,42,0.04)" }}
                  >
                    {items.map((g, i, arr) => (
                      <FilaGastoMensual key={g.id} g={g} conBorde={i < arr.length - 1} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: nuevo gasto mensual */}
        {modalNuevoGasto && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            style={{ background: "rgba(16,23,40,0.35)" }}
            onClick={() => setModalNuevoGasto(false)}
          >
            <div
              className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 border"
              style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="ff-display text-base font-semibold" style={{ color: TOKENS.text }}>
                  Nuevo gasto mensual
                </h3>
                <button
                  onClick={() => setModalNuevoGasto(false)}
                  className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={16} style={{ color: TOKENS.muted }} />
                </button>
              </div>

              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Descripción</label>
              <input
                type="text"
                value={formGasto.nombre}
                onChange={(e) => setFormGasto({ ...formGasto, nombre: e.target.value })}
                placeholder="Ej: Alquiler, Colegio, Expensas..."
                className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-3 border outline-none"
                style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
              />

              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Categoría</label>
              <select
                value={formGasto.categoriaId}
                onChange={(e) => setFormGasto({ ...formGasto, categoriaId: e.target.value })}
                className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-3 border outline-none"
                style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
              >
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>

              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Monto mensual</label>
              <input
                type="number"
                value={formGasto.monto}
                onChange={(e) => setFormGasto({ ...formGasto, monto: e.target.value })}
                placeholder="0"
                className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-4 border outline-none tabular"
                style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
              />

              <button
                onClick={agregarGastoMensual}
                className="w-full rounded-full py-3 text-sm font-medium text-white"
                style={{ background: TOKENS.gold }}
              >
                ✓ Guardar
              </button>
            </div>
          </div>
        )}

        {seccionActiva === "calculos" && (
          <div className="mt-2">
            <div className="flex items-start justify-between mb-6 gap-3">
              <div>
                <h2 className="ff-display text-xl font-semibold" style={{ color: TOKENS.text }}>
                  Cálculos Adicionales
                </h2>
                <p className="text-xs mt-1" style={{ color: TOKENS.muted }}>
                  Para fondos puntuales (aguinaldo, bono, etc.). Se guarda en este dispositivo.
                </p>
              </div>
              <button
                onClick={agregarCuadroCalculo}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-white shrink-0 whitespace-nowrap"
                style={{ background: TOKENS.gold }}
              >
                <Plus size={14} /> Nuevo cálculo
              </button>
            </div>

            {calculosAdicionales.length === 0 && (
              <div
                className="text-center py-10 text-sm rounded-2xl border"
                style={{ color: TOKENS.muted, borderColor: TOKENS.surfaceBorder, background: TOKENS.surface }}
              >
                Todavía no armaste ningún cálculo. Tocá "Nuevo cálculo" para empezar.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {calculosAdicionales.map((cuadro) => {
                const totalGastado = cuadro.filas.reduce((acc, f) => acc + (Number(f.importe) || 0), 0);
                const montoInicial = Number(cuadro.montoInicial) || 0;
                const porcentaje = montoInicial > 0 ? (totalGastado / montoInicial) * 100 : 0;
                const anchoBarra = Math.min(porcentaje, 100);
                const colorBarra =
                  porcentaje > 100 ? "bg-red-500" : porcentaje > 80 ? "bg-amber-500" : "bg-emerald-500";
                const saldoRestante = montoInicial - totalGastado;
                const hayExcedente = saldoRestante < 0;

                return (
                  <div
                    key={cuadro.id}
                    className="rounded-[24px] p-5 border"
                    style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(16,23,40,0.05)" }}
                  >
                    {/* Título editable + eliminar cuadro */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <input
                        type="text"
                        value={cuadro.titulo}
                        onChange={(e) => actualizarCuadroCalculo(cuadro.id, "titulo", e.target.value)}
                        placeholder="Título del cálculo"
                        className="ff-display text-base font-bold flex-1 min-w-0 rounded-lg px-2 py-1 outline-none border border-transparent hover:border-slate-200 focus:border-slate-300 transition-colors"
                        style={{ color: TOKENS.text, background: "transparent" }}
                      />
                      <button
                        onClick={() => eliminarCuadroCalculo(cuadro.id)}
                        className="h-8 w-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: TOKENS.redSoft }}
                        aria-label={`Eliminar cálculo ${cuadro.titulo}`}
                      >
                        <X size={14} style={{ color: TOKENS.danger }} />
                      </button>
                    </div>

                    {/* Monto Inicial */}
                    <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>
                      Monto Inicial (ej. Aguinaldo)
                    </label>
                    <input
                      type="number"
                      value={cuadro.montoInicial}
                      onChange={(e) => actualizarCuadroCalculo(cuadro.id, "montoInicial", e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="0"
                      className="w-full rounded-xl px-3.5 py-2.5 text-lg font-semibold mb-3 border outline-none tabular ff-display"
                      style={{ color: TOKENS.text, borderColor: TOKENS.surfaceBorder, background: TOKENS.bg }}
                    />

                    {/* Barra de progreso visual dinámica */}
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${colorBarra}`}
                        style={{ width: `${anchoBarra}%` }}
                      />
                    </div>
                    <p className="text-xs mb-4 tabular" style={{ color: TOKENS.muted }}>
                      {Math.round(porcentaje)}% asignado — {fmt(totalGastado)} de {fmt(montoInicial)}
                    </p>

                    {/* Listado de filas: Descripción / Importe / eliminar */}
                    <div className="space-y-2 mb-3">
                      {cuadro.filas.map((f) => (
                        <div key={f.id} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={f.descripcion}
                            onChange={(e) => actualizarFilaCalculo(cuadro.id, f.id, "descripcion", e.target.value)}
                            placeholder="Descripción"
                            className="flex-1 min-w-0 rounded-lg px-3 py-2 text-[13px] md:text-base border outline-none"
                            style={{ color: TOKENS.text, borderColor: TOKENS.surfaceBorder, background: TOKENS.bg }}
                          />
                          <input
                            type="number"
                            value={f.importe}
                            onChange={(e) => actualizarFilaCalculo(cuadro.id, f.id, "importe", e.target.value === "" ? "" : Number(e.target.value))}
                            placeholder="0"
                            className="w-20 md:w-28 shrink-0 text-right rounded-lg px-3 py-2 text-[13px] md:text-base border outline-none tabular"
                            style={{ color: TOKENS.text, borderColor: TOKENS.surfaceBorder, background: TOKENS.bg }}
                          />
                          <button
                            onClick={() => eliminarFilaCalculo(cuadro.id, f.id)}
                            className="shrink-0 opacity-50 hover:opacity-90 transition-opacity"
                            aria-label="Eliminar destino"
                          >
                            <X size={16} style={{ color: TOKENS.muted }} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => agregarFilaCalculo(cuadro.id)}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-medium border mb-4 transition-colors"
                      style={{ color: TOKENS.gold, borderColor: TOKENS.surfaceBorder }}
                    >
                      <Plus size={13} /> Agregar destino
                    </button>

                    <div className="h-px mb-3" style={{ background: TOKENS.surfaceBorder }} />

                    {/* Indicador numérico: saldo restante (verde) o excedente (rojo) */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: TOKENS.text }}>
                        {hayExcedente ? "Excedente" : "Saldo Restante"}
                      </span>
                      <span
                        className="ff-display tabular text-xl font-bold"
                        style={{ color: hayExcedente ? TOKENS.danger : TOKENS.green }}
                      >
                        {fmt(saldoRestante)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {seccionActiva === "inversion" && (
          <div className="mt-2">
            <div className="flex items-start justify-between mb-6 gap-3">
              <div>
                <h2 className="ff-display text-xl font-semibold" style={{ color: TOKENS.text }}>
                  Inversión
                </h2>
                <p className="text-xs mt-1" style={{ color: TOKENS.muted }}>
                  Tocá para editar detalle, monto o moneda. Todo editable.
                </p>
              </div>
              <button
                onClick={() => setModalNuevaInversion(true)}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-white shrink-0 whitespace-nowrap"
                style={{ background: TOKENS.gold }}
              >
                <Plus size={14} /> Agregar
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {inversiones.length === 0 && (
                <div className="text-center py-10 text-sm" style={{ color: TOKENS.muted }}>
                  Todavía no hay inversiones cargadas
                </div>
              )}
              {inversiones.map((inv) => {
                const IconoInv =
                  inv.icono === "custodia" ? Landmark : inv.icono === "plazo" ? PiggyBank : inv.icono === "acciones" ? TrendingUp : LineChart;
                return (
                  <div
                    key={inv.id}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 border"
                    style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder }}
                  >
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: TOKENS.goldSoft }}
                    >
                      <IconoInv size={17} style={{ color: TOKENS.gold }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      {editandoInversion === `${inv.id}:nombre` ? (
                        <input
                          autoFocus
                          type="text"
                          value={inv.nombre}
                          onChange={(e) => actualizarCampoInversion(inv.id, "nombre", e.target.value)}
                          onBlur={() => setEditandoInversion(null)}
                          onKeyDown={(e) => e.key === "Enter" && setEditandoInversion(null)}
                          className="text-sm font-medium rounded px-1.5 py-0.5 outline-none border w-full"
                          style={{ color: TOKENS.text, borderColor: TOKENS.gold, background: TOKENS.bg }}
                        />
                      ) : (
                        <p
                          className="text-sm truncate cursor-text rounded px-1 -mx-1 hover:bg-black/5 transition-colors inline-block max-w-full"
                          style={{ color: TOKENS.text }}
                          onClick={() => setEditandoInversion(`${inv.id}:nombre`)}
                          title="Tocar para editar"
                        >
                          {inv.nombre}
                        </p>
                      )}
                      <button
                        onClick={() => cambiarMonedaInversion(inv.id)}
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded-full mt-0.5"
                        style={{ background: TOKENS.bg, color: TOKENS.muted, border: `1px solid ${TOKENS.surfaceBorder}` }}
                        title="Tocar para cambiar moneda"
                      >
                        {inv.moneda === "USD" ? "🇺🇸 USD" : "🇦🇷 ARS"} · cambiar
                      </button>
                    </div>

                    {editandoInversion === `${inv.id}:monto` ? (
                      <input
                        autoFocus
                        type="number"
                        defaultValue={inv.monto}
                        onBlur={(e) => {
                          const n = Number(e.target.value);
                          if (!isNaN(n) && n >= 0) actualizarCampoInversion(inv.id, "monto", n);
                          setEditandoInversion(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") e.currentTarget.blur();
                          if (e.key === "Escape") setEditandoInversion(null);
                        }}
                        className="w-24 text-right rounded px-1.5 py-1 text-sm outline-none border tabular shrink-0"
                        style={{ color: TOKENS.text, borderColor: TOKENS.gold, background: TOKENS.bg }}
                      />
                    ) : (
                      <span
                        className="text-sm font-medium tabular shrink-0 cursor-text rounded px-1 hover:bg-black/5 transition-colors"
                        style={{ color: TOKENS.text }}
                        onClick={() => setEditandoInversion(`${inv.id}:monto`)}
                        title="Tocar para editar"
                      >
                        {fmtMoneda(inv.monto, inv.moneda)}
                      </span>
                    )}

                    <button
                      onClick={() => eliminarInversion(inv.id)}
                      className="ml-1 opacity-40 hover:opacity-90 transition-opacity shrink-0"
                      aria-label={`Eliminar ${inv.nombre}`}
                    >
                      <X size={14} style={{ color: TOKENS.muted }} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Totales por moneda */}
            {inversiones.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="rounded-2xl px-4 py-3 border"
                  style={{ background: TOKENS.goldSoft, borderColor: "rgba(168,117,46,0.25)" }}
                >
                  <p className="text-xs mb-1" style={{ color: TOKENS.gold }}>Total en USD</p>
                  <p className="ff-display text-lg font-semibold tabular" style={{ color: TOKENS.gold }}>
                    {fmtUSD(inversiones.filter((i) => i.moneda === "USD").reduce((acc, i) => acc + i.monto, 0))}
                  </p>
                </div>
                <div
                  className="rounded-2xl px-4 py-3 border"
                  style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder }}
                >
                  <p className="text-xs mb-1" style={{ color: TOKENS.muted }}>Total en ARS</p>
                  <p className="ff-display text-lg font-semibold tabular" style={{ color: TOKENS.text }}>
                    {fmt(inversiones.filter((i) => i.moneda === "ARS").reduce((acc, i) => acc + i.monto, 0))}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal: nueva inversión */}
        {modalNuevaInversion && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            style={{ background: "rgba(16,23,40,0.35)" }}
            onClick={() => setModalNuevaInversion(false)}
          >
            <div
              className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 border"
              style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="ff-display text-base font-semibold" style={{ color: TOKENS.text }}>
                  Nueva inversión
                </h3>
                <button
                  onClick={() => setModalNuevaInversion(false)}
                  className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={16} style={{ color: TOKENS.muted }} />
                </button>
              </div>

              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Descripción</label>
              <input
                type="text"
                value={formInversion.nombre}
                onChange={(e) => setFormInversion({ ...formInversion, nombre: e.target.value })}
                placeholder="Ej: Cripto, Bonos, Ahorro en caja..."
                className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-3 border outline-none"
                style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
              />

              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Moneda</label>
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setFormInversion({ ...formInversion, moneda: "USD" })}
                  className="flex-1 rounded-xl py-2.5 text-sm font-medium border transition-colors"
                  style={
                    formInversion.moneda === "USD"
                      ? { background: TOKENS.goldSoft, borderColor: TOKENS.gold, color: TOKENS.gold }
                      : { background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.muted }
                  }
                >
                  Dólares
                </button>
                <button
                  onClick={() => setFormInversion({ ...formInversion, moneda: "ARS" })}
                  className="flex-1 rounded-xl py-2.5 text-sm font-medium border transition-colors"
                  style={
                    formInversion.moneda === "ARS"
                      ? { background: TOKENS.goldSoft, borderColor: TOKENS.gold, color: TOKENS.gold }
                      : { background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.muted }
                  }
                >
                  Pesos
                </button>
              </div>

              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Monto</label>
              <input
                type="number"
                value={formInversion.monto}
                onChange={(e) => setFormInversion({ ...formInversion, monto: e.target.value })}
                placeholder="0"
                className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-4 border outline-none tabular"
                style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
              />

              <button
                onClick={agregarInversion}
                className="w-full rounded-full py-3 text-sm font-medium text-white"
                style={{ background: TOKENS.gold }}
              >
                ✓ Guardar
              </button>
            </div>
          </div>
        )}

        {seccionActiva === "configuracion" && (
          <div className="mt-2">
            <div className="mb-6">
              <h2 className="ff-display text-xl font-semibold" style={{ color: TOKENS.text }}>
                Configuración
              </h2>
              <p className="text-xs mt-1" style={{ color: TOKENS.muted }}>
                Seguridad de la app.
              </p>
            </div>

            <div
              className="rounded-[24px] p-5 border"
              style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(16,23,40,0.05)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center"
                  style={{ background: TOKENS.goldSoft }}
                >
                  <ShieldCheck size={15} style={{ color: TOKENS.gold }} />
                </div>
                <span className="ff-display text-sm font-semibold" style={{ color: TOKENS.text }}>
                  Cambiar PIN
                </span>
              </div>
              <p className="text-xs mb-4" style={{ color: TOKENS.muted }}>
                El PIN se pide cada vez que abrís la app.
              </p>

              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>PIN actual</label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={formPin.actual}
                onChange={(e) => setFormPin({ ...formPin, actual: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                placeholder="••••"
                className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-3 border outline-none tabular tracking-[0.3em]"
                style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
              />

              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Nuevo PIN</label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={formPin.nuevo}
                onChange={(e) => setFormPin({ ...formPin, nuevo: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                placeholder="••••"
                className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-3 border outline-none tabular tracking-[0.3em]"
                style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
              />

              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Confirmar nuevo PIN</label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={formPin.confirmar}
                onChange={(e) => setFormPin({ ...formPin, confirmar: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                placeholder="••••"
                className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-4 border outline-none tabular tracking-[0.3em]"
                style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
              />

              {mensajePin && (
                <div
                  className="rounded-xl px-3.5 py-2.5 text-xs mb-4"
                  style={
                    mensajePin.tipo === "ok"
                      ? { background: TOKENS.goldSoft, color: TOKENS.gold }
                      : { background: "rgba(199,75,59,0.10)", color: TOKENS.danger }
                  }
                >
                  {mensajePin.texto}
                </div>
              )}

              <button
                onClick={cambiarPin}
                className="w-full rounded-full py-3 text-sm font-medium text-white"
                style={{ background: TOKENS.gold }}
              >
                Actualizar PIN
              </button>
            </div>

            {/* Categorías de Gastos */}
            <div
              className="rounded-[24px] p-5 border mt-4"
              style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(16,23,40,0.05)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Tag size={18} style={{ color: TOKENS.blue }} />
                <span className="ff-display text-base font-bold" style={{ color: TOKENS.text }}>
                  Categorías de Gastos
                </span>
              </div>

              <div className="space-y-2 mb-5">
                {categorias.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{ background: TOKENS.bg }}
                  >
                    <span className="h-6 w-1 rounded-full shrink-0" style={{ background: cat.color }} />
                    <span className="flex-1 text-sm font-medium" style={{ color: TOKENS.text }}>
                      {cat.nombre}
                    </span>
                    <button
                      onClick={() => toggleFijoCategoria(cat.id)}
                      className="flex items-center gap-1.5 shrink-0"
                    >
                      <span
                        className="h-5 w-5 rounded flex items-center justify-center"
                        style={
                          cat.fijo
                            ? { background: TOKENS.blue }
                            : { background: "transparent", border: `2px solid ${TOKENS.surfaceBorder}` }
                        }
                      >
                        {cat.fijo && <CheckCircle2 size={13} className="text-white" strokeWidth={3} />}
                      </span>
                      <span className="text-xs" style={{ color: TOKENS.muted }}>Fijo</span>
                    </button>
                    <button
                      onClick={() => eliminarCategoria(cat.id)}
                      className="h-8 w-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: TOKENS.redSoft }}
                      aria-label={`Eliminar categoría ${cat.nombre}`}
                    >
                      <X size={14} style={{ color: TOKENS.danger }} />
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-xs font-medium mb-2" style={{ color: TOKENS.muted }}>Nueva Categoría</p>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formCategoria.color}
                  onChange={(e) => setFormCategoria({ ...formCategoria, color: e.target.value })}
                  className="h-11 w-11 rounded-xl border shrink-0 cursor-pointer"
                  style={{ borderColor: TOKENS.surfaceBorder, padding: 0, background: "none" }}
                  aria-label="Color de la categoría"
                />
                <input
                  type="text"
                  value={formCategoria.nombre}
                  onChange={(e) => setFormCategoria({ ...formCategoria, nombre: e.target.value })}
                  placeholder="Nombre de la categoría"
                  className="flex-1 min-w-0 rounded-xl px-3.5 py-2.5 text-sm border outline-none"
                  style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
                />
                <button
                  onClick={agregarCategoria}
                  className="flex items-center gap-1.5 rounded-xl px-4 text-sm font-medium text-white shrink-0"
                  style={{ background: TOKENS.gold }}
                >
                  <Plus size={14} /> Agregar
                </button>
              </div>
            </div>

            {/* Apps Móviles */}
            <div
              className="rounded-[24px] p-5 border mt-4"
              style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(16,23,40,0.05)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Smartphone size={18} style={{ color: TOKENS.text }} />
                <span className="ff-display text-base font-bold" style={{ color: TOKENS.text }}>
                  Apps Móviles
                </span>
              </div>
              <p className="text-xs mb-4" style={{ color: TOKENS.muted }}>
                Compartí el link de instalación para que cada uno lo agregue a la pantalla de inicio de su celular.
              </p>

              <div className="space-y-3">
                {[
                  { key: "ariel", nombre: "Ariel", iconBg: "rgba(59,130,246,0.12)", iconColor: "#3B82F6" },
                  { key: "cielo", nombre: "Cielo", iconBg: TOKENS.goldSoft, iconColor: TOKENS.gold },
                ].map((p) => (
                  <div key={p.key} className="rounded-2xl p-4" style={{ background: TOKENS.bg }}>
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: p.iconBg }}
                      >
                        <Smartphone size={18} style={{ color: p.iconColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold" style={{ color: TOKENS.text }}>{p.nombre}</span>
                          <a
                            href={enlacesApps[p.key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0"
                            aria-label={`Abrir app de ${p.nombre} en una pestaña nueva`}
                          >
                            <ExternalLink size={13} style={{ color: TOKENS.muted }} />
                          </a>
                        </div>
                        {editandoEnlace === p.key ? (
                          <input
                            autoFocus
                            type="text"
                            value={enlacesApps[p.key]}
                            onChange={(e) => actualizarEnlaceApp(p.key, e.target.value)}
                            onBlur={() => setEditandoEnlace(null)}
                            onKeyDown={(e) => e.key === "Enter" && setEditandoEnlace(null)}
                            className="text-xs rounded px-1.5 py-0.5 outline-none border w-full mt-0.5"
                            style={{ color: TOKENS.text, borderColor: TOKENS.gold, background: TOKENS.surface }}
                          />
                        ) : (
                          <a
                            href={enlacesApps[p.key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs truncate block hover:underline"
                            style={{ color: TOKENS.muted }}
                            onClick={(e) => {
                              e.preventDefault();
                              setEditandoEnlace(p.key);
                            }}
                            title="Tocar para editar el enlace"
                          >
                            {enlacesApps[p.key]}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => copiarEnlaceApp(p.key)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-medium transition-colors"
                        style={{ background: TOKENS.surfaceBorder, color: TOKENS.text }}
                      >
                        <Copy size={13} />
                        {copiado === p.key ? "¡Copiado!" : "Copiar"}
                      </button>
                      <button
                        onClick={() => compartirEnlaceApp(p.key)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-medium text-white transition-colors"
                        style={{ background: "#25D366" }}
                      >
                        <MessageCircle size={13} />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {seccionActiva === "tarjetas" && (
          <div className="mt-2">
            {/* Encabezado */}
            <div className="flex items-start justify-between mb-6 gap-3">
              <div>
                <h2 className="ff-display text-xl font-semibold" style={{ color: TOKENS.text }}>
                  Detalle de tarjetas
                </h2>
                <p className="text-xs mt-1" style={{ color: TOKENS.muted }}>
                  Visualizá tus cargos mes a mes. Arrastrá para reordenarlos.
                </p>
              </div>
              <button
                onClick={() => {
                  setFormCarga((prev) => ({ ...prev, mesInicio: mesIndex }));
                  setModalNuevaCarga(true);
                }}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-white shrink-0 whitespace-nowrap"
                style={{ background: TOKENS.gold }}
              >
                <Plus size={14} /> Nueva carga
              </button>
            </div>

            {/* Un bloque de tabla por tarjeta */}
            <div className="space-y-6">
              {TARJETAS.map((t) => {
                const cargos = cargosPorTarjeta[t.id] || [];
                return (
                  <div
                    key={t.id}
                    className="rounded-[24px] border overflow-hidden"
                    style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(16,23,40,0.05)" }}
                  >
                    {/* Header de la tarjeta */}
                    <div className="flex items-center justify-between px-4 py-3.5 border-b" style={{ borderColor: TOKENS.surfaceBorder }}>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ background: TOKENS.gold }}
                        />
                        <span className="ff-display text-sm font-semibold" style={{ color: TOKENS.text }}>
                          {t.nombre}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: TOKENS.muted }}>
                        <CreditCard size={13} />
                        {cargos.length} cargos
                      </div>
                    </div>

                    {/* Tabla scrolleable */}
                    <div
                      className="overflow-x-auto scrollbar-thin"
                      ref={(el) => (refsTablas.current[t.id] = el)}
                    >
                      <table className="w-full text-[13px] md:text-base">
                        <thead>
                          <tr>
                            <th
                              className="sticky left-0 text-left px-4 py-2 font-medium whitespace-nowrap z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]"
                              style={{ color: TOKENS.muted, background: TOKENS.surface }}
                            >
                              Cargo
                            </th>
                            {MESES.map((m, i) => (
                              <th
                                key={m}
                                className="text-right px-3 py-2 font-medium whitespace-nowrap"
                                style={{ color: i === mesIndex ? TOKENS.gold : TOKENS.muted }}
                              >
                                {m}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {cargos.length === 0 && (
                            <tr>
                              <td colSpan={MESES.length + 1} className="px-4 py-6 text-center" style={{ color: TOKENS.muted }}>
                                Sin cargos cargados todavía
                              </td>
                            </tr>
                          )}
                          {cargos.map((c) => (
                            <tr
                              key={c.id}
                              draggable
                              onDragStart={() => setArrastrando({ tarjetaId: t.id, cargoId: c.id })}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={() => {
                                if (arrastrando && arrastrando.tarjetaId === t.id) {
                                  moverCargo(t.id, arrastrando.cargoId, c.id);
                                }
                                setArrastrando(null);
                              }}
                              className="border-t"
                              style={{ borderColor: TOKENS.surfaceBorder }}
                            >
                              <td
                                className="sticky left-0 px-4 py-2.5 whitespace-nowrap z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]"
                                style={{ background: TOKENS.surface }}
                              >
                                <div className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing">
                                  <GripVertical size={13} style={{ color: TOKENS.muted, opacity: 0.5 }} />
                                  {editando === `${t.id}:${c.id}:nombre` ? (
                                    <input
                                      autoFocus
                                      type="text"
                                      value={c.nombre}
                                      onChange={(e) => actualizarCampoCargo(t.id, c.id, "nombre", e.target.value)}
                                      onBlur={() => setEditando(null)}
                                      onKeyDown={(e) => e.key === "Enter" && setEditando(null)}
                                      className="font-medium rounded px-1.5 py-0.5 text-[13px] md:text-base outline-none border w-24 md:w-36"
                                      style={{ color: TOKENS.text, borderColor: TOKENS.gold, background: TOKENS.bg }}
                                    />
                                  ) : (
                                    <span
                                      className="font-medium cursor-text rounded px-1 -mx-1 hover:bg-black/5 transition-colors"
                                      style={{ color: TOKENS.text }}
                                      onClick={() => setEditando(`${t.id}:${c.id}:nombre`)}
                                      title="Tocar para editar"
                                    >
                                      {c.nombre}
                                    </span>
                                  )}
                                  {c.cuotaTotal != null && (
                                    <span
                                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                                      style={{ background: TOKENS.goldSoft, color: TOKENS.gold }}
                                    >
                                      1/{c.cuotaTotal}
                                    </span>
                                  )}
                                  <button
                                    onClick={() => eliminarCargo(t.id, c.id)}
                                    className="ml-0.5 opacity-40 hover:opacity-90 transition-opacity"
                                    aria-label={`Eliminar ${c.nombre}`}
                                  >
                                    <X size={12} style={{ color: TOKENS.muted }} />
                                  </button>
                                </div>
                              </td>
                              {MESES.map((m, i) => {
                                const valor = valorEnMes(c, i);
                                const claveEdicion = `${t.id}:${c.id}:monto`;
                                const esEditable = valor != null;
                                return (
                                  <td key={m} className="text-right px-3 py-2.5 tabular whitespace-nowrap">
                                    {valor == null ? (
                                      <span style={{ color: TOKENS.muted, opacity: 0.4 }}>—</span>
                                    ) : editando === claveEdicion ? (
                                      <input
                                        autoFocus
                                        type="number"
                                        defaultValue={c.monto}
                                        onBlur={(e) => {
                                          const n = Number(e.target.value);
                                          if (!isNaN(n) && n >= 0) actualizarCampoCargo(t.id, c.id, "monto", n);
                                          setEditando(null);
                                        }}
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") e.currentTarget.blur();
                                          if (e.key === "Escape") setEditando(null);
                                        }}
                                        className="w-20 md:w-28 text-right rounded px-1.5 py-0.5 text-[13px] md:text-base outline-none border tabular"
                                        style={{ color: TOKENS.text, borderColor: TOKENS.gold, background: TOKENS.bg }}
                                      />
                                    ) : (
                                      <span
                                        className={esEditable ? "cursor-text rounded px-1 -mx-1 hover:bg-black/5 transition-colors" : ""}
                                        style={{ color: i === mesIndex ? TOKENS.gold : TOKENS.text }}
                                        onClick={() => esEditable && setEditando(claveEdicion)}
                                        title={esEditable ? "Tocar para editar" : undefined}
                                      >
                                        {fmt(valor)}
                                      </span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                          {/* Fila de total por mes */}
                          {cargos.length > 0 && (
                            <tr className="border-t" style={{ borderColor: TOKENS.surfaceBorder }}>
                              <td
                                className="sticky left-0 px-4 py-2.5 whitespace-nowrap z-10 font-semibold shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]"
                                style={{ background: TOKENS.surface, color: TOKENS.text }}
                              >
                                Total
                              </td>
                              {MESES.map((m, i) => {
                                const totalMes = cargos.reduce((acc, c) => acc + (valorEnMes(c, i) || 0), 0);
                                return (
                                  <td
                                    key={m}
                                    className="text-right px-3 py-2.5 tabular whitespace-nowrap font-semibold"
                                    style={{ color: i === mesIndex ? TOKENS.gold : TOKENS.text }}
                                  >
                                    {fmt(totalMes)}
                                  </td>
                                );
                              })}
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal: nueva carga */}
        {modalNuevaCarga && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            style={{ background: "rgba(16,23,40,0.35)" }}
            onClick={() => setModalNuevaCarga(false)}
          >
            <div
              className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 border max-h-[90vh] overflow-y-auto"
              style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[10px] font-semibold tracking-wide" style={{ color: TOKENS.gold }}>
                    NUEVA OPERACIÓN
                  </p>
                  <h3 className="ff-display text-lg font-semibold mt-0.5" style={{ color: TOKENS.text }}>
                    Carga rápida
                  </h3>
                </div>
                <button
                  onClick={() => setModalNuevaCarga(false)}
                  className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={16} style={{ color: TOKENS.muted }} />
                </button>
              </div>

              {/* Tarjeta */}
              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Tarjeta</label>
              <div className="relative mb-4">
                <CreditCard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: TOKENS.muted }} />
                <select
                  value={formCarga.tarjetaId}
                  onChange={(e) => setFormCarga({ ...formCarga, tarjetaId: e.target.value })}
                  className="w-full rounded-xl pl-10 pr-3 py-2.5 text-sm border outline-none appearance-none"
                  style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
                >
                  {TARJETAS.map((t) => (
                    <option key={t.id} value={t.id}>{t.nombre}</option>
                  ))}
                </select>
              </div>

              {/* Tipo de cargo */}
              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Tipo de cargo</label>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setFormCarga({ ...formCarga, tipo: "cuotas" })}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium border transition-colors"
                  style={
                    formCarga.tipo === "cuotas"
                      ? { background: TOKENS.goldSoft, borderColor: TOKENS.gold, color: TOKENS.gold }
                      : { background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.muted }
                  }
                >
                  <CreditCard size={15} /> Cuotas
                </button>
                <button
                  onClick={() => setFormCarga({ ...formCarga, tipo: "recurrente" })}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium border transition-colors"
                  style={
                    formCarga.tipo === "recurrente"
                      ? { background: TOKENS.goldSoft, borderColor: TOKENS.gold, color: TOKENS.gold }
                      : { background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.muted }
                  }
                >
                  <Zap size={15} /> Recurrente
                </button>
              </div>

              {/* Descripción */}
              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Descripción</label>
              <input
                type="text"
                value={formCarga.descripcion}
                onChange={(e) => setFormCarga({ ...formCarga, descripcion: e.target.value })}
                placeholder="Ej: Coop, Spotify, Notebook..."
                className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-4 border outline-none"
                style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
              />

              {/* Mes de inicio — precargado con el mes del selector global, pero editable */}
              <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Mes de inicio</label>
              <select
                value={formCarga.mesInicio}
                onChange={(e) => setFormCarga({ ...formCarga, mesInicio: Number(e.target.value) })}
                className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-4 border outline-none"
                style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
              >
                {MESES.map((m, i) => (
                  <option key={m} value={i}>{m}</option>
                ))}
              </select>

              {/* Monto total + Cantidad de cuotas: en columna en mobile, en fila en desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 md:mb-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>
                    {formCarga.tipo === "cuotas" ? "Monto total de la compra" : "Monto mensual"}
                  </label>
                  <input
                    type="number"
                    value={formCarga.montoTotal}
                    onChange={(e) => setFormCarga({ ...formCarga, montoTotal: e.target.value })}
                    placeholder="0"
                    className="w-full rounded-xl px-3.5 py-2.5 text-sm md:text-base border outline-none tabular"
                    style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder, color: TOKENS.text }}
                  />
                </div>

                {formCarga.tipo === "cuotas" && (
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: TOKENS.muted }}>Cantidad de cuotas</label>
                    <input
                      type="number"
                      min={1}
                      value={formCarga.cantidadCuotas}
                      onChange={(e) => setFormCarga({ ...formCarga, cantidadCuotas: e.target.value })}
                      placeholder="Ej: 6"
                      className="w-full rounded-xl px-3.5 py-2.5 text-sm md:text-base border outline-none tabular"
                      style={{ background: TOKENS.bg, borderColor: TOKENS.gold, color: TOKENS.text }}
                    />
                  </div>
                )}
              </div>

              {formCarga.tipo === "cuotas" && cuotaMensualCalculada != null && (
                <div
                  className="rounded-xl px-3.5 py-2.5 mb-4 text-sm"
                  style={{ background: TOKENS.goldSoft, color: TOKENS.gold }}
                >
                  Cuota mensual calculada: <span className="font-semibold tabular">{fmt(cuotaMensualCalculada)}</span>
                </div>
              )}

              <button
                onClick={agregarCarga}
                className="w-full rounded-full py-3 text-sm font-medium text-white mt-1"
                style={{ background: TOKENS.gold }}
              >
                ✓ Guardar
              </button>
            </div>
          </div>
        )}

        {seccionActiva === "dashboard" && (
        <>
        {/* Grilla de KPIs, 2 columnas */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: "Ingresos totales", valor: fmt(ingresosTotalesMes), nota: "Salarios con aumento", icono: TrendingUp, color: TOKENS.green, fondo: TOKENS.greenSoft },
            { label: "Gastos totales", valor: fmt(gastosTotalesMes), nota: `Tarjetas: ${fmt(gastosTarjetasMes)}`, icono: TrendingDown, color: TOKENS.danger, fondo: TOKENS.redSoft },
            { label: "Ahorro proyectado", valor: fmt(ahorroProyectado), nota: "Ingresos - Gastos", icono: PiggyBank, color: TOKENS.blue, fondo: TOKENS.purpleSoft },
            { label: "Ahorro real", valor: fmt(ahorroReal), nota: "Ingresos - Pagado", icono: Wallet, color: TOKENS.gold, fondo: TOKENS.goldSoft },
            { label: "Aporte Ariel", valor: fmt(aporteAriel), nota: "Proporcional al ingreso", icono: RefreshCw, color: TOKENS.blue, fondo: TOKENS.purpleSoft },
            { label: "Aporte Cielo", valor: fmt(aporteCielo), nota: "Proporcional al ingreso", icono: RefreshCw, color: TOKENS.gold, fondo: TOKENS.goldSoft },
            { label: "Pagado", valor: fmt(pagadoMes), nota: "Gastos abonados", icono: CheckCircle2, color: TOKENS.green, fondo: TOKENS.greenSoft },
            { label: "Pendiente", valor: fmt(pendienteMes), nota: "Saldo a transferir", icono: Clock, color: TOKENS.orange, fondo: TOKENS.orangeSoft },
          ].map((kpi, i) => {
            const Icono = kpi.icono;
            return (
              <div
                key={i}
                className="rounded-2xl p-4 border"
                style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(15,23,42,0.04)" }}
              >
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: kpi.fondo }}
                >
                  <Icono size={16} style={{ color: kpi.color }} />
                </div>
                <p className="text-[10px] font-semibold tracking-wide mb-1" style={{ color: TOKENS.muted }}>
                  {kpi.label.toUpperCase()}
                </p>
                <p className="ff-display tabular text-xl font-bold mb-1" style={{ color: kpi.color }}>
                  {kpi.valor}
                </p>
                <p className="text-xs" style={{ color: TOKENS.muted }}>{kpi.nota}</p>
              </div>
            );
          })}
        </div>

        {/* Distribución por categoría — dona */}
        <div
          className="rounded-[28px] p-5 mb-6 border"
          style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(15,23,42,0.04)" }}
        >
          <h2 className="ff-display text-base font-bold mb-4" style={{ color: TOKENS.text }}>
            Distribución por Categoría
          </h2>
          {datosDona.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: TOKENS.muted }}>Todavía no hay gastos cargados este mes</p>
          ) : (
            <>
              <div className="w-full h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={datosDona} dataKey="value" innerRadius={62} outerRadius={92} paddingAngle={3} stroke="none">
                      {datosDona.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => fmt(value)}
                      contentStyle={{ background: TOKENS.surface, border: `1px solid ${TOKENS.surfaceBorder}`, borderRadius: 8, fontSize: 12, color: TOKENS.text }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {datosDona.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                      <span style={{ color: TOKENS.text }}>{d.name}</span>
                    </div>
                    <span className="tabular font-medium" style={{ color: TOKENS.text }}>{fmt(d.value)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Ingresos vs Aportes */}
        <div
          className="rounded-[28px] p-5 mb-6 border"
          style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(15,23,42,0.04)" }}
        >
          <h2 className="ff-display text-base font-bold mb-4" style={{ color: TOKENS.text }}>
            Ingresos vs Aportes
          </h2>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datosIngresosVsAportes} barGap={8}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: TOKENS.muted }} axisLine={{ stroke: TOKENS.surfaceBorder }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: TOKENS.muted }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
                <Tooltip
                  formatter={(value) => fmt(value)}
                  contentStyle={{ background: TOKENS.surface, border: `1px solid ${TOKENS.surfaceBorder}`, borderRadius: 8, fontSize: 12, color: TOKENS.text }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Aporte" fill={TOKENS.blue} radius={[6, 6, 0, 0]} />
                <Bar dataKey="Ingreso" fill={TOKENS.gold} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparativa mensual */}
        <div
          className="rounded-[28px] p-5 mb-6 border"
          style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(15,23,42,0.04)" }}
        >
          <h2 className="ff-display text-base font-bold mb-4" style={{ color: TOKENS.text }}>
            Comparativa Mensual
          </h2>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datosComparativaMensual} barGap={4}>
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: TOKENS.muted }} axisLine={{ stroke: TOKENS.surfaceBorder }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: TOKENS.muted }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
                <Tooltip
                  formatter={(value) => fmt(value)}
                  contentStyle={{ background: TOKENS.surface, border: `1px solid ${TOKENS.surfaceBorder}`, borderRadius: 8, fontSize: 12, color: TOKENS.text }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Gastos" fill={TOKENS.danger} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Ingresos" fill={TOKENS.gold} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
