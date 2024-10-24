import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

import s from "./Contact.module.css";

const Contact = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className={s.box}>
      <h3 className={s.header}>
        <FaUser className={s.myIcon} />
        {item.name}
      </h3>
      <p className={s.text}>
        <FaPhoneAlt className={s.myIcon} />
        {item.number}
      </p>
      <button
        className={s.btn}
        onClick={() => dispatch(deleteContact(item.id))}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
