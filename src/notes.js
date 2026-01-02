function hide(id) {
    document.getElementById(id).classList.add('hidden')
}
function show(id) {
    document.getElementById(id).classList.remove('hidden')
}


document.getElementById("new-notes").addEventListener("click", function () {
    hide("allNote-page")
    hide("home-page")
    show("add-note-page")
})
document.getElementById("all-notes").addEventListener("click", () => {
    hide("add-note-page")
    hide("home-page")
    show("allNote-page")
})
document.getElementById("home").addEventListener("click", () => {
    hide("allNote-page")
    hide("add-note-page")
    show("home-page")
})


let notesColleciton = []

document.getElementById("add-note-btn").addEventListener("click", e => {
    e.preventDefault()
    const textarea = document.getElementById("new-note")
    const newNote = textarea.value.trim();
    const partNote = newNote.split(" ")
    const title = partNote.slice(0, 3).join(" ")
    if (newNote === '') return
    const date = new Date()
    const minute = date.getMinutes()
    const hours = date.getHours()
    const convertHours = hours >= 12 ? hours - 12 : hours
    const prevent0 = convertHours % 12 === 0 ? 12 : convertHours
    const ampm = hours >= 12 ? 'pm' : 'am'
    const time = `${prevent0}:${minute} ${ampm}`
    const noteDetilas = { title: title, description: newNote, time: time, id: Date.now() }
    console.log(noteDetilas)
    notesColleciton.push(noteDetilas)
    saveNoteLocalStorage()
    renderNote()
    textarea.value = ''
})



const notesContainer = document.getElementById("notes-container")

function renderNote() {
    notesContainer.innerHTML = ''
    notesColleciton.forEach(note => {
        const div = document.createElement("div")
        div.innerHTML = `
    <div class='note'>
        <div>
            <h3>Title:${note.title}</h3>
            <p class="des">Description:${note.description}</p>
            <p>${note.time}</p>
        </div>
        <div class='note-img'>
        <img src='./src/images/pen.png'>
        <img class='deleteBtn' data-id='${note.id}' src='./src/images/trash.png'>
        </div>
    </div>
        `
        notesContainer.appendChild(div)


    })


    document.getElementById("notes-length").innerText = notesColleciton.length
}


document.addEventListener("click", e => {
    if (e.target.classList.contains("deleteBtn")) {
        const id = e.target.dataset.id;
        notesColleciton = notesColleciton.filter(data => data.id !== Number(id))
        renderNote()
    }
})



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