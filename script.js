const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");

window.addEventListener("load", loadNotes);
addBtn.addEventListener("click", addNote);

function addNote() {
    const text = noteInput.value.trim();
    if(text === ""){
        alert("Please write a note!");
        return;
    }

    createNote(text);
    saveNote(text);
    noteInput.value = "";
}

function createNote(text){
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    const p = document.createElement("p");
    p.className = "note-text";
    p.textContent = text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";

    editBtn.addEventListener("click", () => {
        const newText = prompt("Edit your note:", p.textContent);
        if (newText !== null && newText.trim !== "") {
            p.textContent = newText.trim();
            updateStorage();
        }
    });

    delBtn.addEventListener("click", () => {
        noteDiv.remove();
        updateStorage();
    });

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    noteDiv.appendChild(p);
    noteDiv.appendChild(actions);
    notesContainer.appendChild(noteDiv);
}

function saveNote(note){
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotes() {
     return JSON.parse(localStorage.getItem("notes")) || [];
}

function loadNotes() {
    const notes = getNotes();
    notes.forEach(createNote);
}

function updateStorage() {
    const notes = [];
    document.querySelectorAll(".note-text").forEach(n => {
        notes.push(n.textContent);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}