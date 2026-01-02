function hide(id) {
    document.getElementById(id).style.display = 'none'
}
function show(id) {
    document.getElementById(id).style.display = 'block'
}


document.getElementById("new-notes").addEventListener("click", function () {
    hide("home-page")
    show("add-note-page")
})
document.getElementById("home-btn").addEventListener("click", () => {
    hide("add-note-page")
    show("home-page")
})


let notesColleciton = []

document.getElementById("add-note-btn").addEventListener("click", e => {
    e.preventDefault()
    const newNotes = document.getElementById("new-note").value;
    notesColleciton.push(newNotes)
    saveNoteLocalStorage()
    renderNote()
    newNotes.value = ''
})



const notesContainer = document.getElementById("notes-container")

function renderNote() {
    notesContainer.innerHTML=''
    notesColleciton.forEach(note => {
        const p = document.createElement("p")
        p.textContent = note
        p.classList='note'
        notesContainer.appendChild(p)
    })
}


function saveNoteLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notesColleciton))
}


function loadNote() {
    const data = localStorage.getItem("notes")
    if (data) {
        notesColleciton = JSON.parse(data)
        renderNote()
    }
}

loadNote()