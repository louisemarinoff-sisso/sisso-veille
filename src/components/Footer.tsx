export default function Footer() {
  return (
    <footer className="flex items-center justify-between gap-6 mt-16 px-3 pt-6 pb-2 border-t border-line">
      <div className="flex items-center gap-[9px] font-mono text-[10px] tracking-[0.04em] text-ink-2 uppercase">
        <span
          className="w-1.5 h-1.5 rounded-full bg-accent"
          style={{ animation: 'svblink 2.4s ease-in-out infinite' }}
        />
        Agent actif · MAJ lundi 06:00
      </div>
      <div className="flex items-center gap-[14px]">
        <span className="font-mono text-[10px] tracking-[0.1em] text-ink-3 uppercase">
          Neue Haas Display · Swear Display
        </span>
      </div>
    </footer>
  )
}
