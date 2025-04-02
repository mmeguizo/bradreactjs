import React from "react";
import HeroSection from "../components/HeroSection";
import JobCta from "../components/JobCta";
import JobListingSection from "../components/JobListingsSection";
import ViewAllJobsCta from "../components/ViewAllJobsCta";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <JobCta />
      <JobListingSection isHome={true} />
      <ViewAllJobsCta />
    </>
  );
};

export default HomePage;
