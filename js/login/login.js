const form = document.getElementById('form')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const firstname_input = document.getElementById('firstname-input') 

function generateAvatar(name, size = 120) {
    const initial = name.trim().charAt(0).toUpperCase();
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, Math.PI*2);
    ctx.fillStyle = "#4A90E2";
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = `${size * 0.55}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initial, size/2, size/2);

    return canvas.toDataURL();
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const savedEmail = localStorage.getItem("user_email")
    const savedPassword = localStorage.getItem("user_password")

    if (email_input.value !== savedEmail || password_input.value !== savedPassword) {
        return;
    }

    const firstname = firstname_input.value.trim();
    if (firstname) {
        const avatar = generateAvatar(firstname);
        localStorage.setItem("profilePic", avatar);
        localStorage.setItem("firstname", firstname);
    }

    window.location.href = "account.html";
});