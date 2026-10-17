const fs = require('fs');

function parseInlineHtml(text) {
  let s = text;
  s = s.replace(/\[(B|I|H2|H3|ORANGE|WHITE)\s*\[/gi, '[$1][');
  for (let pass = 0; pass < 2; pass++) {
    s = s
      .replace(/\[ORANGE\]([\s\S]*?)\[\/ORANGE\]/gi, '<span class="rte-orange">$1</span>')
      .replace(/\[WHITE\]([\s\S]*?)\[\/WHITE\]/gi, '<span class="rte-white">$1</span>')
      .replace(/\[B\]([\s\S]*?)\[\/B\]/gi, '<strong>$1</strong>')
      .replace(/\[I\]([\s\S]*?)\[\/I\]/gi, '<em>$1</em>');
  }
  s = s.replace(/\[\/?(B|I|H2|H3|ORANGE|WHITE)\]/gi, '');
  return s;
}

function renderRichContent(text) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const preprocessed = escaped
    .replace(/\[B\]\s*\n\s*/g, '')
    .replace(/\s*\n\s*\[\/B\]/g, '')
    .replace(/([^\n])\n*(\[H2\])/g, '$1\n\n[H2]')
    .replace(/(\[\/H2\])\n*([^\n])/g, '[/H2]\n\n$1')
    .replace(/([^\n])\n*(\[H3\])/g, '$1\n\n[H3]')
    .replace(/(\[\/H3\])\n*([^\n])/g, '[/H3]\n\n$1');
  const paragraphs = preprocessed.split(/\n+/).filter(function (p) { return p.trim(); });
  console.log('Total paragraphs:', paragraphs.length);
  console.log('--- PARAGRAF LIST ---');
  paragraphs.forEach(function(p, i) {
    console.log('P' + (i+1) + ':', JSON.stringify(p.substring(0, 80)));
  });
  console.log('--- HTML OUTPUT ---');
  return paragraphs.map(function (p) {
    const h2Match = p.match(/\[H2\]([\s\S]*?)\[\/H2\]/i);
    if (h2Match) return '<h2 class="rte-h2">' + parseInlineHtml(h2Match[1].trim()) + '</h2>';
    const h3Match = p.match(/\[H3\]([\s\S]*?)\[\/H3\]/i);
    if (h3Match) return '<h3 class="rte-h3">' + parseInlineHtml(h3Match[1].trim()) + '</h3>';
    return '<p>' + parseInlineHtml(p) + '</p>';
  }).join('');
}

const content = fs.readFileSync('test-content.txt', 'utf8');
console.log('Panjang content:', content.length);
console.log('=====');
const html = renderRichContent(content);
console.log('Panjang HTML:', html.length);
console.log('=====');
console.log(html);