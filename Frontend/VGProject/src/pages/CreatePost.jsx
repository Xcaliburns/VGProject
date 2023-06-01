import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

const baseURL= import.meta.env.VITE_BACKEND_URL;
function CreatePost() {

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
    axios.post(`${baseURL}/posts`,data).then((res) => {
      console.log('ca marche Youpi');
    });
  };
  return (
    <div className="createPostPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="formContainer">
          <label>titre:  </label>
          <ErrorMessage name="title" component='span' />
          <Field
            id="inputCreatePost"
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
            id="inputCreatePost"
            name="username"
            placeholder="le nom de l'utilisateur"
          ></Field>

          <button type="submit">enregistrer </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
