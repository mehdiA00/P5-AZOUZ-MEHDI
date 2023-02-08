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
/**
 * Récuperer tous les articles du panier
 **/
function lecturePanier() {
  // Récupration du localStorage (panier)
  let basket = JSON.parse(localStorage.getItem("kanapBasket"));

  // pour ne pas récupérer plusieurs fois l'id de l'article séléctionner plusieurs fois
  let idBasket = [];
  for (let article of basket) {
    if (!idBasket.includes(article.id)) {
      idBasket.push(article);
    }
  }

  // Ici, le tableau contient les id en un seul exemplair de chaque article du panier
  for (let article of idBasket) {
    var url = "http://localhost:3000/api/products/" + article.id;
    ajax(url, article.quantity, article.colors);
  }
}
lecturePanier();

/**
 * Récuperer tous les articles du site pour pouvoir les afficher par la suite
 * @param { String } imgSrc
 * @param { String } imgAlt
 * @param { String } name
 * @param { String } color
 * @param { String } price
 * @param { String } quantity
 **/
// Parcours le panier récupèrer et crée un article pour chaque élément trouvé
function createPanierArticle(id, imgSrc, imgAlt, name, color, price, quantity) {
  let cart__items = document.getElementById("cart__items");

  // création de l'article
  let articlePanier = document.createElement("article");
  articlePanier.classList.add("cart__item");
  articlePanier.dataset.id = id;
  articlePanier.dataset.color = color;
  cart__items.append(articlePanier);

  // création de la div img
  let cart__item__img = document.createElement("div");
  cart__item__img.classList.add("cart__item__img");
  articlePanier.append(cart__item__img);

  let img_cart__item__img = document.createElement("img");
  img_cart__item__img.src = imgSrc;
  img_cart__item__img.alt = imgAlt;
  cart__item__img.append(img_cart__item__img);

  // création de la div content
  let cart__item__content = document.createElement("div");
  cart__item__content.classList.add("cart__item__content");
  articlePanier.append(cart__item__content);

  // création de la sous-div content details
  let cart__item__content__description = document.createElement("div");
  cart__item__content__description.classList.add(
    "cart__item__content__description"
  );
  cart__item__content.append(cart__item__content__description);

  // Titre du produit
  let content__description_titre = document.createElement("h2");
  content__description_titre.textContent = name;
  cart__item__content__description.append(content__description_titre);

  // couleur du produit
  let content__description_color = document.createElement("p");
  content__description_color.textContent = color;
  cart__item__content__description.append(content__description_color);

  // prix du produit
  let content__description_price = document.createElement("p");
  content__description_price.textContent = price + " €";
  cart__item__content__description.append(content__description_price);

  // création de la sous-div content settings
  let cart__item__content__settings = document.createElement("div");
  cart__item__content__settings.classList.add("cart__item__content__settings");
  cart__item__content.append(cart__item__content__settings);

  // création de la sous-sous-div quantity
  let cart__item__content__settings__quantity = document.createElement("div");
  cart__item__content__settings__quantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  cart__item__content__settings.append(cart__item__content__settings__quantity);

  // ajout de la quantité
  let content__description_quantity = document.createElement("p");
  content__description_quantity.textContent = "Qté :";
  cart__item__content__settings__quantity.append(content__description_quantity);

  // ajout de la quantité
  let content__description_quantity_input = document.createElement("input");
  content__description_quantity_input.type = "number";
  content__description_quantity_input.classList.add("itemQuantity");
  content__description_quantity_input.name = "itemQuantity";
  content__description_quantity_input.min = 1;
  content__description_quantity_input.max = 100;
  content__description_quantity_input.value = quantity;
  cart__item__content__settings__quantity.append(
    content__description_quantity_input
  );

  // création de la sous-sous-div suppression
  let cart__item__content__settings__delete = document.createElement("div");
  cart__item__content__settings__delete.classList.add(
    "cart__item__content__settings__delete"
  );
  cart__item__content__settings.append(cart__item__content__settings__delete);

  // ajout de l'appel à la suppression
  let delete_btn = document.createElement("p");
  delete_btn.textContent = "Supprimer";
  delete_btn.classList.add("deleteItem");
  cart__item__content__settings__delete.append(delete_btn);
}

// requête vers l'API pour récupérer les prix
function ajaxPrice(url) {
  fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      // console.log(data.price);
      return data.price;
    })
    .catch(function (err) {
      console.log(err);
    });
}

// Calcul du nombre total d'article et du montant total et ajout dans le DOM
function totalArticle() {
  // Récupration du localStorage (panier)
  let basket = JSON.parse(localStorage.getItem("kanapBasket"));

  let totalPrice = 0;
  let quantity = 0;
  for (let article of basket) {
    quantity = parseInt(quantity) + parseInt(article.quantity);

    let url = "http://localhost:3000/api/products/" + article.id;

    // requête vers l'API pour récupérer les prix (qui ne doivent pas être stocké côté client)
    fetch(url)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (data) {
        console.log(data.price * article.quantity);
        totalPrice = totalPrice + article.quantity * data.price;

        // modification de la valeur du total du panier
        document.getElementById("totalPrice").innerText = totalPrice;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // modification du nombre d'articles du panier
  document.getElementById("totalQuantity").innerText = quantity;
}
totalArticle();

// modification de la quantité d'un article
function modifQtyArticle() {
  var selectBtnsQty = document.getElementsByClassName("itemQuantity");
  for (let selectBtnQty of selectBtnsQty) {
    selectBtnQty.addEventListener("change", function () {
      // Lors du changement de quantité => récup l'id de l'article en question
      var modifQtyId = selectBtnQty.closest("article").dataset.id;
      console.log(modifQtyId);

      // Récupration du localStorage (panier)
      let basket = JSON.parse(localStorage.getItem("kanapBasket"));

      // Cherche la ligne contenant l'id recherché
      for (let i = 0; i < basket.length; i++) {
        if (basket[i].id == modifQtyId) {
          console.log(
            "je modifie la quantité de l'article n° " +
              modifQtyId +
              " égal à " +
              basket[i].id
          );
        }
      }

      // ajoute le nouveau tableau dans le localStorage
      localStorage.setItem("kanapBasket", JSON.stringify(basket));

      console.log(localStorage);

      // actualise le total
      totalArticle();
    });
  }
}
