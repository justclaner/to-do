import {useEffect,useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import BackButton from './BackButton.tsx';
import Loading from './Loading.jsx';
import {url} from '../config.ts';
import {useSnackbar} from 'notistack';

const CreateProject = () => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const postProject = async () => {
        try {
            const data = {title:title};
            setLoading(true);
            await axios.post(`${url}createProject`,data);
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
        <h1 className="text-3xl my-4 text-center">Create a Project</h1>
        <div className="flex flex-col border-2 border-black w-[600px] mx-auto px-4 py-2 rounded-lg">
        <div className="my-4">
            <label className='text-xl text-gray-500'>Title:</label>
            <input type="text" className="border-2 border-gray-500 w-full px-4 py-2" defaultValue={title} onChange={e=>setTitle(e.target.value)}/>
        </div>
        <button className="border-2 border-black mx-auto px-2 py-1 rounded-lg" onClick={postProject}>Submit</button>
        </div>
        {loading ? <Loading /> : ""}
    </div>
  )
}

export default CreateProject