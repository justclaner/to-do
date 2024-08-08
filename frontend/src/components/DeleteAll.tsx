import {useState} from 'react';
import axios from 'axios';
import BackButton from './BackButton.jsx';
import Loading from './Loading.jsx';
import {useNavigate} from 'react-router-dom';
import {url} from '../config.ts';

const DeleteAll = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const deleteAll = async () => {
        try {
          setLoading(true);
          await axios.delete(`${url}deleteAll`);
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
          <h1 className="text-3xl">Delete Everything</h1>
          {loading ? <Loading/> : 
          <div className="p-4">
            <h1 className="text-xl text-black">Are you sure you want to delete <b>ALL projects and tasks</b>?</h1>
            <button className="block mx-auto my-2 border-2 border-red-500 bg-red-300 rounded-lg px-2 py-1 hover:shadow-xl" onClick={deleteAll}>DELETE EVERYTHING</button>
          </div>
          }
        </div>
      )
}

export default DeleteAll