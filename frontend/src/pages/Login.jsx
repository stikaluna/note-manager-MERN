import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        { email, password }
      );

      console.log("Login success:", response.data);

      // ✅ ruaj user + token
      localStorage.setItem("user", JSON.stringify(response.data));

      // ✅ redirect
      navigate("/");

    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <section className="heading">
        <h2>Login</h2>
        <p>Login to your account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <button type="submit">Login</button>
          </div>

        </form>
      </section>
    </>
  );
};

export default Login;