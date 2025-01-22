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

