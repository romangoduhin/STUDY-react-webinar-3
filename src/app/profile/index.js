import {memo, useEffect} from 'react';
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginPanel from "../../containers/login-panel";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import ProfileInfo from "../../components/profile-info";

function Profile() {
  const {t} = useTranslate();

  const select = useSelector(state => ({
    userInfo: state.user.userInfo,
    waiting: state.user.waiting,
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (!select.userInfo && !select.waiting) navigate('/login');
  }, [select.userInfo])

  return (
    <PageLayout>
      <LoginPanel/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileInfo data={select.userInfo}/>
    </PageLayout>
  );
}

export default memo(Profile);
