import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const { authState } = useContext(AuthContext);

  let { id } = useParams();

  const [singlePost, setSinglePost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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
      .post(
        `${baseURL}/comments/`,
        { commentBody: newComment, PostId: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: res.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
          
        }
      });
  };

  const deleteComment = (id) => {    
    axios
      .delete(`${baseURL}/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
         alert(" your comment has been deleted");
       setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        );
      });
  };
   console.log(`comments.length: ${comments.length}`);

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
                  className="input-area"
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
                  return (
                    <div key={key} className="comment">
                      <div className="comment-text"> {comment.commentBody}</div>
                      <div className="comment-username">{comment.username}</div>
                      {authState.username === comment.username && (
                        <button
                          onClick={() => {
                            deleteComment(comment.id);
                          }}
                        >
                          delete
                        </button>
                      )}
                    </div>
                  );
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
