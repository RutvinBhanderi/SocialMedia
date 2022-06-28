import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { fetchAll } from "../actions/post";
import { useDispatch, useSelector } from "react-redux";
function Paginate({ page }) {
  const dispatch = useDispatch();
  const { numberOfPage } = useSelector((state) => {
    return state.post;
  });
  useEffect(() => {
    if (page) {
      dispatch(fetchAll(page));
    }
  }, [page]);
  return (
    <Pagination
      count={numberOfPage}
      page={Number(page) || 1}
      variant='outlined'
      color='primary'
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
}

export default Paginate;
