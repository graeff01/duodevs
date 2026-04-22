const jsQuestions = [
  {
    type: 'choice', q: 'Como criar um array vazio em JavaScript?',
    code: null,
    opts: ['[ ]', '{ }', '( )', '< >'], answer: 0,
    fb: '🎯 Arrays usam colchetes [ ]. Chaves { } são para objetos — diferente!',
    explain: {
      code: [
        'const frutas = ~~[ ]~~  // ✓ Array vazio',
        'const pessoa = { }   // ✗ Objeto (diferente!)',
      ],
      tip: '[ ] = Array  ·  { } = Objeto',
    },
  },
  {
    type: 'fill', q: 'Complete o código para adicionar um elemento:',
    code: ['const frutas = ["maçã", "banana"];', 'frutas.___("laranja");'],
    opts: ['push', 'add', 'append', 'insert'], answer: 0,
    fb: '✅ push() adiciona no final do array. É o método mais usado!',
    explain: {
      code: [
        'const frutas = ["maçã", "banana"];',
        'frutas.~~push~~("laranja");',
        '// → ["maçã", "banana", ~~"laranja"~~]',
      ],
      tip: 'push() sempre adiciona no FINAL do array',
    },
  },
  {
    type: 'output', q: 'O que aparece no console?',
    code: ['const nums = [10, 20, 30];', 'console.log(nums.length);'],
    opts: ['3', '30', '[10, 20, 30]', 'undefined'], answer: 0,
    fb: '💡 .length conta os elementos. Temos 3 itens, então retorna 3!',
    explain: {
      code: [
        'const nums = [10,  20,  30];',
        '//           [0]  [1]  [2]  → 3 itens',
        'nums.~~length~~ // → ~~3~~',
      ],
      output: '3',
      tip: '.length conta itens (índice começa em 0, length começa em 1)',
    },
  },
  {
    type: 'bug', q: 'Qual linha tem um erro?',
    code: ['const cores = ["azul", "verde"];', 'cores.push["amarelo"];', 'console.log(cores);'],
    opts: ['Linha 1: falta ;', 'Linha 2: push usa () não [ ]', 'Linha 3: log errado', 'Sem erros'],
    answer: 1,
    fb: '🐛 push é função! Use cores.push("amarelo"). Colchetes são para índices.',
    explain: {
      code: [
        '// ❌  cores.push!!["amarelo"]!!',
        '// ✅  cores.~~push("amarelo")~~',
      ],
      tip: 'Funções usam ( )  ·  Índices/acesso usam [ ]',
    },
  },
  {
    type: 'choice', q: 'O que retorna cores[0]?',
    code: ['const cores = ["azul", "verde", "vermelho"];'],
    opts: ['"azul"', '"vermelho"', 'undefined', 'Erro'], answer: 0,
    fb: '🏆 Arrays começam no índice 0! cores[0] = primeiro item = "azul".',
    explain: {
      code: [
        'const cores = [~~"azul"~~, "verde", "vermelho"]',
        '//                [0]        [1]        [2]',
        'cores[~~0~~] // → ~~"azul"~~',
      ],
      tip: 'Arrays começam no índice 0, não 1',
    },
  },
];

const pyQuestions = [
  {
    type: 'choice', q: 'Como criar uma lista vazia em Python?',
    code: null,
    opts: ['[ ]', '( )', '{ }', 'list{ }'], answer: 0,
    fb: '🎯 Listas em Python usam [ ] igual ao JS! Tuplas usam ( ) e sets usam { }.',
    explain: {
      code: [
        'lista    = ~~[ ]~~   # ✓ Lista vazia',
        'tupla    =  ( )   # Tupla (imutável)',
        'conjunto =  { }   # Set (sem repetição)',
      ],
      tip: '[ ] = Lista  ·  ( ) = Tupla  ·  { } = Set',
    },
  },
  {
    type: 'fill', q: 'Complete o código para adicionar um elemento:',
    code: ['frutas = ["maçã", "banana"]', 'frutas.___(\"laranja\")'],
    opts: ['append', 'push', 'add', 'insert'], answer: 0,
    fb: '✅ Em Python é append(), não push() como no JavaScript!',
    explain: {
      code: [
        'frutas = ["maçã", "banana"]',
        'frutas.~~append~~("laranja")',
        '# → ["maçã", "banana", ~~"laranja"~~]',
      ],
      tip: 'Python: append()  ·  JavaScript: push()',
    },
  },
  {
    type: 'output', q: 'O que aparece no console?',
    code: ['nums = [10, 20, 30]', 'print(len(nums))'],
    opts: ['3', '30', '[10, 20, 30]', 'None'], answer: 0,
    fb: '💡 len() conta os elementos. 3 itens → retorna 3.',
    explain: {
      code: [
        'nums = [10,  20,  30]',
        '#      [0]  [1]  [2]  → 3 itens',
        '~~len(nums)~~ # → ~~3~~',
      ],
      output: '3',
      tip: 'Python: len(lista)  ·  JavaScript: lista.length',
    },
  },
  {
    type: 'bug', q: 'Qual linha tem um erro?',
    code: ['cores = ["azul", "verde"]', 'cores.append["amarelo"]', 'print(cores)'],
    opts: ['Linha 1: falta :', 'Linha 2: append usa () não [ ]', 'Linha 3: print errado', 'Sem erros'],
    answer: 1,
    fb: '🐛 append é função! Use cores.append("amarelo"). Colchetes são para índices.',
    explain: {
      code: [
        '# ❌  cores.append!!["amarelo"]!!',
        '# ✅  cores.~~append("amarelo")~~',
      ],
      tip: 'Funções usam ( )  ·  Índices/acesso usam [ ]',
    },
  },
  {
    type: 'choice', q: 'O que retorna cores[0]?',
    code: ['cores = ["azul", "verde", "vermelho"]'],
    opts: ['"azul"', '"vermelho"', 'None', 'Erro'], answer: 0,
    fb: '🏆 Listas começam no índice 0! cores[0] = primeiro item = "azul".',
    explain: {
      code: [
        'cores = [~~"azul"~~, "verde", "vermelho"]',
        '#           [0]       [1]        [2]',
        'cores[~~0~~] # → ~~"azul"~~',
      ],
      tip: 'Python também começa no índice 0, igual ao JavaScript',
    },
  },
];

export const QUESTIONS_BY_LANG = {
  js:            jsQuestions,
  ts:            jsQuestions,
  html:          jsQuestions,
  frontend_full: jsQuestions,
  mobile_full:   jsQuestions,
  py:            pyQuestions,
  java:          pyQuestions,
  csharp:        pyQuestions,
  go:            pyQuestions,
  rust:          pyQuestions,
  c:             pyQuestions,
  cpp:           pyQuestions,
  backend_full:  pyQuestions,
  data_full:     pyQuestions,
  systems_full:  pyQuestions,
  fullstack_full: jsQuestions,
};

export const TRACKS = [
  {
    id: 'frontend', label: 'Frontend', icon: '🎨', color: '#f97316',
    sub: 'HTML, CSS, JavaScript, React',
    langs: ['html', 'js', 'ts'],
  },
  {
    id: 'backend', label: 'Backend', icon: '⚙️', color: '#10b981',
    sub: 'Python, Java, Go, Node.js',
    langs: ['py', 'java', 'csharp', 'go'],
  },
  {
    id: 'data', label: 'Data Science', icon: '📊', color: '#3b82f6',
    sub: 'Python, SQL, Machine Learning',
    langs: ['py'],
  },
  {
    id: 'mobile', label: 'Mobile', icon: '📱', color: '#8b5cf6',
    sub: 'React Native, Kotlin, Swift',
    langs: ['js', 'ts', 'cpp'],
  },
  {
    id: 'fullstack', label: 'Full Stack', icon: '🚀', color: '#5b5cf6',
    sub: 'Frontend + Backend completo',
    langs: ['js', 'ts', 'py', 'go', 'java'],
  },
  {
    id: 'systems', label: 'Sistemas', icon: '🔧', color: '#ce4a00',
    sub: 'C, C++, Rust — baixo nível',
    langs: ['c', 'cpp', 'rust'],
  },
];

export const LANGS = [
  { id: 'js',     label: 'JavaScript', icon: 'JS',  color: '#f59e0b', badge: '⭐ Mais popular' },
  { id: 'ts',     label: 'TypeScript', icon: 'TS',  color: '#3178c6', badge: '🔷 JS com tipos' },
  { id: 'py',     label: 'Python',     icon: 'Py',  color: '#3b82f6', badge: '🐍 Fácil de aprender' },
  { id: 'java',   label: 'Java',       icon: '☕',   color: '#e76f00', badge: '☕ Muito usado' },
  { id: 'c',      label: 'C',          icon: 'C',   color: '#5c6bc0', badge: '⚡ Baixo nível' },
  { id: 'cpp',    label: 'C++',        icon: 'C++', color: '#00599c', badge: '🚀 Alta performance' },
  { id: 'csharp', label: 'C#',         icon: 'C#',  color: '#9b4f96', badge: '🪟 Microsoft / .NET' },
  { id: 'rust',   label: 'Rust',       icon: '🦀',  color: '#ce4a00', badge: '🦀 Ultra rápido' },
  { id: 'go',     label: 'Go',         icon: 'Go',  color: '#00acd7', badge: '🐹 Google' },
  { id: 'html',   label: 'HTML/CSS',   icon: '</>',  color: '#f97316', badge: '🎨 Web visual' },
];

export const NODE_OFFSETS = [90, -90, 0, 85, -85, 0, 0];

export const NODES_BY_TRACK = {
  frontend: [
    { id: 0, label: 'HTML Básico',   emoji: '📄', xp: 200, lessons: 5 },
    { id: 1, label: 'CSS & Layout',  emoji: '🎨', xp: 220, lessons: 5 },
    { id: 2, label: 'JavaScript',    emoji: '⚡', xp: 240, lessons: 5 },
    { id: 3, label: 'DOM & Eventos', emoji: '🖱️', xp: 280, lessons: 6 },
    { id: 4, label: 'React',         emoji: '⚛️', xp: 320, lessons: 7 },
    { id: 5, label: 'APIs & HTTP',   emoji: '🌐', xp: 360, lessons: 6 },
    { id: 6, label: 'Boss',          emoji: '👑', xp: 500, lessons: 1, boss: true },
  ],
  backend: [
    { id: 0, label: 'Python Básico',   emoji: '🐍', xp: 200, lessons: 5 },
    { id: 1, label: 'Funções',         emoji: '⚙️', xp: 220, lessons: 5 },
    { id: 2, label: 'Listas & Dicts',  emoji: '📋', xp: 240, lessons: 5 },
    { id: 3, label: 'POO',             emoji: '🧩', xp: 280, lessons: 6 },
    { id: 4, label: 'APIs REST',       emoji: '🌐', xp: 320, lessons: 7 },
    { id: 5, label: 'Banco de Dados',  emoji: '🗄️', xp: 360, lessons: 6 },
    { id: 6, label: 'Boss',            emoji: '👑', xp: 500, lessons: 1, boss: true },
  ],
  data: [
    { id: 0, label: 'Python Básico',    emoji: '🐍', xp: 200, lessons: 5 },
    { id: 1, label: 'NumPy',            emoji: '🔢', xp: 240, lessons: 5 },
    { id: 2, label: 'Pandas',           emoji: '🐼', xp: 280, lessons: 5 },
    { id: 3, label: 'Visualização',     emoji: '📊', xp: 300, lessons: 6 },
    { id: 4, label: 'Machine Learning', emoji: '🤖', xp: 380, lessons: 7 },
    { id: 5, label: 'Estatística',      emoji: '📈', xp: 420, lessons: 6 },
    { id: 6, label: 'Boss',             emoji: '👑', xp: 500, lessons: 1, boss: true },
  ],
  mobile: [
    { id: 0, label: 'JS Básico',     emoji: '⚡', xp: 200, lessons: 5 },
    { id: 1, label: 'React Native',  emoji: '📱', xp: 240, lessons: 5 },
    { id: 2, label: 'Navegação',     emoji: '🧭', xp: 260, lessons: 5 },
    { id: 3, label: 'State & Hooks', emoji: '🔄', xp: 290, lessons: 6 },
    { id: 4, label: 'APIs & HTTP',   emoji: '🌐', xp: 320, lessons: 7 },
    { id: 5, label: 'Publicação',    emoji: '🚀', xp: 360, lessons: 5 },
    { id: 6, label: 'Boss',          emoji: '👑', xp: 500, lessons: 1, boss: true },
  ],
  fullstack: [
    { id: 0, label: 'HTML & CSS',     emoji: '🎨', xp: 200, lessons: 5 },
    { id: 1, label: 'JavaScript',     emoji: '⚡', xp: 240, lessons: 5 },
    { id: 2, label: 'React',          emoji: '⚛️', xp: 280, lessons: 5 },
    { id: 3, label: 'Node.js',        emoji: '🔧', xp: 300, lessons: 6 },
    { id: 4, label: 'Banco de Dados', emoji: '🗄️', xp: 340, lessons: 7 },
    { id: 5, label: 'Deploy',         emoji: '☁️', xp: 380, lessons: 5 },
    { id: 6, label: 'Boss',           emoji: '👑', xp: 500, lessons: 1, boss: true },
  ],
  systems: [
    { id: 0, label: 'C Básico',    emoji: '⚡', xp: 200, lessons: 5 },
    { id: 1, label: 'Ponteiros',   emoji: '🎯', xp: 280, lessons: 5 },
    { id: 2, label: 'Memória',     emoji: '🧠', xp: 300, lessons: 5 },
    { id: 3, label: 'Estruturas',  emoji: '📦', xp: 340, lessons: 6 },
    { id: 4, label: 'Algoritmos',  emoji: '🔢', xp: 380, lessons: 7 },
    { id: 5, label: 'C++ & Rust',  emoji: '🦀', xp: 420, lessons: 6 },
    { id: 6, label: 'Boss',        emoji: '👑', xp: 500, lessons: 1, boss: true },
  ],
};

export const GOALS = [
  { id: 'work',  icon: '💼', title: 'Trabalhar com tech',    sub: 'Entrar no mercado' },
  { id: 'hobby', icon: '🎯', title: 'Aprender por hobby',    sub: 'No meu ritmo' },
  { id: 'app',   icon: '🚀', title: 'Criar meu próprio app', sub: 'Do zero ao produto' },
];

export const TIMES = [
  { id: 5,  label: '5 min',  sub: 'Rápido e direto' },
  { id: 10, label: '10 min', sub: 'Recomendado ⭐', hot: true },
  { id: 15, label: '15 min', sub: 'Modo dedicado' },
];

export const DEFAULT_STATE = {
  streak: 14, xp: 680, xpMax: 1000, level: 7, coins: 320,
  goal: null, track: null, dailyTime: null, language: 'js',
  completedNodes: [0, 1], activeNode: 2,
};
