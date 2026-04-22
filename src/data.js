export const QUESTIONS = [
  {
    type: 'choice', q: 'Como criar um array vazio em JavaScript?',
    code: null,
    opts: ['[ ]', '{ }', '( )', '< >'], answer: 0,
    fb: '🎯 Arrays usam colchetes [ ]. Chaves { } são para objetos — diferente!',
  },
  {
    type: 'fill', q: 'Complete o código para adicionar um elemento:',
    code: ['const frutas = ["maçã", "banana"];', 'frutas.___("laranja");'],
    opts: ['push', 'add', 'append', 'insert'], answer: 0,
    fb: '✅ push() adiciona no final do array. É o método mais usado!',
  },
  {
    type: 'output', q: 'O que aparece no console?',
    code: ['const nums = [10, 20, 30];', 'console.log(nums.length);'],
    opts: ['3', '30', '[10, 20, 30]', 'undefined'], answer: 0,
    fb: '💡 .length conta os elementos. Temos 3 itens, então retorna 3!',
  },
  {
    type: 'bug', q: 'Qual linha tem um erro?',
    code: ['const cores = ["azul", "verde"];', 'cores.push["amarelo"];', 'console.log(cores);'],
    opts: ['Linha 1: falta ;', 'Linha 2: push usa () não [ ]', 'Linha 3: log errado', 'Sem erros'],
    answer: 1,
    fb: '🐛 push é função! Use cores.push("amarelo"). Colchetes são para índices.',
  },
  {
    type: 'choice', q: 'O que retorna cores[0]?',
    code: ['const cores = ["azul", "verde", "vermelho"];'],
    opts: ['"azul"', '"vermelho"', 'undefined', 'Erro'], answer: 0,
    fb: '🏆 Arrays começam no índice 0! cores[0] = primeiro item = "azul".',
  },
];

export const LANGS = [
  { id: 'js',     label: 'JavaScript', icon: 'JS',  color: '#f59e0b', bg: '#fffbeb', badge: '⭐ Mais popular' },
  { id: 'ts',     label: 'TypeScript', icon: 'TS',  color: '#3178c6', bg: '#eff6ff', badge: '🔷 JS com tipos' },
  { id: 'py',     label: 'Python',     icon: 'Py',  color: '#3b82f6', bg: '#eff6ff', badge: '🐍 Fácil de aprender' },
  { id: 'java',   label: 'Java',       icon: '☕',   color: '#e76f00', bg: '#fff7ed', badge: '☕ Muito usado' },
  { id: 'c',      label: 'C',          icon: 'C',   color: '#5c6bc0', bg: '#f0f0ff', badge: '⚡ Baixo nível' },
  { id: 'cpp',    label: 'C++',        icon: 'C++', color: '#00599c', bg: '#e8f4fc', badge: '🚀 Alta performance' },
  { id: 'csharp', label: 'C#',         icon: 'C#',  color: '#9b4f96', bg: '#f9eeff', badge: '🪟 Microsoft / .NET' },
  { id: 'rust',   label: 'Rust',       icon: '🦀',   color: '#ce4a00', bg: '#fff2ec', badge: '🦀 Ultra rápido' },
  { id: 'go',     label: 'Go',         icon: 'Go',  color: '#00acd7', bg: '#e8faff', badge: '🐹 Google' },
  { id: 'html',   label: 'HTML/CSS',   icon: '</>', color: '#f97316', bg: '#fff7ed', badge: '🎨 Web visual' },
];

export const MAP_NODES = [
  { id: 0, label: 'Variáveis', icon: '📦', state: 'done' },
  { id: 1, label: 'Condições', icon: '🔀', state: 'done' },
  { id: 2, label: 'Arrays',    icon: '📋', state: 'active' },
  { id: 3, label: 'Funções',   icon: '⚙️', state: 'locked' },
  { id: 4, label: 'Loops',     icon: '🔁', state: 'locked' },
  { id: 5, label: 'Objetos',   icon: '🗂️', state: 'locked' },
  { id: 6, label: 'Boss 👑',   icon: '👑', state: 'locked', boss: true },
];

export const GOALS = [
  { id: 'work',  icon: '💼', title: 'Trabalhar com tech',   sub: 'Entrar no mercado' },
  { id: 'hobby', icon: '🎯', title: 'Aprender por hobby',   sub: 'No meu ritmo' },
  { id: 'app',   icon: '🚀', title: 'Criar meu próprio app', sub: 'Do zero ao produto' },
];

export const TIMES = [
  { id: 5,  label: '5 min',  sub: 'Rápido e direto' },
  { id: 10, label: '10 min', sub: 'Recomendado ⭐', hot: true },
  { id: 15, label: '15 min', sub: 'Modo dedicado' },
];

export const DEFAULT_STATE = {
  streak: 14, xp: 680, xpMax: 1000, level: 7, coins: 320,
  goal: null, dailyTime: null, language: 'js',
};
