import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";


function CreatePost() {
const navigate =useNavigate();
const baseURL= import.meta.env.VITE_BACKEND_URL;

  const initialValues={
    title:"",
    postText:"",
    username:"",
  };

  const validationSchema = Yup.object().shape(
    {
      title:Yup.string().min(3).max(50).required('vous devez entrer un titre'),
    postText:Yup.string().min(3).max(255).required(),
    username:Yup.string().min(3).max(30).required(),
    }
  )

  const onSubmit=(data)=>{
    axios.post(`${baseURL}/posts`,data).then(() => {
      navigate('/');
    });
  };
  return (
    <>
    <Navbar />
    <div className="createPostPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="formContainer">
          <label>titre:  </label>
          <ErrorMessage name="title" component='span' />
          <Field
            className="inputUsername"
            name="title"
            placeholder="un super titre"
          ></Field>
          <label>Post:  </label>
          <ErrorMessage name="postText" component='span' />
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="le post de la mort"
          ></Field>
          <label>Username:  </label>
          <ErrorMessage name="username" component='span' />
          <Field
            className="inputUsername"
            name="username"
            placeholder="le nom de l'utilisateur"
          ></Field>

          <button type="submit">enregistrer </button>
        </Form>
      </Formik>
    </div></>
  );
}

export default CreatePost;
