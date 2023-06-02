import {memo, useState} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import useTranslate from "../../hooks/use-translate";

function LoginForm({onSubmit}) {
  const cn = bem('LoginForm');
  const {t} = useTranslate();

  const [auth, setAuth] = useState({login: "", password: ""});

  const callbacks = {
    onSubmit: (event) => {
      event.preventDefault();
      onSubmit(auth);
    },
    onChange: (event) => {
      setAuth(prevState => ({...prevState, [event.target.id]: event.target.value}))
    },
  }

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('signin')}</h2>
      <form className={cn('form')} onSubmit={callbacks.onSubmit}>
        <label className={cn('form-item')}>
          {t('login')}
          <input onChange={callbacks.onChange} type="text" id="login"/>
        </label>
        <label className={cn('form-item')}>
          {t('password')}
          <input onChange={callbacks.onChange} type="password" id="password"/>
        </label>
        <button type="submit" className={cn('button')}>{t('enter')}</button>
      </form>
    </div>
  )
}

export default memo(LoginForm);
