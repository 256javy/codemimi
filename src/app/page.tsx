import { ButtonLink } from "@/components/ui/Button";
import Character from "@/components/ui/Character";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 py-8 sm:py-12">
      {/* ---------- HERO ---------- */}
      <section className="grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <span className="mx-auto inline-flex w-fit items-center gap-2 rounded-full bg-sol/20 px-4 py-1.5 text-sm font-semibold text-tinta lg:mx-0">
            ✨ Programación real para niños desde 8 años
          </span>
          <h1 className="text-5xl leading-tight sm:text-6xl">
            Tu hijo escribe{" "}
            <span className="text-uva">código de verdad</span> en{" "}
            <span className="text-cielo">CodeKids</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-tinta/70 lg:mx-0">
            Aventuras narrativas donde los peques aprenden HTML y CSS escribiendo
            código real, con un editor que muestra el resultado al instante. Sin
            bloques que arrastrar, sin autocompletado, sin IA que lo haga por
            ellos.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <ButtonLink href="/aventuras" variant="primary" size="lg">
              Empezar gratis 🚀
            </ButtonLink>
            <ButtonLink href="/proyectos" variant="secondary" size="lg">
              Explorar proyectos
            </ButtonLink>
          </div>
          <p className="text-sm text-tinta/50">
            100% gratis · Sin tarjeta de crédito · Sin crear cuenta
          </p>
        </div>

        <div className="flex justify-center rounded-blob bg-white/60 p-8 shadow-xl ring-1 ring-uva/10">
          <Character
            id="byte"
            size="lg"
            speech="¡Hola! Soy Byte. Te llevaré por aventuras donde construirás tus propias páginas web, línea a línea. ¿List@ para crear algo increíble?"
          />
        </div>
      </section>

      {/* ---------- ¿CÓMO FUNCIONA? ---------- */}
      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl">¿Cómo funciona?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-tinta/70">
            CodeKids no es un juego de arrastrar piezas. Tu hijo se sienta frente
            a un editor de código real y aprende escribiendo, igual que los
            programadores de verdad.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              n: "1",
              emoji: "📖",
              title: "Vive una aventura",
              text: "Cada lección es una historia. Byte, Pixel, Luna y Max acompañan al niño con misiones claras y motivadoras.",
              bg: "bg-uva-claro",
            },
            {
              n: "2",
              emoji: "⌨️",
              title: "Escribe código real",
              text: "Teclea HTML y CSS de verdad. Sin autocompletado mágico ni IA: cada etiqueta y cada estilo los escribe el propio niño.",
              bg: "bg-cielo-claro",
            },
            {
              n: "3",
              emoji: "✨",
              title: "Ve el resultado al instante",
              text: "La vista previa en tiempo real muestra lo que su código crea. El error se entiende, se corrige y se aprende.",
              bg: "bg-menta/15",
            },
          ].map((step) => (
            <div
              key={step.n}
              className={`relative flex flex-col gap-3 rounded-3xl ${step.bg} p-7`}
            >
              <span className="absolute -top-4 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-uva text-lg font-bold text-white shadow-md">
                {step.n}
              </span>
              <span className="text-4xl">{step.emoji}</span>
              <h3 className="text-xl">{step.title}</h3>
              <p className="text-tinta/70">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CARACTERÍSTICAS ---------- */}
      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl">Todo lo que necesita para empezar</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-tinta/70">
            Una plataforma pensada para que aprender a programar sea divertido,
            seguro y sin barreras.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              emoji: "🦊",
              title: "Aventuras con personajes",
              text: "Historias guiadas por personajes entrañables que convierten cada concepto en una misión emocionante.",
              ring: "ring-coral/20",
            },
            {
              emoji: "⚡",
              title: "Editor de código con vista en vivo",
              text: "Un editor de verdad con resaltado de sintaxis y previsualización inmediata de la página que va creando.",
              ring: "ring-cielo/20",
            },
            {
              emoji: "🏅",
              title: "Insignias y logros",
              text: "Cada reto superado desbloquea insignias que reconocen el progreso y mantienen las ganas de seguir.",
              ring: "ring-sol/30",
            },
            {
              emoji: "🆓",
              title: "Gratis y sin cuenta",
              text: "No hace falta registrarse. El progreso se guarda en el propio dispositivo y se puede exportar e importar cuando quieras.",
              ring: "ring-menta/30",
            },
          ].map((f) => (
            <div
              key={f.title}
              className={`flex gap-5 rounded-3xl bg-white p-7 shadow-sm ring-1 ${f.ring} transition hover:-translate-y-1 hover:shadow-md`}
            >
              <span className="text-4xl">{f.emoji}</span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-xl">{f.title}</h3>
                <p className="text-tinta/70">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- PARA PADRES Y DOCENTES ---------- */}
      <section className="grid items-center gap-10 rounded-blob bg-uva-claro/60 p-8 sm:p-12 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl sm:text-4xl">Para padres y docentes</h2>
          <p className="text-lg leading-relaxed text-tinta/80">
            Sabemos lo importante que es la privacidad de los más pequeños.
            CodeKids está diseñado para que pueda usarse con total tranquilidad.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "Sin correo electrónico ni datos personales.",
              "Sin cuentas ni inicio de sesión.",
              "Todo el progreso se guarda solo en el navegador del dispositivo.",
              "Nada viaja a servidores externos: los datos no salen del equipo.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-tinta/80">
                <span className="mt-0.5 text-menta">✔️</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl bg-white p-7 shadow-md">
          <span className="text-4xl">📝</span>
          <h3 className="text-xl">Enfoque pedagógico</h3>
          <p className="leading-relaxed text-tinta/70">
            Creemos que se aprende a programar programando. Por eso el niño
            escribe cada línea de código en lugar de arrastrar bloques o dejar que
            una IA lo resuelva. Es como aprender a escribir a mano: el esfuerzo de
            teclear, equivocarse y corregir es justo donde ocurre el aprendizaje
            real y duradero.
          </p>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="flex flex-col gap-8">
        <h2 className="text-center text-3xl sm:text-4xl">Preguntas frecuentes</h2>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {[
            {
              q: "¿Necesita crear una cuenta?",
              a: "No. CodeKids funciona sin registro ni inicio de sesión. El niño puede empezar a aprender de inmediato, sin dar ningún dato.",
            },
            {
              q: "¿Cuesta dinero?",
              a: "No. CodeKids es 100% gratis y no requiere tarjeta de crédito. No hay compras ocultas ni planes de pago.",
            },
            {
              q: "¿Desde qué edad es recomendable?",
              a: "Está pensado para niños desde los 8 años. La lectura y la escritura básicas son suficientes para seguir las aventuras y escribir su primer código.",
            },
            {
              q: "¿Qué pasa si cambio de computadora?",
              a: "Como el progreso se guarda en el navegador, puedes exportar los datos a un archivo desde un dispositivo e importarlo en otro. Así el niño continúa justo donde lo dejó.",
            },
            {
              q: "¿Usa bloques o inteligencia artificial?",
              a: "No. El niño escribe código real (HTML y CSS) con sus propias manos: sin arrastrar bloques, sin autocompletado y sin IA que lo haga por él.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-uva/10 open:ring-uva/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-tinta">
                {item.q}
                <span className="shrink-0 text-uva transition group-open:rotate-45">
                  ＋
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-tinta/70">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- CTA FINAL ---------- */}
      <section className="flex flex-col items-center gap-6 rounded-blob bg-uva p-10 text-center text-white sm:p-14">
        <h2 className="text-3xl text-white sm:text-4xl">
          ¿List@ para crear su primera página web?
        </h2>
        <p className="max-w-xl text-lg text-white/85">
          Empieza ahora mismo, sin cuenta y sin coste. La primera aventura está a
          un clic de distancia.
        </p>
        <ButtonLink href="/aventuras" variant="success" size="lg">
          Empezar gratis 🚀
        </ButtonLink>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="flex flex-col items-center gap-3 border-t border-uva/10 pt-8 text-center text-sm text-tinta/60">
        <p className="font-display text-lg font-bold text-tinta">CodeKids</p>
        <p>Aprende HTML y CSS escribiendo código de verdad. 🧑‍💻</p>
        <p>Hecho con 💜 para pequeños creadores. Sin anuncios, sin rastreo.</p>
      </footer>
    </div>
  );
}
