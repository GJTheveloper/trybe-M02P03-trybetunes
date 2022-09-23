import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isSaveButtonDisabled: true,
      loading: false,
      rendering: false,
    };
  }

  onInputChange = (event) => {
    const { id, value } = event.target;

    this.setState(
      {
        [id]: value,
      },

      () => {
        const { name } = this.state;
        const tamanhoMinimo = 3;

        if (name.length < tamanhoMinimo) {
          this.setState({
            isSaveButtonDisabled: true,
          });
        } else {
          this.setState({
            isSaveButtonDisabled: false,
          });
        }
      },
    );
  }

   submitUser = async () => {
     this.setState({ loading: true });
     const { name } = this.state;
     await createUser({ name });
     this.setState({
       loading: false,
       rendering: true,
     });
   }

   render() {
     const { name, isSaveButtonDisabled, loading, rendering } = this.state;

     if (loading) return <Loading />;
     if (rendering) return <Redirect to="/search" />;
     return (
       <div data-testid="page-login">
         <p>Login</p>
         <form>
           <label htmlFor="name">
             Nome
             <input
               id="name"
               data-testid="login-name-input"
               type="text"
               value={ name }
               onChange={ this.onInputChange }
             />
           </label>

           <button
             type="button"
             data-testid="login-submit-button"
             onClick={ this.submitUser }
             disabled={ isSaveButtonDisabled }
           >
             Entrar
           </button>
         </form>
       </div>
     );
   }
}

export default Login;
