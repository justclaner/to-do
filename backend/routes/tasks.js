import express from 'express';
import {Task} from '../models/taskModel.js';
import {Project} from '../models/projectModel.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/:projectId?/:taskId?',async (req,res)=>{
  try {
    const {projectId,taskId} = req.params;

    if(projectId && taskId == 0) {return res.status(200).json(
        {
            project: await Project.findById(projectId)
        }
    );}
    if(projectId == 0 && taskId) {return res.status(200).json(
        {
            task: await Task.findById(taskId)
        }
    );}

    return res.status(200).json(
        {
            projects: await Project.find({}),
            tasks: await Task.find({})
        }
    );

  } catch(error) {
    console.error(error);
    res.status(500).send({success:false,message:error.message})
  }
});

router.put('/:projectId', async (req,res)=> {
    try {

    } catch(error) {
    console.error(error);
    res.status(500).send({success:false,message:error.message})
  }
})

router.put('/:taskId', async (req,res)=> {
    try {

    } catch(error) {
    console.error(error);
    res.status(500).send({success:false,message:error.message})
  }
})

router.post('/createTask', async (req,res) => {
    try {
        const {title, description, date, projectId} = req.body;
        if (!title) {return response.status(400).json({success:false,message:'Please provide a required title for the task.'});}
        const newTask = {title:title};
        if (description) {newTask.description = description;}
        if (date) {newTask.date = date;}
        if (projectId && await Project.exists({_id:new mongoose.Types.ObjectId(projectId)})) {newTask.projectId = projectId;}
        const task = await Task.create(newTask);
        return res.status(201).json(task);

    } catch(error) {
        console.error(error);
        res.status(500).json({success:false,message:error.message});
    }
})

router.post('/createProject', async (req,res) => {
    try {
        const {title} = req.body;
        if (!title) {return response.status(400).json({success:false,message:'Please provide a required title for the project.'});}
        const newProject = {title:title};

        const project = await Project.create(newProject);
        return res.status(201).json(project);

    } catch(error) {
        console.error(error);
        res.status(500).json({success:false,message:error.message});
    }
})


export default router;