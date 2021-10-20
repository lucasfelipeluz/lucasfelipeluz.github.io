const containerCarregamento = document.querySelector('.carregamento');
const containerPosts = document.querySelector('.container-posts');
const inputFiltro = document.querySelector('.filtro');

let page = 1;

async function fetchPosts() {
  const resposta = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`);
  const dados = await resposta.json();

  return dados;
}

async function adicionarPostsAoDOM() {
  const posts = await fetchPosts();
  const modeloPosts = posts.map(({ id, title, body }) => `
    <div class="post">
      <div class="numero">${id}</div>
      <div class="post-info">
        <h2 class="post-titulo">${title}</h2>
        <p class="post-corpo">${body}</p>
      </div>
    </div>
  `).join('');

  containerPosts.innerHTML += modeloPosts;
};

adicionarPostsAoDOM()

function adicionarMaisPosts() {
  setTimeout(() => {
    page++
    adicionarPostsAoDOM()
  }, 300);
}

function removerCarregamento() {
  setTimeout(() => {
    containerCarregamento.classList.remove('ativo');
    adicionarMaisPosts()
  }, 1000);
}

function mostrarCarregamento() {
  containerCarregamento.classList.add('ativo');
  removerCarregamento();
}

window.addEventListener('scroll', () => {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
  const pertoDoFinalDaPagina = scrollTop + clientHeight >= scrollHeight - 10;

  if (pertoDoFinalDaPagina) {
    mostrarCarregamento();
  }
});

inputFiltro.addEventListener('input', ({target}) => {
  const ValorInput = target.value.toLowerCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const tituloPost = post.querySelector('.post-titulo').textContent.toLowerCase();
    const corpoPost = post.querySelector('.post-corpo').textContent.toLowerCase();

    if (tituloPost.includes(ValorInput) || corpoPost.includes(ValorInput)) {
      post.style.display = 'flex';
      return null;
    }
    post.style.display = 'none';
    return null;
  })
})