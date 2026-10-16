'use client';
import { useRef } from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  rows?: number;
};

export default function RichEditor({ value, onChange, required, rows = 14 }: Props) {
  const taRef = useRef<HTMLTextAreaElement>(null);

  const wrap = (open: string, close: string = open) => {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = value.substring(start, end);
    const newText = value.substring(0, start) + open + sel + close + value.substring(end);
    onChange(newText);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + open.length, end + open.length);
    }, 0);
  };

  const insertTemplate = (tpl: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const newText = value.substring(0, start) + tpl + value.substring(start);
    onChange(newText);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + tpl.length, start + tpl.length);
    }, 0);
  };

  return (
    <div className="rte-wrapper">
      <div className="rte-toolbar">
        <button type="button" className="rte-btn" onClick={() => wrap('[B]', '[/B]')} title="Bold"><b>B</b></button>
        <button type="button" className="rte-btn" onClick={() => wrap('[I]', '[/I]')} title="Italic"><i>I</i></button>
        <span className="rte-divider"></span>
        <button type="button" className="rte-btn rte-btn-h" onClick={() => wrap('\n[H2]', '[/H2]\n')} title="Judul Besar">H2</button>
        <button type="button" className="rte-btn rte-btn-h" onClick={() => wrap('\n[H3]', '[/H3]\n')} title="Sub-judul">H3</button>
        <span className="rte-divider"></span>
        <button type="button" className="rte-btn rte-btn-orange" onClick={() => wrap('[ORANGE]', '[/ORANGE]')} title="Warna Orange">🎨</button>
        <button type="button" className="rte-btn" onClick={() => wrap('[WHITE]', '[/WHITE]')} title="Warna Putih">⚪</button>
        <span className="rte-divider"></span>
        <button type="button" className="rte-btn rte-btn-dateline" onClick={() => insertTemplate('[B][ORANGE]London, Arena27[/ORANGE][/B] - ')} title="Template Dateline Berita">📅 Dateline</button>
      </div>
      <textarea
        ref={taRef}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="rte-textarea"
        placeholder="Tulis berita di sini... Blok teks lalu klik tombol format di atas."
      />
      <div className="rte-hint">💡 Blok teks lalu klik tombol untuk menerapkan format (Bold, H2, H3, Warna, dll). Preview muncul otomatis di halaman artikel.</div>
    </div>
  );
}
