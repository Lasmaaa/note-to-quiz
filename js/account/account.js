const savedAvatar = localStorage.getItem("profilePic");
const savedName = localStorage.getItem("firstname");

const pic = document.querySelector(".acc_pic");
if (pic && savedAvatar) {
    pic.src = savedAvatar;
}

const nameElement = document.querySelector(".acc_name");

if (nameElement && savedName) {
    const formattedName = savedName.charAt(0).toUpperCase() + savedName.slice(1);
    nameElement.textContent = formattedName;
}

const inputFile = document.getElementById("input-file");
const accPic = document.querySelector(".acc_pic");

inputFile.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            accPic.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

