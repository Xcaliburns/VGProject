import { BrowserRouter , Route,Routes,Link} from "react-router-dom";

import Home from './pages/Home';
import CreatePost from'./pages/CreatePost';
import "./App.css";

function App() {
  return (
    <div className="main">
      <BrowserRouter>
      <Link to='createpost'>Create a Post</Link>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
