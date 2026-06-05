import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useRegisterMutation } from "../store/apis/userApi";
import { setUser } from "../store/slices/userSlice";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const data = await register({ name, email, password }).unwrap();

      // ✅ RUAN USER + FIX AUTH
      dispatch(setUser(data));
      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Registration successful!");

      navigate("/");

    } catch (error) {
      toast.error(error?.data?.message || "Register failed");
    }
  };

  return (
    <section className="form">

      <h2>Register</h2>

      <form onSubmit={onSubmit}>

        <input
          type="text"
          name="name"
          value={name}
          placeholder="Enter name"
          onChange={onChange}
          required
        />

        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter email"
          onChange={onChange}
          required
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={onChange}
          required
        />

        <input
          type="password"
          name="password2"
          value={password2}
          placeholder="Confirm password"
          onChange={onChange}
          required
        />

        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>

      </form>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>

    </section>
  );
};

export default Register;