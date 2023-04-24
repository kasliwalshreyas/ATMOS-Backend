const supertest = require('supertest');
const { app, server } = require('../app');
const request = supertest(app);
const { connectDB, disconnectDB } = require('../config/db');

jest.setTimeout(70000);

describe('Admin Routes', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await disconnectDB();
        server.close();
    });

    describe('GET /admin/users', () => {
        it('should return all users', async () => {
            const response = await request.get('/admin/users');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('All users');
            expect(response.body.users).toBeDefined();
        });
    });

    describe('GET /admin/users/:id', () => {
        it('should return a user', async () => {
            const response = await request.get('/admin/users/641c7986a558e83a3c0ec945');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('User found');
            expect(response.body.user).toBeDefined();
        });
    });

    describe('DELETE /admin/users/:id', () => {
        it('should delete a user', async () => {
            const response = await request.delete('/admin/users/641c7986a558e83a3c0ec945');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('User deleted successfully');
            expect(response.body.user).toBeDefined();
        });
    });

    // Projects routes in Admin
    describe('GET /admin/projects', () => {
        it('should return all projects', async () => {
            const response = await request.get('/admin/projects');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('All projects');
            expect(response.body.projects).toBeDefined();
        });
    });

    describe('GET /admin/projects/:id', () => {
        it('should return a project', async () => {
            const response = await request.get('/admin/projects/641f5c3d881d6b4ad63529c5');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Project found');
            expect(response.body.project).toBeDefined();
        });
    });

    describe('DELETE /admin/projects/:id', () => {
        it('should delete a project', async () => {
            const response = await request.delete('/admin/projects/641f5c3d881d6b4ad63529c5');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Project deleted successfully');
            expect(response.body.project).toBeDefined();
        });
    });

    // Section routes in admin
    describe('GET /admin/sections', () => {
        it('should return all sections', async () => {
            const response = await request.get('/admin/sections');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('All sections');
            expect(response.body.sections).toBeDefined();
        });
    });

    describe('GET /admin/sections/:id', () => {
        it('should return a section', async () => {
            const response = await request.get('/admin/sections/641f0061c12a0c12a934c3f2');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Section found');
            expect(response.body.section).toBeDefined();
        });
    });

    describe('DELETE /admin/sections/:id', () => {
        it('should delete a section', async () => {
            const response = await request.delete('/admin/sections/641f0061c12a0c12a934c3f2');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Section deleted successfully');
            expect(response.body.section).toBeDefined();
        });
    });

    // Task routes in admin
    describe('GET /admin/tasks', () => {
        it('should return all tasks', async () => {
            const response = await request.get('/admin/tasks');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('All tasks');
            expect(response.body.tasks).toBeDefined();
        });
    });

    describe('GET /admin/tasks/:id', () => {
        it('should return a task', async () => {
            const response = await request.get('/admin/tasks/641f0084c12a0c12a934c41c');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Task found');
            expect(response.body.task).toBeDefined();
        });
    });

    describe('DELETE /admin/tasks/:id', () => {
        it('should delete a task', async () => {
            const response = await request.delete('/admin/tasks/641f0084c12a0c12a934c41c');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Task deleted successfully');
            expect(response.body.task).toBeDefined();
        });
    });

});