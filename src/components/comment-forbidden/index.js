import {memo, useCallback, useState} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import useTranslate from "../../hooks/use-translate";
import PropTypes from "prop-types";

function CommentForm({onSubmit, onCancel, isAnswer}) {
  const {t} = useTranslate();

  const cn = bem('CommentForm');

  const [value, setValue] = useState('');

  const callbacks = {
    onChange: useCallback((value) => {
      setValue(value);
    }, []),
  }

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
        <button className={cn('button')} onClick={() => onSubmit(value)}>{t("commentaries.send")}</button>
        {isAnswer &&
          <button className={cn('button')} onClick={onCancel}>{t("commentaries.cancel")}</button>
        }
      </div>
    </div>
  )
}

CommentForm.propTypes = {
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
