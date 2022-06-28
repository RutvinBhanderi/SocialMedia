import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import "./style.css";
function Posts({ setCurrentId }) {
  const { posts, isLoading } = useSelector((state) => state.post);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <div className='Posts'>
      {posts?.map((post) => {
        return <Post post={post} setCurrentId={setCurrentId} />;
      })}
    </div>
  );
}

export default Posts;
