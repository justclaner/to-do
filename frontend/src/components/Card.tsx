import React from 'react'
import {Link} from 'react-router-dom';

interface taskProps {
    title: string 
    _id: string;
    projectId: string;
    description:string;
    color: string;
    date:string;
}
const getLuma = (hex:string) : number => {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    const luma = 0.299*r + 0.587*g + 0.114*b; //constant coefficients must add up to 1
    return luma;
}
const Card = ({project,tasks}:{project:any,tasks:any}) => {
    const buttonProject = {
        borderColor:(getLuma(project.color) < 50) ? 'white' : 'black'
    }
  return (
    <div className='border-2 border-gray-500 bg-sky-400 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl w-[30%] min-w-[300px] max-w-[600px]' key={project._id}
                        style={{backgroundColor:`${project.color}`, color:(getLuma(project.color) < 50)? 'white' : 'black'}}>
                            <div className="flex flex-wrap items-center justify-start">
                                <h1 className='text-2xl'>{project.title}</h1>
                                <Link to={`/putProject/${project._id}`}><button className='border-2 border-black mt-2 p-1 ml-3 px-2 rounded-lg hover:shadow-xl' style={buttonProject}>Edit</button></Link>
                                <Link to={`/deleteProject/${project._id}`}><button className='border-2 border-black mt-2 p-1 ml-3 px-2 rounded-lg hover:shadow-xl' style={buttonProject}>Delete</button></Link>
                            </div>
                    
                            {tasks.map((task: taskProps)=>{if(task.projectId == project._id) {
                                const buttonTask = {
                                    borderColor:(getLuma(task.color) < 50) ? 'white' : 'black'
                                }
                                return <div className='border-2 border-black bg-sky-300 px-4 py-2 my-4 rounded-lg' key={task._id} style={{backgroundColor:`${task.color}`,
                                color:(getLuma(task.color) < 50)? 'white' : 'black'}}>
                                    <h2 className='text-xl font-bold'>{task.title}</h2>
                                    <h3 className="text-lg">{task.description}</h3>
                                    <h3 className="text-lg font-semibold">{task.date}</h3>
                                    <div className="flex justify-start w-full mt-6 mb-2">
                                    <Link to={`/putTask/${project._id}/${task._id}`}><button className='border-2 border-black p-1 px-2 rounded-lg hover:shadow-xl' style={buttonTask}>Edit</button></Link>
                                    <Link to={`/deleteTask/${task._id}`}><button className='border-2 border-black p-1 px-2 ml-3 rounded-lg hover:shadow-xl' style={buttonTask}>Delete</button></Link>
                                    </div>
                                    </div>
                            }}
                            )}
                            <Link to={`/createTask/${project._id}`}><button className='border-2 border-black p-1 w-full mt-6 mb-2 rounded-lg hover:shadow-xl' style={buttonProject}>Add Task</button></Link>
                            </div>
  )
}

export default Card