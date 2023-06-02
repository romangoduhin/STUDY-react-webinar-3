import {memo, useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import SideLayout from "../../components/side-layout";
import LoginButton from "../../components/login-button";
import useStore from "../../hooks/use-store";
import LoginUsername from "../../components/login-username";
import useInit from "../../hooks/use-init";

function LoginPanel() {
  const navigate = useNavigate();
  const store = useStore();

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
    <SideLayout padding="medium" side="end">
      <LoginUsername username={select.userInfo?.username}/>
      <LoginButton token={token} onSignIn={callbacks.navigateToLogin} onSignOut={callbacks.onSignOut}/>
    </SideLayout>
  );
}

export default memo(LoginPanel);
