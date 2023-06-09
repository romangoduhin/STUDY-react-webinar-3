import {memo, useCallback, useMemo, useState} from "react";
import CommentsList from "../../components/comments-list";
import {useSelector as useSelectorRedux} from "react-redux/es/hooks/useSelector";
import shallowequal from "shallowequal";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

function Comments() {
  const [commentForm, setCommentForm] = useState({
    isAnswer: false,
    answerId: ''
  });

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

  const callbacks = {
    onSend: useCallback((value) => {
      alert(value);
    }, []),

    onAnswer: useCallback((answerId) => {
      setCommentForm({
        isAnswer: true,
        answerId: answerId
      })
    }, []),

    onCancel: useCallback(() => {
      setCommentForm({
        isAnswer: false,
        answerId: ''
      })
    }, []),
  }

  return (
    <CommentsList comments={options.updatedComments}
                  commentForm={commentForm}
                  count={select.count}
                  onSend={callbacks.onSend}
                  onAnswer={callbacks.onAnswer}
                  onCancel={callbacks.onCancel}
    />
  );
}

export default memo(Comments);
