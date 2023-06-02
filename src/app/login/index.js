import {memo, useCallback} from 'react';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginPanel from "../../containers/login-panel";
import LoginForm from "../../components/login-form";
import useStore from "../../hooks/use-store";

function Login() {
  const {t} = useTranslate();

  const store = useStore();

  const callbacks = {
    onAuthorize: useCallback((data) => store.actions.user.authorize(data), [store])
  }

  return (
    <PageLayout>
      <LoginPanel/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm onSubmit={callbacks.onAuthorize}/>
    </PageLayout>
  );
}

export default memo(Login);
