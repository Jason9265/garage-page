const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const ContactInfo = require('../models/ContactInfo');

describe('Contact Info API', () => {
  beforeAll(async () => {
    // Only connect if there's no active connection
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_TEST_URI);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await ContactInfo.deleteMany({});
  });

  it('should create a new contact info', async () => {
    const newContact = {
      email: { primary: 'test@example.com' },
      phone: { primary: '1234567890' },
      address: { street: '123 Test St' }
    };

    const response = await request(app)
      .post('/api/contact_info')
      .send(newContact)
      .expect(201);

    console.log('Response body:', response.body);

    expect(response.body.email).toEqual(newContact.email);
    expect(response.body.phone).toEqual(newContact.phone);
    expect(response.body.address).toEqual(newContact.address);
    expect(response.body._id).toBeDefined();
  });

  it('should get all contact info', async () => {
    await ContactInfo.create({
      email: { primary: 'test@example.com' },
      phone: { primary: '1234567890' },
      address: { street: '123 Test St' }
    });

    const response = await request(app)
      .get('/api/contact_info')
      .expect(200);

    expect(response.body.length).toBe(1);
  });

  it('should update contact info', async () => {
    const contact = await ContactInfo.create({
      email: { primary: 'test@example.com' },
      phone: { primary: '1234567890' },
      address: { street: '123 Test St' }
    });

    const updatedData = {
      email: { primary: 'updated@example.com' },
      phone: { primary: '0987654321' },
      address: { street: '456 Updated St' }
    };

    const response = await request(app)
      .put(`/api/contact_info/${contact._id}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toMatchObject(updatedData);
  });

  it('should delete contact info', async () => {
    const contact = await ContactInfo.create({
      email: { primary: 'test@example.com' },
      phone: { primary: '1234567890' },
      address: { street: '123 Test St' }
    });

    await request(app)
      .delete(`/api/contact_info/${contact._id}`)
      .expect(200);

    const deletedContact = await ContactInfo.findById(contact._id);
    expect(deletedContact).toBeNull();
  });
}); 