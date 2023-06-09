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
    articleId: state.article.data._id
  }), shallowequal);

  const options = {
    updatedComments: useMemo(() => (
      treeToList(listToTree(select.comments, select.articleId), (item, level) => (
        {...item, level}))), [select.comments]),
  };
  
  return (
    <CommentsList comments={options.updatedComments} count={select.count}/>
  );
}

export default memo(Comments);
