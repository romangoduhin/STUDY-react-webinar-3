import {memo} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import Comment from "../comment"
import useTranslate from "../../hooks/use-translate";
import CommentForm from "../comment-form";
import useSelector from "../../hooks/use-selector";

function CommentsList({articleId, comments, commentForm, onSend, onAnswer, onCancel}) {
  const {t} = useTranslate();

  const cn = bem('CommentsList');

  const select = useSelector(state => ({
    username: state.session.user.username,
    userId: state.session.user._id,
  }));
  
  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{t("commentaries.title")} ({comments.length})</h1>
      <div className={cn('list')}>
        {comments.map(comment => {
          const isCurrentAnswer = commentForm.isAnswer && (commentForm.answerId === comment._id)

          const isOwnComment = comment?.author?._id === select.userId;
          const username = comment?.author?.username || select.username

          return <Comment key={comment._id}
                          data={comment}
                          username={username}
                          isAnswer={isCurrentAnswer}
                          isOwnComment={isOwnComment}
                          onSend={onSend}
                          onAnswer={onAnswer}
                          onCancel={onCancel}
          />
        })}

        {!commentForm.isAnswer && <CommentForm id={articleId} onSubmit={onSend} isAnswer={commentForm.isAnswer}/>}
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
  onSend: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  articleId: PropTypes.string,
};

export default memo(CommentsList);
