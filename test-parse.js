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

const test = '[B][ORANGE]Milan, Arena27 -[/ORANGE][/B] AC Milan bersiap menghadapi Atalanta.';
console.log('Input :', test);
console.log('Output:', parseInlineHtml(test));