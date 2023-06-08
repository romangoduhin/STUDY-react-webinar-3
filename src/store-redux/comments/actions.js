export default {
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&fields=items(_id,dateCreate,author,parent,count)`
        });
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },
}
