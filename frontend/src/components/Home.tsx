import {useEffect, useState} from 'react'
import axios from 'axios';
import Loading from './Loading.tsx';
//import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md';
import {Link} from 'react-router-dom';
import {url} from '../config.ts';

const Home = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [bodyColor, setBodyColor] = useState("#fca5a5");
    const [appColor, setAppColor] = useState("#0284c7");
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        document.body.style.backgroundColor = bodyColor;
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

  return (
    <div className="p-4">

            <div className="flex justify-between items-center">
            <h1 className="text-center text-3xl my-8">To-do App</h1>
            </div>
            {loading ? <Loading /> : <div className='border-2 border-black rounded-lg w-full' style={{backgroundColor:`${appColor}`}}>
                <div className="flex flex-wrap justify-evenly">
                    {projects.map(project=>
                        <div className='border-2 border-gray-500 bg-sky-400 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl w-[30%] min-w-[300px] max-w-[600px]' key={project._id}
                        style={{backgroundColor:`${project.color}`}}>
                            <div className="flex flex-wrap items-center justify-start">
                                <h1 className='text-2xl'>{project.title}</h1>
                                <Link to={`/putProject/${project._id}`}><button className='border-2 border-black mt-2 p-1 ml-3 px-2 rounded-lg hover:shadow-xl'>Edit</button></Link>
                                <Link to={`/deleteProject/${project._id}`}><button className='border-2 border-black mt-2 p-1 ml-3 px-2 rounded-lg hover:shadow-xl'>Delete</button></Link>
                            </div>
                    
                            {tasks.map(task=>{if(task.projectId == project._id) {
                                return <div className='border-2 border-black bg-sky-300 px-4 py-2 my-4 rounded-lg' key={task._id} style={{backgroundColor:`${task.color}`}}>
                                    <h2 className='text-xl font-bold'>{task.title}</h2>
                                    <h3 className="text-lg">{task.description}</h3>
                                    <h3 className="text-lg font-semibold">{task.date}</h3>
                                    <div className="flex justify-start w-full mt-6 mb-2">
                                    <Link to={`/putTask/${project._id}/${task._id}`}><button className='border-2 border-black p-1 px-2 rounded-lg hover:shadow-xl'>Edit</button></Link>
                                    <Link to={`/deleteTask/${task._id}`}><button className='border-2 border-black p-1 px-2 ml-3 rounded-lg hover:shadow-xl'>Delete</button></Link>
                                    </div>
                                    </div>
                            }}
                            )}
                            <Link to={`/createTask/${project._id}`}><button className='border-2 border-black p-1 w-full mt-6 mb-2 rounded-lg hover:shadow-xl'>Add Task</button></Link>
                            </div>
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