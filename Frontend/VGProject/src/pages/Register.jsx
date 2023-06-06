import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate} from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";

function Register() {

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const navigate =useNavigate();

  const initialValues = {
    username: "",
    hashedpassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(30).required(),
    hashedpassword: Yup.string().min(8).max(30).required(),
  });

  const onSubmit = (data) => {
    axios.post(`${baseURL}/users`, data).then(() => {
        console.log(data);
      navigate("/");
    });
  };

  return (
    <>
      <Navbar />
      <div className="createPostPage">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              id="inputCreatePost"
              name="username"
              placeholder="le nom de l'utilisateur"
            ></Field>
            <label>Password: </label>
            <ErrorMessage name="hashedpassword" component="span" />
            <Field
              id="inputCreatePost"
              type="password"
              name="hashedpassword"
              placeholder="Password"
            ></Field>

            <button type="submit">enregistrer </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Register;
