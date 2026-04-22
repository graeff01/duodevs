const jsQuestions = [
  {
    type: 'choice', q: 'Como criar um array vazio em JavaScript?',
    code: null,
    opts: ['[ ]', '{ }', '( )', '< >'], answer: 0,
    fb: '🎯 Arrays usam colchetes [ ]. Chaves { } são para objetos — diferente!',
    optFb: {
      1: '{ } cria um objeto, não um array. Objetos têm chave:valor (ex: {nome:"Ana"}), arrays têm índices numéricos. Use { } para dados estruturados e [ ] para listas.',
      2: '( ) é para chamadas de função ou agrupamento de expressões, como (2+3)*4. Em JS não existe "( ) = array".',
      3: '< > são operadores de comparação (menor/maior que) ou sintaxe JSX do React. Nunca criam arrays.',
    },
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
    optFb: {
      1: 'add() não existe em arrays JavaScript! Existe em Set (conjunto) e Map, mas não em Array. Essa confusão é comum — lembre: arrays usam push().',
      2: 'append() é de Python! É um erro clássico de quem vem do Python. Em JavaScript o método correto é push().',
      3: 'insert() também não existe em arrays JS. Para inserir em posição específica existe splice(índice, 0, valor). Para o final, push() é mais simples.',
    },
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
    optFb: {
      1: '30 é o valor de nums[2] — o último elemento. .length conta quantos itens existem no array (3), não qual é o maior valor.',
      2: '[10, 20, 30] seria o resultado de console.log(nums) (o array inteiro). Mas aqui pedimos nums.length, que retorna só um número.',
      3: 'undefined aparece quando acessamos algo que não existe. .length é uma propriedade nativa de todo array — sempre existe.',
    },
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
    optFb: {
      0: 'A linha 1 está correta. Em JS o ponto e vírgula é opcional (ASI faz isso automaticamente). O array está bem definido.',
      2: 'console.log(cores) está correto — é a forma padrão de imprimir no console. O bug está na linha 2.',
      3: 'Há sim um erro na linha 2! push["amarelo"] usa colchetes como se fosse acesso a propriedade (cores.push é a função, mas ["amarelo"] não chama ela). Funções precisam de ().',
    },
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
    optFb: {
      1: '"vermelho" está no índice 2, não 0. Arrays começam em 0: cores[0]="azul", cores[1]="verde", cores[2]="vermelho". É um erro comum confundir com a contagem humana que começa em 1.',
      2: 'undefined só retorna quando o índice não existe (ex: cores[99]). O índice 0 sempre existe em um array não vazio.',
      3: 'Não há erro! Acessar um índice válido de um array é sempre seguro e retorna o valor armazenado naquela posição.',
    },
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
    optFb: {
      1: '( ) cria uma tupla, não uma lista. Tuplas são imutáveis — não podem ser modificadas após criadas. Para lista mutável use [ ].',
      2: '{ } cria um set (conjunto sem repetição) ou dict (chave:valor). Para lista sequencial use [ ].',
      3: 'list{} não é sintaxe Python válida. Para lista vazia use [] ou list(). Para converter: list(outra_coisa).',
    },
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
    optFb: {
      1: 'push() é de JavaScript! É um erro clássico de quem vem do JS. Em Python, listas usam append(). Grave: Python=append, JS=push.',
      2: 'add() é o método de Set em Python (conjunto). Para listas use append(). Sets: {1,2,3}.add(4). Listas: [1,2].append(3).',
      3: 'insert(índice, valor) existe em Python, mas insere em posição específica. Ex: lista.insert(0, "x") insere no início. Para o final, append() é mais simples.',
    },
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
    optFb: {
      1: '30 é nums[2], o último elemento. len() conta quantos itens existem (3), não o maior valor da lista.',
      2: '[10, 20, 30] seria o resultado de print(nums) (a lista inteira). print(len(nums)) imprime só o número de itens.',
      3: 'None aparece quando uma função não retorna explicitamente. len() sempre retorna um inteiro — nunca None.',
    },
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
    optFb: {
      0: 'A linha 1 está correta. Em Python o : é usado em blocos (if, for, def, class), não em atribuição de lista.',
      2: 'print(cores) é a forma correta de imprimir em Python 3. O bug está na linha 2, não aqui.',
      3: 'Há sim um erro na linha 2! append["amarelo"] usa colchetes como se fosse acesso a índice. append é uma função — precisa de parênteses: append("amarelo").',
    },
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
    optFb: {
      1: '"vermelho" está em cores[2] (terceiro elemento). Python também começa no índice 0: cores[0]="azul", cores[1]="verde", cores[2]="vermelho".',
      2: 'None não aparece ao acessar um índice válido. Em Python, índice inválido lança IndexError, não retorna None.',
      3: 'Não há erro! cores[0] retorna o primeiro elemento normalmente. Erro só ocorreria com índice fora do intervalo (ex: cores[99]).',
    },
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

const htmlQuestions = [
  {
    type: 'choice', q: 'Qual tag define um parágrafo em HTML?',
    code: null,
    opts: ['<p>', '<para>', '<text>', '<paragraph>'], answer: 0,
    fb: '🎯 <p> é a tag de parágrafo. Sempre abra e feche: <p>...</p>',
    optFb: {
      1: '<para> não existe em HTML. O HTML usa nomes curtos e padronizados: <p> em vez de <para>, <img> em vez de <image>. Abreviações são a regra.',
      2: '<text> existe só em SVG (gráficos vetoriais) para texto dentro de imagens. Em HTML comum, parágrafos usam <p>.',
      3: '<paragraph> parece lógico, mas HTML preferiu abreviações: <p> em vez de <paragraph>, <h1> em vez de <heading1>. Menos digitação, mesmo resultado.',
    },
    explain: {
      code: [
        '~~<p>~~Olá, mundo!~~</p>~~',
        '<!-- Renderiza como um parágrafo de texto -->',
      ],
      tip: '<p> = parágrafo  ·  sempre feche com </p>',
    },
  },
  {
    type: 'fill', q: 'Complete a tag de título principal:',
    code: ['<___>Bem-vindo ao StackUp</___>'],
    opts: ['h1', 'title', 'header', 'h0'], answer: 0,
    fb: '✅ h1 é o título mais importante. A hierarquia vai de h1 (maior) a h6 (menor).',
    optFb: {
      1: '<title> existe em HTML, mas fica dentro do <head> e define o nome na aba do navegador — não aparece no corpo da página. Para títulos visíveis use h1–h6.',
      2: '<header> é uma seção semântica (o cabeçalho de uma página ou artigo), não uma tag de texto. Não define tamanho de fonte automaticamente.',
      3: '<h0> não existe! HTML define h1 a h6. h1 é o mais importante (maior), h6 é o menos importante (menor). Não há h0 ou h7.',
    },
    explain: {
      code: [
        '~~<h1>~~Título Principal~~</h1>~~',
        '<h2>Subtítulo</h2>',
        '<h3>Seção menor</h3>',
      ],
      tip: 'Hierarquia: h1 > h2 > h3 > h4 > h5 > h6',
    },
  },
  {
    type: 'choice', q: 'Qual tag cria um link clicável?',
    code: null,
    opts: ['<a href="url">', '<link>', '<url>', '<go href="url">'], answer: 0,
    fb: '💡 <a> com href cria hyperlinks. href = "Hypertext REFerence".',
    optFb: {
      1: '<link> existe em HTML, mas vai no <head> para importar CSS e fontes: <link rel="stylesheet" href="style.css">. Não cria links clicáveis no conteúdo.',
      2: '<url> não existe em HTML. URLs são valores de atributos (href="url"), não tags. Nunca existiu uma tag <url>.',
      3: '<go href="url"> é inventado — não existe em HTML. Todo link usa <a href="...">. O "a" vem de "anchor" (âncora em inglês).',
    },
    explain: {
      code: [
        '~~<a href="https://stackup.dev">~~',
        '  Clique aqui!',
        '~~</a>~~',
      ],
      tip: '<a> = âncora  ·  href define o destino do link',
    },
  },
  {
    type: 'bug', q: 'Qual linha tem um erro de estrutura?',
    code: ['<div>', '  <p>Texto</div>', '</p>'],
    opts: ['Linha 1: div sem classe', 'Linha 2: </div> antes de </p>', 'Linha 3: </p> isolado', 'Sem erros'],
    answer: 1,
    fb: '🐛 Tags fecham na ordem inversa! Abriu p dentro de div → feche p antes de div.',
    optFb: {
      0: 'A linha 1 está correta. <div> não precisa ter classe ou id — é perfeitamente válido como divisor sem atributos.',
      2: '</p> isolado na linha 3 é consequência do erro na linha 2, não a causa. O problema original é o fechamento fora de ordem na linha 2.',
      3: 'Há sim um erro de estrutura na linha 2! A regra é: feche na ordem inversa da abertura. Abriu div → abriu p → feche p → feche div.',
    },
    explain: {
      code: [
        '// ❌  <div><p>Texto!!</div></p>!!',
        '// ✅  <div>~~<p>Texto</p>~~</div>',
      ],
      tip: 'LIFO: o último aberto é o primeiro a fechar',
    },
  },
  {
    type: 'output', q: 'O que a tag <strong> faz ao texto?',
    code: ['<p>Olá <strong>Mundo</strong>!</p>'],
    opts: ['"Mundo" fica em negrito', 'Texto some', 'Erro de HTML', 'Nada muda'], answer: 0,
    fb: '🏆 <strong> deixa o texto em negrito e indica importância semântica.',
    optFb: {
      1: 'O texto não some! <strong> apenas aplica negrito — o conteúdo permanece visível. Para esconder texto usa-se CSS: display:none ou visibility:hidden.',
      2: '<strong> é HTML válido desde a versão 1. Todos os navegadores modernos (e antigos) suportam. Não gera nenhum erro.',
      3: 'Algo muda sim! <strong> aplica negrito ao texto E indica importância semântica para leitores de tela e mecanismos de busca.',
    },
    explain: {
      code: [
        '<p>Olá ~~<strong>~~Mundo~~</strong>~~!</p>',
        '→ Olá ~~Mundo~~ (negrito)!',
      ],
      tip: '<strong> = negrito semântico  ·  <b> = só visual',
    },
  },
];

const cssQuestions = [
  {
    type: 'choice', q: 'Qual propriedade CSS muda a cor do texto?',
    code: ['p { ___: blue; }'],
    opts: ['color', 'text-color', 'font-color', 'foreground'], answer: 0,
    fb: '🎯 color define a cor do texto. background-color define o fundo.',
    optFb: {
      1: '"text-color" não existe em CSS. Parece intuitivo, mas a propriedade correta é só "color". CSS ignora silenciosamente propriedades inválidas — sem erro, o estilo simplesmente não aplica.',
      2: '"font-color" também não existe. O prefixo "font-" em CSS é exclusivo para tipografia: font-size, font-family, font-weight, font-style. Cor de texto não entra nesse grupo.',
      3: '"foreground" é terminologia de editores (VS Code, Figma, Photoshop) e não é uma propriedade CSS válida. Em CSS a cor do texto é sempre "color".',
    },
    explain: {
      code: [
        'p {',
        '  ~~color~~: ~~blue~~;         /* texto azul */',
        '  background-color: white; /* fundo branco */',
        '}',
      ],
      tip: 'color = texto  ·  background-color = fundo',
    },
  },
  {
    type: 'fill', q: 'Complete para selecionar elementos com classe "titulo":',
    code: ['___titulo { font-size: 24px; }'],
    opts: ['.', '#', '@', '*'], answer: 0,
    fb: '✅ Ponto (.) seleciona classe. # seleciona ID. Sem símbolo = tag HTML.',
    optFb: {
      1: '# seleciona por ID (ex: #menu), que deve ser único por página. Classes podem se repetir. Use # para elementos únicos e . para grupos de elementos.',
      2: '@ é para regras especiais do CSS: @media (responsivo), @keyframes (animações), @import (importar arquivos). Não seleciona elementos.',
      3: '* é o seletor universal — seleciona absolutamente todos os elementos da página. Deve ser usado com cautela pois afeta a performance.',
    },
    explain: {
      code: [
        '~~.~~titulo { color: blue; }  /* classe */',
        '~~#~~menu   { color: red;  }  /* ID */',
        '~~p~~       { color: gray; }  /* tag HTML */',
      ],
      tip: '. = classe  ·  # = id  ·  sem símbolo = tag HTML',
    },
  },
  {
    type: 'output', q: 'O que este CSS cria visualmente?',
    code: ['div {', '  width: 100px;', '  height: 100px;', '  background: #5b5cf6;', '}'],
    opts: ['Um quadrado roxo 100×100px', 'Um texto roxo', 'Uma borda roxa', 'Nada visível'], answer: 0,
    fb: '💡 width + height + background criam uma caixa colorida.',
    optFb: {
      1: 'background define o fundo do elemento, não a cor do texto. Para mudar cor do texto usa-se a propriedade "color". Aqui temos uma caixa com fundo roxo.',
      2: 'Para borda usa-se "border" (ex: border: 2px solid purple). A propriedade "background" preenche o interior do elemento, não a borda.',
      3: 'O div tem width e height definidos — ele ocupa espaço e tem cor de fundo visível. Um elemento fica invisível só se não tiver dimensões ou se tiver display:none.',
    },
    explain: {
      code: [
        'div {',
        '  ~~width: 100px~~;       /* largura */',
        '  ~~height: 100px~~;      /* altura */',
        '  ~~background: #5b5cf6~~; /* cor roxa */',
        '}',
      ],
      tip: 'width + height + background = caixa colorida',
    },
  },
  {
    type: 'bug', q: 'Qual propriedade está escrita errada?',
    code: ['p {', '  colour: blue;', '  font-size: 16px;', '}'],
    opts: ['colour → deveria ser color', 'font-size está errado', 'Faltam aspas', 'Sem erros'], answer: 0,
    fb: '🐛 CSS usa inglês americano: color (não colour). Erro silencioso — a linha é ignorada.',
    optFb: {
      1: 'font-size: 16px está perfeitamente correto! É a forma padrão de definir tamanho de texto. O problema está em "colour" na linha acima.',
      2: 'Valores de cor em CSS não usam aspas — blue, red, #5b5cf6, rgb(0,0,255) são escritos sem aspas. Strings só precisam de aspas em valores como content: "texto".',
      3: 'Há um erro! "colour" é inglês britânico. CSS foi padronizado com inglês americano: color, center, gray (não colour, centre, grey). O navegador ignora a propriedade desconhecida.',
    },
    explain: {
      code: [
        '// ❌  !!colour!!: blue;',
        '// ✅  ~~color~~: blue;',
      ],
      tip: 'CSS ignora propriedades inválidas — sem erro no console',
    },
  },
  {
    type: 'choice', q: 'Como centralizar um elemento horizontalmente com margin?',
    code: ['div { width: 300px; ___ }'],
    opts: ['margin: 0 auto;', 'center: true;', 'align: center;', 'position: center;'], answer: 0,
    fb: '🏆 margin: 0 auto centraliza (precisa de width definido).',
    optFb: {
      1: '"center: true" não existe em CSS. Isso se parece com uma prop de componente React ou configuração de biblioteca. CSS não tem propriedade "center".',
      2: '"align: center" não existe em CSS puro. Você pode estar pensando em text-align: center (centraliza texto) ou align-items: center (usado em Flexbox para centralizar filhos verticalmente).',
      3: '"position: center" não existe. A propriedade position aceita: static, relative, absolute, fixed e sticky. Para centralizar com position use top/left + transform: translate(-50%,-50%).',
    },
    explain: {
      code: [
        'div {',
        '  width: 300px;',
        '  ~~margin: 0 auto~~; /* 0 vertical, auto lados */',
        '}',
      ],
      tip: 'margin: 0 auto = zero topo/baixo, automático nas laterais',
    },
  },
];

export const QUESTIONS_BY_LANG = {
  js:            jsQuestions,
  ts:            jsQuestions,
  html:          htmlQuestions,
  frontend_full: htmlQuestions,
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

export const QUESTIONS_BY_NODE = {
  frontend:  { 0: htmlQuestions, 1: cssQuestions, 2: jsQuestions, 3: jsQuestions, 4: jsQuestions, 5: jsQuestions, 6: jsQuestions },
  backend:   { 0: pyQuestions,   1: pyQuestions,  2: pyQuestions, 3: pyQuestions, 4: pyQuestions, 5: pyQuestions, 6: pyQuestions },
  data:      { 0: pyQuestions,   1: pyQuestions,  2: pyQuestions, 3: pyQuestions, 4: pyQuestions, 5: pyQuestions, 6: pyQuestions },
  mobile:    { 0: jsQuestions,   1: jsQuestions,  2: jsQuestions, 3: jsQuestions, 4: jsQuestions, 5: jsQuestions, 6: jsQuestions },
  fullstack: { 0: htmlQuestions, 1: jsQuestions,  2: jsQuestions, 3: pyQuestions, 4: pyQuestions, 5: jsQuestions, 6: jsQuestions },
  systems:   { 0: pyQuestions,   1: pyQuestions,  2: pyQuestions, 3: pyQuestions, 4: pyQuestions, 5: pyQuestions, 6: pyQuestions },
};

export function getNodeQuestions(track, nodeId, language) {
  return QUESTIONS_BY_NODE[track]?.[nodeId ?? 0]
    ?? QUESTIONS_BY_LANG[language]
    ?? jsQuestions;
}

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
