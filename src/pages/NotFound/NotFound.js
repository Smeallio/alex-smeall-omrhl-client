import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import Footer from "../../components/Globals/Footer/Footer";
import { useEffect } from "react";

const NotFound = () => {

  useEffect(() => {
    document.title = "Odd Man Rush Hockey League - Page Not Found";
  }, []);
  return (
    <>
      <Header />
      <Nav />
      <p>Page not found</p>
      <Footer />
    </>
  );
};

export default NotFound;
