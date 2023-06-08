import {memo} from "react";
import CommentsList from "../../components/comments-list";
import {useSelector as useSelectorRedux} from "react-redux/es/hooks/useSelector";
import shallowequal from "shallowequal";

function Comments() {
  // const {t} = useTranslate();
  //@todo add translate

  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
    count: state.comments.count,
  }), shallowequal);

  return (
    <CommentsList comments={select.comments} count={select.count}/>
  );
}

export default memo(Comments);
