"use client";

import React from "react";
import Contacts from "@/components/contacts";
import About from "@/components/about";
import Product from "@/components/product";
import Banner from "@/components/banner";
import VideoIntro from "@/components/video";

const AzkaCakeLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Video Introduction Section */}
      <VideoIntro />

      {/* Banner Slider */}
      <Banner />

      {/* Products Section */}
      <Product />

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contacts />
    </div>
  );
};

export default AzkaCakeLanding;
