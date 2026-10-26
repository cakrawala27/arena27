'use client';
import { useEffect } from 'react';

export default function GoogleTranslate() {
  useEffect(() => {
    // Cegah script dobel
    if (document.getElementById('google-translate-script')) return;

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'id',
          includedLanguages: 'en,id,es,it,pl,ro', // Bisa tambah bahasa lain
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };
  }, []);

  return (
    <div 
      id="google_translate_element" 
      style={{ 
        position: 'fixed', 
        top: 60, 
        right: 16, 
        zIndex: 1000,
        background: '#fff',
        padding: '4px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}
    ></div>
  );
}