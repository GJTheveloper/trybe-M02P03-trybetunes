import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisable: true,
      isLoading: false,
      searchInput: '',
      searchedArtist: '',
      artist: '',
    };
  }

  handleChange = (event) => {
    this.setState(
      () => (
        {
          [event.target.id]: event.target.value,
        }
      ),

      () => {
        const { searchInput } = this.state;

        if (searchInput.length > 1) {
          this.setState(() => ({ isButtonDisable: false }));
        } else {
          this.setState(() => ({ isButtonDisable: true }));
        }
      },
    );
  }

  handleClick = async () => {
    const { searchInput } = this.state;
    this.setState(
      {
        isLoading: true,
        artist: searchInput,
      },
    );
    const response = await searchAlbumsAPI(searchInput);
    this.setState(
      {
        searchedArtist: response,
        searchInput: '',
      },
    );
    this.setState({ isLoading: false });
  }

  FindedAlbum = () => {
    const { searchedArtist, artist } = this.state;
    if (searchedArtist.length === 0) {
      return (
        <div>
          Nenhum álbum foi encontrado
        </div>
      );
    } return (
      <div>
        <p>
          {
            `Resultado de álbuns de: ${artist}`
          }
        </p>
        {
          searchedArtist.map(((album) => (
            <div
              key={ album.collectionId }
            >
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <br />
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                { album.collectionName }
              </Link>
              <div>{ album.artistName }</div>
              <div>{ album.collectionPrice }</div>
              <div>{ album.trackCount }</div>
            </div>
          )))
        }
      </div>
    );
  }

  render() {
    const { searchInput, isButtonDisable, isLoading, searchedArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          isLoading ? (
            <Loading />
          ) : (
            <form>
              <input
                id="searchInput"
                value={ searchInput }
                onChange={ this.handleChange }
                data-testid="search-artist-input"
                type="text"
              />
              <button
                onClick={ this.handleClick }
                data-testid="search-artist-button"
                type="button"
                disabled={ isButtonDisable }
              >
                Procurar
              </button>
            </form>
          )
        }
        {
          searchedArtist
          && this.FindedAlbum()
        }
      </div>
    );
  }
}

export default Search;
