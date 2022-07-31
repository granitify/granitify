import React from 'react';
import ResourceDisplay from '../components/ResourceDisplay';
import SearchMenu from '../components/SearchMenu';
import sampleJson from '../../sample-objects.json';

const MainContainer = () => {
  return (
    <div>
      <SearchMenu />
      <ResourceDisplay resource={sampleJson[0]} />
    </div>
  );
}

export default MainContainer;
