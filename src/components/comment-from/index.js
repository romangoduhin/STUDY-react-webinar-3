import {memo, useCallback, useState} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import useTranslate from "../../hooks/use-translate";
import PropTypes from "prop-types";

function CommentForm({onSubmit}) {
  const {t} = useTranslate();

  const cn = bem('CommentForm');

  const [value, setValue] = useState('');

  const callbacks = {
    onChange: useCallback((value) => {
      setValue(value);
    }, []),

    onSubmit: useCallback((event) => {
      event.preventDefault();
      onSubmit()
    }, [])
  }

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <span className={cn('title')}>{t("commentaries.newComment")}</span>
      </div>
      <textarea className={cn('textarea')}
                name="comment"
                id="comment"
                placeholder={t("commentaries.commentPlaceholder")}
                value={value}
                onChange={callbacks.onChange}
      />
      <button className={cn('sendButton')}>{t("commentaries.send")}</button>
    </div>
  )
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default memo(CommentForm);
