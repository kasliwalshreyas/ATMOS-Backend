const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const request = supertest(app);

const { connectDB, disconnectDB } = require('../config/db');
// const { describe } = require('yargs');
jest.setTimeout(200000);

const userId = new mongoose.Types.ObjectId().toString();

const userInput = { 
    userName: 'testUser',
    email: 'test@atmos.in',
    password: 'akash123',
};


describe('User Routes', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await disconnectDB();
        // server.close();
    });

    describe('POST /user/register', () => {
        it('should register a user', async () => {
            const response = await request.post('/user/register').send(userInput);
            // console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.user).toBeDefined();
        });
    });

    describe('POST /user/login', () => {
        it('should login a user', async () => {
            const response = await request.post('/user/login').send({
                email: 'test@atmos.in',
                password: 'akash123'
            });
            // console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Login Success');
            expect(response.body.user).toBeDefined();

            // Save the token for future use
            token = response.body.token;
        });

         // Test authenticated routes
         describe('Authenticated Routes', () => {
            it('(protected) GET /user/getUserInfo', async () => {
                const response = await request.get('/user/getUserInfo').set('Authorization', `Bearer ${token}`);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('User Info');
                expect(response.body.user).toBeDefined();
            });

            it('(protected) PUT /user/addProjectToFavorite', async () => {
                const response = await request.put('/user/addProjectToFavorite').set('Authorization', `Bearer ${token}`).send({
                    projectId: '644454f315ededc8026e7c06'
                });
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('Project added to favorite list');
            });

            it('(protected) PUT /user/removeProjectFromFavorite', async () => {
                const response = await request.put('/user/removeProjectFromFavorite').set('Authorization', `Bearer ${token}`).send({
                    projectId: '644454f315ededc8026e7c06'
                });
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('Project removed from favorite list');
            });
        });
    });
});



