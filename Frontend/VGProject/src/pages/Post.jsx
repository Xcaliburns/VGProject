import Navbar from "../Navbar"
import { useParams } from "react-router-dom"
function Post() {
    let { id }=useParams();
  return (
    
    <div>
        <Navbar  />
        {id}</div>
  )
}

export default Post