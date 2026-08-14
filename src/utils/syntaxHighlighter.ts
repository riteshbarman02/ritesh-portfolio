// VS Code-inspired syntax highlighter
interface Token {
  type: string;
  value: string;
}

// Language-specific patterns
const patterns: { [key: string]: RegExp[] } = {
  javascript: [
    /\b(function|const|let|var|if|else|for|while|return|class|import|export|async|await|try|catch|finally|throw|new|this|super)\b/g,
    /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/g,
    /\/\/.*$/gm,
    /\/\*[\s\S]*?\*\//g,
    /\b\d+\b/g,
    /\b[A-Z][a-zA-Z0-9]*\b/g,
  ],
  typescript: [
    /\b(function|const|let|var|if|else|for|while|return|class|import|export|async|await|try|catch|finally|throw|new|this|super|interface|type|enum)\b/g,
    /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/g,
    /\/\/.*$/gm,
    /\/\*[\s\S]*?\*\//g,
    /\b\d+\b/g,
    /\b[A-Z][a-zA-Z0-9]*\b/g,
  ],
  html: [
    /<\/?[a-zA-Z][a-zA-Z0-9]*\b/g,
    /\w+(?==)/g,
    /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,
  ],
  css: [
    /\b(color|background|margin|padding|font-size|width|height|display|position|flex|grid)\b/g,
    /#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgba?\([^)]*\)/g,
    /\.[a-zA-Z_][a-zA-Z0-9_-]*/g,
    /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,
  ],
  python: [
    /\b(def|class|if|else|elif|for|while|return|import|from|as|try|except|finally|with|lambda|async|await)\b/g,
    /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,
    /#.*$/gm,
    /\b\d+\b/g,
    /\b[A-Z_][A-Z0-9_]*\b/g,
  ],
};

const keywordMap: { [key: string]: string } = {
  javascript: 'vs-keyword',
  typescript: 'vs-keyword',
  python: 'vs-keyword',
  keyword: 'vs-keyword',
  string: 'vs-string',
  comment: 'vs-comment',
  number: 'vs-number',
  tag: 'vs-tag',
  attribute: 'vs-attribute',
  function: 'vs-function',
  class: 'vs-class',
};

export function highlightCode(code: string, language: string = 'javascript'): string {
  if (!language) language = 'javascript';

  let highlighted = code;
  const langPatterns = patterns[language.toLowerCase()] || patterns.javascript;

  // Comment pattern - should be applied first
  highlighted = highlighted.replace(/\/\/.*$/gm, (match) => {
    return `<span class="vs-comment">${escapeHtml(match)}</span>`;
  });

  // Block comments
  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, (match) => {
    return `<span class="vs-comment">${escapeHtml(match)}</span>`;
  });

  // Strings - preserve them to avoid nested highlighting
  const stringMatches: { [key: string]: string } = {};
  let stringIndex = 0;
  highlighted = highlighted.replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g, (match) => {
    const placeholder = `__STRING_${stringIndex}__`;
    stringMatches[placeholder] = `<span class="vs-string">${escapeHtml(match)}</span>`;
    stringIndex++;
    return placeholder;
  });

  // Numbers
  highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="vs-number">$1</span>');

  // Keywords
  const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'interface', 'type', 'enum', 'def', 'elif', 'with', 'lambda', 'from', 'as'];
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    highlighted = highlighted.replace(regex, `<span class="vs-keyword">${keyword}</span>`);
  });

  // Class names (PascalCase)
  highlighted = highlighted.replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="vs-class">$1</span>');

  // Function calls (word followed by parenthesis)
  highlighted = highlighted.replace(/\b([a-z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="vs-function">$1</span>');

  // Operators
  highlighted = highlighted.replace(/([=+\-*/%&|^!<>]+)/g, '<span class="vs-operator">$1</span>');

  // Restore string placeholders
  Object.entries(stringMatches).forEach(([placeholder, replacement]) => {
    highlighted = highlighted.replace(new RegExp(placeholder, 'g'), replacement);
  });

  return highlighted;
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
