const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const {
    create,
    update,
    deleteProject,
    getUserProjects,
    getProjectDetails,
    addTeamMember,
    transferOwnership,
    updateUserProjects,
    changeUserAccessLevel
} = require('../controllers/project-controller');

router.use(auth);

router.post('/create', create);
router.post('/update', update);
router.delete('/deleteProject/:id', deleteProject);
router.get('/getUserProjects', getUserProjects);
router.put('/updateUserProjects/:id', updateUserProjects) //created by Einstein
router.get('/getProjectDetails/:id', getProjectDetails);
router.put('/addTeamMember/:id', addTeamMember);
router.post('/transferOwnership/:id', transferOwnership);
router.post('/:id/changeUserAccessLevel', changeUserAccessLevel);



module.exports = router;
