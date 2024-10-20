import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('API Testing', () => {
  
  it('should return all items', (done) => {
    request(app)
      .get('/api/items')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        done();
      });
  });

  it('should create a new item', (done) => {
    const newItem = { name: 'Item 3' };
    request(app)
      .post('/api/items')
      .send(newItem)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name', 'Item 3');
        done();
      });
  });

  // Latihan 1: Test DELETE /api/items/:id
  it('should delete an item by id', (done) => {
    const itemIdToDelete = 1; 

    request(app)
      .delete(`/api/items/${itemIdToDelete}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Item deleted successfully');

        
        request(app)
          .get('/api/items')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            const deletedItem = res.body.find(item => item.id === itemIdToDelete);
            expect(deletedItem).to.be.undefined; 
            done();
          });
      });
  });

  // Latihan 2: Test PUT /api/items/:id
  it('should update an item by id', (done) => {
    const itemIdToUpdate = 2; 
    const updatedData = { name: 'Updated Item 2' };

    request(app)
      .put(`/api/items/${itemIdToUpdate}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', itemIdToUpdate);
        expect(res.body).to.have.property('name', 'Updated Item 2');

        
        request(app)
          .get('/api/items')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            const updatedItem = res.body.find(item => item.id === itemIdToUpdate);
            expect(updatedItem).to.have.property('name', 'Updated Item 2');
            done();
          });
      });
  });

});