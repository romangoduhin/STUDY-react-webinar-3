import {memo, useCallback} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import useTranslate from "../../hooks/use-translate";
import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";

function CommentForbidden({isAnswer, onCancel}) {
  const {t} = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  const cn = bem('CommentForbidden');

  const callbacks = {
    onSignIn: useCallback(() => {
      navigate("/login", {state: {back: location.pathname}});
    }, [location]),
  }

  return (
    <p className={cn()}>
      <span onClick={callbacks.onSignIn} className={cn("signInButton")}>{t("commentaries.signIn")}</span>
      <span className={cn("text")}>, {
        isAnswer
          ? t("commentaries.forbiddenAnswer")
          : t("commentaries.forbiddenComment")
      } </span>
      {isAnswer && <span onClick={onCancel} className={cn("cancelButton")}>{t("commentaries.cancel")}</span>}
    </p>
  )
}

CommentForbidden.propTypes = {
  isAnswer: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default memo(CommentForbidden);
