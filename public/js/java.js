function togglePassword() {
    const passwordInput = document.getElementById("clave");
    const checkbox = document.getElementById("showPassword");
    // Cambia el tipo de input dependiendo del estado del checkbox
    if (checkbox.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

//Carrusel inicio
let slideIndex = 0;
let slideInterval;

// Llamar a showSlides() cuando se carga la página para iniciar el carrusel
document.addEventListener("DOMContentLoaded", function() {
    showSlides();
});



function showSlides() {
    let slides = document.getElementsByClassName("carousel-item");
    let dots = document.getElementsByClassName("dot");

    // Ocultar todos los slides y remover la clase "active" de los dots
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Mostrar el slide actual y marcar el dot correspondiente como activo
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "flex";  
    dots[slideIndex - 1].className += " active";

    // Reiniciar el intervalo para cambiar de slide cada 5 segundos
    slideInterval = setTimeout(showSlides, 5000); 
}
//Carrusel final
