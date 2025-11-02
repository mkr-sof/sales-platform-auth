import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import User from '../src/models/User.js';
import bcrypt from 'bcryptjs';

describe('Auth API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // clean test DB
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const testUser = { email: 'michael@example.com', password: 'password123', name: 'Michael Jordan', };

  it('should register a new user', async () => {
    const res = await request(app).post('/auth/register').send(testUser).expect(201);
    expect(res.body.user).toHaveProperty('email', testUser.email);
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('should login with correct credentials', async () => {
    const res = await request(app).post('/auth/login').send({email: testUser.email, password: testUser.password}).expect(200);

    expect(res.body).toHaveProperty('accessToken');
  expect(res.body.user).toHaveProperty('email', testUser.email);
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, password: 'wrongpassword' })
      .expect(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});
