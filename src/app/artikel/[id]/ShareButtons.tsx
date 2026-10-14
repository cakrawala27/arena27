'use client';
import { useState } from 'react';

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = title + ' - Arena27';

  return (
    <div className="share-section-bottom">
      <span className="share-label">Bagikan Artikel Ini</span>
      <div className="share-buttons">
        <a 
          href={'https://wa.me/?text=' + encodeURIComponent(shareText + ' ' + url)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="share-btn share-wa"
        >
          <span className="share-icon">📱</span>
          <span>WhatsApp</span>
        </a>
        <a 
          href={'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="share-btn share-fb"
        >
          <span className="share-icon">📘</span>
          <span>Facebook</span>
        </a>
        <a 
          href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText) + '&url=' + encodeURIComponent(url)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="share-btn share-x"
        >
          <span className="share-icon">𝕏</span>
          <span>Twitter</span>
        </a>
        <button 
          onClick={handleCopyLink}
          className={'share-btn share-copy' + (copied ? ' copied' : '')}
        >
          <span className="share-icon">{copied ? '✓' : '🔗'}</span>
          <span>{copied ? 'Tersalin!' : 'Salin Link'}</span>
        </button>
      </div>
    </div>
  );
}
