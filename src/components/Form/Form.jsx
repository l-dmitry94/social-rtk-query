import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiMailSend } from 'react-icons/bi';
import styles from './Form.module.css';
import { useAddCommentMutation } from '../../redux/commentApi';

const INITIAL_STATE = {
  author: '',
  content: '',
};

export const Form = () => {
  // const [author, setAuthor] = useState('');
  // const [content, setContent] = useState('');
  const [state, setState] = useState(INITIAL_STATE);

  const [addComment, { isLoading }] = useAddCommentMutation();

  const onHandleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    addComment(state);
    setState(INITIAL_STATE);
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={onHandleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelName}>Full name</span>
          <input
            type="text"
            name="author"
            className={styles.input}
            value={state.author}
            onChange={onHandleChange}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelName}>Your comment</span>
          <textarea
            className={styles.input}
            name="content"
            rows="5"
            value={state.content}
            onChange={onHandleChange}
          ></textarea>
        </label>

        <button className={styles.formBtn} disabled={isLoading}>
          <BiMailSend className={styles.icon} />
          {isLoading ? '...Sending' : 'Send'}
        </button>
      </form>
    </div>
  );
};
