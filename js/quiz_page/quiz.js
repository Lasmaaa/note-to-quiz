const quizBox = document.getElementById("quiz-container");
const resultBox = document.getElementById("result");

let lines;
try {
    const raw = localStorage.getItem("quizQuestions");
    lines = raw ? JSON.parse(raw) : [];
} catch(err) {
    console.warn("json fail?? ", err);
    lines = [];
}

if (!lines || !lines.length) {
    quizBox.innerHTML = "<p>Nav pieejamu jautājumu... droši vien attēls nenolasījās.</p>";
    throw new Error("no questions");
}
function normalize(t) {
    if (!t) return "";
    return t.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
function buildQuestions(arr) {
    return arr.map(l => {
        const w = l.split(" ").filter(x => x && x.length > 3);
        let pick = w[Math.floor(Math.random() * w.length)];

        if (!pick) pick = w[0] || "";

        return {
            txt: l.replace(pick, "_____"),
            missing: pick,
            full: l
        };
    });
}

const questions = buildQuestions(lines);

let cur = 0;
let score = 0;

function showQ() {
    const q = questions[cur];

    quizBox.innerHTML = `
        <div class="qblock">
            <p><b>${cur+1}. jautājums:</b> ${q.txt}</p>

            <input id="answerInput" placeholder="ieraksti vārdu" />
            <button id="answerBtn">Atbilžu poga</button>

            <div id="fb" style="margin-top:6px;"></div>
        </div>
    `;

    document.getElementById("answerBtn").onclick = check;
}
function check() {
    const q = questions[cur];
    const inp = document.getElementById("answerInput").value.trim();
    const fb = document.getElementById("fb");

    if (!inp) {
        fb.textContent = "Ieraksti vismaz kaut ko...";
        fb.style.color = "#b22";
        return;
    }

    if (normalize(inp) === normalize(q.missing)) {
        fb.textContent = "ok, šis ir pareizi ✔";
        fb.style.color = "green";
        score++;
    } else {
        fb.textContent = "nope ❌ pareizais bija: " + q.missing;
        fb.style.color = "red";
    }
    setTimeout(() => {
        cur++;
        if (cur < questions.length) {
            showQ();
        } else {
            finish();
        }
    }, 1000);
}
function finish() {
    quizBox.innerHTML = "";
    resultBox.innerHTML = `Gatavs. Pareizi: ${score} / ${questions.length}.`;
}
showQ();
