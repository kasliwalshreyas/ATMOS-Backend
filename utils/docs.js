exports.apiDoc = {
    openapi: '3.0.0',
    info: {
        title: 'Atmos API',
        version: '1.0.0',
        description: 'Atmos API',
    },
    servers: [
        {
            url: 'http://localhost:4000',
        },
    ],
    paths: {
        '/user/register': {
            post: {
                summary: 'Register a new user',
                tags: ['User'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: {
                                        type: 'string',
                                        description: "The user's email",
                                    },
                                    password: {
                                        type: 'string',
                                        description: "The user's password",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'The user was successfully created',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                        user: {
                                            type: 'string',
                                            description: 'User Id',
                                        }
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Bad request',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/user/login': {
            post: {
                summary: 'Login a user',
                tags: ['User'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: {
                                        type: 'string',
                                        description: "The user's email",
                                    },
                                    password: {
                                        type: 'string',
                                        description: "The user's password",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'The user was successfully logged in',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                        token: {
                                            type: 'string',
                                            description: 'Token',
                                        },
                                        user: {
                                            $ref: '#/components/schemas/User',
                                        }
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Bad request',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/user/getUserInfo': {
            get: {
                summary: 'Get user info',
                tags: ['User'],
                security: [
                    {
                        bearerAuth: [],
                    }
                ],
                responses: {
                    200: {
                        description: 'The user info was successfully retrieved',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                        user: {
                                            $ref: '#/components/schemas/User',
                                        },
                                    },

                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    }
                }

            },
        },
        '/user/getUserList': {
            get: {
                summary: 'Get user list',
                tags: ['User'],
                security: [
                    {
                        bearerAuth: [],
                    }
                ],
                responses: {
                    200: {
                        description: 'The user list was successfully retrieved',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                        userList: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/User',
                                            },
                                        },
                                    },

                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    }
                }
            }
        },
        '/user/addProjectToFavorite': {
            put: {
                summary: 'Add project to favorite',
                tags: ['User'],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    projectId: {
                                        type: 'string',
                                        description: 'The project id',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'The project was successfully added to favorite',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/user/removeProjectFromFavorite': {
            put: {
                summary: 'Remove project from favorite',
                tags: ['User'],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    projectId: {
                                        type: 'string',
                                        description: 'The project id',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'The project was successfully removed from favorite',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/user/uploadAvatar': {
            post: {
                summary: 'Upload avatar',
                tags: ['User'],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'multipart/form-data': {
                            schema: {
                                type: 'object',
                                properties: {
                                    avatar: {
                                        type: 'string',
                                        format: 'base64',
                                        description: 'The avatar',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'The avatar was successfully uploaded',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                        user: {
                                            $ref: '#/components/schemas/User',
                                        },
                                    },

                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    }
                },
            },
        },
        '/user/updateUser': {
            post: {
                summary: 'Update User Info',
                tags: ['User'],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userName: {
                                        type: 'string',
                                        description: 'The name',
                                    },
                                    email: {
                                        type: 'string',
                                        description: 'The email',
                                    },
                                    password: {
                                        type: 'string',
                                        description: 'The password',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'The user info was successfully updated',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                        user: {
                                            $ref: '#/components/schemas/User',
                                        },
                                    },

                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                        error: {
                                            type: 'string',
                                            description: 'Error',
                                        }
                                    },
                                },
                            },
                        },
                    }
                },
            },
        },
        '/project/create': {
            post: {
                summary: 'Create Project',
                tags: ['Project'],
                security: [
                    {
                        bearerAuth: [],
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    projectName: {
                                        type: 'string',
                                        description: "project name",
                                    },
                                    projectType: {
                                        type: 'string',
                                        description: "project type",
                                    },
                                    projectStatement: {
                                        type: 'string',
                                        description: "project statement",
                                    },
                                    projectMission: {
                                        type: 'string',
                                        description: "project mission",
                                    },
                                    projectDescription: {
                                        type: 'string',
                                        description: "project description",
                                    },
                                    projectGuidelines: {
                                        type: 'string',
                                        description: "project guidelines",
                                    },
                                    projectOwner: {
                                        type: 'string',
                                        description: "Id of of user who created this project"
                                    }
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'The project was successfully created',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                        project: {
                                            type: 'string',
                                            description: 'Projects',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    }
                                },
                            },
                        },
                    },
                },
            },
        },
        '/project/deleteProject/{id}': {
            delete: {
                summary: 'Delete Project',
                tags: ['Project'],
                security: [
                    {
                        bearerAuth: [],
                    }
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'Project id',
                        required: true,
                        schema: {
                            type: 'string',
                            description: 'Project id',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'The project was successfully deleted',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    }
                                },
                            },
                        },
                    },
                },
            },
        },
        '/project/getUserProjects': {
            get: {
                summary: 'Get User Projects',
                tags: ['Project'],
                security: [
                    {
                        bearerAuth: [],
                    }
                ],
                responses: {
                    200: {
                        description: 'The project was successfully deleted',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                        projects: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/Project',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    }
                                },
                            },
                        },
                    },
                },
            },
        },
        '/project/updateLastUsed/{id}': {
            put: {
                summary: 'Update Last Used',
                tags: ['Project'],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'Project id',
                        required: true,
                        schema: {
                            type: 'string',
                            description: 'Project id',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "The project's last used was updated",
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/project/getProjectDetails/{id}': {
            get: {
                summary: 'Get Project Details',
                tags: ['Project'],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'Project id',
                        required: true,
                        schema: {
                            type: 'string',
                            description: 'Project id',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "The project's detail was fetched",
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                        project: {
                                            $ref: '#/components/schemas/Project',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/project/addTeamMember/{id}': {
            put: {
                summary: 'Add Team Member',
                tags: ['Project'],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'Project id',
                        required: true,
                        schema: {
                            type: 'string',
                            description: 'Project id',
                        },
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userId: {
                                        type: 'string',
                                        description: 'The user email',
                                        required: true,
                                    },
                                    accessLevel: {
                                        type: 'string',
                                        description: 'The user access level',
                                        required: true,
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'The team member was successfully added',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    }
                                },
                            },
                        },
                    },
                },
            },
        },
        '/project/transferOwnership/{id}': {
            post: {
                summary: 'Transfer Ownership',
                tags: ['Project'],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'Project id',
                        required: true,
                        schema: {
                            type: 'string',
                            description: 'Project id',
                        },
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    newowner: {
                                        type: 'string',
                                        description: 'The user email',
                                        required: true,
                                    }
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'The project was successfully transferred',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    }
                                },
                            },
                        },
                    },
                },
            },
        },
        '/project/{id}/changeUserAccessLevel': {
            post: {
                summary: 'Change User Access Level',
                tags: ['Project'],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'Project id',
                        required: true,
                        schema: {
                            type: 'string',
                            description: 'Project id',
                        },
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userId: {
                                        type: 'string',
                                        description: 'The user id',
                                        required: true,
                                    },
                                    newAccessLevel: {
                                        type: 'string',
                                        description: 'The user access level',
                                        required: true,
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'The access level was successfully changed',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    }
                                },
                            },
                        },
                    },
                },
            },
        },
        '/project/{id}/removeTeamMember': {
            post: {
                summary: 'Remove Team Member',
                tags: ['Project'],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'Project id',
                        required: true,
                        schema: {
                            type: 'string',
                            description: 'Project id',
                        },
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userId: {
                                        type: 'string',
                                        description: 'The user id',
                                        required: true,
                                    }
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'The team member was successfully removed',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Some server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            description: 'Success status',
                                        },
                                        message: {
                                            type: 'string',
                                            description: 'Message',
                                        },
                                    }
                                },
                            },
                        },
                    },
                },
            },
        },
    },


    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'The user id',
                        required: true,
                    },
                    email: {
                        type: 'string',
                        description: "The user's email",
                        required: true,
                    },
                    password: {
                        type: 'string',
                        description: "The user's password",
                        required: true,
                    },
                    avatar: {
                        type: 'string',
                        description: "The user's avatar",
                    },
                    projectIdList: {
                        type: 'array',
                        description: "The user's project id list",
                    },
                    noteIdList: {
                        type: 'array',
                        description: "The user's note id list",
                    },
                    taskAssignedIdList: {
                        type: 'array',
                        description: "The user's task assigned id list",
                    },
                    favProjectIdList: {
                        type: 'array',
                        description: "The user's favorite projects",
                    },
                    createdAt: {
                        type: 'string',
                        description: 'The user creation date',
                    }
                },
            },
            Project: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'The project id',
                        required: true,
                    },
                    projectName: {
                        type: 'string',
                        description: "The project's name",
                        required: true,
                    },
                    projectOwner: {
                        $ref: '#/components/schemas/User',
                    },
                    projectHighAccessMembers: {
                        type: 'array',
                        description: "The project's high access members",
                    },
                    projectMediumAccessMembers: {
                        type: 'array',
                        description: "The project's medium access members",
                    },
                    projectLowAccessMembers: {
                        type: 'array',
                        description: "The project's low access members",
                    },
                    projectSectionIdList: {
                        type: 'array',
                        description: "The project's section id list",

                    },
                    projectTaskIdList: {
                        type: "array",
                        description: "The project's task id list",
                    },
                    projectType: {
                        type: "string",
                        description: "The project's type"

                    },
                    projectStatement: {
                        type: "string",
                        description: "The project's statement"
                    },
                    projectMission: {
                        type: "string",
                        description: "The project's mission"
                    },
                    projectDescription: {
                        type: 'string',
                        description: "The project's description",
                    },
                    projectGuidelines: {
                        type: "string",
                        description: "The project's guidelines"
                    },
                    projectStatus: {
                        type: "string",
                        description: "The project's status"
                    },
                    projectStartDate: {
                        type: "string",
                        description: "Project start date"

                    },
                    projectEndDate: {
                        type: "string",
                        description: "Project end date"

                    },
                    projectCreatedAt: {
                        type: "string",
                        description: "Project creation date"

                    }


                },
            },
        },

        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        }
    }
};