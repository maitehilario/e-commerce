//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("guardar").addEventListener("click", function(){
        let nombre = document.getElementById("nombre")
        localStorage.setItem('Nombre', JSON.stringify({nombre: nombre.value}))

        let apellido = document.getElementById("apellido")
        localStorage.setItem('Apellido', JSON.stringify({apellido: apellido.value}))

        let edad = document.getElementById("edad")
        localStorage.setItem('Edad', JSON.stringify({edad: edad.value}))

        let email = document.getElementById("email")
        localStorage.setItem('Email', JSON.stringify({email: email.value}))

        let tel = document.getElementById("tel")
        localStorage.setItem('Tel', JSON.stringify({tel: tel.value}))
    })

    let nombreLS = localStorage.getItem('Nombre');
    let nombreMP = document.getElementById("nombre")
    nombreLS = JSON.parse(nombreLS)
    nombreLS = nombreLS.nombre
    nombreMP.value = nombreLS

    let apellidoLS = localStorage.getItem('Apellido');
    let apellidoMP = document.getElementById("apellido")
    apellidoLS = JSON.parse(apellidoLS)
    apellidoLS = apellidoLS.apellido
    apellidoMP.value = apellidoLS

    let edadLS = localStorage.getItem('Edad');
    let edadMP = document.getElementById("edad")
    edadLS = JSON.parse(edadLS)
    edadLS = edadLS.edad
    edadMP.value = edadLS

    let emailLS = localStorage.getItem('Email');
    let emailMP = document.getElementById("email")
    emailLS = JSON.parse(emailLS)
    emailLS = emailLS.email
    emailMP.value = emailLS

    let telLS = localStorage.getItem('Tel');
    let telMP = document.getElementById("tel")
    telLS = JSON.parse(telLS)
    telLS = telLS.tel
    telMP.value = telLS

    
});