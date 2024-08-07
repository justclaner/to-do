import {Routes, Route} from 'react-router-dom'
import Loading from './components/Loading.tsx';
import Home from './components/Home.tsx';
import CreateProject from './components/CreateProject.tsx';
import CreateTask from './components/CreateTask.tsx';
import DeleteProject from './components/DeleteProject.tsx';
import DeleteTask from './components/DeleteTask.tsx';
import EditProject from './components/EditProject.tsx';
import EditTask from './components/EditTask.tsx';
import ViewProject from './components/ViewProject.tsx';
import ViewTask from './components/ViewTask.tsx';

const App = () => {
  return (
    <Routes>
      <Route path='/loading' element={<Loading/>}></Route>
    <Route path='/' element={<Home />} />
    <Route path='/createProject' element={<CreateProject />} />
    <Route path='/createTask/:projectId' element={<CreateTask />} />
    <Route path='/deleteTask/:taskId' element={<DeleteTask />}></Route>
    <Route path='/deleteProject/:projectId' element={<DeleteProject />}></Route>
    <Route path='/putTask/:projectId/:taskId' element={<EditTask />}></Route>
    <Route path='/putProject/:projectId' element={<EditProject />}></Route>
    {/* <Route path='/books/create' element={<CreateBook />} />
    <Route path='/books/details/:id' element={<ShowBook />} />
    <Route path='/books/edit/:id' element={<EditBook />} />
    <Route path='/books/delete/:id' element={<DeleteBook />} />  */}
  </Routes>
  )
}

export default App