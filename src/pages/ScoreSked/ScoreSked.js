import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import RegSeason from "../../components/ScoreSked/RegSeason/RegSeason";
import Playoffs from "../../components/ScoreSked/Playoffs/Playoffs";
import Footer from "../../components/Globals/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "./ScoreSked.scss";

const ScoreSked = () => {
  const [seasonYear, setSeasonYear] = useState("24-25");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSeasonChange = (event) => {
    setSeasonYear(event.target.value);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    document.title = "Odd Man Rush Hockey League - Scores & Schedule";
  }, []);

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="scoreSked">
        <section className="team-main__header">
          <h1 className="scoreSked__header-text">Scores & Schedule</h1>
          <div className="scoreSked__header-dropdown" onClick={toggleDropdown}>
            <div
              value={seasonYear}
              className="scoreSked__header-dropdown-select"
            >
              <span class="scoreSked__header-dropdown-text">
                {`${seasonYear} Season`}
              </span>
              <FontAwesomeIcon
                icon={isDropdownOpen ? faChevronUp : faChevronDown}
                className="scoreSked__header-dropdown-icon"
              />
            </div>
            {isDropdownOpen && (
              <div className="scoreSked__header-dropdown-menu">
                <div
                  onClick={() => handleSeasonChange("24-25")}
                  className="scoreSked__header-dropdown-item"
                >
                  24-25 Season
                </div>
                <div
                  onClick={() => handleSeasonChange("23-24")}
                  className="scoreSked__header-dropdown-item"
                >
                  23-24 Season
                </div>
              </div>
            )}
          </div>
        </section>
        <RegSeason />
        <Playoffs />
      </main>
      <Footer />
    </section>
  );
};

export default ScoreSked;
