const filmesSessao = [];

const botaoAdicionar = document.getElementById('abrir-formulario');
const cardFormulario = document.getElementById('form-card');
const formulario = document.getElementById('form-cadastrar-filme');
const feed = document.getElementById('feed-filmes');

botaoAdicionar.addEventListener('click', abrirFormulario);
document.getElementById('cancelar-cadastro').addEventListener('click', fecharFormulario);

formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const dados = new FormData(formulario);
  const filme = {
    id: Date.now(),
    titulo: dados.get('titulo').trim(),
    genero: dados.get('genero').trim(),
    ano: dados.get('ano'),
    capa: dados.get('capa').trim(),
    sinopse: dados.get('sinopse').trim()
  };

  filmesSessao.unshift(filme);
  feed.prepend(criarCardFilme(filme));
  formulario.reset();
  fecharFormulario();
});

cardFormulario.addEventListener('close', () => {
  botaoAdicionar.setAttribute('aria-expanded', 'false');
});

function abrirFormulario() {
  cardFormulario.showModal();
  botaoAdicionar.setAttribute('aria-expanded', 'true');
  formulario.elements.titulo.focus();
}

function fecharFormulario() {
  cardFormulario.close();
}

function criarCardFilme(filme) {
  const card = document.createElement('article');
  card.className = 'movie-card';

  const imagem = document.createElement('img');
  imagem.src = filme.capa;
  imagem.alt = `Capa de ${filme.titulo}`;
  imagem.addEventListener('error', () => {
    const placeholder = document.createElement('div');
    placeholder.className = 'movie-poster-placeholder';
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute('aria-label', `Capa indisponível para ${filme.titulo}`);
    placeholder.textContent = 'Capa indisponível';
    imagem.replaceWith(placeholder);
  }, { once: true });

  const conteudo = document.createElement('div');
  conteudo.className = 'movie-card-content';

  const genero = document.createElement('span');
  genero.className = 'movie-genre';
  genero.textContent = filme.genero;

  const informacoes = document.createElement('div');
  informacoes.className = 'card-info';

  const titulo = document.createElement('span');
  titulo.className = 'movie-title';
  titulo.textContent = filme.titulo;

  const ano = document.createElement('span');
  ano.className = 'movie-year';
  ano.textContent = filme.ano;

  const sinopse = document.createElement('p');
  sinopse.className = 'movie-synopsis';
  sinopse.textContent = filme.sinopse;

  informacoes.append(titulo, ano);
  conteudo.append(genero, informacoes, sinopse);
  card.append(imagem, conteudo);

  return card;
}