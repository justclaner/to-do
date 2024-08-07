import {useEffect,useState} from 'react'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import BackButton from './BackButton.tsx';
import Loading from './Loading.jsx';
import {url} from '../config.ts';

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState("#7dd3fc");
  const {projectId} = useParams();
  const [projectTitle, setProjectTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=> {
    const getProject = async() => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}${projectId}/0`);
        setProjectTitle(response.data.project.title);
        setLoading(false);
      } catch(e) {
        setLoading(false);
        console.error(e);
      }
    }
    getProject();
  },[])

  const postTask = async () => {
    try {
      setLoading(true);
      const data = {
        title:title,
        description:description,
        date: date,
        color:color,
        projectId: projectId
      }
      await axios.post(`${url}createTask`,data);
      setLoading(false);
      navigate('/');
    } catch(e) {
      setLoading(false);
      console.error(e);
    }
  }
  return (
    <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4 text-center">Create a new Task</h1>
        <div className="flex flex-col border-2 border-black w-[600px] mx-auto px-4 py-2 rounded-lg">
        <div className="my-4">
            <label className='text-xl text-gray-500'>Title:</label>
            <input type="text" className="border-2 border-gray-500 w-full px-4 py-2" defaultValue={title} onChange={e=>setTitle(e.target.value)}/>
        </div>
        <div className="my-4">
            <label className='text-xl text-gray-500'>Description:</label>
            <input type="text" className="border-2 border-gray-500 w-full px-4 py-2" defaultValue={description} onChange={e=>setDescription(e.target.value)}/>
        </div>
        <div className="my-4">
            <label className='text-xl text-gray-500'>Date:</label>
            <input type="text" className="border-2 border-gray-500 w-full px-4 py-2" defaultValue={date} onChange={e=>setDate(e.target.value)}/>
        </div>
        <div className="my-4">
            <label className='text-xl text-gray-500'>Color:</label>
            <input type="color" className="border-2 border-gray-500 w-full px-1 h-[44px] rounded-lg" defaultValue={color} onChange={e=>setColor(e.target.value)}/>
        </div>
        <div className="my-4">
            <h3 className="text-xl text-gray-500">Project:</h3>
            <h3 className="text-lg text-black">{projectTitle}</h3>
        </div>
        <button className="border-2 border-black mx-auto mb-2 px-2 py-1 rounded-lg" onClick={postTask}>Create Task</button>
        </div>
        {loading ? <Loading /> : ""}
    </div>
  )
}

export default CreateTask