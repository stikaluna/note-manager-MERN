import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {

  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  // ✅ merr user nga localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ GET notes
  const getNotes = async () => {
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const response = await axios.get(
        "http://localhost:8000/api/notes",
        config
      );

      setNotes(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  // ✅ kur hapet faqja
  useEffect(() => {
    getNotes();
  }, []);

  // ✅ CREATE note
  const addNote = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      await axios.post(
        "http://localhost:8000/api/notes",
        { text },
        config
      );

      setText("");
      getNotes();

    } catch (error) {
      console.error(error);
    }
  };

  // ✅ DELETE note
  const deleteNote = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      await axios.delete(
        `http://localhost:8000/api/notes/${id}`,
        config
      );

      getNotes();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">

      <h2>Dashboard</h2>

      {/* ✅ FORM */}
      <form onSubmit={addNote} className="form">

        <div className="form-group">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a note..."
          />
        </div>

        <button type="submit">Add Note</button>

      </form>

      {/* ✅ LISTA */}
      <div style={{ marginTop: "20px" }}>
        {notes.map((note) => (
          <div key={note._id} className="card">

            <p>{note.text}</p>

            <button onClick={() => deleteNote(note._id)}>
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;