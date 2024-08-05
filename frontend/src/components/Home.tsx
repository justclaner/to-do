import {useEffect, useState} from 'react'
import axios from 'axios';
import Loading from './Loading.tsx';
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md';
import {Link} from 'react-router-dom';

const Home = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        async function fetchProjectsAndTasks() {
            try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/tasks');
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
  return (
    <div className="p-4">

            <div className="flex justify-between items-center">
            <h1 className="text-center text-3xl my-8">To-do App</h1>
            {/*Insert icon links */}
            </div>
            {loading ? <Loading /> : <div className='flex flex-wrap justify-start border border-black rounded-lg w-full'>
                {projects.map(project=>
                    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl max-w-[400px]' key={project._id}>
                        <div className="flex flex-wrap items-center justify-start">
                            <h1 className='text-2xl'>{project.title}</h1>
                            <button className='border-2 border-black mt-2 p-1 ml-3 px-2 rounded-lg hover:shadow-xl'>Edit Project Title</button>
                        </div>
                        
                        {tasks.map(task=>{if(task.projectId == project._id) {
                            return <div className='border-2 border-black px-4 py-2 my-4 rounded-lg' key={task._id}> 
                                <h2 className='text-xl'>{`Task: ${task.title}`}</h2>
                                <h3 className="text-lg">{task.description}</h3>
                                <h3 className="text-lg">{task.date}</h3>
                                <div className="flex justify-evenly w-full mt-6 mb-2">
                                <button className='border-2 border-black p-1 px-2 rounded-lg hover:shadow-xl'>Edit Task</button>
                                <button className='border-2 border-black p-1 px-2 rounded-lg hover:shadow-xl'>Delete Task</button>
                                </div>
                                
                                </div>
                        }}
                        )}
                        {/* add Link component */}
                        {/* <MdOutlineAddBox className='text-sky-800 text-4xl' /> */}
                        <button className='border-2 border-black p-1 w-full mt-6 mb-2 rounded-lg hover:shadow-xl'>Add Task</button>
                        </div>
                )}
               
                </div> } 
                <button className='border-2 border-black p-1 w-[20%] mt-6 mb-2 rounded-lg hover:shadow-xl'>Add Project</button>
    </div>
  )
}

export default Home