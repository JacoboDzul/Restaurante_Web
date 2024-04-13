import React from "react";
import BannerBackground from "../../Assets/home-banner-background.png";
import BannerImage from "../../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import Work from "./Work";
import Contact from "./Contact";
import Footer from "./Footer";

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
            La comida esta preparada por los mejores chefs que no dudaran
            en terminar la orden.
          </p>
          <button className="secondary-button">
            Reservar <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
      <Work/>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default Home;
