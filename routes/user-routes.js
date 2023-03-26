require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { register, login, getUserInfo, getUserList, uploadAvatar, updateUser, addProjectToFavorite, removeProjectFromFavorite } = require('../controllers/user-controller');
const upload = require('../middlewares/avatarUpload');


/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The user's id
 *              userName:
 *                  type: string
 *                  description: The user's name
 *              email:
 *                  type: string
 *                  description: The user's email
 *              password:
 *                  type: string
 *                  description: The user's password
 *              avatar:
 *                  type: string
 *                  description: The user's avatar
 *              projectIdList:
 *                 type: array
 *                 description: The user's projects
 *              noteIdList:
 *                 type: array
 *                 description: The user's notes
 *              taskAssignedIdList:
 *                  type: array
 *                  description: The user's tasks
 *              favoriteProjects:
 *                  type: array
 *                  description: The user's favorite projects
 *              createdAt:
 *                  type: string
 *                  description: The user's creation date
 *          example:
 *             _id: 60a9b0b0b0b0b0b0b0b0b0b0
 *             name: John Doe
 *             email: john@atmos.in 
 *             password: shreyas
 *             avatar: https://www.google.com
 *             favoriteProjects: []
 *             createdAt: 2021-05-20T12:00:00.000Z
 *             updatedAt: 2021-05-20T12:00:00.000Z
 *             __v: 0
 *  
 */







router.post('/register', register);
router.post('/login', login);
router.post('/uploadAvatar', auth, upload.single('avatar'), uploadAvatar);
router.post('/updateUser', auth, updateUser);

router.get('/getUserInfo', auth, getUserInfo);
router.get('/getUserList', auth, getUserList);
router.put('/addProjectToFavorite', auth, addProjectToFavorite);
router.put('/removeProjectFromFavorite', auth, removeProjectFromFavorite);


/**
 * @swagger
 * tags:
 * name: User
 * description: User management
 * 
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 * 
 */

/**
 * @swagger
 * /user/register:
 *  post:
 *      summary: Register a new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         email:
 *                              type: string
 *                              description: The user's email
 *                         password:
 *                              type: string
 *                              description: The user's password
 *      responses:
 *          200:
 *              description: The user was successfully created
 *          content:
 *              application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *          500:
 *              description: Some server error
 *          400:
 *              description: Bad request
 * 
  */

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: Login a user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         email:
 *                              type: string
 *                              description: The user's email
 *                         password:
 *                              type: string
 *                              description: The user's password
 *      responses:
 *          200:
 *              description: The user was successfully logged in
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: success
 *                              token:
 *                                  type: string
 *                                  description: auth token
 *                              user:
 *                                  ref: '#/components/schemas/User'
 *                              message:
 *                                  type: string
 *                                  description: message                                                                 
 *          500:
 *              description: Some server error
 *          400:
 *              description: Bad request
 * 
*/

/**
 * @swagger
 * /user/getUserInfo:
 *  get:
 *     summary: Get user info
 *     tags: [User]
 *     responses:
 *          200:
 *              description: The user info was successfully retrieved
 *              content:
 *                  application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/User'
 *          500:
 *              description: Some server error
 *          400:
 *              description: Bad request
 *     security:
 *         - bearerAuth: []
 * 
 * 
 */




module.exports = router;