import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Counter from "./counter";
import {cn as bem} from "@bem-react/classname";

function Controls({basket}){
  const cn = bem('Controls');

  const itemsAmount = basket.length;
  const totalPrice = basket.reduce((acc,item) => acc + item.price, 0);

  return (
    <div className={cn()}>
      <Counter itemsAmount={itemsAmount} totalPrice={totalPrice}/>
      <button onClick={() => onAdd()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
    basket: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number
  })).isRequired,
};

export default React.memo(Controls);
