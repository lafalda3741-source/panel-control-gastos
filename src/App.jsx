import React, { useState, useMemo, useRef, useEffect } from "react";
import { supabase } from "./supabaseClient";
import {
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Home,
  Zap,
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
  PieChart as PieChartIcon,
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

// Logos de los bancos (incrustados para no depender de archivos aparte).
const LOGOS_BANCO = {
  "Banco Hipotecario": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAABICAIAAAD3UcnvAAAUFUlEQVR42u1dd3RU15n/7n1tNEV9kBghIY0EToQkhAqogRFr0wzYCRg7FEPs+Di7cby7WTu7afvPniQn8WbPxrE3LrFNKDbFjp3F9A7SCKGCKkKgXpEGD9KMNO2Vu39cMR7PCKEgvFHs9x3+uHrvvvvuvb/79e8NiBACKn01CKtboIKtkgq2SirYKqlgq6SCrZIKtkoq2CqpYKukgq2SCrZKKthfMWLv3oUQIMr9eRtCgNTjNT3BJgogLLVbnPueRbweYAqQI4a47Vza2pB1vwYgAEjd+mnJ2ZKbDPeCEApEnoK6YIlriDht6o5Pb7ARBlYAlp+SMMcMsAJgTt3x6Q32mNomMJUyh7HH1UIJ1RpXSQVbJRVslVSwVVLBVml6ga2WM3+FwEYITYz3uHcVRblrQ6XpBbYkSS6XCyE08WkIhh9jTAjxer0Y43GvqBRA7F/rxYQQhJBjZOSjP33M8VyoIXTp0gd1Oi29u3fvvpzcnJTkZABob+9oaGxYu2YNIcTlclVfrinIz8MY19XX9/b0KAT0Ol1BQT7HcTW1tX19/TzHYYyLi5dOfIBUzv7/puHhYUEjPPnExrDw0IvlF+nFvr6+Qav12rXr9E+3233hQmldfQNCyOPxdHR0YIybm69VVFQWFBQsW1YcFR3l8Xg7Ozsb6huKCguWLFksK8rZs+dVa2B6gc1grChKf3+/3e6YGRNLL9bW1a9auVIUxUGrFQAkWXro75Zdbbo6NDSk0WhYlgWA2tq6JYsXh4WFhWg0afPm6fW6iorKnJyc0NBQnucXLy7q7Or0er0qc08jsDHGw8P25uZrn9781DEyAgBOp3PE4ZgzJyUhPuH69RYAEEXRYDAUFuWfOn3GB54kSeHhYYQQQogkyYQQSZYNBgNlZY5lOZZ1u90qwNMIbEmSTXGm4uKlW7dubmhsdLnd3d3dw3ZHR0en0zl6rfkaADCYcTqdcaa4qMjIUkuZTqcDAIZhHA4HQgghxLIMQihEoxkZcdDTIMmyohBBEFSApxHYhBDn6KjH4/nUZmNZjmWYhsYrs2aZBgcHMYMJIYODgyzLyrJMCCkqKuzu6u7p7gGA9PS0CxdKbLZbXq+3vb3d4XCkp6eXX6pwuVySJJ0/f35GjFEQBFVnTwtrnFJoqIFh8MlTp2w2W96ihYCQTqtduWIFvRsRHnFjYMAYbfR4PAghlmWXL3+ourqGAKSmft3jcR85epTneZ1Wu+TBxWZz0s2bNw988CFCKCoyasWKh8f12b7KNGE0g5YlXT8zumMjEgxTLF4grmEuc4N24+vBZUleUcQIsSyrKAqFh86KBlsmcJqpM6bVan2+nNvtFkXJYNCr0E47zqbEc5wvKhIQRQlgTYqof1ur1dIGQkhRFI1Go9F8rptK0yiCNkGYbNw+PlHkkwG+B2kE7d6QJoQoijI9dfz9mhWeDiuZYDEBUW5ZlgOADP7z3ngaIYQxnobyQJKk+zWrvzLYoiS98rvX/uf3rwfgTf/cu2//z3/xS7vdQa988MGHP/7Jvzc0NMJ9TXXQd7lcrosXy+12O0yPuBudw0cf//nHP/lZXV39fVky/usuxm63d3Z1trS0ebxeCKpHbG9r7+jsGrQO0v4tLa1Xmpp6e3sB4D7CQWdSW1v365d/Y7GUwXQKsl67dr2p6WpPT++XwUBDgHiOv5Mk5ziO53kqxDDGG594PC8vLzt7AQBgfFt5o7EzQrtRe37cLJnPAPRv+3O2Xq93udwBqsHnF0wweMCt4G50eRihgFcHv8X/dQDwrSc3LszNyc7O8r/oP8gEU/qCwEaAMKB7/FBoAp3tf4sQYk5KMicljaOq/Zo+OAP22n9HaNvXh2EY+qCiKPRxX0/flbsOHtwt8O0TmhTB3gdtJCQkJCQkBBuk/jZp8JS+MLARBkKIxw5EQawGOA0oyhdRH44Qqqyqqqyo2rhxQ2RkJABcbW4+c+bshg3rRa947ty5/hsDWm3IvHmpuTk5Go3Gt37asNvtFRWVV5ubvR5vXFxcbm52UlISvWW1Wt/fu99qtYaFhV6qqGhpbXl8w/qEhATKPb29vRfLL3V3d2OM56SkLMpbFBkRETA4ANTV1dfU1lqtN0M0mlmzZuXn5xmN0T427evrr6isaG/v0Gq1c+fOKSosqKq6XFlVvX3bVq1WixCqqKy8XH15y5YtTqfzfw8eHB62b92yKTo6uqam1lJW9viG9Uaj0TfawMBARWVla2sbAJjN5oW5OTExMZPBm53K9gPCxG1HrIY1LwaGU2ztivU60oQBZkD5y74VkmVZlmVftIVOPYDjKyurz52/kJOTTcGuqaktLbUwDNPc3Gy3O0wmU1dXd0lJaUlJ6bPfeSY6+rO9bmlpfefdd7u6e2bGxmo0msYrV06cPPmNxx5dvXoVAAwPD/f29IiShDF2uVy9va5PP7VRfjp+4uRHH32sKMqMGTMkSaq+XHP6zNmtW7dkpKf5Bne73X/cuctSdjFEI8yYETMwMHC+pKS2ru5ff/gix3EIoZKS0r379o+MjsaZTIqinDt3vqamlhCor68vLn4w9etfB4Dy8kuXKioTkxJLS8uamq7OnBnrcrkA4HJNzdmz57Kzs4xGo6IoDMOUl1fsee89u91uMpkA4PLlmpMnTm7evGnhwty74n2vYGMWRDcRXay5QFj2Epu8BAAUe7/n/Kti1R7iGkaa0LEY3OS4Vq/TjTM5hvHHm2XZkJAQf2lpMBiqqqoXLMhct25tVGSk3eEoKSn9+OM/79y5+/nnv8dxLCB08+bNP7z9jt1u/+5zz6anpQuC0Nvbu3//gf0HPggLDy8syDebzT/96Y8vXCjZu+/A6lUrV69aqdPrAMBiKdu1a3d2dvbjG9ZHRUVJstTW2vbOuzvefvudH/3bD2NjY6lfvnfvvgsXSgoLCtaufcRoNLpc7ubmZlGUGIZBCDVeubJr957IyMjvPvec2ZxICDRfa969a4/L7fbl6OjSDDrd4cNH9HrDd5979oEHHoiLM1GrJSQkxKduWlpadvzxjwaD4Zmnv52SkkzP8e497+3YsTMqKio52Rygd6YMNmZAkYnThiMTNQ++wOc+BQiDogAoOHRmyJqf8/O/6T7zn9LVE8DyiAsBokxgOhMglJ/2H/iQZfBnnA2AAG7abBzL+qvtAPfD7XabzeZvb99GE1xGQfjGY4/29fWVl1+qqqrKz88DgBMnT/X09D6xcUNRYSF9KjnZvHnLpl/96uUjR45kzs/QarUGg0Gv18uyotVqQ8NCAcDtch89djwmJmb7tq3h4eEKIQLwGRnpj29Y/8abfzh56vSWzZswxs3XrpWUWpKTzdu2baVRW0EQFi1aOOZYiuKhQ4dFSdq86cm0tFR6MWvBApfTtXPXbkIIgs80tNPljo+OfuH734uOjvaZC2NLJmMGxMGDh9xu93eeeXr+/Az6YEZG+uPe9a+99vqhQ4dfeOH5+8fZCAMAcQ0jQS8s/h6/+HlsiAFCQBYBM4BYUCQAYOKzdU+9L9Z95Dn7X3J/I+J1wAoAd/zQCyHk9XqPHj0a7EdqtVqe5+9kAGCERVFamJsjCIIsy9TCYhhmcVFRefmlxsYr+fl5TqezqelqVFRkQUEBHZ9qh4T4+LS0eZcuVbS1taenpxFCZFlGCGRFocKwrb29vaNj44b14eHhAIBvb2JhYcHRY8fr6xvcbrdGo6GNwsICrVZL53DbrgSGwTduDLS0tH7tgbmpqanUbKYHd8GCzOMnTgwOWv3NMVH0PrhkcXR0tCSNSYUAW72np7etvT0pKSkzc75/EmFBZubs2QmtbW03btyIjY2dQJizk1XPmAWPHRSFS10lFL/ExGUAAMgiMCwwHJ0RYHbsIma5jG+wX3vYa3nLY3mTOAaQLgoQO64dL8uyTqf72c9+8rn0MyGA0BtvvNXV3Y3w+FNXiCIIfHx8vM/KpXsdEzMjNDS0u6cHAG4NDdlsttjY2KioyIDHExMTS0pK+/tvpKen+exbdNvo7ezqwhiPjIzW1zfc9nMIIQAIcRxrs9n6+28kJSV2dXULISEJ8fH+RjKN0gNAX3+/y+WOj4+nPOoL4Gu12ujo6L6+fp8fQRTCc1xUVBR9V4C9QtvWm9ZbQ0PZ2VkMw/gQpauOj5/V3t4+aLVOGWyEQJaJy8bEpmmK/4VNWwsAlIkpzGLjJ97yd4h7hDMX8ku+j7SRFHLE64Wl/8zNX+85/bJY9zF4HXf62QWEkNFoZBkm0M/2k+Hj6gCEEM/zAZ4Yx3E6nW5kdBQAFFmWJEkQ+GBfSK/TYYScztFxx3a73dqQkAslJSdPnSJ+QRz6xvDwMI7jqKDmWZbluHGroSVJAiC0jupzGBBCZX7AamDCqmpakCPwQvA5MBgMiqLctTJnMh/je0DQa5a9yC/6NhL0QBRQZAqz0lfvPvMb8cphug1yV4W38ZCw5AU+exMwHCgyEAVHJISs/x2Xvcl98EfgHb2TMPd6vYxGM7E1HiwWFFkZGXUEJD9EUXQ6ndRi53leI2gcjhF/y4WOPDI6QgC0Wt24Y+t1OqfTtWrl8tzcXFmRP3sWwCuKYaGhcXFxAKDX691uj8vpGneqWq0WY+x0OoHA5xJ6CDlHnX+psaTRCBzD2h12/5NN2w67A2McotFMAWwaujKm6P/hODPjAX+5TUZves6/6q3YSTx2pAkFggAICAYy3OP66J/E2gPCspdYcxEAA7IICLGJ+fq/Pyb1XgaiAGLGZW6fIJ1kEgwj7BW9nR1dmfMzaYJElmWWZXt7+4aGhjMz5wNAREREZFTEwIB1YGCA2s9UomKMr19v5TjOFDdz3MHjZsUBEEUhKSnJd8rQUPlpsZR1dnalp6dR45zKetrHNDNWp9N1dnZKsoQxQ7U5wnh0ZPTGwADHcZOMy9KtMEYbwyPCu7q6RVFkb8s8hJAkSe0d7RGREUbjjIn3Dd8lNAaAo5KZGQ+AIo0xtKJ4K3aNvL7Sc/63oMhIEwaKAkQGooAiAatBIWFSR5lzxxOuP/2j8mkbMBxgFmQRWIGdnTcu0vcc0+Z4vqr68tDQMMuytJRFFL1nzp7lODY7K4tydnZ2tt0+fKGkFCFEDR9qRTddaUpONqckJwfvOCEkcXai2WwuKS1taW0NuFvf0HD02HG6p5nzM8LCwkotFpvN5hsc4zHrwWg0pqfNa2trr6qqphcZhsEIlVpKrVbrXwA2RgBgMs2cl5ra19dXVnbx9oswQqjUYunt65+XOi829i6hlcn9WpIiUbkttV3wnHpZaitFnAZpI0FRAoMnRAECiNcDId6K3WLzSSH/O3z+s0jQjwVTMRMw9gSTo0v6LIENn4tKKkThOd5qtf73b1957LFHjdFRdrvj1OnTNTW1BQUFGRnp9MEHlyyuqKg8duy4Ist5+Xksw7a2th785JAoievWrtVoNLIs04gpw2Af12q1IatXr3zjjbfeeuvtDeu/aTLNZDnO6/FYLGVHjh6bnZCw/OGHaDhz6dIlBw8eevW1369cuTzOFOd2u8oulnMcu2H9eoZhVq9edaXp6q7de4aGh2n8pLKq6vjxE7TmImCl41vGfjH8Rx5Z1dDQuH//B6NOZ9q8eYCgrrbu0OEj4WFha9asvh/hUoSA4RRbh+fMb8TaD4kiIW34mOa+4/lQAABpw8Ftdx/7D7H+z0LxD7i0dcFszbLY4/EQQuh2B8DuFUWn08mx7G10ZafTidBnys/j8TzyyMrOjq5f/vJX4eFhLpcbY5STk71505O+U6LX6595evu7O3YeOnzk2PGTLMe6nM7IyMgtmzfRAzGmPjCy2x3UpKBKfWFu7i3brU8OHf7tK7/TarUcx42OjnIcl5mZuWXzt6inBwCPPbrO6XRZLJZXXnlVp9OJojgyMpKfn0/hmT179vZtT72/b//OXbtDNBpCyMjIyMMPPSTJssViwbfXIsmS0zmKg/wOWVacTifdGFmWTSbT009v3/Pe+7v3vEdH83g8s2bN2rTpW6aZM6cWQSMEECJep7fsTU/p68QxiELCEGgmGwpVZGBYpI2QB6669j4rfu0AX/wiG5cBZExFE0JCQ0NXLH8YY4bnuOC5Lisunjt3zszbyygqLNDrDXPmpPjcGFmWTCbT2jVrTp85a7VaeY6fO3dOVtYC/zwHISQ+Pv6lF39QVV3d0dEpiVJsbExm5vwAL2Veauqj69ZkZS3wz5SsWLE8LS2toaGh/8YAw+DYmBiz2ZycbPZPQvA8v33b1ry8hVebrtpu3RIEITYmJicnhzpIhJDs7KykpMSqqst9/X0MwyTOnl1QkN/S0hoeFjZ7dgKdw+KiooiICLPZHJBHyctbxLLMnJQUGkEjhMyfn5GQEF9dXdPT24sAZsXPyspaEB4WNpnY+CQKDlvOjbyxCuuixwzse0uWYEYZ6uFzt2qfeHPqv4NGjaMDBz44+Mmh7dueWrasOFjpBiemJu5zJ7Ng3D4BpXATm0X3tyDuntcySZ0tI8Fw70iPKXKEhNBx/ewJNivg1rjnkrKgT+/6ghLBffzDGsGpxoDStuAHfX0CxvflsOHzRXD+0bGAQXwqJnhpd51V8Gj3N5+NJo5vTxpyeQK/YjK3grfGl372AXCn0YJzwJOcRgBsd/Rq/Nzo4G7Bg0xcSTfx9UlOaRqVJU2dMMajo6MMw4BKfxNlSfdcyAAA+fl5BoMhPT0d1C8/vvRgm0wmmsBXwf7yi3Fql6mf7n3JOdvHzarC/iLARrf/3Ts06m+M/y2ATQgoIiji1P4/AWXKI6g0ZVl4V51HRBdxDABCU6oPRgiIjHg90hvVTZ++YKv0FdPZ9038IlB9JJWzVVL9bJVUsFVSwVZJBVulMfo/dPeFe2FEXAMAAAAASUVORK5CYII=",
  "Banco Credicoop": "data:image/png;base64,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",
};

// ---------- Datos de ejemplo (reemplazar con datos reales del Excel) ----------

const TARJETAS = [
  {
    id: "visa-ariel",
    nombre: "VISA ARIEL",
    banco: "Banco Hipotecario",
    titular: "Ariel",
    ultimos4: "4821",
    saldo: 187430,
    limite: 450000,
    gradiente: "from-[#F59A3A] via-[#F08018] to-[#D96B0C]", // Banco Hipotecario: naranja
    vencimiento: "12/28",
  },
  {
    id: "visa-cielo",
    nombre: "VISA CIELO",
    banco: "Banco Hipotecario",
    titular: "Cielo",
    ultimos4: "7734",
    saldo: 94210,
    limite: 300000,
    gradiente: "from-[#F59A3A] via-[#F08018] to-[#D96B0C]", // Banco Hipotecario: naranja
    vencimiento: "03/27",
  },
  {
    id: "cabal-cielo",
    nombre: "CABAL CIELO",
    banco: "Banco Credicoop",
    titular: "Cielo",
    ultimos4: "1092",
    saldo: 52680,
    limite: 200000,
    gradiente: "from-[#6E655B] via-[#585048] to-[#40392F]", // Banco Credicoop: gris pardo
    franja: true,
    vencimiento: "07/27",
  },
  {
    id: "cabal-ariel",
    nombre: "CABAL ARIEL",
    banco: "Banco Credicoop",
    titular: "Ariel",
    ultimos4: "5563",
    saldo: 138900,
    limite: 350000,
    gradiente: "from-[#6E655B] via-[#585048] to-[#40392F]", // Banco Credicoop: gris pardo
    franja: true,
    vencimiento: "09/28",
  },
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

const MESES_ABREV = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
// Meses sin tope: el índice 0 es Ago 2026 y los siguientes se calculan solos (no hay lista fija).
function nombreMes(i) {
  const d = new Date(2026, 7 + i, 1);
  return `${MESES_ABREV[d.getMonth()]} ${d.getFullYear()}`;
}
function indicesMeses(desde, cant) {
  return Array.from({ length: cant }, (_, k) => desde + k).map((i) => ({ i, m: nombreMes(i) }));
}
// Sueldos por mes: para meses que todavía no tienen valor cargado se repite el último conocido.
function montoDelMes(arr, i) {
  if (!arr || arr.length === 0) return 0;
  return i < arr.length ? arr[i] : arr[arr.length - 1];
}
// Cambia solo el monto de un mes (el resto queda como estaba).
function conMontoEnMes(arr, i, valor) {
  const nuevos = [...arr];
  const previo = montoDelMes(arr, i);
  const ultimo = nuevos.length ? nuevos[nuevos.length - 1] : 0;
  while (nuevos.length <= i) nuevos.push(ultimo);
  nuevos[i] = valor;
  if (nuevos.length === i + 1) nuevos.push(previo);
  return nuevos;
}
// Cambia el monto desde un mes en adelante (para los aumentos).
function conMontoDesdeMes(arr, i, valor) {
  const nuevos = [...arr];
  const ultimo = nuevos.length ? nuevos[nuevos.length - 1] : 0;
  while (nuevos.length <= i) nuevos.push(ultimo);
  for (let k = i; k < nuevos.length; k++) nuevos[k] = valor;
  return nuevos;
}

// Mismo anclaje que la función SQL mes_actual_index() (Ago 2026 = índice 0).
function mesActualIndex() {
  const hoy = new Date();
  return (hoy.getFullYear() - 2026) * 12 + (hoy.getMonth() - 7);
}
function mesActualClamp() {
  return Math.max(mesActualIndex(), 0);
}
function proximoMesIndex() {
  return Math.max(mesActualIndex() + 1, 0);
}

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
  { id: "gastos", label: "Gastos Mensuales", icon: PieChartIcon },
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
  const [mesIndex, setMesIndex] = useState(mesActualClamp()); // arranca en el mes actual del sistema
  // Columnas de tablas/gráficos: ventana móvil que acompaña al mes elegido.
  const mesesVista = indicesMeses(Math.max(0, mesIndex - 1), 12);
  // Tabla de la solapa Tarjetas: arranca en el mes elegido (los meses anteriores no se muestran).
  const mesesTabla = indicesMeses(mesIndex, 12);
  // Opciones de "Mes de inicio": desde Ago 2026 hasta 5 años adelante de hoy (se corre solo).
  const opcionesMes = indicesMeses(0, Math.max(mesActualIndex() + 61, mesIndex + 13));

  // ---- Detalle de tarjetas ----
  const [cargosPorTarjeta, setCargosPorTarjeta] = useState(CARGOS_INICIALES);
  const [saldosTarjetas, setSaldosTarjetas] = useState({}); // { [tarjetaId]: saldo } — viene de la tabla "tarjetas", mantenida por tu trigger
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [arrastrando, setArrastrando] = useState(null); // { tarjetaId, cargoId }
  const [cargoArrastrable, setCargoArrastrable] = useState(null); // id del cargo habilitado para arrastrar ahora mismo (solo mientras se sostiene el grip)
  const [editando, setEditando] = useState(null); // "tarjetaId:cargoId:campo"
  const [modalNuevaCarga, setModalNuevaCarga] = useState(false);
  const [formCarga, setFormCarga] = useState({
    tarjetaId: TARJETAS[0].id,
    tipo: "cuotas", // "cuotas" | "recurrente"
    descripcion: "",
    montoTotal: "",
    cantidadCuotas: "",
    mesInicio: proximoMesIndex(),
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
            agrupados[c.tarjeta_id].push({ id: c.id, nombre: c.nombre, monto: Number(c.monto), cuotaTotal: c.cuota_total, mesInicio: Number.isFinite(Number(c.mes_inicio)) ? Number(c.mes_inicio) : 0 });
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
        const { data: pagosDb } = await supabase.from("pagos_mensuales").select("gasto_id, mes_index, pagado");
        const mapaPagos = {};
        (pagosDb || []).forEach((p) => { mapaPagos[`${p.gasto_id}:${p.mes_index}`] = !!p.pagado; });
        setPagosPorMes(mapaPagos);

        const { data: gastosDb } = await supabase.from("gastos_mensuales").select("*");
        let listaGastos = gastosDb || [];

        // Reparación automática: si falta alguna de las 4 tarjetas (por ejemplo, si
        // alguna vez se borró sin querer), la vuelve a crear.
        const idsTarjetaPresentes = new Set(listaGastos.filter((g) => g.es_tarjeta).map((g) => g.tarjeta_id));
        const faltantesTarjeta = TARJETAS.filter((t) => !idsTarjetaPresentes.has(t.id));
        if (faltantesTarjeta.length > 0) {
          const nuevasFilas = faltantesTarjeta.map((t) => ({
            id: `gm-${t.id}`,
            tarjeta_id: t.id,
            nombre: t.nombre,
            monto: totalTarjetaEnMes(CARGOS_INICIALES[t.id], 0),
            es_tarjeta: true,
            categoria_id: "cat-tarjetas",
            pagado: false,
          }));
          const { error } = await supabase.from("gastos_mensuales").insert(nuevasFilas);
          if (!error) listaGastos = [...listaGastos, ...nuevasFilas];
        }

        if (listaGastos.length > 0) {
          setGastosMensuales(
            listaGastos.map((g) => ({
              id: g.id,
              nombre: g.nombre,
              monto: Number(g.monto),
              esTarjeta: g.es_tarjeta,
              tarjetaId: g.tarjeta_id,
              categoriaId: g.categoria_id,
              pagado: g.pagado,
            }))
          );
        }

        // Sueldos de Ariel y Cielo (compartidos con la app móvil)
        const { data: sueldosDb } = await supabase.from("sueldos").select("*");
        const nuevosSueldos = {
          ariel: { titular: "Ariel", montosPorMes: Array(12).fill(850000), aumentoPorc: "", aumentosPorMes: {} },
          cielo: { titular: "Cielo", montosPorMes: Array(12).fill(620000), aumentoPorc: "", aumentosPorMes: {} },
        };
        const faltantesSueldo = [];
        for (const key of ["ariel", "cielo"]) {
          const fila = (sueldosDb || []).find((s) => s.persona === key);
          if (fila) {
            nuevosSueldos[key] = {
              titular: fila.titular,
              montosPorMes: fila.montos_por_mes && fila.montos_por_mes.length ? fila.montos_por_mes : nuevosSueldos[key].montosPorMes,
              aumentoPorc: "",
              aumentosPorMes: fila.aumentos_por_mes || {},
            };
          } else {
            faltantesSueldo.push(key);
          }
        }
        setSueldos(nuevosSueldos);
        for (const key of faltantesSueldo) {
          await supabase.from("sueldos").insert({
            persona: key,
            titular: nuevosSueldos[key].titular,
            montos_por_mes: nuevosSueldos[key].montosPorMes,
            aumentos_por_mes: {},
          });
        }

        // Otros ingresos
        const { data: ingresosExtraDb } = await supabase.from("ingresos_extra").select("*");
        setIngresosExtra((ingresosExtraDb || []).map((ig) => ({ id: ig.id, nombre: ig.nombre, monto: Number(ig.monto) })));

        // PIN de acceso al Panel
        const { data: pinDb } = await supabase.from("configuracion_panel").select("*").eq("clave", "pin").maybeSingle();
        if (pinDb) {
          setPin(pinDb.valor);
        } else {
          await supabase.from("configuracion_panel").insert({ clave: "pin", valor: "1234" });
        }
        setPinListo(true);

        // Enlaces a las apps móviles (Configuración)
        const { data: enlacesDb } = await supabase.from("enlaces_apps").select("*");
        const enlacesDefault = {
          ariel: "https://app-ariel-movil-finanzas.vercel.app",
          cielo: "https://app-cielo-movil-finanzas-mu.vercel.app",
        };
        const faltantesEnlace = [];
        for (const key of ["ariel", "cielo"]) {
          const fila = (enlacesDb || []).find((e) => e.persona === key);
          if (!fila) faltantesEnlace.push(key);
        }
        if (enlacesDb && enlacesDb.length > 0) {
          setEnlacesApps((prev) => {
            const nuevos = { ...prev };
            enlacesDb.forEach((e) => (nuevos[e.persona] = e.url));
            return nuevos;
          });
          setPinesApps((prev) => {
            const nuevos = { ...prev };
            enlacesDb.forEach((e) => {
              if (e.pin) nuevos[e.persona] = e.pin;
            });
            return nuevos;
          });
        }
        for (const key of faltantesEnlace) {
          await supabase.from("enlaces_apps").insert({ persona: key, url: enlacesDefault[key] });
        }

        // Cálculos Adicionales
        const { data: calculosDb } = await supabase.from("calculos_adicionales").select("*");
        setCalculosAdicionales(
          (calculosDb || []).map((c) => ({
            id: c.id,
            titulo: c.titulo,
            montoInicial: Number(c.monto_inicial) || 0,
            filas: c.filas || [],
          }))
        );

        // Inversión
        const { data: inversionesDb } = await supabase.from("inversiones").select("*");
        if (inversionesDb && inversionesDb.length > 0) {
          setInversiones(
            inversionesDb.map((inv) => ({
              id: inv.id,
              nombre: inv.nombre,
              moneda: inv.moneda,
              monto: Number(inv.monto),
              icono: inv.icono,
              historial: inv.historial || [],
            }))
          );
        } else {
          const inversionesIniciales = [
            { id: "inv1", nombre: "Dólares en fondos comunes", moneda: "USD", monto: 2500, icono: "fondo", historial: [] },
            { id: "inv2", nombre: "Pesos en fondo común", moneda: "ARS", monto: 850000, icono: "fondo", historial: [] },
            { id: "inv3", nombre: "Dólares en custodia", moneda: "USD", monto: 4000, icono: "custodia", historial: [] },
            { id: "inv4", nombre: "Plazo fijo", moneda: "ARS", monto: 600000, icono: "plazo", historial: [] },
            { id: "inv5", nombre: "Acciones / CEDEARs", moneda: "USD", monto: 1200, icono: "acciones", historial: [] },
          ];
          setInversiones(inversionesIniciales);
          await supabase.from("inversiones").insert(inversionesIniciales);
        }
      } catch (err) {
        console.error("Error cargando datos de Supabase, se sigue con los datos locales:", err);
        setPinListo(true); // evita dejar el teclado del PIN bloqueado para siempre si falló la carga
      } finally {
        setCargandoDatos(false);
      }
    };
    cargarDatos();
  }, [seccionActiva]);

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
    const actual = categorias.find((c) => c.id === id);
    if (!actual) return;
    const nuevoValor = !actual.fijo;
    setCategorias((prev) => prev.map((c) => (c.id === id ? { ...c, fijo: nuevoValor } : c)));
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
    ariel: "https://app-ariel-movil-finanzas.vercel.app",
    cielo: "https://app-cielo-movil-finanzas-mu.vercel.app",
  });
  const [editandoEnlace, setEditandoEnlace] = useState(null); // "ariel" | "cielo" | null
  const [pinesApps, setPinesApps] = useState({ ariel: "1234", cielo: "1234" });
  const [editandoPinApp, setEditandoPinApp] = useState(null); // "ariel" | "cielo" | null
  const [copiado, setCopiado] = useState(null); // "ariel" | "cielo" | null — feedback temporal

  const actualizarEnlaceApp = (persona, valor) => {
    setEnlacesApps((prev) => ({ ...prev, [persona]: valor }));
  };

  // Se llama al salir del campo de edición (onBlur): recién ahí se guarda en Supabase.
  const guardarEnlaceApp = (persona) => {
    setEditandoEnlace(null);
    supabase.from("enlaces_apps").update({ url: enlacesApps[persona] }).eq("persona", persona).then(({ error }) => {
      if (error) console.error("Error guardando enlace de app:", error);
    });
  };

  const actualizarPinApp = (persona, valor) => {
    setPinesApps((prev) => ({ ...prev, [persona]: valor.replace(/\D/g, "").slice(0, 4) }));
  };

  const guardarPinApp = (persona) => {
    setEditandoPinApp(null);
    if (!/^\d{4}$/.test(pinesApps[persona])) return; // solo guarda si quedaron los 4 dígitos completos
    supabase.from("enlaces_apps").update({ pin: pinesApps[persona] }).eq("persona", persona).then(({ error }) => {
      if (error) console.error("Error guardando PIN de app:", error);
    });
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
  const [gastosBase, setGastosMensuales] = useState(() =>
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
  // "Pagado" es por mes: viene de la tabla pagos_mensuales (gasto_id + mes_index), no del gasto en sí.
  const [pagosPorMes, setPagosPorMes] = useState({}); // { "gastoId:mesIndex": true/false }
  const gastosMensuales = useMemo(
    () => gastosBase.map((g) => ({ ...g, pagado: !!pagosPorMes[`${g.id}:${mesIndex}`] })),
    [gastosBase, pagosPorMes, mesIndex]
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

  const togglePagadoGasto = async (gastoId) => {
    const clave = `${gastoId}:${mesIndex}`;
    const nuevoValor = !pagosPorMes[clave];
    setPagosPorMes((prev) => ({ ...prev, [clave]: nuevoValor }));
    const { error } = await supabase
      .from("pagos_mensuales")
      .upsert({ gasto_id: gastoId, mes_index: mesIndex, pagado: nuevoValor, updated_at: new Date().toISOString() }, { onConflict: "gasto_id,mes_index" });
    if (error) {
      console.error("Error actualizando pagado:", error);
      // si falla, revertimos para no mostrar algo que no quedó guardado
      setPagosPorMes((prev) => ({ ...prev, [clave]: !nuevoValor }));
    }
  };

  const eliminarGastoMensual = (gastoId) => {
    const gasto = gastosMensuales.find((g) => g.id === gastoId);
    if (!window.confirm(`¿Seguro que querés eliminar "${gasto?.nombre || "este gasto"}"?`)) return;
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
    ariel: { titular: "Ariel", montosPorMes: Array(12).fill(850000), aumentoPorc: "", aumentosPorMes: {} },
    cielo: { titular: "Cielo", montosPorMes: Array(12).fill(620000), aumentoPorc: "", aumentosPorMes: {} },
  });
  const [editandoSueldo, setEditandoSueldo] = useState(null); // "ariel" | "cielo" | null
  const [editandoAumento, setEditandoAumento] = useState(null); // "ariel" | "cielo" | null — toggle del lápiz

  const actualizarSueldoMonto = (persona, valor) => {
    setSueldos((prev) => {
      const s = prev[persona];
      const nuevos = conMontoEnMes(s.montosPorMes, mesIndex, valor);
      supabase.from("sueldos").update({ montos_por_mes: nuevos }).eq("persona", persona).then(({ error }) => {
        if (error) console.error("Error actualizando sueldo:", error);
      });
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
      const montoAnterior = montoDelMes(s.montosPorMes, mesIndex);
      const nuevoMonto = Math.round(montoAnterior * (1 + porc / 100));
      const nuevosMontos = conMontoDesdeMes(s.montosPorMes, mesIndex, nuevoMonto);
      const nuevosAumentos = { ...s.aumentosPorMes, [mesIndex]: { porc, anterior: montoAnterior, nuevo: nuevoMonto } };
      supabase
        .from("sueldos")
        .update({ montos_por_mes: nuevosMontos, aumentos_por_mes: nuevosAumentos })
        .eq("persona", persona)
        .then(({ error }) => {
          if (error) console.error("Error aplicando aumento:", error);
        });
      return {
        ...prev,
        [persona]: {
          ...s,
          montosPorMes: nuevosMontos,
          aumentosPorMes: nuevosAumentos,
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
    supabase.from("ingresos_extra").update({ [campo]: valor }).eq("id", id).then(({ error }) => {
      if (error) console.error("Error actualizando ingreso extra:", error);
    });
  };

  const eliminarIngresoExtra = (id) => {
    setIngresosExtra((prev) => prev.filter((ig) => ig.id !== id));
    supabase.from("ingresos_extra").delete().eq("id", id).then(({ error }) => {
      if (error) console.error("Error eliminando ingreso extra:", error);
    });
  };

  const agregarIngresoExtra = () => {
    if (!formIngreso.nombre.trim() || !formIngreso.monto) return;
    const nuevo = { id: `ig${Date.now()}`, nombre: formIngreso.nombre.trim(), monto: Number(formIngreso.monto) };
    setIngresosExtra((prev) => [...prev, nuevo]);
    supabase.from("ingresos_extra").insert(nuevo).then(({ error }) => {
      if (error) console.error("Error guardando ingreso extra:", error);
    });
    setFormIngreso({ nombre: "", monto: "" });
    setModalNuevoIngreso(false);
  };

  // ---- Cálculos Adicionales (compartido en Supabase: tabla calculos_adicionales) ----
  // Cada cuadro: { id, titulo, montoInicial, filas: [{ id, descripcion, importe }] }
  const [calculosAdicionales, setCalculosAdicionales] = useState([]);

  const agregarCuadroCalculo = () => {
    const nuevo = { id: `calc${Date.now()}`, titulo: "Nuevo cálculo", montoInicial: 0, filas: [] };
    setCalculosAdicionales((prev) => [...prev, nuevo]);
    supabase
      .from("calculos_adicionales")
      .insert({ id: nuevo.id, titulo: nuevo.titulo, monto_inicial: nuevo.montoInicial, filas: nuevo.filas })
      .then(({ error }) => {
        if (error) console.error("Error guardando cálculo:", error);
      });
  };

  const eliminarCuadroCalculo = (cuadroId) => {
    setCalculosAdicionales((prev) => prev.filter((c) => c.id !== cuadroId));
    supabase.from("calculos_adicionales").delete().eq("id", cuadroId).then(({ error }) => {
      if (error) console.error("Error eliminando cálculo:", error);
    });
  };

  const actualizarCuadroCalculo = (cuadroId, campo, valor) => {
    setCalculosAdicionales((prev) => prev.map((c) => (c.id === cuadroId ? { ...c, [campo]: valor } : c)));
    const campoDb = campo === "montoInicial" ? "monto_inicial" : campo; // titulo | montoInicial
    supabase.from("calculos_adicionales").update({ [campoDb]: valor }).eq("id", cuadroId).then(({ error }) => {
      if (error) console.error("Error actualizando cálculo:", error);
    });
  };

  const agregarFilaCalculo = (cuadroId) => {
    setCalculosAdicionales((prev) =>
      prev.map((c) => {
        if (c.id !== cuadroId) return c;
        const filas = [...c.filas, { id: `fila${Date.now()}`, descripcion: "", importe: 0 }];
        supabase.from("calculos_adicionales").update({ filas }).eq("id", cuadroId).then(({ error }) => {
          if (error) console.error("Error guardando fila de cálculo:", error);
        });
        return { ...c, filas };
      })
    );
  };

  const actualizarFilaCalculo = (cuadroId, filaId, campo, valor) => {
    setCalculosAdicionales((prev) =>
      prev.map((c) => {
        if (c.id !== cuadroId) return c;
        const filas = c.filas.map((f) => (f.id === filaId ? { ...f, [campo]: valor } : f));
        supabase.from("calculos_adicionales").update({ filas }).eq("id", cuadroId).then(({ error }) => {
          if (error) console.error("Error actualizando fila de cálculo:", error);
        });
        return { ...c, filas };
      })
    );
  };

  const eliminarFilaCalculo = (cuadroId, filaId) => {
    setCalculosAdicionales((prev) =>
      prev.map((c) => {
        if (c.id !== cuadroId) return c;
        const filas = c.filas.filter((f) => f.id !== filaId);
        supabase.from("calculos_adicionales").update({ filas }).eq("id", cuadroId).then(({ error }) => {
          if (error) console.error("Error eliminando fila de cálculo:", error);
        });
        return { ...c, filas };
      })
    );
  };

  // ---- Inversión (compartido en Supabase: tabla inversiones) ----
  const [inversiones, setInversiones] = useState([]);
  const [editandoInversion, setEditandoInversion] = useState(null); // "id:campo"
  const [modalNuevaInversion, setModalNuevaInversion] = useState(false);
  const [formInversion, setFormInversion] = useState({ nombre: "", moneda: "USD", monto: "" });
  const [historialAbierto, setHistorialAbierto] = useState(null); // id de la inversión con el desplegable abierto, o null
  const [formHistorial, setFormHistorial] = useState({ fecha: "", valor: "" });

  const hoyISO = () => new Date().toISOString().slice(0, 10);

  const agregarCargaHistorial = (invId) => {
    if (!formHistorial.fecha || !formHistorial.valor) return;
    const nuevaEntrada = { id: `h${Date.now()}`, fecha: formHistorial.fecha, valor: Number(formHistorial.valor) };

    setInversiones((prev) =>
      prev.map((inv) => {
        if (inv.id !== invId) return inv;
        const historial = [...inv.historial, nuevaEntrada].sort((a, b) => a.fecha.localeCompare(b.fecha));
        const ultimoValor = historial[historial.length - 1].valor;

        supabase
          .from("inversiones")
          .update({ historial, monto: ultimoValor })
          .eq("id", invId)
          .then(({ error }) => {
            if (error) console.error("Error guardando carga del fondo:", error);
          });

        return { ...inv, historial, monto: ultimoValor };
      })
    );
    setFormHistorial({ fecha: "", valor: "" });
  };

  const eliminarCargaHistorial = (invId, entradaId) => {
    setInversiones((prev) =>
      prev.map((inv) => {
        if (inv.id !== invId) return inv;
        const historial = inv.historial.filter((h) => h.id !== entradaId);
        const nuevoMonto = historial.length > 0 ? historial[historial.length - 1].valor : inv.monto;

        supabase
          .from("inversiones")
          .update({ historial, monto: nuevoMonto })
          .eq("id", invId)
          .then(({ error }) => {
            if (error) console.error("Error eliminando carga del fondo:", error);
          });

        return { ...inv, historial, monto: nuevoMonto };
      })
    );
  };

  const actualizarCampoInversion = (id, campo, valor) => {
    setInversiones((prev) => prev.map((inv) => (inv.id === id ? { ...inv, [campo]: valor } : inv)));
    supabase.from("inversiones").update({ [campo]: valor }).eq("id", id).then(({ error }) => {
      if (error) console.error("Error actualizando inversión:", error);
    });
  };

  const cambiarMonedaInversion = (id) => {
    setInversiones((prev) =>
      prev.map((inv) => {
        if (inv.id !== id) return inv;
        const nuevaMoneda = inv.moneda === "USD" ? "ARS" : "USD";
        supabase.from("inversiones").update({ moneda: nuevaMoneda }).eq("id", id).then(({ error }) => {
          if (error) console.error("Error actualizando moneda de inversión:", error);
        });
        return { ...inv, moneda: nuevaMoneda };
      })
    );
  };

  const eliminarInversion = (id) => {
    setInversiones((prev) => prev.filter((inv) => inv.id !== id));
    supabase.from("inversiones").delete().eq("id", id).then(({ error }) => {
      if (error) console.error("Error eliminando inversión:", error);
    });
  };

  const agregarInversion = () => {
    if (!formInversion.nombre.trim() || !formInversion.monto) return;
    const nueva = {
      id: `inv${Date.now()}`,
      nombre: formInversion.nombre.trim(),
      moneda: formInversion.moneda,
      monto: Number(formInversion.monto),
      icono: "otro",
      historial: [],
    };
    setInversiones((prev) => [...prev, nueva]);
    supabase.from("inversiones").insert(nueva).then(({ error }) => {
      if (error) console.error("Error guardando inversión:", error);
    });
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
    const cargo = (cargosPorTarjeta[tarjetaId] || []).find((c) => c.id === cargoId);
    if (!window.confirm(`¿Seguro que querés eliminar "${cargo?.nombre || "este cargo"}"?`)) return;
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
      // La tabla arranca en el mes elegido: es la primera columna después de la fija.
      const targetTh = ths[1];
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
    setFormCarga({ tarjetaId: formCarga.tarjetaId, tipo: "cuotas", descripcion: "", montoTotal: "", cantidadCuotas: "", mesInicio: proximoMesIndex() });
    setModalNuevaCarga(false);
  };

  // ---- Cálculos para el Dashboard ----
  const gastosTarjetasEnMes = (i) =>
    TARJETAS.reduce((acc, t) => acc + totalTarjetaEnMes(cargosPorTarjeta[t.id], i), 0);
  const gastosFijosMensuales = gastosMensuales.filter((g) => !g.esTarjeta).reduce((acc, g) => acc + g.monto, 0);

  const ingresoArielMes = montoDelMes(sueldos.ariel.montosPorMes, mesIndex);
  const ingresoCieloMes = montoDelMes(sueldos.cielo.montosPorMes, mesIndex);
  const totalIngresosExtra = ingresosExtra.reduce((acc, ig) => acc + ig.monto, 0);
  const ingresosTotalesMes = ingresoArielMes + ingresoCieloMes + totalIngresosExtra;
  // Se calcula igual que la dona/comparativa y que la app móvil: en base a los
  // cargos de cada tarjeta EN EL MES SELECCIONADO (mesIndex), no en el saldo
  // "de hoy" que guarda Supabase — así el KPI respeta el mes que estés mirando.
  const gastosTarjetasMes = gastosTarjetasEnMes(mesIndex);
  const gastosTotalesMes = gastosTarjetasMes + gastosFijosMensuales;
  const ahorroProyectado = ingresosTotalesMes - gastosTotalesMes;
  const pagadoMes = gastosMensuales
    .filter((g) => g.pagado)
    .reduce((acc, g) => acc + (g.esTarjeta ? totalTarjetaEnMes(cargosPorTarjeta[g.tarjetaId], mesIndex) || 0 : g.monto), 0);
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

  const datosComparativaMensual = mesesVista.map(({ m, i }) => ({
    mes: m.split(" ")[0],
    Ingresos: montoDelMes(sueldos.ariel.montosPorMes, i) + montoDelMes(sueldos.cielo.montosPorMes, i),
    Gastos: gastosTarjetasEnMes(i) + gastosFijosMensuales,
  }));

  // ---- Seguridad: PIN de 4 dígitos ----
  const [pin, setPin] = useState("1234");
  const [pinListo, setPinListo] = useState(false); // true recién cuando ya se leyó el pin real de Supabase
  const [desbloqueado, setDesbloqueado] = useState(false);
  const [pinIngresado, setPinIngresado] = useState("");
  const [pinError, setPinError] = useState(false);

  const ingresarDigitoPin = (d) => {
    if (!pinListo) return; // evita comparar contra el "1234" por defecto mientras carga el real
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
    supabase.from("configuracion_panel").update({ valor: formPin.nuevo }).eq("clave", "pin").then(({ error }) => {
      if (error) console.error("Error guardando PIN:", error);
    });
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
              className="text-sm md:text-base font-medium cursor-text rounded px-1 -mx-1 hover:bg-black/5 transition-colors break-words group"
              style={{
                color: g.pagado ? TOKENS.muted : TOKENS.text,
                textDecoration: g.pagado ? "line-through" : "none",
              }}
              onClick={() => setEditandoGasto(`${g.id}:nombre`)}
              title="Tocar para editar"
            >
              {g.nombre}
              <Pencil size={11} className="inline-block ml-1 opacity-0 group-hover:opacity-40 transition-opacity align-middle" />
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

      {editandoGasto === `${g.id}:monto` && !g.esTarjeta ? (
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
          className={g.esTarjeta ? "text-sm md:text-base font-medium tabular shrink-0 mt-0.5" : "text-sm md:text-base font-medium tabular shrink-0 cursor-text rounded px-1 hover:bg-black/5 transition-colors mt-0.5 group"}
          style={{
            color: g.pagado ? TOKENS.muted : TOKENS.text,
            textDecoration: g.pagado ? "line-through" : "none",
          }}
          onClick={g.esTarjeta ? undefined : () => setEditandoGasto(`${g.id}:monto`)}
          title={g.esTarjeta ? "Se actualiza solo desde el saldo de la tarjeta" : "Tocar para editar"}
        >
          {fmt(g.esTarjeta ? totalTarjetaEnMes(cargosPorTarjeta[g.tarjetaId], mesIndex) : g.monto)}
          {!g.esTarjeta && (
            <Pencil size={11} className="inline-block ml-1 opacity-0 group-hover:opacity-40 transition-opacity align-middle" />
          )}
        </span>
      )}

      {!g.esTarjeta && (
        <button
          onClick={() => eliminarGastoMensual(g.id)}
          className="ml-1 mt-1 opacity-40 hover:opacity-90 transition-opacity shrink-0"
          aria-label={`Eliminar ${g.nombre}`}
        >
          <X size={14} style={{ color: TOKENS.muted }} />
        </button>
      )}
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
      className="min-h-screen w-full ff-body md:pl-64"
      style={{ backgroundColor: TOKENS.bg, color: TOKENS.text }}
    >
      <FontImport />
      {/* Overlay del menú vertical (solo en celular, donde el menú es un cajón) */}
      {menuAbierto && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          style={{ backdropFilter: "blur(2px)" }}
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* Menú vertical: en celular es un cajón; desde pantallas medianas queda siempre fijo a la izquierda */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 border-r overflow-y-auto transition-transform duration-300 ease-out md:translate-x-0 ${
          menuAbierto ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: TOKENS.surface,
          borderColor: TOKENS.surfaceBorder,
          boxShadow: "4px 0 24px rgba(16,23,40,0.06)",
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
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors md:hidden"
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
          className="h-10 w-10 rounded-full flex items-center justify-center border transition-colors mb-5 md:hidden"
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
        <div className="flex items-center justify-center gap-4 mb-7">
          <button
            onClick={() => setMesIndex((i) => Math.max(0, i - 1))}
            disabled={mesIndex === 0}
            className="h-12 w-12 rounded-full flex items-center justify-center border transition-colors disabled:opacity-30"
            style={{ borderColor: TOKENS.surfaceBorder, background: TOKENS.surface }}
            aria-label="Mes anterior"
          >
            <ChevronLeft size={24} style={{ color: TOKENS.muted }} />
          </button>
          <span
            className="ff-display text-xl md:text-2xl font-semibold px-8 py-3 rounded-full min-w-[200px] text-center"
            style={{ background: TOKENS.goldSoft, color: TOKENS.gold }}
          >
            {nombreMes(mesIndex)}
          </span>
          <button
            onClick={() => setMesIndex((i) => i + 1)}
            className="h-12 w-12 rounded-full flex items-center justify-center border transition-colors disabled:opacity-30"
            style={{ borderColor: TOKENS.surfaceBorder, background: TOKENS.surface }}
            aria-label="Mes siguiente"
          >
            <ChevronRight size={24} style={{ color: TOKENS.muted }} />
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
                  Tocá el monto o el lápiz para editar. Mes: {nombreMes(mesIndex)}.
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
                const montoMes = montoDelMes(s.montosPorMes, mesIndex);
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
                          className="ff-display tabular text-lg font-bold cursor-text rounded px-1 hover:bg-black/5 transition-colors group"
                          style={{ color: TOKENS.text }}
                          onClick={() => setEditandoSueldo(key)}
                          title="Tocar para editar"
                        >
                          {fmt(montoMes)}
                          <Pencil size={11} className="inline-block ml-1 opacity-0 group-hover:opacity-40 transition-opacity align-middle" />
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
                            className="text-sm font-medium cursor-text rounded px-1 -mx-1 hover:bg-black/5 transition-colors break-words group"
                            style={{ color: TOKENS.text }}
                            onClick={() => setEditandoIngresoExtra(`${ig.id}:nombre`)}
                            title="Tocar para editar"
                          >
                            {ig.nombre}
                            <Pencil size={11} className="inline-block ml-1 opacity-0 group-hover:opacity-40 transition-opacity align-middle" />
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
                          className="text-sm font-medium tabular shrink-0 cursor-text rounded px-1 hover:bg-black/5 transition-colors group"
                          style={{ color: TOKENS.text }}
                          onClick={() => setEditandoIngresoExtra(`${ig.id}:monto`)}
                          title="Tocar para editar"
                        >
                          {fmt(ig.monto)}
                          <Pencil size={11} className="inline-block ml-1 opacity-0 group-hover:opacity-40 transition-opacity align-middle" />
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
              const montoReal = (g) => (g.esTarjeta ? totalTarjetaEnMes(cargosPorTarjeta[g.tarjetaId], mesIndex) : g.monto);
              const totalGeneral = gastosMensuales.reduce((acc, g) => acc + montoReal(g), 0);
              const pagadoGeneral = gastosMensuales.filter((g) => g.pagado).reduce((acc, g) => acc + montoReal(g), 0);
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
                  <React.Fragment key={inv.id}>
                  <div
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
                          className="text-sm truncate cursor-text rounded px-1 -mx-1 hover:bg-black/5 transition-colors inline-block max-w-full group"
                          style={{ color: TOKENS.text }}
                          onClick={() => setEditandoInversion(`${inv.id}:nombre`)}
                          title="Tocar para editar"
                        >
                          {inv.nombre}
                          <Pencil size={11} className="inline-block ml-1 opacity-0 group-hover:opacity-40 transition-opacity align-middle" />
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

                    <button
                      onClick={() => setHistorialAbierto(historialAbierto === inv.id ? null : inv.id)}
                      className="flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-1 rounded-full shrink-0"
                      style={{ background: TOKENS.bg, color: TOKENS.muted, border: `1px solid ${TOKENS.surfaceBorder}` }}
                    >
                      Historial
                      <ChevronDown
                        size={12}
                        style={{ transform: historialAbierto === inv.id ? "rotate(180deg)" : "none", transition: "transform 150ms" }}
                      />
                    </button>

                    {editandoInversion === `${inv.id}:monto` && inv.historial.length === 0 ? (
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
                        className={
                          inv.historial.length === 0
                            ? "text-sm font-medium tabular shrink-0 cursor-text rounded px-1 hover:bg-black/5 transition-colors group"
                            : "text-sm font-medium tabular shrink-0 px-1"
                        }
                        style={{ color: TOKENS.text }}
                        onClick={() => inv.historial.length === 0 && setEditandoInversion(`${inv.id}:monto`)}
                        title={inv.historial.length === 0 ? "Tocar para editar" : "Se actualiza solo con la última carga del historial"}
                      >
                        {fmtMoneda(inv.monto, inv.moneda)}
                        {inv.historial.length === 0 && (
                          <Pencil size={11} className="inline-block ml-1 opacity-0 group-hover:opacity-40 transition-opacity align-middle" />
                        )}
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

                  {historialAbierto === inv.id && (
                    <div
                      className="rounded-2xl px-4 py-3 border -mt-1"
                      style={{ background: TOKENS.bg, borderColor: TOKENS.surfaceBorder }}
                    >
                      {/* Formulario de carga */}
                      <div className="flex items-end gap-2 mb-3">
                        <div className="flex-1">
                          <label className="text-[10px] block mb-1" style={{ color: TOKENS.muted }}>Fecha</label>
                          <input
                            type="date"
                            value={formHistorial.fecha}
                            max={hoyISO()}
                            onChange={(e) => setFormHistorial({ ...formHistorial, fecha: e.target.value })}
                            className="w-full rounded-lg px-2 py-1.5 text-xs outline-none border"
                            style={{ borderColor: TOKENS.surfaceBorder, background: TOKENS.surface, color: TOKENS.text }}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-[10px] block mb-1" style={{ color: TOKENS.muted }}>Valor total del fondo</label>
                          <input
                            type="number"
                            placeholder="0"
                            value={formHistorial.valor}
                            onChange={(e) => setFormHistorial({ ...formHistorial, valor: e.target.value })}
                            className="w-full rounded-lg px-2 py-1.5 text-xs outline-none border tabular"
                            style={{ borderColor: TOKENS.surfaceBorder, background: TOKENS.surface, color: TOKENS.text }}
                          />
                        </div>
                        <button
                          onClick={() => agregarCargaHistorial(inv.id)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-white shrink-0"
                          style={{ background: TOKENS.gold }}
                        >
                          Cargar
                        </button>
                      </div>

                      {/* Lista de cargas con rendimiento */}
                      {inv.historial.length === 0 ? (
                        <p className="text-xs text-center py-2" style={{ color: TOKENS.muted }}>
                          Todavía no cargaste ningún valor para este fondo.
                        </p>
                      ) : (
                        <div className="space-y-1.5">
                          {[...inv.historial]
                            .sort((a, b) => b.fecha.localeCompare(a.fecha))
                            .map((h, idx, listaDesc) => {
                              // El "anterior" cronológicamente es el siguiente en esta lista ordenada desc
                              const anterior = listaDesc[idx + 1];
                              const diff = anterior ? h.valor - anterior.valor : null;
                              const pct = anterior && anterior.valor !== 0 ? (diff / anterior.valor) * 100 : null;
                              return (
                                <div
                                  key={h.id}
                                  className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs"
                                  style={{ background: TOKENS.surface }}
                                >
                                  <span style={{ color: TOKENS.muted }}>
                                    {new Date(h.fecha + "T00:00:00").toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" })}
                                  </span>
                                  <span className="font-medium tabular" style={{ color: TOKENS.text }}>
                                    {fmtMoneda(h.valor, inv.moneda)}
                                  </span>
                                  <span
                                    className="tabular font-medium"
                                    style={{ color: diff == null ? TOKENS.muted : diff >= 0 ? TOKENS.green : TOKENS.danger }}
                                  >
                                    {diff == null
                                      ? "—"
                                      : `${diff >= 0 ? "+" : ""}${fmtMoneda(diff, inv.moneda)} (${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%)`}
                                  </span>
                                  <button
                                    onClick={() => eliminarCargaHistorial(inv.id, h.id)}
                                    className="opacity-40 hover:opacity-90 transition-opacity ml-1"
                                    aria-label="Eliminar carga"
                                  >
                                    <X size={11} style={{ color: TOKENS.muted }} />
                                  </button>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  )}
                  </React.Fragment>
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
                            onBlur={() => guardarEnlaceApp(p.key)}
                            onKeyDown={(e) => e.key === "Enter" && guardarEnlaceApp(p.key)}
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
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-[11px]" style={{ color: TOKENS.muted }}>PIN:</span>
                          {editandoPinApp === p.key ? (
                            <input
                              autoFocus
                              type="text"
                              inputMode="numeric"
                              maxLength={4}
                              value={pinesApps[p.key]}
                              onChange={(e) => actualizarPinApp(p.key, e.target.value)}
                              onBlur={() => guardarPinApp(p.key)}
                              onKeyDown={(e) => e.key === "Enter" && guardarPinApp(p.key)}
                              className="text-xs rounded px-1.5 py-0.5 outline-none border w-16 tracking-widest"
                              style={{ color: TOKENS.text, borderColor: TOKENS.gold, background: TOKENS.surface }}
                            />
                          ) : (
                            <button
                              onClick={() => setEditandoPinApp(p.key)}
                              className="text-xs font-semibold tracking-widest hover:underline"
                              style={{ color: TOKENS.text }}
                              title="Tocar para cambiar el PIN"
                            >
                              {pinesApps[p.key]}
                            </button>
                          )}
                        </div>
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
                  setFormCarga((prev) => ({ ...prev, mesInicio: proximoMesIndex() }));
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
                const todosLosCargos = cargosPorTarjeta[t.id] || [];
                // Gasto mensual de esta tarjeta: de ahí sale si el mes en que terminó un cargo figura como pagado.
                const gastoTarjeta = gastosBase.find((g) => g.esTarjeta && g.tarjetaId === t.id);
                const ultimoMesDe = (c) => (c.cuotaTotal != null ? (c.mesInicio || 0) + c.cuotaTotal - 1 : null);
                const terminoAntes = (c) => {
                  const u = ultimoMesDe(c);
                  return u != null && u < mesIndex;
                };
                const pagadoEnMes = (mes) => !!(gastoTarjeta && pagosPorMes[`${gastoTarjeta.id}:${mes}`]);
                // Se listan los cargos con valor desde el mes elegido en adelante. Un cargo que ya terminó
                // sigue apareciendo hasta que el mes en que terminó figure como pagado en Gastos mensuales.
                const cargos = todosLosCargos.filter(
                  (c) => mesesTabla.some(({ i }) => valorEnMes(c, i) != null) || (terminoAntes(c) && !pagadoEnMes(ultimoMesDe(c)))
                );
                const cargosDelMes = todosLosCargos.filter((c) => valorEnMes(c, mesIndex) != null).length;
                const usoDelMes = totalTarjetaEnMes(todosLosCargos, mesIndex);
                const porcentajeUso = t.limite > 0 ? Math.min(100, Math.round((usoDelMes / t.limite) * 100)) : 0;
                return (
                  <div
                    key={t.id}
                    className="rounded-[24px] border overflow-hidden"
                    style={{ background: TOKENS.surface, borderColor: TOKENS.surfaceBorder, boxShadow: "0 8px 24px rgba(16,23,40,0.05)" }}
                  >
                    {/* Header con degradé estilo tarjeta física */}
                    <div className={`relative overflow-hidden bg-gradient-to-br ${t.gradiente} px-4 py-3.5`}>
                      {/* Credicoop: franja de colores como en su logo */}
                      {t.franja && (
                        <div
                          className="absolute bottom-0 left-0 right-0 h-1.5"
                          style={{ background: "linear-gradient(90deg,#EF4444,#F97316,#FACC15,#22C55E,#3B82F6,#8B5CF6)" }}
                        />
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          {LOGOS_BANCO[t.banco] ? (
                            <span className="bg-white rounded-lg p-1 shrink-0 flex items-center justify-center shadow-sm">
                              <img src={LOGOS_BANCO[t.banco]} alt={t.banco} className="h-9 w-auto block" />
                            </span>
                          ) : (
                            <CreditCard size={16} className="text-white/90 shrink-0" />
                          )}
                          <div className="min-w-0">
                            <p className="ff-display text-sm font-semibold text-white truncate">{t.nombre}</p>
                            <p className="text-[10px] text-white/70 truncate">{t.banco} · {t.titular}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <p className="text-xs font-mono text-white/90 tracking-wider">•••• {t.ultimos4}</p>
                          <p className="text-[10px] text-white/60">Vence {t.vencimiento}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                          <div className="h-full rounded-full bg-white/80" style={{ width: `${porcentajeUso}%` }} />
                        </div>
                        <span className="text-[10px] text-white/80 shrink-0 tabular">
                          {fmt(usoDelMes)} / {fmt(t.limite)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end px-4 py-2 border-b text-xs" style={{ borderColor: TOKENS.surfaceBorder, color: TOKENS.muted }}>
                      {cargosDelMes} cargos en {nombreMes(mesIndex)}
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
                            {mesesTabla.map(({ m, i }) => (
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
                              <td colSpan={mesesTabla.length + 1} className="px-4 py-6 text-center" style={{ color: TOKENS.muted }}>
                                Sin cargos cargados todavía
                              </td>
                            </tr>
                          )}
                          {cargos.map((c) => (
                            <tr
                              key={c.id}
                              draggable={cargoArrastrable === c.id}
                              onDragStart={() => setArrastrando({ tarjetaId: t.id, cargoId: c.id })}
                              onDragEnd={() => setCargoArrastrable(null)}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={() => {
                                if (arrastrando && arrastrando.tarjetaId === t.id) {
                                  moverCargo(t.id, arrastrando.cargoId, c.id);
                                }
                                setArrastrando(null);
                                setCargoArrastrable(null);
                              }}
                              className="border-t"
                              style={{ borderColor: TOKENS.surfaceBorder }}
                            >
                              <td
                                className="sticky left-0 px-4 py-2.5 whitespace-nowrap z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]"
                                style={{ background: TOKENS.surface }}
                              >
                                <div className="flex items-center gap-1.5">
                                  <span
                                    onMouseDown={() => setCargoArrastrable(c.id)}
                                    className="cursor-grab active:cursor-grabbing"
                                  >
                                    <GripVertical size={13} style={{ color: TOKENS.muted, opacity: 0.5 }} />
                                  </span>
                                  {editando === `${t.id}:${c.id}:nombre` ? (
                                    <input
                                      autoFocus
                                      type="text"
                                      value={c.nombre}
                                      onChange={(e) => actualizarCampoCargo(t.id, c.id, "nombre", e.target.value)}
                                      onMouseDown={(e) => e.stopPropagation()}
                                      onBlur={() => setEditando(null)}
                                      onKeyDown={(e) => e.key === "Enter" && setEditando(null)}
                                      className="font-medium rounded px-1.5 py-0.5 text-[13px] md:text-base outline-none border w-24 md:w-36"
                                      style={{ color: TOKENS.text, borderColor: TOKENS.gold, background: TOKENS.bg }}
                                    />
                                  ) : (
                                    <span
                                      className="font-medium cursor-text rounded px-1 -mx-1 hover:bg-black/5 transition-colors group"
                                      style={{ color: TOKENS.text }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setEditando(`${t.id}:${c.id}:nombre`);
                                      }}
                                      title="Tocar para editar"
                                    >
                                      {c.nombre}
                                      <Pencil size={10} className="inline-block ml-1 opacity-0 group-hover:opacity-40 transition-opacity align-middle" />
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
                                  {terminoAntes(c) && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: TOKENS.surfaceBorder, color: TOKENS.muted }}>
                                      Terminó en {nombreMes(ultimoMesDe(c))}
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
                              {mesesTabla.map(({ m, i }) => {
                                const valor = valorEnMes(c, i);
                                const claveEdicion = `${t.id}:${c.id}:monto:${i}`;
                                const esEditable = valor != null;
                                return (
                                  <td key={m} className="text-right px-3 py-2.5 tabular whitespace-nowrap" style={i === mesIndex ? { background: TOKENS.goldSoft } : undefined}>
                                    {valor == null ? (
                                      <span style={{ color: TOKENS.muted, opacity: 0.4 }}>—</span>
                                    ) : editando === claveEdicion ? (
                                      <input
                                        autoFocus
                                        type="number"
                                        defaultValue={c.monto}
                                        onMouseDown={(e) => e.stopPropagation()}
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
                                        className={esEditable ? "cursor-text rounded px-1 -mx-1 hover:bg-black/5 transition-colors group" : ""}
                                        style={{ color: i === mesIndex ? TOKENS.gold : TOKENS.text }}
                                        onClick={(e) => {
                                          if (!esEditable) return;
                                          e.preventDefault();
                                          setEditando(claveEdicion);
                                        }}
                                        title={esEditable ? "Tocar para editar" : undefined}
                                      >
                                        {fmt(valor)}
                                        {esEditable && (
                                          <Pencil size={10} className="inline-block ml-1 opacity-0 group-hover:opacity-40 transition-opacity align-middle" />
                                        )}
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
                              {mesesTabla.map(({ m, i }) => {
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
                {opcionesMes.map(({ m, i }) => (
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
        {/* KPIs del mes — 6 tarjetas: ingresos, gastos, saldo, aportes y gastos pagados */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {[
            { label: "Ingresos totales", valor: fmt(ingresosTotalesMes), nota: "Salarios con aumento", icono: TrendingUp, color: TOKENS.green, fondo: TOKENS.greenSoft },
            { label: "Gastos totales", valor: fmt(gastosTotalesMes), nota: `Tarjetas: ${fmt(gastosTarjetasMes)}`, icono: TrendingDown, color: TOKENS.danger, fondo: TOKENS.redSoft },
            { label: "Saldo del mes", valor: fmt(ahorroProyectado), nota: "Ingresos - Gastos totales", icono: Wallet, color: ahorroProyectado >= 0 ? TOKENS.gold : TOKENS.danger, fondo: ahorroProyectado >= 0 ? TOKENS.goldSoft : TOKENS.redSoft },
            { label: "Aporte Ariel", valor: fmt(aporteAriel), nota: "Parte de los gastos según su ingreso", icono: RefreshCw, color: TOKENS.blue, fondo: TOKENS.purpleSoft },
            { label: "Aporte Cielo", valor: fmt(aporteCielo), nota: "Parte de los gastos según su ingreso", icono: RefreshCw, color: TOKENS.gold, fondo: TOKENS.goldSoft },
            { label: "Gastos pagados", valor: fmt(pagadoMes), nota: `De ${fmt(gastosTotalesMes)} del mes`, icono: CheckCircle2, color: TOKENS.green, fondo: TOKENS.greenSoft },
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
