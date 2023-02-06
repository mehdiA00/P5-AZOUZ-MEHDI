// Récupèrer l'id transmis dans le liens pour effectuer une requête avec celui ci en paramètre
var actualUrl = document.location.href;
actualUrl = new URL(actualUrl);
var id = actualUrl.searchParams.get("id");

const url = "http://localhost:3000/api/products/" + id;

/**
 * Récuperer l'article associé à l'id transmis pour en afficher les details par la suite
 * @param { String } url
 * @return { Promise }
 **/
function ajax(url) {
  fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (article) {
      createArticlePage(
        article.imageUrl,
        article.altTxt,
        article.name,
        article.price,
        article.description,
        article.colors
      );
      gestionPanier(id, article.name);
    })
    .catch(function (err) {
      console.log(err);
    });
}
ajax(url);
