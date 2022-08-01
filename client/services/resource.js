
const resourceApi = {}

resourceApi.getResources = () => {
  return fetch('/api/resource')
    .then(data => data.json())
}

const testApi = async () => {

  console.log(await resourceApi.getResources());
}

testApi()

export default resourceApi;