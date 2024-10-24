import { Formik, Field, Form, ErrorMessage } from "formik";

import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsOps";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  number: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(15, "Must be 15 characters or less")
    .matches(
      /^(\+?\d{1,4}?[\s-]?)?(\(?\d{1,4}?\)?[\s-]?)?[\d\s-]{5,15}$/,
      "Phone number is not valid"
    )
    .required("Required"),
});

const ContactForm = () => {
  const initialValues = { name: "", number: "" };
  const dispatch = useDispatch();

  const handleSubmit = (values, options) => {
    const newContact = {
      name: values.name,
      number: values.number,
    };

    dispatch(addContact(newContact));
    options.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="contact-form">
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" className="input-field" id="name" />
            <ErrorMessage name="name" component="p" />
          </div>

          <div>
            <label htmlFor="number">Phone</label>
            <Field name="number" type="tel" id="number" />
            <ErrorMessage name="number" component="p" />
          </div>

          <button type="submit" className="btn-submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;
