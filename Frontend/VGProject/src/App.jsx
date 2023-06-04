import { BrowserRouter , Route,Routes} from "react-router-dom";

import Home from './pages/Home';
import CreatePost from'./pages/CreatePost';
import Post from'./pages/Post';
import "./App.css";

function App() {
  return (
    
      <BrowserRouter>     
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="createpost" element={<CreatePost />}></Route>
           <Route path="post/:id" element={<Post />}></Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
