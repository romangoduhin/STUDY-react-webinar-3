import {memo} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import Comment from "../comment"
import useTranslate from "../../hooks/use-translate";
import CommentForm from "../comment-form";

function CommentsList({comments, commentForm, count, onSend, onAnswer, onCancel}) {
  const {t} = useTranslate();

  const cn = bem('CommentsList');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{t("commentaries.title")} ({count})</h1>
      <div className={cn('list')}>
        {comments.map(comment => {
          const isCurrentAnswer = commentForm.isAnswer && (commentForm.answerId === comment._id)

          return <Comment key={comment._id}
                          data={comment}
                          isAnswer={isCurrentAnswer}
                          onSend={onSend}
                          onAnswer={onAnswer}
                          onCancel={onCancel}
          />
        })}

        {!commentForm.isAnswer && <CommentForm onSubmit={onSend} isAnswer={commentForm.isAnswer}/>}
      </div>
    </div>
  )
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
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
    })
  })).isRequired,
  commentForm: PropTypes.shape({
    isAnswer: PropTypes.bool,
    answerId: PropTypes.string
  }),
  count: PropTypes.number.isRequired,
  onSend: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default memo(CommentsList);
