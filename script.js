/* ====== CONFIGURACIÓN (editá solo esto) ====== */
const CONFIG = {
  whatsapp: "5491157300560",              // código país + área + número, sin + ni espacios
  phoneText: "+54 9 11 5730-0560",        // cómo se muestra el teléfono
  waText: "¡Hola Asthor! Quiero consultar por un proyecto.",
  appUrl: "https://app.asthor.com.ar",            // ingreso a Asthor App
  appAltaUrl: "https://app.asthor.com.ar/registro", // alta de nuevos clientes
  appLive: false,                                   // false: "Crear cuenta" abre WhatsApp y se oculta "Ya tengo cuenta". Pasar a true cuando la app esté publicada.
  instagramUser: "asthor.estudio",
  tiktokUser: "asthor.studio",
};
/* ============================================= */

document.documentElement.classList.add("js");

// Links de contacto
const links = {
  whatsapp: `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.waText)}`,
  app: CONFIG.appUrl,
  appAlta: CONFIG.appLive ? CONFIG.appAltaUrl : `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("¡Hola Asthor! Quiero probar Asthor App 14 días gratis.")}`,
  coaching: `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("¡Hola Asthor! Quiero consultar por coaching empresarial.")}`,
  phone: `tel:+${CONFIG.whatsapp}`,
  instagram: `https://instagram.com/${CONFIG.instagramUser}`,
  tiktok: `https://www.tiktok.com/@${CONFIG.tiktokUser}`,
};
document.querySelectorAll("[data-link]").forEach((a) => (a.href = links[a.dataset.link]));
if (!CONFIG.appLive) document.querySelectorAll('[data-link="app"]').forEach((el) => (el.hidden = true));
document.querySelectorAll("[data-phone]").forEach((el) => (el.textContent = CONFIG.phoneText));
document.querySelectorAll("[data-ig]").forEach((el) => (el.textContent = "@" + CONFIG.instagramUser));
document.querySelectorAll("[data-tt]").forEach((el) => (el.textContent = "@" + CONFIG.tiktokUser));
document.getElementById("year").textContent = new Date().getFullYear();

// Cinta infinita
const track = document.getElementById("track");
if (track) track.innerHTML += track.innerHTML;

// Menú móvil
const nav = document.querySelector(".nav");
const burger = document.getElementById("burger");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
document.querySelectorAll("#links a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

// Aparecer al hacer scroll
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 3) * 0.08 + "s"; io.observe(el); });

// Feli mira al cursor
window.addEventListener("pointermove", (e) => {
  const r = document.documentElement.style;
  r.setProperty("--ex", ((e.clientX / innerWidth - 0.5) * 8).toFixed(1) + "px");
  r.setProperty("--ey", ((e.clientY / innerHeight - 0.5) * 6).toFixed(1) + "px");
});

// Bot Feli
const bot = document.getElementById("bot");
const bubble = document.getElementById("bubble");
const msg = document.getElementById("botMsg");
const toggle = document.getElementById("botToggle");
const botFeli = toggle.querySelector(".feli");
const menu = bubble.querySelector(".menu");
let buttons = [];
let activeId = "";

const MSGS = {
  inicio: "¡Hola! Soy Feli, anfitrión de Asthor. Acá tenés tecnología llave en mano 🐾",
  servicios: "Hacemos webs, apps, infraestructura cloud u on-premise y entregamos todo llave en mano ⚡",
  app: "Asthor App: creás tu cuenta y la probás 14 días gratis ⚡",
  nosotros: "Conocé la historia de Asthor Estudio y a su equipo (¡yo soy el jefe de buen ánimo!) 💛",
  contacto: "¡Hablemos! Escribinos por WhatsApp y te respondemos rápido 🚀",
};

function say(text) {
  msg.textContent = text;
  bubble.classList.remove("pop");
  void bubble.offsetWidth;
  bubble.classList.add("pop");
}
function jump() {
  botFeli.classList.remove("jump");
  void botFeli.offsetWidth;
  botFeli.classList.add("jump");
}
botFeli.addEventListener("animationend", (e) => { if (e.animationName === "jump") botFeli.classList.remove("jump"); });

toggle.addEventListener("click", () => { bot.classList.toggle("open"); jump(); });
document.getElementById("botClose").addEventListener("click", () => bot.classList.remove("open"));

/* ====== ATENCIÓN AL USUARIO (preguntas frecuentes de Feli) ======
   EDITAR: ajustá las respuestas a la realidad del negocio. La marcada "A CONFIRMAR" es una propuesta. */
const SECTIONS = [["inicio", "🏠 Inicio"], ["servicios", "🛠️ Servicios"], ["app", "⚡ Asthor App"], ["nosotros", "👥 Quiénes somos"], ["contacto", "📞 Contacto"]];
const FAQ = {
  app: {
    title: "📱 Sobre Asthor App",
    items: [
      ["¿Cuánto cuesta Asthor App?", "Estándar $55.000 y Full $80.000 por mes. De lanzamiento tenés 50 % de descuento durante 6 meses para los primeros 100 clientes, y los primeros 14 días son gratis."],
      ["¿Hay permanencia mínima?", "No hay permanencia mínima: podés darte de baja cuando quieras y pedir que eliminemos tus datos de la app."],
      ["¿Qué medios de pago aceptan?", "Podés abonar con tarjeta de crédito o débito, Mercado Pago y transferencia bancaria. Si necesitás otra modalidad, consultanos."],
      ["¿Cómo pruebo Asthor App?", "Creás tu cuenta en un minuto y la usás gratis durante 14 días, sin instalar nada. Después elegís el plan que más te convenga."],
      ["¿Qué incluye?", "Facturación online y en mostrador, stock, clientes, proveedores, estadísticas de ventas y usuarios con su propio acceso."],
      ["¿Funciona desde el celular?", "Sí. Funciona desde PC o celular, sin instalar nada."],
      ["¿Qué diferencia hay entre Estándar y Full?", "Estándar cubre facturación, stock, clientes y proveedores con estadísticas básicas. Full suma estadísticas completas por usuario, cliente y proveedor, más usuarios y soporte prioritario por WhatsApp."], // A CONFIRMAR
    ],
  },
  svc: {
    title: "🛠️ Sobre nuestros servicios",
    items: [
      ["¿Qué servicios ofrecen?", "Desarrollo web y landing pages, aplicaciones web a medida, infraestructura cloud y on-premise llave en mano, y nuestro sistema de gestión Asthor App."],
      ["¿Cuánto cuesta un proyecto?", "Depende de lo que necesites. Analizamos tu caso, elegimos la solución que más te conviene para reducir gastos y te pasamos una propuesta."],
      ["¿Cuánto tarda?", "Depende del alcance. Antes de empezar coordinamos y planificamos los tiempos de ejecución con vos."],
      ["¿Dan soporte después de entregar?", "Sí. Te acompañamos con onboarding para que aprendas a usarlo, y con soporte y mantenimiento después de la entrega."],
      ["¿Ofrecen coaching?", "Sí. Acompañamos a emprendedores y pymes con coaching individual y de equipo: liderazgo, manejo del estrés, comunicación y toma de decisiones."],
      ["¿Con qué tecnologías trabajan?", "Trabajamos con las mejores tecnologías de Google Cloud (GCP), AWS y GitHub, entre otras."],
    ],
  },
};

const waLink = (q) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("¡Hola Asthor! Tengo una consulta: " + q)}`;

function show(text, items, list) {
  say(text);
  menu.textContent = "";
  menu.classList.toggle("list", !!list);
  buttons = [];
  items.forEach((it) => {
    const el = document.createElement(it.href ? "a" : "button");
    el.textContent = it.label;
    if (it.cls) el.className = it.cls;
    if (it.href) { el.href = it.href; el.target = "_blank"; el.rel = "noopener"; }
    else { el.type = "button"; el.addEventListener("click", it.run); }
    if (it.go) { el.dataset.go = it.go; el.classList.toggle("active", it.go === activeId); buttons.push(el); }
    menu.appendChild(el);
  });
  jump();
}
function mainMenu() {
  show("¡Guau! Soy Feli 🐾, anfitrión de Asthor. ¿En qué te ayudo?", [
    { label: FAQ.app.title, run: () => faqList("app") },
    { label: FAQ.svc.title, run: () => faqList("svc") },
    { label: "🧭 Ir a una sección", run: () => sectionsMenu("¿A qué sección querés ir?") },
    { label: "💬 Escribinos por WhatsApp", cls: "wa-btn", href: links.whatsapp },
  ]);
}
function faqList(key) {
  const g = FAQ[key];
  show("Elegí tu consulta:", [
    ...g.items.map(([q], i) => ({ label: q, run: () => faqAnswer(key, i) })),
    { label: "← Volver", cls: "ghost", run: mainMenu },
  ], true);
}
function faqAnswer(key, i) {
  const [q, a] = FAQ[key].items[i];
  show(a, [
    { label: "← Más preguntas", cls: "ghost", run: () => faqList(key) },
    { label: "💬 Consultar por WhatsApp", cls: "wa-btn", href: waLink(q) },
    { label: "🏠 Menú principal", cls: "ghost", run: mainMenu },
  ], true);
}
function sectionsMenu(text) {
  show(text, [
    ...SECTIONS.map(([id, label]) => ({ label, go: id, run: () => goTo(id) })),
    { label: "← Volver", cls: "ghost", run: mainMenu },
  ]);
}
function goTo(id) {
  const target = document.getElementById(id);
  if (target) { target.scrollIntoView({ behavior: "smooth" }); sectionsMenu(MSGS[id]); }
  else location.href = id === "app" ? "asthor-app.html" : "index.html#" + id;
}
mainMenu();

// Marcar sección activa en el menú de Feli
const spy = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { activeId = e.target.id; buttons.forEach((b) => b.classList.toggle("active", b.dataset.go === activeId)); }
  }),
  { rootMargin: "-45% 0px -50% 0px" }
);
["inicio", "servicios", "app", "nosotros", "contacto"].forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

// Saludo inicial
setTimeout(jump, 2200);

// Detalle de servicios (acordeón)
document.querySelectorAll(".svc-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    const card = btn.closest(".svc");
    const open = card.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
    btn.querySelector("span").textContent = open ? "−" : "+";
  })
);
