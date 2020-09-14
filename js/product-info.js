function showProductsList(array, images) {

  let htmlContentToAppend = "";
  let gallery = "";

  htmlContentToAppend += `

<div class="container">
<h2>` + array.name + `</h2>
<hr>
<p style><strong>Precio</strong>
<br>
` + array.currency + ` ` + array.cost + ` </p>
<p style><strong>Descripción</strong>
<br>
` + array.description + ` </p>
<p style><strong> Categoría</strong>
<br>
<a href="category-info.html"> ` + array.category + ` </a></p>
<p><strong>Cantidad de vendidos</strong>
<br>
` + array.soldCount + `</p>
</div>
`
  for (let i = 0; i < images.length; i++) {
    let imageSrc = images[i];

    gallery += `
    <div class="col-lg-3 col-md-4 col-8>
    <div class="d-block mb-4 h-100">
    <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
    </div>
    </div>
    `
  }
  document.getElementById("productInfo").innerHTML = htmlContentToAppend + gallery;

}

function Rating(score) {
  let stars = "";
  let cont = 0;

  for (let i = 0; i < score; i++) {
    stars += `
        <span class = "fa fa-star checked"></span>
        `
    cont++;
  }
  while (cont != 5) {
    stars += `
        <span class = "fa fa-star"></span>
        `
    cont++;
  }
  return stars;
}

function showComments(array) {

  let htmlContentToAppend = "";

  htmlContentToAppend += `
      <div class="container">
      <h5><strong>Comentarios</strong></h5>
      <hr>
      </div>
                    `
  for (let i = 0; i < array.length; i++) {
    let user = array[i].user;
    let date = array[i].dateTime;
    let comment = array[i].description;
    let score = array[i].score;

    htmlContentToAppend += `
      <div class="container">
      <h5><strong>` + user + ` </strong> - ` + date + ` - ` + Rating(score) + `<h5></h5>
      <p> `+ comment + `</p>
      <hr>
      </div>`

  }
  document.getElementById("productComments").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productInfoArray = resultObj.data;
      productImageArray = resultObj.data.images;
      showProductsList(productInfoArray, productImageArray);

    }
  });
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      commentsArray = resultObj.data;
      productImageArray = resultObj.data.images;
      console.log(commentsArray);
      showComments(commentsArray);
    }
  });
});

const newComment_input = document.getElementById("newComment");
newComment_input.onsubmit = function (e) {
  e.preventDefault();
  let newScore = parseInt(document.querySelector('input[name="newScore"]:checked').value);
  let now = new Date();
  var datos = {
    dateTime: 'Hora',
    description: 'Descripcion',
    score: '1',
    user: 'Usuario'

  }

  datos.description = document.getElementById("textArea").value;
  datos.user = localStorage.getItem('email');
  datos.dateTime = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + "  " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  datos.score = newScore;

  console.log(datos.score);

  commentsArray.push(datos);
  showComments(commentsArray);
  console.log(commentsArray);

}