const perfilForm = {
    id: document.getElementById('perfilForm'),
    nombre: document.getElementById('nombre'),
    apellido: document.getElementById('apellido'),
    edad: document.getElementById('edad'),
    email: document.getElementById('email'),
    telefono: document.getElementById('telefono'),
    image: document.getElementById('image'),
    input: document.getElementById('input')
}

document.addEventListener("DOMContentLoaded", () => {
    datos = JSON.parse(localStorage.getItem('datos'))
    if (datos) {
        perfilForm.nombre.value = datos.nombre
        perfilForm.apellido.value = datos.apellido
        perfilForm.edad.value = datos.edad
        perfilForm.email.value = datos.email
        perfilForm.telefono.value = datos.telefono
        perfilForm.image.src = datos.avatar
    } else {
        perfilForm.image.src = "https://i.pinimg.com/originals/86/3b/49/863b4903acd1e05dd950a10e9501a651.jpg"
    }
});

perfilForm.id.addEventListener('submit', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const datos = {
        nombre: perfilForm.nombre.value,
        apellido: perfilForm.apellido.value,
        edad: parseInt(perfilForm.edad.value),
        email: perfilForm.email.value,
        telefono: perfilForm.telefono.value,
        avatar: perfilForm.image.src
    }
    localStorage.setItem('datos', JSON.stringify(datos))
})

const reader = new FileReader()
perfilForm.input.addEventListener('change', function () {
    reader.addEventListener('load', () => {
        perfilForm.image.src = reader.result
    })
    reader.readAsDataURL(this.files[0])
})