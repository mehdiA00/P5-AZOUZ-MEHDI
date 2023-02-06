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

/**
 * Replissage de la page article avec les infos récupérer via l'id renseigné
 * @param { String } imageUrl
 * @param { String } imageAlt
 * @param { String } name
 * @param { String } price
 * @param { String } description
 * @param { String } colors
 **/
function createArticlePage(
  imageUrl,
  imageAlt,
  name,
  price,
  description,
  colors
) {
  //   modification du titre de la page
  document.title = name;

  //   ajout de l'image de l'article
  let item__img = document.getElementsByClassName("item__img");
  let pictureItem = document.createElement("img");
  pictureItem.src = imageUrl;
  pictureItem.alt = imageAlt;
  item__img[0].append(pictureItem);

  //   ajout du titre de l'article
  document.getElementById("title").textContent = name;

  //   ajout du prix de l'article
  document.getElementById("price").textContent = price;

  //   ajout de la description de l'article
  document.getElementById("description").textContent = description;

  //   ajout des couleurs disponibles
  let colorSelector = document.getElementById("colors");

  for (let color of colors) {
    let optionColor = document.createElement("option");
    optionColor.value = color;
    optionColor.textContent = color;
    colorSelector.append(optionColor);
  }
}
