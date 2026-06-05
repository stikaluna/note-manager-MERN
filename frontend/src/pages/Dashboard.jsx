import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import NoteForm from "../components/NoteForm";

const Dashboard = () => {

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  //  protect dashboard
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      {/*  HEADER */}
      <section className="heading">
        <h2>Welcome {user?.name}</h2>
        <p>Manage your notes</p>
      </section>

      {/*  FORM */}
      <NoteForm />

      {/*  BUTTON SI PROFESORI */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          className="btn"
          onClick={() => navigate("/allnotes")}
        >
          Check Notes
        </button>
      </div>

    </>
  );
};

export default Dashboard;