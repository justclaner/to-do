import {useEffect, useState} from 'react'
import axios from 'axios';
import Loading from './Loading.tsx';
//import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md';
import {Link} from 'react-router-dom';
import {url} from '../config.ts';

const Home = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const initialBodyColor = localStorage.getItem("bodyColor");
    const initialAppColor = localStorage.getItem("appColor");
    console.log(initialBodyColor,initialAppColor);
    
    const [bodyColor, setBodyColor] = useState((!initialBodyColor)?"#fca5a5":initialBodyColor);
    const [appColor, setAppColor] = useState((!initialAppColor)?"#0284c7":initialAppColor);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        document.body.style.backgroundColor = bodyColor;
        console.log(getLuma('#f0fdf4'));
        async function fetchProjectsAndTasks() {
            try {
            setLoading(true);
            const response = await axios.get(url);
            setProjects(response.data.projects);
            setTasks(response.data.tasks);
            setLoading(false);
            console.log(response);
            } catch(e) {
                setLoading(false);
                console.error(e);
            }
        }
        fetchProjectsAndTasks();
    },[])

    useEffect(()=>{
        document.body.style.backgroundColor = bodyColor;
    }, [bodyColor])

    useEffect(()=>{
        localStorage.setItem("bodyColor",bodyColor);
        localStorage.setItem("appColor",appColor);
    },[bodyColor,appColor])

    const getLuma = (hex:string) : number => {
        const r = parseInt(hex.slice(1,3),16);
        const g = parseInt(hex.slice(3,5),16);
        const b = parseInt(hex.slice(5,7),16);
        const luma = 0.299*r + 0.587*g + 0.114*b; //constant coefficients must add up to 1
        return luma;
    }

  return (
    <div className="p-4">

            <div className="flex justify-between items-center">
            <h1 className="text-center text-3xl my-8">To-do App</h1>
            </div>
            {loading ? <Loading /> : <div className='border-2 border-black rounded-lg w-full' style={{backgroundColor:`${appColor}`}}>
                <div className="flex flex-wrap justify-evenly">
                    {projects.map(project=>{ 
                        const buttonProject = {
                            borderColor:(getLuma(project.color) < 50) ? 'white' : 'black'
                        }
                        
                        return <div className='border-2 border-gray-500 bg-sky-400 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl w-[30%] min-w-[300px] max-w-[600px]' key={project._id}
                        style={{backgroundColor:`${project.color}`, color:(getLuma(project.color) < 50)? 'white' : 'black'}}>
                            <div className="flex flex-wrap items-center justify-start">
                                <h1 className='text-2xl'>{project.title}</h1>
                                <Link to={`/putProject/${project._id}`}><button className='border-2 border-black mt-2 p-1 ml-3 px-2 rounded-lg hover:shadow-xl' style={buttonProject}>Edit</button></Link>
                                <Link to={`/deleteProject/${project._id}`}><button className='border-2 border-black mt-2 p-1 ml-3 px-2 rounded-lg hover:shadow-xl' style={buttonProject}>Delete</button></Link>
                            </div>
                    
                            {tasks.map(task=>{if(task.projectId == project._id) {
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
                            </div>}
                    )}
                </div>
               
                <div className="m-4">
                <label className='text-xl text-black font-semibold'>Background Color:</label>
                <input type="color" className="block border-2 border-gray-500 w-[10%] px-1 my-1 h-[40px]" defaultValue={appColor} onChange={e=>setAppColor(e.target.value)}/>
                </div>

                </div> } 
                <Link to='/createProject'><button className='border-2 border-black py-1 px-2 w-fit mt-6 mb-2 rounded-lg hover:shadow-xl'>Add Project</button></Link>
                <Link to='/deleteAll'><button className='border-2 border-black py-1 px-2 w-fit mt-6 mb-2 ml-3 rounded-lg hover:shadow-xl'>Delete Everything</button></Link>
                <div className="my-4">
                <label className='text-xl text-black font-semibold'>Background Color:</label>
                <input type="color" className="block border-2 border-gray-500 w-[10%] px-1 my-1 h-[40px]" defaultValue={bodyColor} onChange={e=>setBodyColor(e.target.value)}/>
                </div>
    </div>
  )
}

export default Home