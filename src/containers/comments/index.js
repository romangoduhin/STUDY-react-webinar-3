import {memo, useCallback, useMemo, useState} from "react";
import CommentsList from "../comments-list";
import {useSelector as useSelectorRedux} from "react-redux/es/hooks/useSelector";
import shallowequal from "shallowequal";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import commentsActions from "../../store-redux/comments/actions";
import {useDispatch} from "react-redux";

function Comments() {
  const dispatch = useDispatch();

  const [commentForm, setCommentForm] = useState({
    isAnswer: false,
    answerId: ''
  });

  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
    articleId: state.article.data._id
  }), shallowequal);

  const options = {
    updatedComments: useMemo(() => {
      const commentsList = treeToList(listToTree(select.comments, select.articleId), (item, level) => (
        {...item, level}))

      const filteredComments = commentsList.filter(comment => comment.text.trim())
      return filteredComments
    }, [select.comments]),
  };

  const callbacks = {
    onSend: useCallback((id, text, type) => {
      dispatch(commentsActions.send(id, text, type));
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
    <CommentsList articleId={select.articleId}
                  comments={options.updatedComments}
                  commentForm={commentForm}
                  onSend={callbacks.onSend}
                  onAnswer={callbacks.onAnswer}
                  onCancel={callbacks.onCancel}
    />
  );
}

export default memo(Comments);
