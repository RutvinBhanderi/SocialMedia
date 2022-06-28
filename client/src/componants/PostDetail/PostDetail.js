import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { fetchPostBySearch, getPost } from "../../actions/post";
import { CircularProgress } from "@material-ui/core";
import "./PostDetail.css";
function PostDetail() {
  const { post, posts, isLoading } = useSelector((state) => state.post);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("id : " + id);
  console.log(id);
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);
  // console.log(post.tags);
  useEffect(() => {
    if (post) {
      dispatch(
        fetchPostBySearch({ search: "none", tags: post.tags.join(",") })
      );
    }
  }, [post]);
  if (!post) return null;
  if (isLoading) {
    return <CircularProgress size='7em' />;
  }
  const recommandedPost = posts.filter(({ _id }) => _id !== post._id);
  console.log(recommandedPost);
  return (
    <div className='PostDetail__main'>
      <div className='Post__details'>
        <div className='Post__detailInfo'>
          <div className='post__title'>{post.title}</div>
          <div className='post__tags'>{post.tags.map((tag) => `#${tag}`)}</div>
          <p className='post__description'>
            {/* its awesome; i like canada most and its very beautiful palce for
            travellin and also best for study its awesome; i like canada most
            and its very beautiful palce for travellin and also best for study
            its awesome; i like canada most and its very beautiful palce for
            travellin and also best for study its awesome; i like canada most
            and its very beautiful palce for travellin and also best for study
            its awesome; i like canada most and its very beautiful palce for
            travellin and also best for study */}
            {post.message}
          </p>
          <h1 className='creator__name'>Created by : {post.name}</h1>
          <p className='post__time'>{moment(post.createdAt).fromNow()}</p>
          <hr />
          <div className='post__realtimeChat'>
            <strong>realtime chat</strong>
          </div>
          <hr />
          <div className='post__comment'>
            <strong>comment</strong>
          </div>
        </div>

        <div className='Post__detailImage'>
          <img src={post.selectedFile} />
        </div>
      </div>
      {recommandedPost.length && (
        <>
          <span>You might also like :</span>
          <hr />
          <div className='recommanded__post'>
            {recommandedPost.map((post) => (
              <div className='rpost'>
                <div className='rpost__title'>{post.title}</div>
                <h3 className='rpost__creator'>{post.name}</h3>
                <div className='rpost__desc'>{post.message}</div>
                <p className='rpost__like'> Likes : {post.likes.length}</p>
                <div className='rpost__image'>
                  <img src={post.selectedFile} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PostDetail;
