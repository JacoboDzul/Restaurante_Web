import React from "react";
import BannerBackground from "../../Assets/home-banner-background.png";
import BannerImage from "../../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import Work from "./Work";
import Contact from "./Contact";
import Footer from "./Footer";
import Chat from "../Chat/Chat";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Tu comida favorita caliente y fresca
          </h1>
          <p className="primary-text">
            La comida está preparada por los mejores chefs que no dudarán
            en terminar la orden.
          </p>
          <Link to={"/reservar"}>
            <button className="secondary-button">
              Reservar <FiArrowRight />{" "}
            </button>
          </Link>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
      <Work />
      <Contact />
      <Chat /> {/* Aquí se renderiza el componente Chat */}
      <Footer />
    </div>
  );
};

export default Home;