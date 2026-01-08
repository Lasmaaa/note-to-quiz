document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('synopsisContainer');
    const editBtn = document.getElementById('editBtn');
    const textBtn = document.getElementById('textBtn');
    const synopsisBtn = document.getElementById('synopsisBtn');
    const modeButtons = document.getElementById('modeButtons');

    let lines = [];
    let mode = null;

    try {
        lines = JSON.parse(localStorage.getItem('quizQuestions') || '[]');
    } catch (e) {
        console.warn('Nederīgi dati localStorage', e);
        lines = [];
    }

    function isValidLine(line) {
        if (!line) return false;

        const text = line.trim();
        if (/[()]/.test(text)) return false;
        if (text.split(/\s+/).length < 2) return false;

        const normalized = text
            .normalize('NFC')
            .replace(/\s+/g, '');

        return /[A-Za-zĀČĒĢĪĶŅŠŪŽāčēģīķļņšūž]/.test(normalized);
    }

    lines = lines.filter(isValidLine);

    if (!lines.length) {
        container.textContent = 'Nav pieejamu apgalvojumu.';
        return;
    }

    function saveLines() {
        localStorage.setItem('quizQuestions', JSON.stringify(lines));
    }

    function renderFacts() {
        container.innerHTML = '';

        lines.forEach((line, index) => {
            const box = document.createElement('div');
            box.className = 'fact-box';

            if (mode === 'text') {
                box.classList.add('move');
            }

            const text = document.createElement('span');
            text.textContent = line;
            text.style.cursor = 'pointer';

            text.addEventListener('click', () => {
                if (mode !== 'text') return;

                const edited = prompt('Rediģēt apgalvojumu:', line);
                if (edited !== null && isValidLine(edited)) {
                    lines[index] = edited.trim();
                    saveLines();
                    renderFacts();
                }
            });

            box.appendChild(text);

            if (mode === 'synopsis') {
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'X';
                deleteBtn.style.marginLeft = '10px';

                deleteBtn.addEventListener('click', () => {
                    lines.splice(index, 1);
                    saveLines();
                    renderFacts();
                });

                box.appendChild(deleteBtn);
            }

            container.appendChild(box);
        });
    }

    editBtn.addEventListener('click', () => {
        modeButtons.style.display = 'block';
    });

    textBtn.addEventListener('click', () => {
        mode = 'text';
        renderFacts();
    });

    synopsisBtn.addEventListener('click', () => {
        mode = 'synopsis';
        renderFacts();
    });

    renderFacts();
});
