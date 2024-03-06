import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from '../Comment/Comment';
import { Grid } from '../Grid/Grid';
// import { comments } from '../../helpers/comments';
import { useSelector } from 'react-redux';
import { selectFilters } from '../../redux/filterSlice';
import { useGetCommentsQuery } from '../../redux/commentApi';

export const Comments = () => {
  const filter = useSelector(selectFilters);
  const { data: comments } = useGetCommentsQuery();

  const filteredComments = comments?.filter(({ content }) =>
    content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Grid>
      {comments &&
        filteredComments.map(comment => (
          <Comment key={comment.id} {...comment} />
        ))}
    </Grid>     
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape().isRequired),
};
