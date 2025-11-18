import React from "react";
import HeroSection from "../components/homepage/HeroSection";
import ForSellSection from "../components/homepage/ForSellSection";
import PopularPlaceSection from "../components/homepage/PopularPlaceSection";
import ContactSection from "../components/homepage/ContactSection";
import WhyChooseUs from "../components/homepage/WhyChooseUs";
import FeatureProperties from "../components/homepage/FeatureProperties";
import { useTheme } from "../hooks/useTheme";

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  return (
    <div className={`h-full ${theme === "dark" && "bg-gray-600 text-white"}`}>
      <HeroSection />
      <FeatureProperties />
      <ForSellSection />
      <PopularPlaceSection />
      <WhyChooseUs />
      <ContactSection />
    </div>
  );
}
