import { useState } from "react";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      console.log(formData);
    }
  };

  return (
    <>
      <section className="heading">
        <h2>Register</h2>
        <p>Create account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>

          <div className="form-group">
            <input name="name" value={name} onChange={onChange} placeholder="Name"/>
          </div>

          <div className="form-group">
            <input name="email" value={email} onChange={onChange} placeholder="Email"/>
          </div>

          <div className="form-group">
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Password"/>
          </div>

          <div className="form-group">
            <input type="password" name="password2" value={password2} onChange={onChange} placeholder="Confirm Password"/>
          </div>

          <button type="submit">Register</button>

        </form>
      </section>
    </>
  );
};

export default Register;