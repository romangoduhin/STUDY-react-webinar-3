import {memo, useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import LoginButton from "../../components/login-button";
import useStore from "../../hooks/use-store";
import LoginUsername from "../../components/login-username";
import useInit from "../../hooks/use-init";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LoginPanel() {
  const navigate = useNavigate();
  const store = useStore();
  const cn = bem('LoginPanel');

  const token = localStorage.getItem('token')

  const select = useSelector(state => ({
    userInfo: state.user.userInfo,
  }));

  const callbacks = {
    navigateToLogin: () => navigate('/login'),
    onSignOut: useCallback(() => store.actions.user.unAuthorize(), [store]),
  }

  useInit(() => {
    if (token && !select.userInfo)
      store.actions.user.getUserInfo();
  }, [select, token]);

  return (
    <div className={cn()}>
      <LoginUsername username={select.userInfo?.username}/>
      <LoginButton token={token} onSignIn={callbacks.navigateToLogin} onSignOut={callbacks.onSignOut}/>
    </div>
  );
}

export default memo(LoginPanel);
