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
<p style><strong>Articulos relacionados</strong>
  <div  class="container">
      <div class="row" id="ads">
      <div id="rel"></div>
  </div>
</div>
`
  gallery += `<div class="container" id="carrusel">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div class="carousel-inner img-thumbnail">
            <div class="carousel-item active">
                <img src="${array.images[0]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="${array.images[1]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="${array.images[2]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="${array.images[3]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="${array.images[4]}" class="d-block w-100" alt="...">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>
<br>
    `

  document.getElementById("produInfo").innerHTML = htmlContentToAppend + gallery;

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


function showRelated() {
  let relatedInfo = "";
  for (let i = 0; i < relatedProduct.length; i++) {
    let related = relatedProduct[i];
    if (i == productInfoArray.relatedProducts[0] || i == productInfoArray.relatedProducts[1]) {
      relatedInfo +=
        `
  <div class=" col-sm-4 ">
      <div class="">
          <div class="">
          <span class=""><h6>` +
        related.name +
        `</h6></span>
              
              <img class="img-fluid" src="` +
        relatedProduct[i].imgSrc +
        `" alt=" ` +
        relatedProduct[i].name +
        `" />
          </div>
          <div class="">
          <span class=""><strong> ` +
        relatedProduct[i].currency +
        `</strong></span>
          <span class=""><strong> ` +
        relatedProduct[i].cost +
        `</strong><br></span>
              <span class="">  ` +
        relatedProduct[i].description +
        `<br></span>
              <span class=""><strong>Vendidos</strong> ` +
        relatedProduct[i].soldCount +
        ` </span>
          </div>
          <div class="">
              <div class="">
              </div>
              <a class="ad-btn" href="category-info.html">View</a>
          </div>
      </div>
  </div>
`;
    }
  }
  document.getElementById("rel").innerHTML = relatedInfo;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      relatedProduct = resultObj.data;
      showRelated();
    }
  });
});
