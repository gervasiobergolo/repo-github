//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let PERCENTAGE_SYMBOL = '%';
let MONEY_SYMBOL = "$";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";

let subTotalCost = 0;
let totalCost = 0;
let currency = false;

function showCart(array) {
	let carritoContenido = document.getElementById("carritoContenido");
	let htmlContentToAppend = "";
	let index = 0;

	for (let article of array) {

		htmlContentToAppend += `
		<ul class="list-group-item list-group-item-action">
			<div class="row d-flex justify-content-around">
				<div class="col-2 d-flex align-items-center justify-content-center">
					<img src="${article.src}" class="img-thumbnail">
				</div>
				<div class="col-2 d-flex align-items-center justify-content-start">
					<div class="d-flex align-items-center">
						<h6 class="text-muted">${article.name}</h6>
					</div>
				</div>
				<div class="col-2 d-flex align-items-center">
					<div class="d-flex w-100 justify-content-end align-items-center">
						<h6 class="text-muted">${article.currency} <span id="newCostDOM-${index}" class="costDOM">${article.unitCost}</span></h6>
					</div>
				</div>
				<div class="col-2 d-flex align-items-center justify-content-center">
					<div class="w-75 d-flex justify-content-center align-items-center">
              			<input type="number" class="form-control" id="articleCount-${index}" value="${article.count}" min="0" onchange="updateValues();">
					</div>
				</div>
			</div>
		</ul>
		`;

		carritoContenido.innerHTML = htmlContentToAppend;
		// cartCountDOM.innerHTML = array.length;

		index++; // Aumento el valor del Index
	};

	updateValues();
}

function updateValues() {
	let subTotalDOM = document.getElementById("subTotalDOM");
	let totalCostDOM = document.getElementById("totalCostDOM");
	let costDOM = document.querySelectorAll(".costDOM");
	let articleCountNum = 0;
	subTotalCost = 0;
	totalCost = 0;

	// Accedo a la cantidad de elementos en base a la Clase ".costDOM"
	for (let i = 0; i < costDOM.length; i++) {
		let countID = `articleCount-${i}`;
		let count = document.getElementById(countID).value;

		if (i === 0) {
			subTotalCost = ((costDOM[i].textContent * count) / 40);
		} else {
			// Calculo el Subtotal
			subTotalCost += costDOM[i].textContent * count;
		}

		// Calculo Cantidad de Articulos
		articleCountNum += +count;

		// Muestro Subtotal
		subTotalDOM.innerHTML = DOLLAR_SYMBOL + subTotalCost.toLocaleString();
	}

	// Muestro Cantidad de Articulos
	cartCountDOM.innerHTML = articleCountNum;

	// Almaceno la Cantidad de Articulos en LocalStorage
	localStorage.setItem("cantArt", articleCountNum);

	// Convierto de String a Number
	subTotalCost = parseInt(subTotalCost);
	// Calculo el Total y lo muestro
	totalCost = (Math.round(subTotalCost));
	if (!currency) {
		totalCost = totalCost * 40;
	}
	totalCost = Math.round(totalCost);
	totalCostDOM.innerHTML = MONEY_SYMBOL + totalCost.toLocaleString(); // .toLocaleString valida el numero y agrega el "." donde corresponde
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(CART_INFO_DESAFIO).then(function (resultObj) {
		if (resultObj.status === "ok") {
			var articles = resultObj.data;
		}
		showCart(articles.articles);
	});

	document.getElementById("pesoCurrency").addEventListener("change", () => {
		currency = false;
		MONEY_SYMBOL = PESO_SYMBOL;
		updateValues();
  });
  
	document.getElementById("dollarCurrency").addEventListener("change", () => {
		currency = true;
		MONEY_SYMBOL = DOLLAR_SYMBOL;
		updateValues();
	});
});
