import {memo, useCallback, useEffect, useState} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import useTranslate from "../../hooks/use-translate";
import PropTypes from "prop-types";
import useSelector from "../../hooks/use-selector";
import CommentForbidden from "../comment-forbidden";

function CommentForm({id, onSubmit, onCancel, isAnswer}) {
  const {t} = useTranslate();

  const cn = bem('CommentForm');

  const [value, setValue] = useState('');
  const [isCommentForbidden, setIsCommentForbidden] = useState(true);

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const callbacks = {
    onSubmit: useCallback(() => {
      const type = isAnswer ? "comment" : "article"

      onSubmit(id, value, type)
    }, [value, isAnswer]),

    onChange: useCallback((event) => {
      setValue(event.currentTarget.value);
    }, []),
  }

  useEffect(() => {
    if (!select.exists) {
      setIsCommentForbidden(true)
    } else {
      setIsCommentForbidden(false)
    }
  }, [select.exists, select.waiting]);

  if (isCommentForbidden) return <CommentForbidden isAnswer={isAnswer} onCancel={onCancel}/>

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <span className={cn('title')}>
          {isAnswer
            ? t("commentaries.newAnswer")
            : t("commentaries.newComment")
          }
        </span>
      </div>
      <textarea className={cn('textarea')}
                name="comment"
                id="comment"
                placeholder={t("commentaries.commentPlaceholder")}
                value={value}
                onChange={callbacks.onChange}
      />
      <div className={cn('buttons')}>
        <button className={cn('button')} onClick={callbacks.onSubmit}>{t("commentaries.send")}</button>
        {isAnswer &&
          <button className={cn('button')} onClick={onCancel}>{t("commentaries.cancel")}</button>
        }
      </div>
    </div>
  )
}

CommentForm.propTypes = {
  id: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  isAnswer: PropTypes.bool
};

CommentForm.defaultProps = {
  onCancel: () => {
  },
  isAnswer: false
};

export default memo(CommentForm);
