import React from "react";
import "./style.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import { ButtonBase } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { likePost, deletePost } from "../../../actions/post";
import { useHistory } from "react-router-dom";
import moment from "moment";

function Post({ post, setCurrentId }) {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const dispatch = useDispatch();
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result._id || user?.result.googleId)
      ) ? (
        <>
          <ThumbUpAltIcon />
          &nbsp;
          {post.likes.length > 2
            ? `you and ${post.likes.length - 1} others`
            : `${post.likes.length}like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOutlinedIcon />
          &nbsp;
          {post.likes.length}
          {post.likes.lenght === 1 ? "like" : "likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpOutlinedIcon fontSize='small' />
        &nbsp;Like
      </>
    );
  };
  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };
  return (
    <div className='Post'>
      <div className='Post__image'>
        <img src={post.selectedFile} />
        <div className='Post__Heading'>
          <h1>Rutvin Bhanderi</h1>
          <h3>{moment(post.createdAt).from()}</h3>
        </div>
        {(user?.result?._id || user?.result?.googleId) === post?.creator && (
          <Button onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon />
          </Button>
        )}
        <Button
          style={{ position: "absolute", top: 145, left: 0, height: 30 }}
          onClick={openPost}
        >
          More detail
        </Button>
      </div>

      <div className='Post__info'>
        <div className='Post__tags'>{post.tags.map((tag) => `#${tag}`)}</div>
        <div className='Post__Title'>{post.title}</div>
        <div className='Post__desc'>
          <p>{post.message}</p>
        </div>

        <div className='Post__actions'>
          <Button onClick={() => dispatch(likePost(post._id))}>
            <Likes />
          </Button>
          {(user?.result?._id || user?.result?.googleId) === post?.creator && (
            <Button onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon />
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
