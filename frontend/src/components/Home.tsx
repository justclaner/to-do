import {useEffect, useState} from 'react'
import axios from 'axios';
import Loading from './Loading.tsx';
//import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md';
import {Link} from 'react-router-dom';
import {url} from '../config.ts';
import Card from './Card.tsx';

const Home = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const initialBodyColor = localStorage.getItem("bodyColor");
    const initialAppColor = localStorage.getItem("appColor");
    
    const [bodyColor, setBodyColor] = useState((!initialBodyColor)?"#ef4444":initialBodyColor);
    const [appColor, setAppColor] = useState((!initialAppColor)?"#0284c7":initialAppColor);
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

    //store in cookies
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

    const adaptStyle = {
        color:(getLuma(bodyColor) < 50) ? 'white' : 'black',
        borderColor:(getLuma(bodyColor) < 50) ? 'white' : 'black'
    }

    const addDefault = async () => {
        try {
            setLoading(true);
            await axios.post(`${url}createDefault`);
            setLoading(false);
            window.location.reload();
        } catch(e) {
            setLoading(false);
            console.error(e);
        }
    }

  return (
    <div className="p-4">

            <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8 m-auto font-bold" style={adaptStyle}>To-do App</h1>
            </div>
            {loading ? <Loading /> : <div className='border-2 border-black rounded-lg w-full' style={{backgroundColor:`${appColor}`}}>
                <div className="flex flex-wrap justify-evenly">
                    {projects.map(project=><Card project={project} tasks={tasks}/>)}
                </div>
               
                <div className="m-4">
                <label className='text-xl text-black font-semibold'>Background Color:</label>
                <input type="color" className="block border-2 border-gray-500 w-[10%] px-1 my-1 h-[40px] rounded-lg" defaultValue={appColor} onChange={e=>setAppColor(e.target.value)}/>
                </div>

                </div> } 
                <Link to='/createProject'><button className='border-2 border-black py-1 px-2 w-fit mt-6 mb-2 rounded-lg hover:shadow-xl' style={adaptStyle}>Add Project</button></Link>
                <button className='border-2 border-black py-1 px-2 w-fit mt-6 mb-2 ml-3 rounded-lg hover:shadow-xl' onClick={addDefault} style={adaptStyle}>Add Sample</button>
                <Link to='/deleteAll'><button className='border-2 border-black py-1 px-2 w-fit mt-6 mb-2 ml-3 rounded-lg hover:shadow-xl' style={adaptStyle}>Delete Everything</button></Link>
                <div className="my-4">
                <label className='text-xl text-black font-semibold' style={adaptStyle}>Background Color:</label>
                <input type="color" className="block border-2 border-gray-500 w-[10%] px-1 my-1 h-[40px] rounded-lg" defaultValue={bodyColor} onChange={e=>setBodyColor(e.target.value)}/>
                </div>
    </div>
  )
}

export default Home