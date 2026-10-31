// Auditoria dos protótipos. Rode com a ferramenta de JavaScript do navegador, em qualquer página de
// http://localhost:3000. Cada combinação abre num iframe, e o resultado volta em JSON.
(async () => {
  // Ajuste as três listas conforme a tarefa
  const EXEMPLOS = ["exemplo-transportadora", "exemplo-transportadora-minimo"];
  const MODELOS = ["cartao", "simples", "orcamento", "completo"];
  const LARGURAS = [375, 1280];

  const MAXIMO_POR_TIPO = 5;
  const TEXTO_QUEBRADO = /\b(undefined|NaN|null)\b|\[object Object\]|lorem ipsum/i;
  const CAMPO_SENSIVEL = /sintoma|queixa|diagn[oó]stic|doen[cç]a|conv[eê]nio|medica[cç]|motivo|cpf|\brg\b/i;
  const LINK_VAZIO = /^(tel:|mailto:|https:\/\/wa\.me\/?)(\?.*)?$/;
  const CLICAVEIS = "a[href],button,input,select,textarea,summary";

  const esperar = (ms) => new Promise((pronto) => setTimeout(pronto, ms));

  // As cores do Tailwind 4 vêm em oklch: o canvas converte qualquer formato para RGB
  const pincel = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const cores = new Map();
  function rgba(cor) {
    if (!cores.has(cor)) {
      pincel.clearRect(0, 0, 1, 1);
      pincel.fillStyle = cor;
      pincel.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = pincel.getImageData(0, 0, 1, 1).data;
      cores.set(cor, { r, g, b, a: a / 255 });
    }
    return cores.get(cor);
  }

  const sobre = (c, f) => ({
    r: c.r * c.a + f.r * (1 - c.a),
    g: c.g * c.a + f.g * (1 - c.a),
    b: c.b * c.a + f.b * (1 - c.a),
    a: 1,
  });
  const canal = (v) => (v / 255 <= 0.03928 ? v / 255 / 12.92 : ((v / 255 + 0.055) / 1.055) ** 2.4);
  const luz = (c) => 0.2126 * canal(c.r) + 0.7152 * canal(c.g) + 0.0722 * canal(c.b);
  function contraste(a, b) {
    const [claro, escuro] = [luz(a), luz(b)].sort((x, y) => y - x);
    return (claro + 0.05) / (escuro + 0.05);
  }
  const sobrepoe = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;

  function descrever(el) {
    const texto = el.innerText || el.getAttribute("alt") || el.getAttribute("aria-label") || el.getAttribute("href") || "";
    return `<${el.tagName.toLowerCase()}> ${texto.trim().replace(/\s+/g, " ").slice(0, 50)}`;
  }

  async function abrir(url, largura) {
    const quadro = document.createElement("iframe");
    quadro.style.cssText = `position:fixed;left:-20000px;top:0;border:0;width:${largura}px;height:800px`;
    const carregou = new Promise((pronto) => (quadro.onload = pronto));
    quadro.src = url;
    document.body.append(quadro);
    await carregou;
    await esperar(400);
    return quadro;
  }

  async function auditar(url, largura) {
    const achados = [];
    const anotar = (tipo, detalhe) => achados.push({ tipo, detalhe });

    const resposta = await fetch(url);
    if (resposta.status !== 200) anotar("http", resposta.status);
    if (!(resposta.headers.get("x-robots-tag") || "").includes("noindex")) anotar("sem-noindex", url);

    const quadro = await abrir(url, largura);
    const janela = quadro.contentWindow;
    const doc = janela.document;
    const estilo = (el) => janela.getComputedStyle(el);

    // O celular tem barra de rolagem por cima da página, sem ocupar largura
    const semBarra = doc.createElement("style");
    semBarra.textContent = "html{scrollbar-width:none}";
    doc.head.append(semBarra);

    // Percorre a página para carregar imagens e disparar animações de entrada
    for (let y = 0; y < doc.documentElement.scrollHeight; y += 600) {
      janela.scrollTo(0, y);
      await esperar(40);
    }
    const limite = Date.now() + 3000;
    while ([...doc.images].some((img) => !img.complete) && Date.now() < limite) await esperar(100);
    janela.scrollTo(0, 0);
    await esperar(120);

    const tela = doc.documentElement.clientWidth;
    if (doc.documentElement.scrollWidth > tela + 1) anotar("rolagem-lateral", `${doc.documentElement.scrollWidth}px numa tela de ${tela}px`);
    if (TEXTO_QUEBRADO.test(doc.body.innerText)) anotar("texto-quebrado", doc.body.innerText.match(TEXTO_QUEBRADO)[0]);
    if (doc.documentElement.outerHTML.includes("plus.unsplash.com")) anotar("foto-proibida", "plus.unsplash.com");

    const opacidade = (el) => {
      let total = 1;
      for (let a = el; a; a = a.parentElement) total *= parseFloat(estilo(a).opacity);
      return total;
    };
    const fixo = (el) => {
      for (let a = el; a; a = a.parentElement) if (estilo(a).position === "fixed") return true;
      return false;
    };
    const recortado = (el) => {
      for (let a = el.parentElement; a && a !== doc.body && a !== doc.documentElement; a = a.parentElement) {
        if (estilo(a).overflowX !== "visible") return true;
      }
      return false;
    };
    const visiveis = [...doc.body.querySelectorAll("*")].filter((el) => {
      if (["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"].includes(el.tagName)) return false;
      const caixa = el.getBoundingClientRect();
      return caixa.width > 0 && caixa.height > 0 && estilo(el).visibility !== "hidden" && opacidade(el) > 0.05;
    });
    const fotos = visiveis.filter((el) => ["IMG", "VIDEO", "CANVAS"].includes(el.tagName)).map((el) => el.getBoundingClientRect());

    function fundoDe(el) {
      const caixa = el.getBoundingClientRect();
      if (fotos.some((foto) => sobrepoe(foto, caixa))) return null; // texto sobre foto: só dá para julgar na imagem
      const camadas = [];
      for (let a = el; a; a = a.parentElement) {
        const est = estilo(a);
        if (est.backgroundImage !== "none") return null;
        const cor = rgba(est.backgroundColor);
        if (cor.a > 0) {
          camadas.push(cor);
          if (cor.a === 1) break;
        }
      }
      return camadas.reduceRight((f, c) => sobre(c, f), { r: 255, g: 255, b: 255, a: 1 });
    }

    let baseDaFaixa = 0;
    for (const el of visiveis) {
      const caixa = el.getBoundingClientRect();
      const est = estilo(el);
      const temTexto = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());

      if (est.position === "fixed" && caixa.top <= 0 && caixa.height < 200) baseDaFaixa = Math.max(baseDaFaixa, caixa.bottom);

      const fora = caixa.right > tela + 1 || caixa.left < -1;
      if (fora && !fixo(el)) {
        if (temTexto) anotar("texto-cortado", descrever(el));
        else if (!recortado(el)) anotar("fora-da-tela", descrever(el));
      }

      if (temTexto) {
        // Texto que só invade o espaçamento do próprio botão não é problema: a comparação é com o elemento pai
        const trecho = doc.createRange();
        trecho.selectNodeContents(el);
        if (est.overflowX !== "visible" && el.scrollWidth > el.clientWidth + 1) anotar("texto-cortado", descrever(el));
        else if (trecho.getBoundingClientRect().right > el.parentElement.getBoundingClientRect().right + 1) {
          anotar(estilo(el.parentElement).overflowX === "visible" ? "texto-vazando" : "texto-cortado", descrever(el));
        }
        if (est.overflowY !== "visible" && el.clientHeight > 0 && el.scrollHeight > el.clientHeight + 1) anotar("texto-cortado", descrever(el));

        const fundo = fundoDe(el);
        if (fundo) {
          const cor = rgba(est.color);
          const tinta = sobre({ ...cor, a: cor.a * opacidade(el) }, fundo);
          const grande = parseFloat(est.fontSize) >= 24 || (parseFloat(est.fontSize) >= 18.66 && parseInt(est.fontWeight, 10) >= 700);
          const razao = contraste(tinta, fundo);
          if (razao < (grande ? 3 : 4.5)) anotar("contraste", `${razao.toFixed(2)} em ${descrever(el)}`);
        }
      }

      if (el.tagName === "IMG") {
        if (!el.hasAttribute("alt")) anotar("sem-alt", el.currentSrc || el.src);
        if (el.complete && el.naturalWidth === 0) anotar("foto-quebrada", el.currentSrc || el.src);
      }

      if (el.tagName === "A") {
        const destino = el.getAttribute("href") || "";
        if (LINK_VAZIO.test(destino)) anotar("link-vazio", descrever(el));
        if (destino.length > 1 && destino.startsWith("#") && !doc.getElementById(destino.slice(1))) anotar("ancora-quebrada", destino);
      }

      if (["INPUT", "SELECT", "TEXTAREA"].includes(el.tagName) && el.type !== "hidden") {
        const rotulo = (el.labels && el.labels[0] && el.labels[0].innerText) || el.getAttribute("aria-label");
        if (!rotulo) anotar("campo-sem-rotulo", el.id || el.name || el.placeholder);
        if (CAMPO_SENSIVEL.test(`${rotulo} ${el.placeholder} ${el.id} ${el.name}`)) anotar("campo-sensivel", rotulo || el.placeholder);
      }

      if (tela <= 480 && el.matches(CLICAVEIS) && est.display !== "inline" && caixa.height < 36) {
        anotar("alvo-pequeno", `${Math.round(caixa.height)}px em ${descrever(el)}`);
      }
    }

    const titulos = visiveis.filter((el) => el.tagName === "H1");
    if (titulos.length !== 1) anotar("titulo-principal", `${titulos.length} h1 na página`);
    if (titulos[0] && titulos[0].getBoundingClientRect().top < baseDaFaixa) anotar("coberto-pela-faixa", descrever(titulos[0]));

    quadro.remove();
    return achados;
  }

  let paginas = 0;
  let limpas = 0;
  const porTipo = {};
  for (const exemplo of EXEMPLOS) {
    for (const modelo of MODELOS) {
      for (const largura of LARGURAS) {
        const achados = await auditar(`/p/${exemplo}?modelo=${modelo}`, largura);
        paginas += 1;
        limpas += achados.length === 0;
        for (const { tipo, detalhe } of achados) {
          const grupo = (porTipo[tipo] ||= { total: 0, onde: new Set(), exemplos: new Set() });
          grupo.total += 1;
          grupo.onde.add(`${exemplo} ${modelo} ${largura}`);
          if (grupo.exemplos.size < MAXIMO_POR_TIPO) grupo.exemplos.add(detalhe);
        }
      }
    }
  }
  for (const grupo of Object.values(porTipo)) {
    grupo.onde = [...grupo.onde];
    grupo.exemplos = [...grupo.exemplos];
  }
  return { paginas, limpas, porTipo };
})();
