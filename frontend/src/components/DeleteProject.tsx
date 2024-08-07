import {useEffect, useState} from 'react';
import axios from 'axios';
import BackButton from './BackButton.jsx';
import Loading from './Loading.jsx';
import {useNavigate,useParams} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {url} from '../config.ts';

const DeleteProject = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const {projectId} = useParams();
  const navigate = useNavigate();
  
  useEffect(()=>{
    const getProject = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}${projectId}/0`)
        setTitle(response.data.project.title);
        setLoading(false);
      } catch(e) {
        setLoading(false);
        console.error(e);
      }
    }
    getProject();
  },[])

  const deleteProject = async () => {
    try {
      setLoading(true);
      await axios.delete(`${url}deleteProject/${projectId}`);
      setLoading(false);
      navigate('/');
    } catch(e) {
      setLoading(false);
      console.error(e);
    }
  }

  //  const response = axios.get(`${url}deleteProject/${projectId}`)
  return (
    <div className="p-4 text-center">
      <BackButton />
      <h1 className="text-3xl">Delete Project</h1>
      {loading ? <Loading/> : 
      <div className="p-4">
        <h1 className="text-xl text-black">{`Are you sure you want to delete task ${title}?`}</h1>
        <button className="block mx-auto my-2 border-2 border-red-500 rounded-lg px-2 py-1 hover:shadow-xl" onClick={deleteProject}>DELETE</button>
      </div>
      }
    </div>
  )
}

export default DeleteProject