// Banner iklan Cybernet Project - pasang di mana aja: <CybernetBanner />
// Klik langsung buka https://cybernet-project.vercel.app di tab baru.
export default function CybernetBanner() {
  return (
    <a
      className="cyb-banner"
      href="https://cybernet-project.vercel.app"
      target="_blank"
      rel="noopener"
      aria-label="Cybernet Project - Jasa Pembuatan Website & Web App"
    >
      <style>{`
        .cyb-banner { display: block; max-width: 1200px; margin: 20px auto; padding: 0 14px; }
        .cyb-banner img { width: 100%; border-radius: 16px; display: block;
          box-shadow: 0 6px 24px rgba(0,0,0,.35);
          transition: transform .25s ease, box-shadow .25s ease; }
        .cyb-banner:hover img { transform: scale(1.01);
          box-shadow: 0 14px 44px rgba(255,107,0,.35); }
      `}</style>
      <img
        src="https://cybernet-project.vercel.app/images/iklan-cybernet-wide.png"
        alt="Cybernet Project - Jasa Pembuatan Website & Web App"
        loading="lazy"
      />
    </a>
  );
}
