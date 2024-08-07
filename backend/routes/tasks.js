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
        const {title, description, date, color, projectId} = req.body;
        if (!title) {return res.status(400).json({success:false,message:"Please provide a required title for the task."});}
        const newTask = {title:title};
        if (description) {newTask.description = description;}
        if (date) {newTask.date = date;}
        if (color) {newTask.color = color;}
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
        const {title, color} = req.body;
        if (!title) {return res.status(400).json({success:false,message:"Please provide a required title for the project."});}
        const newProject = { title:title};
        if (color) {newProject.color = color;}

        const project = await Project.create(newProject);
        return res.status(201).json(project);

    } catch(error) {
        console.error(error);
        res.status(500).json({success:false,message:error.message});
    }
})

router.put('/putTask/:taskId', async (req,res)=> {
    try {
        const {taskId} = req.params;
        const {title, description, date, color, projectId} = req.body;
        if (!title) {return res.status(404).json({success:false,message:"Please provide a required title for the task."})}
        if(!await Project.exists({_id:new mongoose.Types.ObjectId(projectId)})) {return res.status(404).json({success:false,message:"Project with this id does not exist"})}

        const result = await Task.findByIdAndUpdate(taskId, req.body);
        if (!result) {return res.status(404).json({success:false, message: "Task not found"});}
        return res.status(200).json("Task updated successfully.");
    } catch(error) {
        console.error(error);
        res.status(500).json({success:false,message:error.message});
    }
})

router.put('/putProject/:projectId', async (req,res)=> {
    try {
        const {projectId} = req.params;
        const {title,color} = req.body;
        if (!title) {return res.status(404).json({success:false,message:"Please provide a required title for the project."})}

        const result = await Project.findByIdAndUpdate(projectId, req.body);
        if (!result) {return res.status(404).json({success:false, message: "Project not found"});}
        return res.status(200).json("Project updated successfully.");
    } catch(error) {
        console.error(error);
        res.status(500).json({success:false,message:error.message});
    }
})

router.delete('/deleteTask/:taskId', async (req,res)=> {
    try {
        const {taskId} = req.params;
        const result = await Task.findByIdAndDelete(taskId);
        if (!result) {return res.status(404).json({success:false,message: "Task not found"});}
        return res.status(200).json("Task deleted sucessfully");
    } catch(error) {
        console.error(error);
        res.status(500).json({success:false,message:error.message});
    }
})

router.delete('/deleteProject/:projectId', async (req,res)=> {
    try {
        const {projectId} = req.params;
        const deleteProject = await Project.findByIdAndDelete(projectId);
        const deleteTasks = await Task.deleteMany({projectId:projectId});
        if(!deleteProject) {return res.status(404).json({success:false,message: "Project not found"});}
        if (!deleteTasks) {return res.status(404).json({success:false,message: "Tasks not found"});}
        return res.status(200).json("Project deleted sucessfully");
    } catch(error) {
        console.error(error);
        res.status(500).json({success:false,message:error.message});
    }
})

router.delete('/deleteAll', async (req,res) => {
    try {
        const deleteTasks = await Task.deleteMany({});
        const deleteProjects = await Project.deleteMany({});
        return res.status(200).json("Deleted everything successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,message:error.message});
    }
})


export default router;