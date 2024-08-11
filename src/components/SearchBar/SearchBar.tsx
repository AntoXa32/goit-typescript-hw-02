import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (topic: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <header className={css.header}>
      <Toaster />
      <Formik
        initialValues={{ topic: "" }}
        onSubmit={(values, actions) => {
          if (!values.topic.trim()) {
            toast.error("Please enter a search term!");
          } else {
            onSearch(values.topic);
            actions.resetForm();
          }
        }}
      >
        <Form className={css.form}>
          <div className={css.inputWrapper}>
            <button type="submit" className={css.searchButton}>
              <FaSearch />
            </button>
            <Field
              type="text"
              name="topic"
              placeholder="Search images and photos"
              className={css.input}
            />
          </div>
        </Form>
      </Formik>
    </header>
  );
}
