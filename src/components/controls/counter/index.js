import React from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {RUBLE_CODE} from "../../../constants";
import PropTypes from "prop-types";
import {plural} from "../../../utils";

function Counter({itemsAmount, totalPrice}) {
  const cn = bem('Counter');

  const text = (!(itemsAmount && totalPrice))
    ? "пусто"
    : `${itemsAmount} ${plural(itemsAmount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${totalPrice} ${RUBLE_CODE}`

  return (
    <div className={cn()}>
      <span>В корзине: </span>
      <span className={cn('text', {weight: 'bold'})}>{text}</span>
    </div>
  )
}

Counter.propTypes = {
  itemsAmount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(Counter);
