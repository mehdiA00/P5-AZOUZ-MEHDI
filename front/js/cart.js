/**
 * Récuperer tous les articles du site en fonction des id dans le panier pour pouvoir les afficher par la suite
 * @param { String } url
 * @return { Promise }
 **/
function ajax(url, quantity, color) {
  fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (articles) {
      // console.log(articles);
      createPanierArticle(
        articles._id,
        articles.imageUrl,
        articles.altTxt,
        articles.name,
        color,
        articles.price,
        quantity
      );
    })
    .catch(function (err) {
      console.log(err);
    });
}
