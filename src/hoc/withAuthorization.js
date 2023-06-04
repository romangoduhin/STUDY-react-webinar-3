import React from "react";
import {useNavigate} from "react-router-dom";
import useSelector from "../hooks/use-selector";

function withAuthorization(WrappedComponent) {
  return function Authorization(props) {
    const navigate = useNavigate();

    const select = useSelector(state => ({
      token: state.user.token,
    }));

    if (!select.token) {
      navigate("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuthorization;