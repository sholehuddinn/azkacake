"use client";
import React from "react";
import Contacts from "@/components/contacts";
import Video from "@/components/video";
import Product from "@/components/product"; 
import About from "@/components/about";
import Banner from "@/components/banner";

const AzkaCakeLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Video />

      <Banner />

      <Product />

      <About />

      <Contacts />
    </div>
  );
};

export default AzkaCakeLanding;
