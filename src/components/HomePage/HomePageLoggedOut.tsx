import React from 'react';
import CommunityInteraction from '../CommunityInteraction/index';
import HeroLoggedOut from './HeroSection/HeroLoggedOut';

const HomePageLoggedOut = () => {
  return (
    <div>
      <HeroLoggedOut />
      <CommunityInteraction />
    </div>
  );
};

export default HomePageLoggedOut;
