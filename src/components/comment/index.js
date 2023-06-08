import {memo} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

function Comment({data}) {
  const cn = bem('Comment');

  console.log("data", data)

  return (
    <div className={cn()}>
      {data.text}
    </div>
  )
}

Comment.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
      _id: PropTypes.string,
    }),
    parent: PropTypes.shape({
      _id: PropTypes.string,
    })
  }).isRequired
};

export default memo(Comment);
