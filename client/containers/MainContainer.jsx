import React from 'react';
import ResourceDisplay from '../components/ResourceDisplay';
import SearchMenu from '../components/SearchMenu';

const MainContainer = () => {
  return (
    <div>
      <SearchMenu />
      <ResourceDisplay resource={{ id: 1234, user: 'Jackie' }} />
    </div>
  );
}

export default MainContainer;
