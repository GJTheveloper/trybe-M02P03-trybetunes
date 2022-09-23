import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await getUser();
    this.setState({ loading: false, name: response.name });
  }

  render() {
    const { loading, name } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <br />
        <p data-testid="header-user-name">{ name }</p>
        <br />
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        <br />
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <br />
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <br />
      </header>
    );
  }
}

export default Header;
