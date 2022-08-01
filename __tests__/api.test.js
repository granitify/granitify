const request = require('supertest');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const sampleObjects = require('../sample-objects.json');
// Set id of sample object to epoch time in order to (probably) ensure uniqueness
sampleObjects[0].id = Number(new Date().getTime());

const server = 'http://localhost:33210';

describe('API', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with a 200 status', () => {
        return request(server).get('/').expect(200);
      });

      it('it responds with a text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/);
      });

      it('it responds with the index.html file', () => {
        return request(server)
          .get('/')
          .then((response) => {
            assert.ok(
              response.text ===
                fs.readFileSync(
                  path.resolve(__dirname, '../public/index.html'),
                  'utf8'
                )
            );
          });
      });
    });
  });

  describe('/api', () => {
    describe('*', () => {
      it('responds with a 404 to GET requests to non-existent API endpoints', () => {
        return request(server).get('/api/nonexistentapi').expect(404);
      });
      it('responds with a 404 to PUT requests to non-existent API endpoints', () => {
        return request(server).put('/api/nonexistentapi').expect(404);
      });
      it('responds with a 404 to POST requests to non-existent API endpoints', () => {
        return request(server).post('/api/nonexistentapi').expect(404);
      });
      it('responds with a 404 to PATCH requests to non-existent API endpoints', () => {
        return request(server).patch('/api/nonexistentapi').expect(404);
      });
      it('responds with a 404 to DELETE requests to non-existent API endpoints', () => {
        return request(server).delete('/api/nonexistentapi').expect(404);
      });
    });
  });

  describe('/api/resource', () => {
    describe('GET', () => {
      it('responds with a 200 status', () => {
        return request(server).get('/api/resource').expect(200);
      });
      it('it responds with a application/json content type', () => {
        return request(server)
          .get('/api/resource')
          .expect('Content-Type', /application\/json/);
      });
      it('responds with a list of objects', () => {
        return request(server)
          .get('/api/resource')
          .then((response) => {
            expect(
              response.body.every((e) => e instanceof Object)
            ).toBeTruthy();
          });
      });
      it('expects the objects to have required properties', () => {
        return request(server)
          .get('/api/resource')
          .then((response) => {
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('user');
            expect(response.body[0]).toHaveProperty('date');
            expect(response.body[0]).toHaveProperty('text');
            expect(response.body[0]).toHaveProperty('embeds');
            expect(response.body[0]).toHaveProperty('attachments');
            expect(response.body[0]).toHaveProperty('score');
            expect(response.body[0]).toHaveProperty('resources');
            expect(response.body[0]).toHaveProperty('subject');
            expect(response.body[0]).toHaveProperty('category');
          });
      });
    });
    describe('PUT', () => {
      it('responds with a 200 status', () => {
        sampleObjects[0].id++;
        return request(server)
          .put('/api/resource')
          .send(sampleObjects[0])
          .expect(200);
      });
      it('it responds with a application/json content type', () => {
        sampleObjects[0].id++;
        return request(server)
          .put('/api/resource')
          .send(sampleObjects[0])
          .expect('Content-Type', /application\/json/);
      });
      it('it responds with the object that was created', () => {
        sampleObjects[0].id++;
        return request(server)
          .put('/api/resource')
          .send(sampleObjects[0])
          .then((response) => {
            expect(response.body.id).toBe(sampleObjects[0].id);
          });
      });
    });
  });
});
