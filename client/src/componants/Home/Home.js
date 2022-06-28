import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChipInput from "material-ui-chip-input";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { fetchAll } from "../../actions/post";
import { useLocation } from "react-router-dom";
import { fetchPostBySearch } from "../../actions/post";
import "./style.css";
import { Button } from "@material-ui/core";
import Pagination from "../Pagination";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
function Home() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState();
  const location = useLocation();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const page = query.get("page") || 1;
  console.log(search);
  console.log(tags);
  // console.log(location);
  const searchPost = () => {
    if (search?.trim() || tags) {
      dispatch(fetchPostBySearch({ search, tags: tags.join(",") }));
    }
  };
  const handleKeyPress = (e) => {
    if (e.keycode === 13) {
      searchPost();
    }
  };
  // useEffect(() => {
  //   dispatch(fetchAll());
  // }, [dispatch, currentId]);
  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));
  return (
    <div className='Home'>
      <Posts className='Home__Posts' setCurrentId={setCurrentId} />
      <div className='form'>
        <div className='searchForm' onKeyPress={handleKeyPress}>
          <input
            type='text'
            name='search'
            placeholder='Search Post'
            className='searchPost'
            onChange={(e) => setSearch(e.target.value)}
          />
          <ChipInput
            style={{ margin: "10px 0px" }}
            value={tags}
            onAdd={handleAdd}
            onDelete={handleDelete}
            label='searchTags'
            variant='outlined'
          />
          <Button variant='contained' onClick={searchPost} color='primary'>
            Search
          </Button>
        </div>
        <Form
          className='Home__Form'
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
        {!search && !tags.length && (
          <div className='pagination'>
            <Pagination page={page} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
