import {memo} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import Comment from "../comment";

function CommentsList({comments, count}) {
  const cn = bem('CommentsList');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>Комментарии ({count})</h1>
      {comments.map(comment => <Comment key={comment._id} data={comment}/>)}
    </div>
  )
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
      _id: PropTypes.string,
    }),
    parent: PropTypes.shape({
      _id: PropTypes.string,
    })
  })).isRequired,
  count: PropTypes.number.isRequired
};

export default memo(CommentsList);
