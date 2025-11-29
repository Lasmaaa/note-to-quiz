document.addEventListener('DOMContentLoaded', ()=>{

    const container = document.getElementById("synopsisContainer")
    const editBtn = document.getElementById("editBtn")
    const textBtn = document.getElementById("textBtn")
    const synopsisBtn = document.getElementById("synopsisBtn")
    const modeButtons = document.getElementById("modeButtons")
    const body = document.body 

    let lines
    try{
        lines = JSON.parse(localStorage.getItem("quizQuestions") || "[]")
    } catch(e){
        console.log("bad storage?", e)
        lines = []
    }

    let mode = null

    function isValidLine(line){
        if(!line) return false
        const t = line.trim()
        if(/[()]/.test(t)) return false
        if(t.split(/\s+/).length<2) return false
        const n = t.normalize("NFC").replace(/\s+/g,'')
        return /[A-Za-zĀČĒĢĪĶŅŠŪŽāčēģīķļņšūž]/.test(n)
    }

    lines = lines.filter(isValidLine)
    if(!lines.length){
        container.textContent="Nav pieejamu apgalvojumu."
        return
    }

    function saveLines(){
        localStorage.setItem("quizQuestions",JSON.stringify(lines))
    }

    function renderFacts(){
        container.innerHTML=''

        lines.forEach((line,i)=>{
            const div = document.createElement('div')
            div.className='fact-box'
            if(mode==='text') div.classList.add('move')

            const span = document.createElement('span')
            span.textContent=line
            span.style.cursor='pointer'

            span.addEventListener('click',()=>{
                if(mode==='text'){
                    const newText = prompt('Rediģēt apgalvojumu:',line)
                    if(newText!==null && isValidLine(newText)){
                        lines[i]=newText.trim()
                        saveLines()
                        renderFacts()
                    } else {
                    }
                }
            })

            div.appendChild(span)

            if(mode==='synopsis'){
                const btn = document.createElement('button')
                btn.textContent='X'
                btn.style.marginLeft='10px'
                btn.addEventListener('click',()=>{
                    lines.splice(i,1)
                    saveLines()
                    renderFacts()
                })
                div.appendChild(btn)
            }

            container.appendChild(div)
        })
    }

    editBtn.addEventListener('click',()=>{
        modeButtons.style.display='block'
    })

    textBtn.addEventListener('click',()=>{
        mode='text'
        renderFacts()
    })

    synopsisBtn.addEventListener('click',()=>{
        mode='synopsis'
        renderFacts()
    })

    renderFacts() 
})
