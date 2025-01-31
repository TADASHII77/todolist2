import React, { useState, useEffect } from "react";
import "./Note.css";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);
  const [timestamp, setTimestamp] = useState(props.timestamp);

  useEffect(() => {
    if (!timestamp) {
      setTimestamp(new Date().toLocaleString());
    }
  }, [timestamp]);

  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    const currentTime = new Date().toLocaleString();
    setTimestamp(currentTime);
    props.onEdit(props.id, editedTitle, editedContent, currentTime);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
    setEditedTitle(props.title);
    setEditedContent(props.content);
  }

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleSave}>SAVE</button>
          <button onClick={handleCancel}>CANCEL</button>
        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <p>
            {props.content.length > 100
              ? props.content.substring(0, 100) + "..."
              : props.content}
          </p>
          <p className="timestamp">Last edited: {timestamp}</p>
          <button onClick={handleDelete}>DELETE</button>
          <button onClick={handleEdit}>EDIT</button>
        </>
      )}
    </div>
  );
}

export default Note;