function mode() {
    const body = document.body;
        const modeBtn = document.getElementById("mode-btn");
        body.classList.toggle("dark-mode");
        modeBtn.textContent = body.classList.contains("dark-mode") ? "Light mode" : "Dark mode";
}