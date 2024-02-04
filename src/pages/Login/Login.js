import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import Footer from "../../components/Globals/Footer/Footer";
import "./Login.scss";

const Login = () => {
  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="admin-main">
        <article className="login">
          <h1 className="login__header">Administrator Login</h1>
          <form className="login__form">
            <label className="login__label">
              <p>Username</p>
              <input className="login__input" type="text" />
            </label>
            <label className="login__label">
              <p>Password</p>
              <input className="login__input" type="password" />
            </label>
            <button className="login__button">Sign In</button>
          </form>
        </article>
      </main>
      <Footer />
    </section>
  );
};

export default Login;
