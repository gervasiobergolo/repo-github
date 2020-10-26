let PERCENTAGE_SYMBOL = '%';
let MONEY_SYMBOL = "$";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";

let subTotalCost = 0;
let totalCost = 0;
let shippingPercentage = 1.15;
let shippingPorcentageValue = 15;
let currency = false;


var item = [];
function removeItem(i) {
    if (item.length > 1) {
        item.splice(i, 1);
        showCart(item);
    } else {
        document.getElementById("carritoContenido").innerHTML = `<div class="list-group-item list-group-item-action"</div>`
    }
}

function showArticles(array) {
	
	let carritoContenido = document.getElementById("carritoContenido");
	let htmlContentToAppend = "";
	let index = 0;

	for (let article of array) {

		htmlContentToAppend += `
		<ul class="list-group-item list-group-item-action">
					<div class="col-2 d-flex align-items-center justify-content-center">
						<button class="btn" onclick="removeItem(${index})">&times;</button>
					</div>
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
	let shippingPercentageDOM = document.getElementById("shippingPercentageDOM");
	let articleCountNum = 0;
	subTotalCost = 0;
	totalCost = 0;

	// Accedo a la cantidad de elementos en base a la Clase ".costDOM"
	for (let i = 0; i < costDOM.length; i++) {
		let cartCountDOM = document.getElementById("cartCountDOM");
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
	// Muestro el Porcentaje
	shippingPercentageDOM.innerHTML = shippingPorcentageValue + PERCENTAGE_SYMBOL;
	// Calculo el Total y lo muestro
	totalCost = (Math.round(subTotalCost * shippingPercentage * 100) / 100);
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
		showArticles(articles.articles);
	});

	document.getElementById("premiumradio").addEventListener("change", () => {
		shippingPercentage = 1.15;
		shippingPorcentageValue = 15;
		updateValues();
	});
	document.getElementById("expressradio").addEventListener("change", () => {
		shippingPercentage = 1.07;
		shippingPorcentageValue = 7;
		updateValues();
	});
	document.getElementById("standardradio").addEventListener("change", () => {
		shippingPercentage = 1.05;
		shippingPorcentageValue = 5;
		updateValues();
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

function showPaymentMethod() {
	let content = "";
	let payments = document.getElementsByName("pago");

	for (var i = 0; i < payments.length; i++) {
		if (payments[i].checked) {
			if (payments[i].value === "c") {
				content = `
                <h5>Titular de la tarjeta</h5>
                <div class="row">
                    <div class="col-8">
                        <input type="text" id="titTar" class="form-control" required>
                    </div>
                    <div class="col"></div>
                </div><br>
                <h5>Número de tarjeta</h5>
                <div class="row">
                  <input type="text" id="numTar" class="form-control col-5 ml-3" placeholder="" required> – 
                  <input type="text" id="numTar" class="form-control col-2" placeholder="" required>
                  <div class="col"></div>
				</div><br>
				<h5>Cuotas</h5>
				<div class="row">
                    <div class="col-5">
                     	<select name="cuotas" id="" class="form-control" required>
                        <option>Contado</option>
                        <option>2</option>
                        <option>6</option>
                        <option>12</option>
                     	</select>
                    </div>
                    <div class="col"></div>
                </div><br>
				<div>
                  <h5>Dirección de la factura</h5>
                  <input type="text" id="dirTar" class="form-control" required>
                </div>
                <br>
              </div>`;

			} else {
				content = `
                <h5>Titular de la cuenta</h5>
                <div class="row">
                    <div class="col-8">
                        <input type="text" id="titBanco" class="form-control" required>
                    </div>
                    <div class="col"></div>
                </div><br>
                <h5>Banco</h5>
                <div class="row">
                    <div class="col-5">
                    	<select name="bancos" id="bancos" class="form-control" required>
                        <option>BROU</option>
                        <option>Itaú</option>
                        <option>BBVA</option>
                        <option>HSBC</option>
                        <option>Santander</option>
                    	</select>   
                    </div>
                    <div class="col"></div>
                </div><br>
                <h5>Número de cuenta</h5>
                <div class="row">
                    <div class="col-8">
                        <input type="number" id="numBanco" class="form-control" placeholder="" required>
                    </div>
                    <div class="col"></div>
                </div>
				<br>
                <h5>Dirección de la factura</h5>
                <input type="text" id="direBanco" class="form-control" required>
                <br>`
			}
		}
	}

	document.getElementById("paymentMethod").innerHTML = content;
}

//valido el modal

function validPayment() {
	let titularTarjeta = document.getElementById("titTar");
	let numTarjeta = document.getElementById("numTar")
	let dirTarjeta = document.getElementById("dirTar");

	let titularBanco = document.getElementById("titBanco");
	let numBanco = document.getElementById("numBanco")
	let dirBanco = document.getElementById("direBanco");

	let formaPago = document.getElementsByName("pago");
	let pagoValido = true;

	for (var i = 0; i < formaPago.length; i++) {

		if ((formaPago[i].checked) && (formaPago[i].value == "c")) {
			if (titularTarjeta.value == "" || numTarjeta.value == "" || dirTarjeta.value == "") {
				pagoValido = false;
			} else {
				pagoValido = true;
			}
		}

		else if ((formaPago[i].checked) && (formaPago[i].value == "t")) {
			if (titularBanco.value == "" || numBanco.value == "" || dirBanco.value == "") {
				pagoValido = false;
			} else {
				pagoValido = true;
			}
		}
	}

	return pagoValido
}

document.addEventListener("DOMContentLoaded", function (e) {

	let payments = document.getElementsByName("pago");
	for (var i = 0; i < payments.length; i++) {
		payments[i].addEventListener("change", function () {
			showPaymentMethod();
		});
	};

	//validación del form de adentro

	let form = document.getElementById("form-adentro");

	form.addEventListener('submit', function (event) {

		event.preventDefault();
		event.stopPropagation();

		if (validPayment()) {
			document.getElementById("botonModal").classList.remove("btn-dark");
			document.getElementById("botonModal").classList.remove("btn-danger");
			document.getElementById("botonModal").classList.add("btn-success");

			document.getElementById("alertModal").innerHTML = `
            <div class="alert alert-primary" role="alert">
            Tu método de pago fue ingresado correctamente
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>`;

		} else {
			event.preventDefault();
			event.stopPropagation();
			document.getElementById("botonModal").classList.remove("btn-dark");
			document.getElementById("botonModal").classList.remove("btn-success");
			document.getElementById("botonModal").classList.add("btn-danger");

			document.getElementById("alertModal").innerHTML = `
            <div class="alert alert-danger" role="alert">
            Tenés que llenar todos los campos del método de pago para continuar
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
          `;
		}


		if (form.checkValidity()) {
			$("#modal1").modal("hide")

			paymentType = validPayment();
		}

		form.classList.add('was-validated');
	});

	//validacion del form general
	let formulario = document.getElementById("form-afuera");

	formulario.addEventListener('submit', function (event) {

		event.preventDefault();
		event.stopPropagation();
		formulario.classList.add('was-validated');

		if (formulario.checkValidity() && paymentType) {
			document.getElementById("alertSuccess").innerHTML = `
            <div class="alert alert-success" role="alert">
            Tu compra fue ingresada con éxito.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
		}
	});
});
