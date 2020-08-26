//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

function onSignIn () {
    window.location.href = "cover.html";
}

document.addEventListener("DOMContentLoaded", function(e) {

    let userLogged = localStorage.getItem('User-Logged');
    let infoUser = document.getElementById("Info-user")
    let user = document.getElementById("user");

    if (userLogged) {
        userLogged=JSON.parse(userLogged);
        user.innerText = user.innerText + 'Usuario logueado ' + userLogged.email;
        infoUser.style = "display: inline-block";

    }

    document.getElementById("Salir").addEventListener("click", function(){ 
        localStorage.removeItem('User-Logged');
        window.location = 'index.html'
    })
})