function reveal() {
    const inputFile = document.getElementById('input-file');
    inputFile.click(); 

    inputFile.onchange = function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const accPic = document.querySelector('.acc_pic');
                accPic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
}
