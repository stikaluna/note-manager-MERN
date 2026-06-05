import { useState } from "react";
import { useDeleteNoteMutation, useUpdateNoteMutation } from "../store/apis/noteApi";
import { toast } from "react-toastify";

import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

const NoteItem = ({ note }) => {

  const [deleteNote] = useDeleteNoteMutation();
  const [updateNote] = useUpdateNoteMutation();

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content
  });

  const handleDelete = async () => {
    const res = await deleteNote(note._id);

    if (res.error) {
      toast.error("Delete failed");
    } else {
      toast.success("Note deleted");
    }
  };

  const handleUpdate = async () => {
    const res = await updateNote({
      id: note._id,
      ...editData
    });

    if (res.error) {
      toast.error("Update failed");
    } else {
      toast.success("Updated!");
      setIsEditing(false);
    }
  };

  return (
    <div className="card">

      {/* DATE */}
      <small>
        {new Date(note.createdAt).toLocaleString("sq-AL")}
      </small>

      {/* CONTENT */}
      {isEditing ? (
        <>
          <input
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />

          <input
            value={editData.content}
            onChange={(e) =>
              setEditData({ ...editData, content: e.target.value })
            }
          />
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </>
      )}

      {/* BUTTONS */}
      <div className="card-actions">

        {isEditing ? (
          <button className="icon-btn edit" onClick={handleUpdate}>
            <FaSave />
          </button>
        ) : (
          <button
            className="icon-btn edit"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
          </button>
        )}

        <button className="icon-btn delete" onClick={handleDelete}>
          <FaTrash />
        </button>

      </div>

    </div>
  );
};

export default NoteItem;