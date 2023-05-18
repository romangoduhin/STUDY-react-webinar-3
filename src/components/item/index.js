import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {RUBLE_CODE, UNIT} from "../../constants";
import {cn as bem} from "@bem-react/classname";
import Price from "./price";
import Counter from "./counter";

function Item({item, buttonText, onClick}) {
  const cn = bem('Item');

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      onClick(item);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>
        <span>{item.title}</span>
        <div className={cn('info')}>
          <Price amount={item.price} currency={RUBLE_CODE}/>
          {item.count && <Counter count={item.count} unit={UNIT}/>}
        </div>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(Item);
