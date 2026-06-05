import { useGetNotesQuery } from "../store/apis/noteApi";
import { useNavigate } from "react-router-dom";

import NoteItem from "./NoteItem";
import Spinner from "./Spinner";

const NoteList = () => {

  const navigate = useNavigate();

  const {
    data: notes = [],
    isLoading,
    isError,
    error
  } = useGetNotesQuery();

  if (isLoading) return <Spinner />;

  if (isError) {
    console.error(error);
    return <p>Error loading notes</p>;
  }

  return (
    <>
      {/* BACK BUTTON */}
      <div style={{ margin: "20px" }}>
        <button
          className="nav-btn"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>
      </div>

      {/* NOTES */}
      <section className="notes-grid">

        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))
        ) : (
          <p>No notes yet</p>
        )}

      </section>
    </>
  );
};

export default NoteList;