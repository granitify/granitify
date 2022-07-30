import React from 'react';
import ResourceDisplay from '../components/ResourceDisplay';
import SearchMenu from '../components/SearchMenu';

const MainContainer = () => {
  return (
    <div>
      <SearchMenu />
      <ResourceDisplay resource={{ ID: 1234, User: 'jackie' }} />
    </div>
  );
}

export default MainContainer;
