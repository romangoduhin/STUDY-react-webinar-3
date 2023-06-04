import {Route, Routes} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";

function App() {
  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);

  const select = useSelector(state => ({
    token: state.user.token,
  }));

  useInit(() => {
    if (select.token) {
      store.actions.user.getUserInfo();
    }
  }, [], true);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
