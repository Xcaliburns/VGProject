import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

function Post() {

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  let { id } = useParams();

  const [singlePost, setSinglePost] = useState({});
  const [comments,setComments]=useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/posts/${id}`).then((res) => {
      setSinglePost(res.data);
    });
     axios.get(`${baseURL}/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, []);

  return (
   <div className="post-page">
      <Navbar />
       <div className="post-content">
      {singlePost != null ? (
        <>
          {" "}
          <div className="right-side">
            <div className="title">{singlePost.title}</div>
            <div className="post-text">{singlePost.postText}</div>
            <div className="footer">{singlePost.username}</div>
          </div>
          <div className="left-side">
            <div className="addCommentContainer">
              <input type="textArea" placeholder="enter your comment..."  autoComplete="off"/>
              <button type="submit">submit</button>
            </div>
            <div className="listOfComments">
              {comments.map((comment,key)=>{
                <div className="comment">{comment.commentBody}</div>
              }
              )}
            </div>
          </div>
        </>
      ) : (
        <p>singlePost is null</p>
      )}
    </div>
    </div>
  );
}

export default Post;
