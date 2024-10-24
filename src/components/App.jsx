import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import { selectLoading } from "../redux/contactsSlice";
import { selectError } from "../redux/contactsSlice";
import { useEffect } from "react";
import { fetchContacts } from "../redux/contactsOps";
import Loader from "./Loader/Loader";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && <Loader />}
      {error && <p className="error-message">Error: {error}</p>}
      <ContactList />
    </div>
  );
};

export default App;
