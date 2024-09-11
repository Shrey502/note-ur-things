document.addEventListener('DOMContentLoaded', function () {
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesList = document.getElementById('notes-list');
    const categoryInput = document.getElementById('category-input');
    const searchInput = document.getElementById('search-input');
    const themeToggle = document.querySelector('.theme-toggle');
    
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Render notes
    function renderNotes(searchQuery = '') {
        notesList.innerHTML = '';
        const filteredNotes = notes.filter(note => 
            note.text.toLowerCase().includes(searchQuery.toLowerCase())
        );

        filteredNotes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');

            noteElement.innerHTML = `
                <div class="note-header">
                    <span class="category">${note.category}</span>
                    <span class="date">${note.date}</span>
                </div>
                <p>${note.text}</p>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;

            noteElement.querySelector('.delete-btn').addEventListener('click', () => {
                deleteNote(index);
            });

            noteElement.querySelector('.edit-btn').addEventListener('click', () => {
                editNote(index);
            });

            notesList.appendChild(noteElement);
        });
    }

    // Add a new note
    addNoteBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        const category = categoryInput.value.trim() || 'Uncategorized';
        if (noteText !== '') {
            const note = {
                text: noteText,
                category,
                date: new Date().toLocaleString() // Capture the current date and time
            };
            notes.push(note);
            saveNotes();
            renderNotes();
            noteInput.value = '';
            categoryInput.value = '';
        }
    });

    // Delete note
    function deleteNote(index) {
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
    }

    // Edit note
    function editNote(index) {
        const note = notes[index];
        noteInput.value = note.text;
        categoryInput.value = note.category;
        deleteNote(index);
    }

    // Search notes
    searchInput.addEventListener('input', (e) => {
        renderNotes(e.target.value);
    });

    // Save notes to localStorage
    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Toggle dark mode
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    });

    // Load initial notes
    renderNotes();
});
