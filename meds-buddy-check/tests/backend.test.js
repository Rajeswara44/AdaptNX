import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../meds-buddy-check/backend/routes/authRoutes';
import medicationRoutes from '../meds-buddy-check/backend/routes/medicationRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);

describe('Backend API Tests', () => {
  let userId;
  let token;
  let medicationId;

  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'testuser', password: 'testpass', role: 'patient' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userId');
    userId = res.body.userId;
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should add a medication', async () => {
    const res = await request(app)
      .post('/api/medications/add')
      .send({ userId, name: 'Ibuprofen', dosage: '200mg', frequency: 'Once a day' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('medicationId');
    medicationId = res.body.medicationId;
  });

  it('should get medications for user', async () => {
    const res = await request(app).get("/api/medications/" + userId);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should mark medication as taken', async () => {
    const res = await request(app)
      .post('/api/medications/mark-taken')
      .send({ medicationId, date: '2023-01-01', taken: 1 });
    expect(res.statusCode).toEqual(200);
  });
});
