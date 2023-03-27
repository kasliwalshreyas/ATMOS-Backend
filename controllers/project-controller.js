const User = require("../models/User");
const Project = require("../models/Project");
const Section = require("../models/Section");
const Task = require("../models/Task");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  try {
    // console.log(req.body, "req.body from project controller -> create");

    //add project to user's project list
    const userId = mongoose.Types.ObjectId(req.body.projectOwner);
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
      //this is created by Einstein
      projectLastUsed: [
        {
          userid: mongoose.Types.ObjectId(req.body.projectOwner),
          lastUsed: new Date(),
        },
      ],
    });
    const savedProject = await project.save();



    const userInfo = await User.findByIdAndUpdate(
      userId,
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
      message: 'Project created successfully',
      project: savedProject,
    });
  } catch (err) {
    // console.log(err, "Error from project controller -> create");
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const update = async (req, res) => { };

const deleteProject = async (req, res) => {
  try {
    const projectId = mongoose.Types.ObjectId(req.params.id);
    const project = await Project.findByIdAndDelete(projectId);

    //remove project from user's project list
    const userList = project.projectHighAccessMembers.concat(
      project.projectMediumAccessMembers,
      project.projectLowAccessMembers
    );
    for (let i = 0; i < userList.length; i++) {
      const userId = mongoose.Types.ObjectId(userList[i]);
      const res = await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            projectIdList: projectId,
          },
        },
        { new: true }
      );
    }

    //delete sections of the project
    for (let i = 0; i < project.projectSectionIdList.length; i++) {
      const sectionId = mongoose.Types.ObjectId(
        project.projectSectionIdList[i]
      );
      const res = await Section.findByIdAndDelete(sectionId);
    }

    //delete tasks of the project
    for (let i = 0; i < project.projectTaskIdList.length; i++) {
      const taskId = mongoose.Types.ObjectId(project.projectTaskIdList[i]);
      const res = await Task.findByIdAndDelete(taskId);

      if (res.taskAssigneeList.length > 0) {
        res.taskAssigneeList.forEach(async (userId) => {
          const response = User.findByIdAndUpdate(
            userId,
            {
              $pull: {
                taskAssignedIdList: taskId,
              },
            },
            { new: true }
          );
        });
      }
    }

    console.log(project, "project from project controller -> deleteProject");

    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (err) {
    console.log(err, "Error from project controller -> deleteProject");
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

//Created by Einstein
const updateLastUsed = async (req, res) => {
  try {

    const userId = mongoose.Types.ObjectId(req.user._id);
    const projectId = mongoose.Types.ObjectId(req.params.id);
    const project = await Project.findById(projectId);
    const dateFormat = new Date(req.body.updatedLastUsed);
    const projectLastUsed = project.projectLastUsed;
    // projectLastUsed.map((item) => {
    //   // console.log(item, "item from project controller -> updateLastUsed");
    //   if (item.userid.toString() == userId.toString()) {
    //     item.lastUsed = dateFormat;
    //   }
    // });

    const index = projectLastUsed.findIndex(
      (item) => item.userid.toString() == userId.toString()
    );
    if (index > -1) {
      projectLastUsed[index].lastUsed = dateFormat;
    } else {
      projectLastUsed.push({
        userid: userId,
        lastUsed: dateFormat,
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        projectLastUsed: projectLastUsed,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Project last used updated successfully",
    });
  } catch (err) {
    console.log(err, "Error from project controller -> updateProject");
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const getUserProjects = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user._id);
    const userInfo = await User.findById(userId);
    // console.log(userInfo, "userInfo from project controller -> getUserProjects");
    const projectList = userInfo.projectIdList;
    // console.log(projectList, "projectList from project controller -> getUserProjects");
    //populate projects from Projects collection
    const projects = await Project.find({ _id: { $in: projectList } }).select(
      "-projectSectionIdList -projectTaskIdList -projectHighAccessMembers -projectMediumAccessMembers -projectLowAccessMembers -projectMission -projectVision -projectDescription -projectStatement -projectGuidelines -projectStartDate -projectEndDate"
    );

    // .populate("projectOwner")
    // .populate("projectHighAccessMembers")
    // .populate("projectMediumAccessMembers")
    // .populate("projectLowAccessMembers")
    // .populate({
    //   path: "projectSectionIdList",
    //   populate: { path: "taskIdList", populate: { path: "taskAssigneeList" } },
    // })
    // .populate({
    //   path: "projectTaskIdList",
    //   // populate: { path: "taskAssigneeList" },
    // });
    // console.log(projects, "projects from project controller -> getUserProjects");

    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      projects: projects,
    });
  } catch (err) {
    // console.log(err, "Error from project controller -> getUserProjects");
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const getProjectDetails = async (req, res) => {
  try {
    const projectId = mongoose.Types.ObjectId(req.params.id);
    console.log(projectId);
    const project = await Project.findById(projectId)
      .populate("projectOwner")
      .populate("projectHighAccessMembers")
      .populate("projectMediumAccessMembers")
      .populate("projectLowAccessMembers")
      .populate({
        path: "projectSectionIdList",
        populate: { path: "taskIdList", populate: { path: "taskAssigneeList" } },
      })
      .populate("projectTaskIdList");
    // console.log(project, "project from project controller -> getProjectDetails");

    res.status(200).json({
      success: true,
      message: "Project details fetched successfully",
      project: project,
    });
  } catch (err) {
    console.log(err, "Error from project controller -> getProjectDetails");
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const addTeamMember = async (req, res) => {
  try {
    const projectId = mongoose.Types.ObjectId(req.params.id);
    const userId = mongoose.Types.ObjectId(req.body.userId);
    const accessLevel = req.body.accessLevel;

    const response = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          projectIdList: projectId,
        },
      },
      { new: true }
    );

    //according to access level, add user to project's access list

    if (accessLevel === "highAccess") {
      const projectRes = await Project.findByIdAndUpdate(
        projectId,
        {
          $push: {
            projectHighAccessMembers: userId,
          },
        },
        { new: true }
      );
    } else if (accessLevel === "mediumAccess") {
      const projectRes = await Project.findByIdAndUpdate(
        projectId,
        {
          $push: {
            projectMediumAccessMembers: userId,
          },
        },
        { new: true }
      );
    } else if (accessLevel === "lowAccess") {
      const projectRes = await Project.findByIdAndUpdate(
        projectId,
        {
          $push: {
            projectLowAccessMembers: userId,
          },
        },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "User added to project",
    });
  } catch (err) {
    console.log(err, "Error from project controller -> addTeamMember");
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const transferOwnership = async (req, res) => {
  try {
    const projectId = mongoose.Types.ObjectId(req.params.id);
    const userId = mongoose.Types.ObjectId(req.user._id);
    const newOwnerId = mongoose.Types.ObjectId(req.body.newOwner);

    //transfer ownership
    console.log("transfer ownership", projectId, userId, newOwnerId);

    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        projectOwner: newOwnerId,
      },
      { new: true }
    );

    //remove project from old owner's project list

    // TBD later

    res.status(200).json({
      success: true,
      message: "Project ownership transferred successfully",
    });
  } catch (err) {
    console.log(err, "Error from project controller -> transferOwnership");
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const changeUserAccessLevel = async (req, res) => {
  try {
    const projectId = mongoose.Types.ObjectId(req.params.id);
    const userId = mongoose.Types.ObjectId(req.body.userId);
    const newAccessLevel = req.body.newAccessLevel;

    const currUser = mongoose.Types.ObjectId(req.user._id);

    // console.log("change user access level", projectId, userId, newAccessLevel);
    const project = await Project.findById(projectId);

    //check if current user has high access to project if yes, procceed to remove user from access list otherwise return error

    if (project.projectHighAccessMembers.includes(currUser)) {
      //remove user from old access list
      if (project.projectHighAccessMembers.includes(userId)) {
        const projectRes = await Project.findByIdAndUpdate(
          projectId,
          {
            $pull: {
              projectHighAccessMembers: userId,
            },
          },

          { new: true }
        );
      } else if (project.projectMediumAccessMembers.includes(userId)) {
        const projectRes = await Project.findByIdAndUpdate(
          projectId,
          {
            $pull: {
              projectMediumAccessMembers: userId,
            },
          },

          { new: true }
        );
      } else if (project.projectLowAccessMembers.includes(userId)) {
        const projectRes = await Project.findByIdAndUpdate(
          projectId,
          {
            $pull: {
              projectLowAccessMembers: userId,
            },
          },

          { new: true }
        );
      }

      //add user to new access list

      if (newAccessLevel === "highAccess") {
        const projectRes = await Project.findByIdAndUpdate(
          projectId,
          {
            $push: {
              projectHighAccessMembers: userId,
            },
          },
          { new: true }
        );

      } else if (newAccessLevel === "mediumAccess") {
        const projectRes = await Project.findByIdAndUpdate(
          projectId,
          {
            $push: {
              projectMediumAccessMembers: userId,
            },
          },
          { new: true }
        );
      } else if (newAccessLevel === "lowAccess") {
        const projectRes = await Project.findByIdAndUpdate(
          projectId,
          {
            $push: {
              projectLowAccessMembers: userId,
            },
          },
          { new: true }

        );
      }

      res.status(200).json({
        success: true,
        message: "User access level changed successfully",
        accessLevel: newAccessLevel,
      });

    }
    else {
      res.status(500).json({
        success: false,
        message: "You don't have high access to this project",
      });
    }

  } catch (err) {
    console.log(err, "Error from project controller -> changeUserAccessLevel");
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};


const removeTeamMember = async (req, res) => {
  try {
    const projectId = mongoose.Types.ObjectId(req.params.id);
    const userId = mongoose.Types.ObjectId(req.body.userId);
    const currUser = mongoose.Types.ObjectId(req.user._id);

    //remove user from project's access list
    console.log('removeTeamMember : ', projectId, userId, currUser);

    const project = await Project.findById(projectId);

    if (project.projectHighAccessMembers.includes(currUser)) {

      if (project.projectHighAccessMembers.includes(userId)) {
        const projectRes = await Project.findByIdAndUpdate(
          projectId,
          {
            $pull: {
              projectHighAccessMembers: userId,
            },
          },

          { new: true }
        );
      } else if (project.projectMediumAccessMembers.includes(userId)) {
        const projectRes = await Project.findByIdAndUpdate(
          projectId,
          {
            $pull: {
              projectMediumAccessMembers: userId,
            },
          },

          { new: true }
        );
      } else if (project.projectLowAccessMembers.includes(userId)) {
        const projectRes = await Project.findByIdAndUpdate(
          projectId,
          {
            $pull: {
              projectLowAccessMembers: userId,
            },
          },

          { new: true }
        );
      }

      //remove project from user's project list

      const response = await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            projectIdList: projectId,
          },
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "User removed from project",
      });

    }
    else {
      res.status(500).json({
        success: false,
        message: "You don't have high access to this project",
      });
    }

  } catch (err) {
    console.log(err, "Error from project controller -> removeTeamMember");
    res.status(500).json({
      success: false,
      error: err,
      message: 'Something went wrong!'
    });
  }
};







module.exports = {
  create,
  update,
  deleteProject,
  getUserProjects,
  getProjectDetails,
  addTeamMember,
  transferOwnership,
  updateLastUsed,
  changeUserAccessLevel,
  removeTeamMember
};
