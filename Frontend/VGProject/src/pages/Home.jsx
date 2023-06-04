import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import {useNavigate} from 'react-router-dom'
const baseURL= import.meta.env.VITE_BACKEND_URL;
function Home() {

 const [listOfPosts, setListOfPosts] = useState([]);
 let navigate = useNavigate();
  useEffect(() => {
    axios.get(`${baseURL}/posts`).then((res) => {
      setListOfPosts(res.data);
    });
  }, []);

  return (
    <>
    <Navbar />  
    <div className='main'> {listOfPosts.map((post) => {
        return (
          <div className="post" key={post.id} onClick={()=>{navigate(`/post/${post.id}`)}}>
            <div className="post-title"> {post.title}</div>
            <div className="post-body"> {post.postText}</div>
            <div className="post-footer"> {post.username}</div>
            
          </div>
        );
      })}</div></>
  )
}

export default Home