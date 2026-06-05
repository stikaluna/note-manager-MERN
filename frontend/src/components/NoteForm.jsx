import { useState } from "react";
import { toast } from "react-toastify";

import { useCreateNoteMutation } from "../store/apis/noteApi";

const NoteForm = () => {

  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });

  const { title, content } = formData;

  const [createNote, { isLoading }] = useCreateNoteMutation();

  // ✅ handle change
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ submit
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await createNote({ title, content }).unwrap();

      setFormData({
        title: "",
        content: ""
      });

      toast.success("Note created successfully!");

    } catch (err) {
      toast.error(
        err?.data?.message || "Something went wrong!"
      );
    }
  };

  return (
    <section className="form">

      <form onSubmit={onSubmit}>

        {/* ✅ TITLE */}
        <div className="form-group">
          <label>Title</label>

          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Enter title"
            required
          />
        </div>

        {/* ✅ CONTENT */}
        <div className="form-group">
          <label>Content</label>

          <input
            type="text"
            name="content"
            value={content}
            onChange={onChange}
            placeholder="Enter note content"
            required
          />
        </div>

        {/* ✅ BUTTON */}
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-block"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Note"}
          </button>
        </div>

      </form>

    </section>
  );
};

export default NoteForm;