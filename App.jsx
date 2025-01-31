import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
// import "./App.css";  // Import global styles if needed

const generateNotes = () => {
  return [
    { title: "Meeting with Alice", content: "Discuss the new marketing strategies." },
    { title: "Buy Groceries", content: "Purchase fruits, vegetables, and snacks." },
    { title: "Morning Run", content: "Go for a 5km run in the park." },
    { title: "Read a Novel", content: "Start reading 'To Kill a Mockingbird' by Harper Lee." },
  ];
};

function App() {
  const initialNotes = generateNotes();
  const [notes, setNotes] = useState(initialNotes);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((_, index) => index !== id));
  }

  function editNote(id, newTitle, newContent) {
    setNotes((prevNotes) =>
      prevNotes.map((noteItem, index) =>
        index === id ? { title: newTitle, content: newContent } : noteItem
      )
    );
  }

  return (
    <div className="app-container">
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <CreateArea onAdd={addNote} />
      <div className="notes-container">
        {filteredNotes.map((noteItem, index) => (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
