import React from "react";
import './style.css';
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {RUBLE_CODE} from "../../../../constants";

function Summary({totalPrice}) {
  const cn = bem('Summary');

  if(!totalPrice) return;

  return (
    <div className={cn()}>
      <span className={cn('text')}>Итого</span>
      <span>{totalPrice} {RUBLE_CODE}</span>
    </div>
  );
}

Summary.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(Summary);
