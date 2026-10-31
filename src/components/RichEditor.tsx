/* ARENA27 ADMIN V2 - admv2-richeditor : tombol [+] Gambar sisip di posisi kursor */
'use client';
import { useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Props = {
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  rows?: number;
};

export default function RichEditor({ value, onChange, required, rows = 14 }: Props) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const wrap = (open: string, close: string = open) => {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = value.substring(start, end);
    const newText = value.substring(0, start) + open + sel + close + value.substring(end);
    onChange(newText);
    setTimeout(() => {
      ta.focus({ preventScroll: true });
      ta.setSelectionRange(start + open.length, end + open.length);
    }, 0);
  };

  // Sisip teks TEPAT di posisi kursor (tengah artikel pun bisa)
  const insertAtCursor = (text: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart ?? value.length;
    const end = ta.selectionEnd ?? start;
    const newText = value.substring(0, start) + text + value.substring(end);
    onChange(newText);
    setTimeout(() => {
      ta.focus({ preventScroll: true });
      const pos = start + text.length;
      ta.setSelectionRange(pos, pos);
    }, 0);
  };

  const insertTemplate = (tpl: string) => insertAtCursor(tpl);

  // Kompres gambar: lebar maks 1600px, JPEG kualitas 82% (hemat kuota 1GB Storage)
  const compressImage = async (file: File): Promise<Blob> => {
    if (/image\/gif/i.test(file.type)) return file;
    try {
      const dataUrl: string = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(String(r.result));
        r.onerror = rej;
        r.readAsDataURL(file);
      });
      const img: HTMLImageElement = await new Promise((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = dataUrl;
      });
      const MAXW = 1600;
      if (img.width <= MAXW && file.size < 250 * 1024) return file;
      const scale = Math.min(1, MAXW / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext('2d');
      if (!ctx) return file;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const blob: Blob | null = await new Promise((res) => canvas.toBlob((b) => res(b), 'image/jpeg', 0.82));
      return blob || file;
    } catch {
      return file;
    }
  };

  const handlePickImage = () => fileRef.current?.click();

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    try {
      const blob = await compressImage(file);
      const ext = blob.type && blob.type.includes('png') ? 'png' : 'jpg';
      const name = Date.now() + '-mid-' + Math.random().toString(36).slice(2, 8) + '.' + ext;
      const { error } = await supabase.storage.from('images').upload(name, blob, {
        contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
      });
      if (error) throw error;
      const { data } = supabase.storage.from('images').getPublicUrl(name);
      if (!data || !data.publicUrl) throw new Error('URL gambar tidak diterima dari server');
      insertAtCursor('\n[IMG]' + data.publicUrl + '[/IMG]\n');
    } catch (err: any) {
      alert('Gagal upload gambar: ' + (err && err.message ? err.message : err));
    }
    setUploading(false);
  };

  return (
    <div className="rte-wrapper">
      <div className="rte-toolbar">
        <button type="button" className="rte-btn rte-btn-img" onClick={handlePickImage} disabled={uploading} title="Sisip gambar tepat di posisi kursor">
          {uploading ? '⏳ Mengunggah...' : '🖼️ + Gambar'}
        </button>
        <span className="rte-divider"></span>
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
      <input ref={fileRef} type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
      <textarea
        ref={taRef}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="rte-textarea"
        placeholder="Tulis berita di sini... Klik [+] Gambar untuk menyisipkan foto di tengah artikel."
      />
      <div className="rte-hint">💡 <b>+ Gambar</b> = upload foto lalu disisipkan sebagai [IMG] tepat di posisi kursor. Blok teks lalu klik tombol format (Bold, H2, H3, Warna, dll).</div>
    </div>
  );
}
