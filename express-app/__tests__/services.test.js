const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Service = require('../models/Service');

describe('Services API', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_TEST_URI);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Service.deleteMany({});
  });

  const sampleService = {
    name: 'Oil Change',
    description: 'Full synthetic oil change service',
    price: 49.99,
    duration: 30, // minutes
    category: 'Maintenance'
  };

  describe('POST /api/services', () => {
    it('should create a new service', async () => {
      const response = await request(app)
        .post('/api/services')
        .send(sampleService)
        .expect(201);

      expect(response.body.name).toBe(sampleService.name);
      expect(response.body.price).toBe(sampleService.price);
      expect(response.body._id).toBeDefined();
    });

    it('should fail to create service without required fields', async () => {
      const invalidService = { name: 'Invalid Service' };
      await request(app)
        .post('/api/services')
        .send(invalidService)
        .expect(400);
    });
  });

  describe('GET /api/services', () => {
    it('should get all services', async () => {
      // Create multiple services
      await Service.create([sampleService, {
        ...sampleService,
        name: 'Tire Rotation',
        price: 29.99
      }]);

      const response = await request(app)
        .get('/api/services')
        .expect(200);

      expect(response.body.length).toBe(2);
      expect(response.body[0].name).toBeDefined();
      expect(response.body[1].name).toBeDefined();
    });

    it('should get a specific service by ID', async () => {
      const service = await Service.create(sampleService);

      const response = await request(app)
        .get(`/api/services/${service._id}`)
        .expect(200);

      expect(response.body.name).toBe(sampleService.name);
    });

    it('should return 404 for non-existent service ID', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .get(`/api/services/${fakeId}`)
        .expect(404);
    });
  });

  describe('PUT /api/services/:service_id', () => {
    it('should update an existing service', async () => {
      const service = await Service.create(sampleService);
      const updatedData = {
        ...sampleService,
        name: 'Premium Oil Change',
        price: 59.99
      };

      const response = await request(app)
        .put(`/api/services/${service._id}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.name).toBe(updatedData.name);
      expect(response.body.price).toBe(updatedData.price);
    });

    it('should return 400 for invalid service ID', async () => {
      await request(app)
        .put('/api/services/invalid-id')
        .send(sampleService)
        .expect(400);
    });
  });

  describe('DELETE /api/services/:service_id', () => {
    it('should delete an existing service', async () => {
      const service = await Service.create(sampleService);

      await request(app)
        .delete(`/api/services/${service._id}`)
        .expect(200);

      const deletedService = await Service.findById(service._id);
      expect(deletedService).toBeNull();
    });

    it('should return 400 for invalid service ID', async () => {
      await request(app)
        .delete('/api/services/invalid-id')
        .expect(400);
    });
  });
});