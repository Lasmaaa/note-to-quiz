// Saglabā testu vēsturē (visi iepriekšējie testi)
function saveTest(lines) {
    const allTests = JSON.parse(localStorage.getItem("allTests") || "[]");

    const newTest = {
        id: Date.now(),                // unikāls ID
        date: new Date().toLocaleString(), 
        lines: lines                   // teksts no attēla
    };

    allTests.push(newTest);
    localStorage.setItem("allTests", JSON.stringify(allTests));
}

// Kad lapa ielādējas
document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById("analyzeBtn");
    const inputFile = document.getElementById("input-file");
    const output = document.getElementById("demo");

    // Pogas "Analizēt" klikšķis
    analyzeBtn.addEventListener("click", async () => {
        if (!inputFile.files.length) {
            output.textContent = "Lūdzu, izvēlieties attēlu!";
            return;
        }

        const file = inputFile.files[0];
        output.textContent = "Analizē attēlu…";

        const formData = new FormData();
        formData.append("file", file);
        formData.append("apikey", "helloworld"); 
        formData.append("language", "eng");
        formData.append("isOverlayRequired", "false");

        try {
            const response = await fetch("https://api.ocr.space/parse/image", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (!data.ParsedResults || !data.ParsedResults.length) {
                output.textContent = "Neizdevās nolasīt informāciju no attēla.";
                return;
            }

            const text = data.ParsedResults[0].ParsedText.trim();

            // Sadala pa rindām
            let lines = text
                .split(/\r?\n/)
                .map(line => line.trim())
                .filter(line => line.length > 3);

            if (!lines.length) {
                output.textContent = "Nav nolasāmas informācijas.";
                return;
            }

            // Saglabā testu vēsturē
            saveTest(lines);

            // Saglabā pašreizējo testu tālākai apstrādei
            localStorage.setItem("quizQuestions", JSON.stringify(lines));

            // Pāriet uz nākamo lapu
            window.location.href = "synopsis.html";

        } catch (err) {
            output.textContent = "Kļūda analizējot attēlu.";
            console.error(err);
        }
    });
});

// Poga, kas ved uz testa izpildi
document.getElementById("quiz").addEventListener("click", () => {
    window.location.href = "quiz_page.html";
});
