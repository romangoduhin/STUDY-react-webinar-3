import {memo, useCallback} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";

function LoginPanel() {
  const {t} = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  useInit(() => {
    if (token && !fields)
      store.actions.user.load();
  }, [fields, token]);

  const callbacks = {
    // Открыть страницу входа
    onLogin: useCallback(() => {
      navigate('/login', {state: {from: location}})
    }, []),

    // Разлогиниться
    onLogout: useCallback(() => store.actions.user.logout(), [store])
  }

  return (
    <LoginTool
      action={token ? callbacks.onLogout : callbacks.onLogin}
      name={fields?.profile?.name ? fields.profile.name : fields?.username}
      link={'/profile'}
      t={t}
    />
  );
}

export default memo(LoginPanel);
