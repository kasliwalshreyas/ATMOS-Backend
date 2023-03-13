const User = require("../models/User");
const Project = require("../models/Project");
const Section = require("../models/Section");
const Task = require("../models/Task");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");



const create = async (req, res) => {
    try {

        // console.log(req.body, "req.body from project controller -> create");

        const project = new Project({
            projectName: req.body.projectName,
            projectType: req.body.projectType,
            projectOwner: mongoose.Types.ObjectId(req.body.projectOwner),
            sectionIdList: [],
            taskIdList: [],
            projectHighAccessMembers: [
                mongoose.Types.ObjectId(req.body.projectOwner),
            ],
            projectMediumAccessMembers: [],
            projectLowAccessMembers: [],
            projectSectionIdList: [],
            projectTaskIdList: [],
            projectStatement: req.body.projectStatement,
            projectMission: req.body.projectMission,
            projectDescription: req.body.projectDescription,
            projectGuidelines: req.body.projectGuidelines,
            projectStatus: " ",
            // projectPriority: req.body.projectPriority,
            projectStartDate: Date.now(),
            projectEndDate: Date.now() + 90,
        });
        const savedProject = await project.save();

        //add project to user's project list
        const userId = mongoose.Types.ObjectId(req.body.projectOwner);

        const userInfo = await User.findByIdAndUpdate(userId,
            {
                $push: {
                    projectIdList: savedProject._id,
                },
            },
            { new: true }
        );

        // console.log(savedProject, "savedProject from project controller -> create");

        res.status(200).json({
            success: true,
            project: savedProject
        });
    } catch (err) {
        console.log(err, "Error from project controller -> create");
        res.status(400).json({
            success: false,
            message: err
        });
    }
}

const update = async (req, res) => {

}

const deleteProject = async (req, res) => {

    try {
        const projectId = mongoose.Types.ObjectId(req.params.id);
        const project = await Project.findByIdAndDelete(projectId);

        //remove project from user's project list
        const userList = project.projectHighAccessMembers.concat(project.projectMediumAccessMembers, project.projectLowAccessMembers);
        for (let i = 0; i < userList.length; i++) {
            const userId = mongoose.Types.ObjectId(userList[i]);
            const res = await User.findByIdAndUpdate(userId, {
                $pull: {
                    projectIdList: projectId
                }
            }, { new: true })
        }

        //delete sections of the project
        for (let i = 0; i < project.projectSectionIdList.length; i++) {
            const sectionId = mongoose.Types.ObjectId(project.projectSectionIdList[i]);
            const res = await Section.findByIdAndDelete(sectionId);
        }

        //delete tasks of the project
        for (let i = 0; i < project.projectTaskIdList.length; i++) {
            const taskId = mongoose.Types.ObjectId(project.projectTaskIdList[i]);
            const res = await Task.findByIdAndDelete(taskId);

            if (res.taskAssigneeList.length > 0) {
                res.taskAssigneeList.forEach(async (userId) => {
                    const response = User.findByIdAndUpdate(userId, {
                        $pull: {
                            taskAssignedIdList: taskId
                        },
                    }, { new: true })
                })


            }
        }

        console.log(project, "project from project controller -> deleteProject");

        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            project: project
        });
    }
    catch (err) {
        console.log(err, "Error from project controller -> deleteProject");
        res.status(400).json({
            success: false,
            message: err
        });

    }


}

const getUserProjects = async (req, res) => {

    try {

        const userId = mongoose.Types.ObjectId(req.user._id);
        const userInfo = await User.findById(userId);
        // console.log(userInfo, "userInfo from project controller -> getUserProjects");
        const projectList = userInfo.projectIdList;
        // console.log(projectList, "projectList from project controller -> getUserProjects");
        //populate projects from Projects collection
        const projects = await Project.find({ _id: { $in: projectList } })
            .populate("projectOwner")
            .populate("projectHighAccessMembers")
            .populate("projectMediumAccessMembers")
            .populate("projectLowAccessMembers")
            .populate({ path: "projectSectionIdList", populate: { path: "taskIdList" } })
            .populate("projectTaskIdList");
        // console.log(projects, "projects from project controller -> getUserProjects");

        res.status(200).json({
            success: true,
            projects: projects
        });

    }
    catch (err) {
        console.log(err, "Error from project controller -> getUserProjects");
        res.status(400).json({
            success: false,
            message: err
        });
    }

}

const getProjectDetails = async (req, res) => {

    try {
        const projectId = mongoose.Types.ObjectId(req.params.id);
        const project = await Project.findById(projectId)
            .populate("projectOwner")
            .populate("projectHighAccessMembers")
            .populate("projectMediumAccessMembers")
            .populate("projectLowAccessMembers")
            .populate({ path: "projectSectionIdList", populate: { path: "taskIdList" } })
            .populate("projectTaskIdList");
        // console.log(project, "project from project controller -> getProjectDetails");

        res.status(200).json({
            success: true,
            project: project
        });
    }
    catch (err) {
        console.log(err, "Error from project controller -> getProjectDetails");
        res.status(400).json({
            success: false,
            message: err
        });
    }
}

const addTeamMember = async (req, res) => {

    try {
        const projectId = mongoose.Types.ObjectId(req.params.id);
        const userId = mongoose.Types.ObjectId(req.body.userId);
        const accessLevel = req.body.accessLevel;

        const response = await User.findByIdAndUpdate(userId, {
            $push: {
                projectIdList: projectId
            }
        }, { new: true });

        //according to access level, add user to project's access list

        if (accessLevel === "highAccess") {
            const projectRes = await Project.findByIdAndUpdate(projectId, {
                $push: {
                    projectHighAccessMembers: userId
                }
            }, { new: true });
        }
        else if (accessLevel === "mediumAccess") {

            const projectRes = await Project.findByIdAndUpdate(projectId, {
                $push: {
                    projectMediumAccessMembers: userId
                }
            }, { new: true });
        }
        else if (accessLevel === "lowAccess") {
            const projectRes = await Project.findByIdAndUpdate(projectId, {
                $push: {
                    projectLowAccessMembers: userId
                }
            }, { new: true });
        }

        res.status(200).json({
            success: true,
            message: "User added to project"
        });

    }
    catch (err) {
        console.log(err, "Error from project controller -> addTeamMember");
        res.status(400).json({
            success: false,
            message: err
        });
    }
}


const transferOwnership = async (req, res) => {

    try {

        const projectId = mongoose.Types.ObjectId(req.params.id);
        const userId = mongoose.Types.ObjectId(req.user._id);
        const newOwnerId = mongoose.Types.ObjectId(req.body.newOwner);

        //transfer ownership
        console.log("transfer ownership", projectId, userId, newOwnerId);

        const project = await Project.findByIdAndUpdate(projectId, {
            projectOwner: newOwnerId
        }, { new: true });

        //remove project from old owner's project list

        // TBD later

        res.status(200).json({
            success: true,
            message: "Project ownership transferred successfully"
        });

    }
    catch (err) {
        console.log(err, "Error from project controller -> transferOwnership");
        res.status(400).json({
            success: false,
            message: err
        });
    }
}



module.exports = {
    create,
    update,
    deleteProject,
    getUserProjects,
    getProjectDetails,
    addTeamMember,
    transferOwnership
}

