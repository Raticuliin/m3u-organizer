import { Gamepad2 } from 'lucide-react'; // Te sugiero Gamepad2, se ve un poco mejor, si prefieres el tuyo cambia esto.

export default function Header() {
  // Fallback por si la variable de entorno no está definida en desarrollo
  const appVersion = import.meta.env.PACKAGE_VERSION || '1.0.0';

  return (
    <header className="mb-8 select-none">
      <div className="flex items-center gap-3">
        {/* Logo Container con gradiente sutil y sombra */}
        <div
          className="
            p-2 rounded-xl
            bg-linear-to-br from-emerald-400 to-emerald-600
            shadow-lg shadow-emerald-500/20
            text-stone-950
            shrink-0
          "
        >
          {/* He usado strokeWidth un poco más grueso para que se vea nítido */}
          <Gamepad2 className="w-6 h-6" strokeWidth={2.5} />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-white font-bold tracking-tight text-lg leading-none">
              M3UConverter
            </h1>

            {/* Badge de versión estilo código */}
            <span
              className="
                text-[10px] font-mono
                bg-stone-800/80 text-emerald-400/80
                px-1.5 py-0.5 rounded
                border border-emerald-500/10
              "
            >
              v{appVersion}
            </span>
          </div>

          <p className="text-stone-500 text-xs font-medium mt-0.5">Library Organizer</p>
        </div>
      </div>
    </header>
  );
}
