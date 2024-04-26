import React from 'react';
import CommunityInteraction from '../CommunityInteraction/index';
import HeroLoggedOut from './HeroSection/HeroLoggedOut';
import ContactSection from '../ContactSection/ContactSection';
const HomePageLoggedOut = () => {
  return (
    <div>
      <HeroLoggedOut />
      <CommunityInteraction />
      <ContactSection />
    </div>
  );
};

export default HomePageLoggedOut;
