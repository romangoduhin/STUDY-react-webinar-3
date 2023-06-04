import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      token: localStorage.getItem('token'),
      userInfo: null,
      waiting: false,
      errorMessage: null,
    }
  }

  async authorize(data) {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Авторизация пользователя');

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await response.json();

      if (response.ok) {
        const userInfo = json.result.user
        const token = json.result.token

        if (userInfo && token) {
          this.setState({
            ...this.getState(),
            token: token,
            userInfo: userInfo,
            waiting: false,
            errorMessage: null,
          }, 'Загружены данные пользователя из АПИ');

          localStorage.setItem('token', token);
        }
      }

      if (!response.ok) {
        this.setState({
          ...this.getState(),
          token: null,
          userInfo: null,
          errorMessage: json.error.data.issues[0].message,
          waiting: false
        });
      }
    } catch (err) {
      this.setState({
        token: null,
        userInfo: null,
        errorMessage: 'Ошибка получения данных пользователя из АПИ',
        waiting: false
      }, 'Ошибка получения данных пользователя из АПИ');
    }
  }

  async unAuthorize() {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': `${token}`
        }
      });

      if (response.status === 200) {
        this.setState({
          ...this.getState(),
          userInfo: null,
          token: null
        }, 'Данные пользоваетеля удалены');

        localStorage.removeItem("token");
      }
    } catch (err) {
      this.setState({
        ...this.getState(),
      }, 'Ошибка удаления данных пользователя из АПИ');
    }
  }

  async getUserInfo() {
    const token = localStorage.getItem('token')

    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Получение данных пользователя');

    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': `${token}`
        }
      });

      const json = await response.json();

      if (response.ok) {
        const userInfo = json.result
        this.setState({
          ...this.getState(),
          userInfo: userInfo,
          waiting: false,
          errorMessage: null,
        }, 'Загружены данные пользователя из АПИ');
      }

      if (!response.ok) {
        this.setState({
          ...this.getState(),
          token: null,
          userInfo: null,
          errorMessage: json.error.data.issues[0].message,
          waiting: false
        });
      }
    } catch (err) {
      this.setState({
        token: null,
        userInfo: null,
        errorMessage: 'Ошибка получения данных пользователя из АПИ',
        waiting: false
      }, 'Ошибка получения данных пользователя из АПИ');
    }
  }
}

export default UserState;
