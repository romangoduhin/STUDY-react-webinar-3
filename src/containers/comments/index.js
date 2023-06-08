import {memo, useMemo} from "react";
import CommentsList from "../../components/comments-list";
import {useSelector as useSelectorRedux} from "react-redux/es/hooks/useSelector";
import shallowequal from "shallowequal";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

function Comments() {
  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
    count: state.comments.count,
  }), shallowequal);

  const options = {
    updatedComments: useMemo(() => (
      treeToList(listToTree(select.comments), (item, level) => (
        {...item, level}))), [select.comments]),
  };

  return (
    <CommentsList comments={options.updatedComments} count={select.count}/>
  );
}

export default memo(Comments);
