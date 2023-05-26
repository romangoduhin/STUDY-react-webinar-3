import StoreModule from "../module";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      product: null
    }
  }

  async load(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=madeIn(title,code),category(title),price,description,title,dateCreate,_id
      `);
    const json = await response.json();
    
    this.setState({
      ...this.getState(), product: json.result
    }, 'Загружен товар по id из АПИ');
  }
}

export default Product;
