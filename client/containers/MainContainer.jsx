import React from 'react';
import ResourceDisplay from '../components/ResourceDisplay';
import SearchMenu from '../components/SearchMenu';
import sampleJson from '../../sample-objects.json';
import FilterMenu from '../components/FilterMenu';
import '../../styles/app.scss';

const MainContainer = () => {
  let arr = [];
  let resourceArray = [];
  for (let i = 0; i < sampleJson.length; i++) {
    arr.push(sampleJson[i])
  }
  arr.forEach((sample) => {
    resourceArray.push(<div className='card'><ResourceDisplay resource={sample} /></div>)
  })

  return (
    <div>
      <nav className='searchMenu'>
        <SearchMenu />
      </nav>

      <div className='rowC'>
        <div className='filter'>
          <FilterMenu />
        </div>
        <div className='resources'>
          {resourceArray}
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
