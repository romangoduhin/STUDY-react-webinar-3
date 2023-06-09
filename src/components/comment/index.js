import {memo} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import useTranslate from "../../hooks/use-translate";
import formatDate from "../../utils/format-date";

function Comment({data}) {
  const {t, lang} = useTranslate();

  const cn = bem('Comment');

  const paddingLeft = {paddingLeft: `calc(${data.level} * 30px )`}

  return (
    <div style={paddingLeft} className={cn()}>
      <div className={cn('header')}>
        <span className={cn('username')}>{data?.author?.username}</span>
        <span className={cn('dateCreate')}>{formatDate(data?.dateCreate, lang)}</span>
      </div>
      <div className={cn('text')}>
        {data.text}
      </div>
      <button className={cn('answerButton')}>{t("commentaries.answer")}</button>
    </div>
  )
}

Comment.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
      _id: PropTypes.string,
      _tree: PropTypes.object
    }),
    parent: PropTypes.shape({
      _id: PropTypes.string,
    })
  }).isRequired
};

export default memo(Comment);
