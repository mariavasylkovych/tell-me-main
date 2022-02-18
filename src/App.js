import { Route, Routes } from 'react-router';
import CreateAnnouncement from './components/CreateAnnuncement.jsx';
import { CreatePost, UserPage } from './components/index.js'
import Post from './components/Post.jsx';
import { Home, Login, Signup } from './pages'

function App() {

  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/create-announ' element={<CreateAnnouncement />} />
        <Route path='/post/:postId' element={<Post />} />
        <Route path='/user-page' element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
