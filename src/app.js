import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from "./components/modals/basket";

function App({store}) {
  const {list, basket, totalCount, totalPrice} = store.getState();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),
    onToggleModal: useCallback(() => {
      setIsModalVisible(prevState => !prevState)
    }, []),
    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls totalCount={totalCount} totalPrice={totalPrice} onClick={callbacks.onToggleModal}/>
      <List list={list} buttonText="Добавить" onClick={callbacks.onAddItem}/>
      {isModalVisible &&
        <Basket data={basket}
                totalPrice={totalPrice}
                onClose={callbacks.onToggleModal}
                onDeleteItem={callbacks.onDeleteItem}/>
      }
    </PageLayout>
  );
}

export default App;
