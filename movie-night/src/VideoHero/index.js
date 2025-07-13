import React from "react";
import "./style.css";

const VideoHero = ({ title, children }) => {
  return (
    <div className="video-hero">
      <video
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
        src="/video.mp4" 
        type="video/mp4"
      />
      <div className="video-overlay">
        <div className="hero-container">
          <h1 className="hero-title">{title}</h1>
        </div>
        <div className="genre-nav-bottom">
          {children /* genre buttons go here */}
        </div>
      </div>
    </div>
  );
};

export default VideoHero;