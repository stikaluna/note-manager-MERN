import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useLoginMutation } from "../store/apis/userApi";
import { setUser } from "../store/slices/userSlice";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login({ email, password }).unwrap();

      // ✅ RUAN USER + ZGJIDH PROBLEMIN
      dispatch(setUser(data));
      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Login successful!");

      navigate("/");

    } catch (error) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <section className="form">

      <h2>Login</h2>

      <form onSubmit={onSubmit}>

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

        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "Logging..." : "Login"}
        </button>

      </form>

      <p style={{ marginTop: "10px" }}>
        No account? <Link to="/register">Register</Link>
      </p>

    </section>
  );
};

export default Login;