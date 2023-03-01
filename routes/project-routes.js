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
    transferOwnership
} = require('../controllers/project-controller');

router.use(auth);

router.post('/create', create);
router.post('/update', update);
router.delete('/deleteProject/:id', deleteProject);
router.get('/getUserProjects', getUserProjects);
router.get('/getProjectDetails/:id', getProjectDetails);
router.put('/addTeamMember/:id', addTeamMember);
router.post('/transferOwnership/:id', transferOwnership);



module.exports = router;
