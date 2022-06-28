import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import FileBased from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./style.css";
import { createPost, updatePost } from "../../actions/post";
import { Typography, Paper } from "@material-ui/core";
function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) =>
    currentId ? state.post.posts.find((p) => p._id === currentId) : null
  );
  useEffect(() => {
    if (post)
      setPostData({
        title: post.title,
        message: post.message,
        tags: post.tags,
        selectedFile: post.selectedFile,
      });
  }, [post]);
  console.log(postData);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost({ ...postData, name: user?.result?.name }, currentId)
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  if (!user?.token) {
    return (
      <Paper>
        <Typography variant='h6' align='center'>
          Please sign in to create your own memories and like others
        </Typography>
      </Paper>
    );
  }
  return (
    <div className='Form'>
      <form onSubmit={handleSubmit}>
        <input
          className='Form__Textfield'
          name='title'
          value={postData.title}
          placeholder='Title'
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <input
          className='Form__Textfield'
          name='message'
          value={postData.message}
          placeholder='Message'
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <input
          className='Form__Textfield'
          name='tags'
          value={postData.tags}
          placeholder='Tags'
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <FileBased
          type='file'
          multiple={false}
          onDone={({ base64 }) => {
            setPostData({ ...postData, selectedFile: base64 });
          }}
        />
        <div className='Form__submitbutton'>
          <Button variant='contained' color='primary' type='submit'>
            Submit
          </Button>
        </div>
        <div className='Form__resetbutton'>
          <Button variant='contained' color='secondary' onClick={clear}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
