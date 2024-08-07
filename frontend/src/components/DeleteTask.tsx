import {useEffect, useState} from 'react';
import axios from 'axios';
import BackButton from './BackButton.jsx';
import Loading from './Loading.jsx';
import {useNavigate,useParams} from 'react-router-dom';
//import {useSnackbar} from 'notistack';
import {url} from '../config.ts';


const DeleteTask = () => {
  const [title, setTitle] = useState("");
  const {taskId} = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const getTask = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}0/${taskId}`);
        setTitle(response.data.task.title);
        setLoading(false);
      } catch(e) {
        setLoading(false);
        console.error(e);
      }
    }
    getTask();
  },[])

  const deleteTask = async () => {
    try {
      setLoading(true);
      await axios.delete(`${url}deleteTask/${taskId}`);
      setLoading(false);
      navigate('/');
    } catch(e) {
      setLoading(false);
      console.error(e);
    }
  }
  return (
    <div className="p-4 text-center">
      <BackButton />
      <h1 className="text-3xl">Delete Task</h1>
      {loading ? <Loading/> : 
      <div className="p-4">
        <h1 className="text-xl text-black">{`Are you sure you want to delete task ${title}?`}</h1>
        <button className="block mx-auto my-2 border-2 border-red-500 rounded-lg px-2 py-1 hover:shadow-xl" onClick={deleteTask}>DELETE</button>
      </div>
      }
    </div>
  )
}

export default DeleteTask