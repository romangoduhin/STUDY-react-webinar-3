import React from "react";
import './style.css';
import Modal from "../index";
import Head from "../../head";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import List from "../../list";
import Summary from "./summary";

function Basket({data, totalPrice, onClose, onDeleteItem}) {
  const cn = bem('Basket');

  return (
    <Modal onClose={onClose}>
      <div onClick={e => e.stopPropagation()} className={cn()}>
        <Head title='Корзина' buttonText={"Закрыть"} isButtonVisible={true} onClick={onClose}/>

        <div className={cn('content')}>
          {data.length
            ? <>
              <List list={data} buttonText={"Удалить"} onClick={onDeleteItem}/>
              <Summary totalPrice={totalPrice}/>
            </>
            : <div className={cn('empty')}>Пусто</div>}
        </div>
      </div>
    </Modal>
  );
}

Basket.propTypes = {
  data: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired
};

export default Basket;
