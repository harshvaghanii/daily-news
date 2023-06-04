const API_KEY = "bbaa98a42b5b44ed8b124994d3940ee6";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("world"));

const reload = () => {
  window.location.reload();
};

const fetchNews = async (query) => {
  const response = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
  const data = await response.json();
  bindData(data.articles);
};

const bindData = (articles) => {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";
  if (articles?.length === 0) {
    const noNews = document.createElement("div");
    noNews.innerHTML = `<h1>No news found!</h1>`;
    cardsContainer.appendChild(noNews);
    return;
  }
  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
};

const fillDataInCard = (card, article) => {
  const newsImage = card.querySelector("#news-img");
  const newsTitle = card.querySelector("#news-title");
  const newsSource = card.querySelector("#news-source");
  const newsDesc = card.querySelector("#news-desc");

  newsImage.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name} . ${date}`;
  newsDesc.innerHTML = article.description;
  card.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
};

let currentSelectedNav;

const navItemHandler = (id) => {
  fetchNews(id);
  const navItem = document.getElementById(id);
  currentSelectedNav?.classList.remove("active");
  currentSelectedNav = navItem;
  navItem.classList.add("active");
};

const searchNews = () => {
  currentSelectedNav?.classList.remove("active");
  currentSelectedNav = null;
  const query = document.getElementById("news-input").value;
  if (!query) return;
  fetchNews(query);
};
