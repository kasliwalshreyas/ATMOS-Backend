const User = require("../models/User");
const Project = require("../models/Project");
const Chats = require("../models/Chats");
const mongoose = require("mongoose");

const getChatsProject = async (req, res) => {
    try {
        const projectId = mongoose.Types.ObjectId(req.params.id);
        console.log(projectId);
        const projectInfo = await Project.findById(projectId);
        // const projectChats = projectInfo.projectChatList;
        const chats = await Chats.find({ projectid: projectId}).populate("senderid")
        .populate("receiverid")
        .populate("projectid")
        .populate("message")
        .populate("createdAt")
        res.status(200).json({
            success: true,
            chats: chats,
          });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
}
const getChatsUser = async (req, res) => {
    try {
        const userId = mongoose.Types.ObjectId(req.user._id);
        const userInfo = await User.findById(userId);
        const userChats = userInfo.personalChatList;
        const chats = await Chats.find({ _id: {
            $in: userChats
        }}).populate("senderid")
        .populate("receiverid")
        .populate("projectid")
        .populate("message")
        .populate("createdAt")
        res.status(200).json({
            success: true,
            chats: chats,
          });
    } catch (error) {
        
    }
}

const sendProjectMessage = async (req,res) => {
    try {
        const projectId = mongoose.Types.ObjectId(req.params.id);
        const sender = mongoose.Types.ObjectId(req.body.user);
        const message = new Chats({
            senderid : mongoose.Types.ObjectId(req.body.user),
            projectid: mongoose.Types.ObjectId(req.params.id),
            message: req.body.chat,
            createdAt : new Date()
        })
        const savedChat = await message.save();
        const projectChats = await Project.findByIdAndUpdate(projectId,{
                $push:{
                    projectMessages: savedChat._id
                },
        },
        {new: true}
        );
        res.status(200).json({
          success: true,
          message: 'chats fetched successfully',
          chats : savedChat,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
        
    }
}

const sendPersonalMessage = async (req,res) => {
    try {
        const receiverid = mongoose.Types.ObjectId(req.params.id);
        const sender = mongoose.Types.ObjectId(req.body.user);
        const message = new Chats({
            senderid : mongoose.Types.ObjectId(req.body.user),
            receiverid: mongoose.Types.ObjectId(req.params.id),
            message: req.body.chat,
            createdAt : Date.now()
        })
        const savedChat = await message.save();
        const userInfo = await User.findByIdAndUpdate(
            sender,
            {
              $push: {
                projectChatList: savedChat._id,
              },
            },
            { new: true }
          );
        res.status(200).json({
          success: true,
          chats : savedChat,
        });
    } catch (error) {
        
    }
}

module.exports = {
    getChatsUser,
    getChatsProject,
    sendProjectMessage
};
