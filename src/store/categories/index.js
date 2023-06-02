import StoreModule from "../module";

class CategoriesState extends StoreModule {
  initState() {
    return {
      categories: [{value: '', title: `Все`}]
    }
  }

  async load() {
    try {
      const response = await fetch(`/api/v1/categories?limit=*`);
      const json = await response.json();
      const categories = [{value: '', title: `Все`}, ...json.result.items];

      this.setState({
        ...this.getState(),
        categories,
      }, 'Загружены категории из АПИ');
    } catch (e) {
      this.setState({
        categories: []
      }, 'Ошибка получения категорий из АПИ')
    }
  }
}

export default CategoriesState;
