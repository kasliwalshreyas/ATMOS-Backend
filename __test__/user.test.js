const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const request = supertest(app);

const { connectDB, disconnectDB } = require('../config/db');
// const { describe } = require('yargs');
jest.setTimeout(200000);

const userId = new mongoose.Types.ObjectId().toString();

const userInput = { 
    userName: 'testUser123',
    email: 'test123@atmos.in',
    password: 'akash123',
};

const projectInput = {
    projectName: 'testProject',
    projectDescription: 'testProjectDescription',
    projectStatement: 'testProjectStatement',
    projectMission: 'testProjectMission',
    projectGuidelines: 'testProjectGuidelines',
    projectOwner: '644454ce15ededc8026e7bfa',
    projectType: 'testProjectType'
};


describe('User Routes', () => {
    beforeAll(async () => {
        await connectDB();
    });

    // beforeEach((done=>{
    //     done();
    // }))

    afterAll(async () => {
        await disconnectDB();
        // server.close();
    });

    describe('POST /user/register', () => {
        it('should register a user', async () => {
            const response = await request.post('/user/register').send(userInput);
            console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.user).toBeDefined();
        });
    });

    describe('POST /user/login', () => {
        it('should login a user', async () => {
            const response = await request.post('/user/login').send({
                email: 'test123@atmos.in',
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
                    projectId: '6446de5739aa6607f5086e20'
                });
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('Project added to favorite list');
            });

            it('(protected) PUT /user/removeProjectFromFavorite', async () => {
                const response = await request.put('/user/removeProjectFromFavorite').set('Authorization', `Bearer ${token}`).send({
                    projectId: '6446de5739aa6607f5086e20'
                });
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('Project removed from favorite list');
            });
        });
    });


    // Admin routes
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
            const response = await request.get('/admin/users/6446cb2e43130fc5c76be487');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('User found');
            expect(response.body.user).toBeDefined();
        });
    });

    describe('DELETE /admin/users/:id', () => {
        it('should delete a user', async () => {
            const response = await request.delete('/admin/users/6446de4e39aa6607f5086e16');
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
            const response = await request.get('/admin/projects/6446de5739aa6607f5086e20');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Project found');
            expect(response.body.project).toBeDefined();
        });
    });

    describe('DELETE /admin/projects/:id', () => {
        it('should delete a project', async () => {
            const response = await request.delete('/admin/projects/6446de5739aa6607f5086e20');
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
            const response = await request.get('/admin/sections/6446cb3458df18e7303cfce7');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Section found');
            expect(response.body.section).toBeDefined();
        });
    });

    describe('DELETE /admin/sections/:id', () => {
        it('should delete a section', async () => {
            const response = await request.delete('/admin/sections/6446cb3458df18e7303cfce7');
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
            const response = await request.get('/admin/tasks/6446de8339aa6607f5086e8a');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Task found');
            expect(response.body.task).toBeDefined();
        });
    });

    describe('DELETE /admin/tasks/:id', () => {
        it('should delete a task', async () => {
            const response = await request.delete('/admin/tasks/6446de8339aa6607f5086e8a');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Task deleted successfully');
            expect(response.body.task).toBeDefined();
        });
    });

    // Section routes
    describe('POST /section/create', () => {
        // it('user should be logged in to create a section', async () => {
        //     const response = await request.post('/user/register').send(userInput);
        //     const response2 = await request.post('/user/login').send(userLogin);
        //     // console.log(response.body);
        //     expect(response2.status).toBe(200);
        //     expect(response2.body.success).toBe(true);
        //     expect(response2.body.message).toBe('Login Success');
        //     expect(response2.body.user).toBeDefined();

        //     // Save the token for future use
        //     token = response2.body.token;
        // });

        it('should create a section', async () => {
            const response = await request.post('/section/create').set('Authorization', `Bearer ${token}`).send({
                sectionName: 'testSection',
                projectId: '644454f315ededc8026e7c06'
            });
            // console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Create section successfully');
            expect(response.body.section).toBeDefined();
            sectionId = response.body.section._id;
        });
    });

    describe('PUT /section/renameSection', () => {
        it('should get a section', async () => {
            const response = await request.put(`/section/renameSection/64455122bab6a91417e7cce5`).set('Authorization', `Bearer ${token}`).send({
                sectionName: 'testSectionRenamed'
            });
            // console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.section).toBeDefined();
        });
    });

    // describe('DELETE /section/deleteSection', () => {
    //     it('should get all sections', async () => {
    //         const response = await request.delete(`/section/deleteSection/64455122bab6a91417e7cce5`).set('Authorization', `Bearer ${token}`);
    //         console.log(response.body);
    //         expect(response.status).toBe(200);
    //         expect(response.body.success).toBe(true);
    //         expect(response.body.sections).toBeDefined();
    //     });
    // });

    // Project routes
    describe('POST /project/create', () => {
        // it('user should be logged in to create a project', async () => {
        //     const response = await request.post('/user/register').send(userInput);
        //     const response2 = await request.post('/user/login').send(userLogin);
        //     // console.log(response.body);
        //     expect(response2.status).toBe(200);
        //     expect(response2.body.success).toBe(true);
        //     expect(response2.body.message).toBe('Login Success');
        //     expect(response2.body.user).toBeDefined();
        //     userId = response2.body.user._id;
        //     // Save the token for future use
        //     token = response2.body.token;
        // });

        it('should create a project', async () => {
            // const response = await request.post('/user/login').send(userLogin);
            // // console.log(response.body);
            // expect(response.status).toBe(200);
            // expect(response.body.success).toBe(true);
            // expect(response.body.message).toBe('Login Success');
            // expect(response.body.user).toBeDefined();

            // // Save the token for future use
            // token = response.body.token;
            const response2 = await request.post('/project/create').set('Authorization', `Bearer ${token}`).send(projectInput);
            // console.log(response2.body);
            expect(response2.status).toBe(200);
            expect(response2.body.success).toBe(true);
            expect(response2.body.message).toBe('Project created successfully');
            expect(response2.body.project).toBeDefined();
            // Save the projectId for future use
            projectId = response2.body.project._id;
        });
    });

    describe.skip('GET /project/getUserProjects', () => {
        it('should get all projects', async () => {
            const response = await request.get('/project/getUserProjects').set('Authorization', `Bearer ${token}`);
            // console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.projects).toBeDefined();
        });
    });

    describe.skip('GET /project/getProjectDetails', () => {
        it('should get a project by id', async () => {
            const response = await request.get(`/project/getProjectDetails/${projectId}`).set('Authorization', `Bearer ${token}`);
            // console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.project).toBeDefined();
        });
    });

    describe('PUT /project/addTeamMember', () => {
        it('should add a team member to a project', async () => {
            const response = await request.put('/project/addTeamMember/644454f315ededc8026e7c06').set('Authorization', `Bearer ${token}`).send({ userId: '641d5832b6cd277cd1f9d201', accessLevel: 'lowAccess' });
            // console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('User added to project');
        });
    });

    describe('POST /project/transferOwnership', () => {
        it('should transfer ownership of a project', async () => {
            const response = await request.post('/project/transferOwnership/644454f315ededc8026e7c06').set('Authorization', `Bearer ${token}`).send({ newOwner: '641c25296ea464a6a6799a7e' });
            // console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Project ownership transferred successfully');
        });
    });

    // Test changeUserAccessLevel
    describe.skip('POST /project/changeUserAccessLevel', () => {
        it('should change the access level of a user in a project', async () => {
            const myToken = jwt.sign({ _id: '644454ce15ededc8026e7bfa' }, process.env.TOKEN_SECRET, { expiresIn: '60' });
            const response = await request.post('/project/644454f315ededc8026e7c06/changeUserAccessLevel').set('Authorization', `Bearer ${myToken}`).send({ userId: '641dfcae9bfbc50118964537', newAccessLevel: 'mediumAccess' });
            console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('User access level changed successfully');
        });
    });

    describe.skip('POST /project/removeTeamMember', () => {
        it('should remove a team member in a project', async () => {
            const myToken = jwt.sign({ _id: '644454ce15ededc8026e7bfa' }, process.env.TOKEN_SECRET, { expiresIn: '60' });
            const response = await request.post('/project/644454f315ededc8026e7c06/removeTeamMember').set('Authorization', `Bearer ${myToken}`).send({ userId: '641dfcae9bfbc50118964537'});
            console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('User removed from project');
        });
    });

     // Testing route that require ProjectId
     describe.skip('With ProjectId and Token', () => {
        it('should delete a project', async () => {
            const response = await request.delete(`/project/deleteProject/${projectId}`).set('Authorization', `Bearer ${token}`);
            // console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Project deleted successfully');
        });
    });
});



