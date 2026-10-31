// Banner iklan Cybernet Project - versi 2:
// - HP (layar <= 640px): otomatis pakai versi KOTAK, teks besar & jelas
// - Desktop: tetap versi lebar 1200x400
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
        @media (max-width: 640px) {
          .cyb-banner { padding: 0 10px; margin: 16px auto; }
        }
      `}</style>
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet="https://cybernet-project.vercel.app/images/iklan-cybernet-square.png"
        />
        <img
          src="https://cybernet-project.vercel.app/images/iklan-cybernet-wide.png"
          alt="Cybernet Project - Jasa Pembuatan Website & Web App"
          loading="lazy"
        />
      </picture>
    </a>
  );
}
