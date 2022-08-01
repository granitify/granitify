import React, { useEffect, useState } from 'react';
import ResourceDisplay from '../components/ResourceDisplay';
import SearchMenu from '../components/SearchMenu';
// import sampleJson from '../../sample-objects.json';
import FilterMenu from '../components/FilterMenu';
import '../../styles/app.scss';
import resourceApi from '../services/resource';

const MainContainer = () => {
  // resourceApi.getResources();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // let mounted = true;
    resourceApi.getResources()
      .then(resources => {
        // if(mounted) {
          setResources(resources)
        // }
      })
    // return () => mounted = false;
  }, [])


  // let arr = [];
  let resourceArray = [];
  // for (let i = 0; i < sampleJson.length; i++) {
  //   arr.push(sampleJson[i])
  // }
  resources.forEach((resource) => {
    resourceArray.push(<ResourceDisplay resource={resource} key={`resource-${resource.id}`}/>)
  })
  resourceArray.reverse();

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
