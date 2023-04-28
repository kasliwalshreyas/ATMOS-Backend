const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const request = supertest(app);

const { connectDB, connectTestDB, disconnectDB } = require('../config/db');
// const { describe } = require('yargs');
jest.setTimeout(200000);

// const userId = new mongoose.Types.ObjectId().toString();

const userInput = { 
    userName: 'test123user',
    email: 'testUser123@atmos.in',
    password: 'akash123',
};

const userInput2 = {
    userName: 'test123user2',
    email: 'test2@atmos.in',
    password: 'akash123',
};

const userInput3 = {
    userName: 'test123user3',
    email: 'test3@atmos.in',
    password: 'akash123',
};


const userLogin = {
    email: 'testUser123@atmos.in',
    password: 'akash123'
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

const projectInput2 = {
    projectName: 'testProject2',
    projectDescription: 'testProjectDescription2',
    projectStatement: 'testProjectStatement2',
    projectMission: 'testProjectMission2',
    projectGuidelines: 'testProjectGuidelines2',
    projectOwner: '644454ce15ededc8027e7bfa',
    projectType: 'testProjectType2'
};

// const sectionInput = {

// }


describe('All Routes', () => {
    beforeAll(async () => {
        await connectTestDB();
        // done();
    });

    // beforeEach((done=>{
    //     done();
    // }))

    afterAll(async () => {
        await disconnectDB();
        // done();
        // server.close();
    });

    describe('User Routes', () => {
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
                const response = await request.post('/user/login').send(userLogin);
                // console.log(response.body);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('Login Success');
                expect(response.body.user).toBeDefined();

                // Save the token for future use
                token = response.body.token;
                userId = response.body.user._id;
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

                describe('(protected) PUT /user/addProjectToFavorite', () => {
                    it('should create project to add to favorite list', async () => {
                        const response2 = await request.post('/project/create').set('Authorization', `Bearer ${token}`).send(projectInput2);
                        // console.log(response2.body);
                        expect(response2.status).toBe(200);
                        expect(response2.body.success).toBe(true);
                        expect(response2.body.message).toBe('Project created successfully');
                        expect(response2.body.project).toBeDefined();
                        projectId2 = response2.body.project._id;
                    });
                    it('(protected) PUT /user/addProjectToFavorite', async () => {
                        const response = await request.put('/user/addProjectToFavorite').set('Authorization', `Bearer ${token}`).send({
                            projectId: projectId2
                        });
                        expect(response.status).toBe(200);
                        expect(response.body.success).toBe(true);
                        expect(response.body.message).toBe('Project added to favorite list');
                    }); 
                });

                it('(protected) PUT /user/removeProjectFromFavorite', async () => {
                    const response = await request.put('/user/removeProjectFromFavorite').set('Authorization', `Bearer ${token}`).send({
                        projectId: projectId2
                    });
                    expect(response.status).toBe(200);
                    expect(response.body.success).toBe(true);
                    expect(response.body.message).toBe('Project removed from favorite list');
                });
            });
        });
});

    // Project routes
    describe('Project Routes', () => {
        describe('POST /project/create', () => {
            it('should create a project', async () => {
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

        describe('GET /project/getUserProjects', () => {
            it('should get all projects', async () => {
                const response = await request.get('/project/getUserProjects').set('Authorization', `Bearer ${token}`);
                // console.log(response.body);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.projects).toBeDefined();
            });
        });

        // describe('GET /project/getProjectDetails', () => {
        //     it('should get a project by id', async () => {
        //         const response = await request.get(`/project/getProjectDetails/${projectId}`).set('Authorization', `Bearer ${token}`);
        //         // console.log(response.body);
        //         expect(response.status).toBe(200);
        //         expect(response.body.success).toBe(true);
        //         expect(response.body.project).toBeDefined();
        //     });
        // });

        describe('PUT /project/addTeamMember', () => {
            it('should register a user to add to a project', async () => {
                const response = await request.post('/user/register').send(userInput2);
                // console.log(response.body);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.user).toBeDefined();
                userId2 = response.body.user;
            });
            it('should add a team member to a project', async () => {
                const response = await request.put(`/project/addTeamMember/${projectId}`).set('Authorization', `Bearer ${token}`).send({ userId: userId2, accessLevel: 'mediumAccess' });
                // console.log(response.body);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('User added to project');
            });
        });

        // Test changeUserAccessLevel
        // describe('POST /project/changeUserAccessLevel', () => {
        //     it('should change the access level of a user in a project', async () => {
        //         // const myToken = jwt.sign({ _id: '644454ce15ededc8026e7bfa' }, process.env.TOKEN_SECRET, { expiresIn: '60' });
        //         const response = await request.post(`/project/${projectId}/changeUserAccessLevel`).set('Authorization', `Bearer ${token}`).send({ userId: userId2 , newAccessLevel: 'highAccess' });
        //         // console.log(response.body);
        //         expect(response.status).toBe(200);
        //         expect(response.body.success).toBe(true);
        //         expect(response.body.message).toBe('User access level changed successfully');
        //     });
        // });

        describe('POST /project/transferOwnership', () => {
            it('should transfer ownership of a project', async () => {
                const response = await request.post(`/project/transferOwnership/${projectId}`).set('Authorization', `Bearer ${token}`).send({ newOwner: userId2 });
                // console.log(response.body);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('Project ownership transferred successfully');
            });
        });

        

        // describe.skip('POST /project/removeTeamMember', () => {
        //     it('should remove a team member in a project', async () => {
        //         const myToken = jwt.sign({ _id: '644454ce15ededc8026e7bfa' }, process.env.TOKEN_SECRET, { expiresIn: '60' });
        //         const response = await request.post('/project/644454f315ededc8026e7c06/removeTeamMember').set('Authorization', `Bearer ${myToken}`).send({ userId: '641dfcae9bfbc50118964537'});
        //         // console.log(response.body);
        //         expect(response.status).toBe(200);
        //         expect(response.body.success).toBe(true);
        //         expect(response.body.message).toBe('User removed from project');
        //     });
        // });

        // Testing route that require ProjectId
        describe('With ProjectId and Token', () => {
            it('should delete a project', async () => {
                const response = await request.delete(`/project/deleteProject/${projectId2}`).set('Authorization', `Bearer ${token}`);
                // console.log(response.body);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('Project deleted successfully');
            });
        });
    });

    // Section routes
    describe('Section Routes', () => {
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
                    projectId: projectId
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
                const response = await request.put(`/section/renameSection/${sectionId}`).set('Authorization', `Bearer ${token}`).send({
                    sectionName: 'testSectionRenamed'
                });
                // console.log(response.body);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.section).toBeDefined();
            });
        });

        describe('DELETE /section/deleteSection', () => {
            it('should delete a section', async () => {
                const response = await request.delete(`/section/deleteSection/${sectionId}`).set('Authorization', `Bearer ${token}`);
                // console.log(response.body);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.section).toBeDefined();
            });
        });
    });


    // Admin routes
    describe('Admin Routes', () => {
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
                const response = await request.get('/admin/users/'+userId);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('User found');
                expect(response.body.user).toBeDefined();
            });
        });

        describe('DELETE /admin/users/:id', () => {
            it('should register a user to delete', async () => {
                const response = await request.post('/user/register').send(userInput3);
                // console.log(response.body);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.user).toBeDefined();
                userId3 = response.body.user;
            });
            it('should delete a user', async () => {
                const response = await request.delete('/admin/users/'+userId3);
                // console.log(response.body);
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
                const response = await request.get('/admin/projects/'+projectId);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('Project found');
                expect(response.body.project).toBeDefined();
            });
        });

        describe('DELETE /admin/projects/:id', () => {
            it('should delete a project', async () => {
                const response = await request.delete('/admin/projects/'+projectId2);
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
            it('should create a section', async () => {
                const response = await request.post('/section/create').set('Authorization', `Bearer ${token}`).send({
                    sectionName: 'testSection',
                    projectId: projectId
                });
                // console.log(response.body);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('Create section successfully');
                expect(response.body.section).toBeDefined();
                sectionId = response.body.section._id;
            });
            it('should return a section', async () => {
                const response = await request.get('/admin/sections/'+sectionId);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('Section found');
                expect(response.body.section).toBeDefined();
            });
        });

        describe('DELETE /admin/sections/:id', () => {
            it('should create a section', async () => {
                const response = await request.post('/section/create').set('Authorization', `Bearer ${token}`).send({
                    sectionName: 'testSection',
                    projectId: projectId
                });
                // console.log(response.body);
                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('Create section successfully');
                expect(response.body.section).toBeDefined();
                sectionId = response.body.section._id;
            });
            it('should delete a section', async () => {
                const response = await request.delete('/admin/sections/'+sectionId);
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

        // describe('GET /admin/tasks/:id', () => {
        //     it('should return a task', async () => {
        //         const response = await request.get('/admin/tasks/6446de8339aa6607f5086e8a');
        //         expect(response.status).toBe(200);
        //         expect(response.body.success).toBe(true);
        //         expect(response.body.message).toBe('Task found');
        //         expect(response.body.task).toBeDefined();
        //     });
        // });

        // describe('DELETE /admin/tasks/:id', () => {
        //     it('should delete a task', async () => {
        //         const response = await request.delete('/admin/tasks/6446de8339aa6607f5086e8a');
        //         expect(response.status).toBe(200);
        //         expect(response.body.success).toBe(true);
        //         expect(response.body.message).toBe('Task deleted successfully');
        //         expect(response.body.task).toBeDefined();
        //     });
        // });
    });

    

    
});



