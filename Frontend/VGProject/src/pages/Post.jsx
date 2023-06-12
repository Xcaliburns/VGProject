import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

function Post() {
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  let { id } = useParams();

  const [singlePost, setSinglePost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get(`${baseURL}/posts/${id}`).then((res) => {
      setSinglePost(res.data);
    });
    axios.get(`${baseURL}/comments/${id}`).then((res) => {
       setComments(res.data);
           console.log(res.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(`${baseURL}/comments/`, { commentsBody: newComment, PostId: id },
      {
        headers:{
          accessToken : sessionStorage.getItem("accessToken"),
        },})
      .then((res) => {
          if (res.data.error) {
          console.log(res.data.error);
        } else {
        const commentToAdd ={commentsBody:newComment};
        setComments([...comments,commentToAdd]);
        setNewComment('');
      }});
  };
 

  return (
    <div className="post-page">
      <Navbar />
      <div className="post-content">
        {singlePost != null ? (
          <>
            <div className="left-side">
              <div className="post">
              <div className="title">{singlePost.title}</div>
              <div className="post-text">{singlePost.postText}</div>
              <div className="footer">{singlePost.username}</div>
              </div>
            </div>
            <div className="right-side">
              <div className="addCommentContainer">
                <input
                  type="textArea"
                  placeholder="enter your comment..."
                  autoComplete="off"
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                />
                <button type="submit" onClick={addComment}>
                  submit
                </button>
              </div>
              <div className="listOfComments">
                {comments.map((comment, key) => {
                  return(
                  <div 
                  key={key} 
                  className="comment">
                    {comment.commentsBody}
                  </div>)
                })}
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
