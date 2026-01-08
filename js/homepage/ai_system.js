function saveTest(lines) {
  const allTests = JSON.parse(localStorage.getItem("allTests") || "[]");

  const newTest = {
    id: Date.now(),                 
    date: new Date().toLocaleString(),
    lines: lines           
  };

  allTests.push(newTest);

  localStorage.setItem("allTests", JSON.stringify(allTests));
}

document.addEventListener("DOMContentLoaded", () => {
  const analyzeBtn = document.getElementById("analyzeBtn");
  const inputFile = document.getElementById("input-file");
  const output = document.getElementById("demo");

  analyzeBtn.addEventListener("click", async () => {

    if (!inputFile.files.length) {
      output.textContent = "Lūdzu, izvēlieties attēlu!";
      return;
    }

    const file = inputFile.files[0];

    output.textContent = "Analizē attēlu…";

    const formData = new FormData();
    formData.append("file", file);            
    formData.append("apikey", "K82568863088957"); 
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

      let lines = text
        .split(/\r?\n/)           
        .map(line => line.trim())    
        .filter(line => line.length > 3); 

      if (!lines.length) {
        output.textContent = "Nav nolasāmas informācijas.";
        return;
      }

      saveTest(lines);

      localStorage.setItem("quizQuestions", JSON.stringify(lines));

      window.location.href = "synopsis.html";

    } catch (err) {
      output.textContent = "Kļūda analizējot attēlu.";
      console.error(err);
    }
  });
});

document.getElementById("quiz").addEventListener("click", () => {
  window.location.href = "quiz_page.html";
});