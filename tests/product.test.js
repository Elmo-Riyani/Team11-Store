/**
 * Team Project - Test File
 * Team Members:
 * Adam Jama
 * Ricardo Sylvestre
 * Elmotasembella Riyani
 */

process.env.NODE_ENV = 'test';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Product API Tests', () => {
  it('should get all products', async () => {
    const res = await request(app).get('/api/products');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    console.log('adam@team11store.com - getAll to show all product - 200 - PASSED');
    console.log('ricardo@team11store.com - getAll to show all product - 200 - PASSED');
    console.log('elmotasembella@team11store.com - getAll to show all product - 200 - PASSED');
  });
});