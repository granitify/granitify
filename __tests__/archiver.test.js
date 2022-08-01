var MockAdapter = require('axios-mock-adapter');
var axios = require('axios');
const archiver = require('../bot/archiver');
const sampleObjects = require('../sample-objects.json');

const message = {
  ...sampleObjects[0],
};
const correctResponse = {
  ...sampleObjects[0],
};

describe('UNIT: archiver.js send() SUCCESS', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    mockAxios
      .onPut('http://localhost:3000/api/resource')
      .reply(200, correctResponse);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should send the requested message object', async () => {
    await archiver.send(message);
    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].data).toBe(JSON.stringify(message));
  });

  it('should make the request to the configured API endpoint', async () => {
    await archiver.send(message);
    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe(
      'http://localhost:3000/api/resource'
    );
  });

  it('should use the PUT http method', async () => {
    await archiver.send(message);
    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].method).toBe('put');
  });

  it('should return an object containing the data from the body of the API repsonse', async () => {
    const result =await archiver.send(message);
    expect(mockAxios.history.put.length).toBe(1);
    expect(result.data).toEqual(correctResponse);
  });

  it('should should return a response indicating a 200 status code from the request', async () => {
    const result =await archiver.send(message);
    expect(mockAxios.history.put.length).toBe(1);
    expect(result.status).toBe(200);
  });
});

