import { Formik, Field, Form, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  phone: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(10, "Must be 10 characters or less")
    .matches(
      /^(\+?\d{1,4}?[\s-]?)?(\(?\d{1,4}?\)?[\s-]?)?[\d\s-]{5,15}$/,
      "Phone number is not valid"
    )
    .required("Required"),
});

const ContactForm = () => {
  const initialValues = { name: "", phone: "" };

  const dispatch = useDispatch();

  const handleSubmit = (values, options) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      phone: values.phone,
    };

    dispatch(addContact(newContact));
    options.resetForm();
  };

  return (
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
          <label htmlFor="phone">Phone</label>
          <Field name="phone" type="tel" id="phone" />
          <ErrorMessage name="phone" component="p" />
        </div>

        <button type="submit" className="btn-submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
