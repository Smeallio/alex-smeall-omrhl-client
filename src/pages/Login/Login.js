import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logInUser } from "../../utils/api-utils";
import "./Login.scss";

const Login = ({ authUser }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/admin/dashboard/");
    }
  }, [authUser, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(logInUser(), {
        username: event.target.username.value,
        password: event.target.password.value,
      });
      sessionStorage.setItem("token", response.data.token);
      navigate("/admin/dashboard/");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="admin-main">
        <article className="login">
          <h1 className="login__header">Administrator Login</h1>
          <form className="login__form" onSubmit={handleLogin}>
            <label className="login__label">
              <p>Username</p>
              <input className="login__input" type="text" name="username" />
            </label>
            <label className="login__label">
              <p>Password</p>
              <input className="login__input" type="password" name="password" />
            </label>
            <button className="login__button" type="submit">
              Sign In
            </button>

            {error && <div className="login__message">{error}</div>}
          </form>
        </article>
      </main>
      <Footer />
    </section>
  );
};

export default Login;
