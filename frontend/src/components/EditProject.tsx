import {useEffect,useState} from 'react'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import BackButton from './BackButton.tsx';
import Loading from './Loading.jsx';
import {url} from '../config.ts';
//import {useSnackbar} from 'notistack';

const EditProject = () => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {projectId} = useParams();

  useEffect(()=>{
    const getProject = async () => {
      try {
          setLoading(true);
          const response = await axios.get(`${url}${projectId}/0`)
          setTitle(response.data.project.title);
          console.log(response);
          setColor(response.data.project.color);
          setLoading(false);
      } catch(e) {
          setLoading(false);
          console.error(e);
      }
    }
      getProject();
    },[])
    
  const postProject = async () => {
      try {
            const data = {
              title:title,
              color:color
            };
            setLoading(true);
            await axios.put(`${url}putProject/${projectId}`,data);
            setLoading(false);
            navigate('/')

      } catch(e) {
            setLoading(false);
            console.error(e);
      }
      }

  return (

    <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4 text-center">Edit a Project</h1>
        {loading ? <Loading /> : 
        <div className="flex flex-col border-2 border-black w-[600px] mx-auto px-4 py-2 rounded-lg">
        <div className="my-4">
            <label className='text-xl text-gray-500'>Title:</label>
            <input type="text" className="border-2 border-gray-500 w-full px-4 py-2" defaultValue={title} onChange={e=>setTitle(e.target.value)}/>
        </div>
        <div className="my-4">
            <label className='text-xl text-gray-500'>Color:</label>
            <input type="color" className="border-2 border-gray-500 w-full px-1 h-[44px] rounded-lg" defaultValue={color} onChange={e=>setColor(e.target.value)}/>
        </div>
        <button className="border-2 border-black mx-auto px-2 py-1 rounded-lg" onClick={postProject}>Edit Project</button>
        </div>
        }
    </div>
  )
}

export default EditProject