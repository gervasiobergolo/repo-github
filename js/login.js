//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    
    document.getElementById("SubmitBtn").addEventListener("click", function(e) {
   
    let inputUser = document.getElementById("inputUser");
    let inputPassword = document.getElementById("inputPassword");
    let camposCompletos = true;
    
    if (inputUser.value === "") {
        inputUser.classList.add("invalid");
        camposCompletos = false;
    }
    if (inputPassword.value === "") {
        inputoPassword.classList.add("invalid");
        camposCompletos = false;

    }

    if (camposCompletos) {
        localStorage.setItem("User-Logged", JSON.stringify({ email: inputUser.value}));
        window.location = 'cover.html'
    } else {alert("Debes ingresar datos válidos")}

}); 

})  


      // document.getElementById("Salir").addEventListener("click", function(){ 
     //   localStorage.removeItem('User-Logged');
    //   window.location = 'index.html'
   // })




//function onSignIn () {
  //window.location.href = "cover.html";
  //}