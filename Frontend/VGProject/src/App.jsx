import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [listOfPosts, setListOfPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/posts").then((res) => {
      setListOfPosts(res.data);
    });
  }, []);

  return (
    <div className="main">
      {listOfPosts.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="post-title"> {post.title}</div>
            <div className="post-body"> {post.postText}</div>
            <div className="post-footer"> {post.username}</div>
            
          </div>
        );
      })}
    </div>
  );
}

export default App;
