import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      musicFavorite: false,
    };
  }

  componentDidMount() {
    this.verifyMusicsFavorites();
  }

  addMusicsFavorites = async () => {
    this.setState({ loading: true });
    const { music } = this.props;
    await addSong(music);
    this.setState(
      {
        loading: false,
      },
    );
  }

  removeMusicsFavorites = async () => {
    this.setState({ loading: true });
    const { music } = this.props;
    await removeSong(music);
    this.setState(
      {
        loading: false,
      },
    );
  }

  verifyMusicsFavorites = async () => {
    this.setState({ loading: true });
    const { music } = this.props;
    const response = await getFavoriteSongs();
    this.setState(
      {
        loading: false,
        musicFavorite: response
          .some((musicFav) => musicFav.trackId === music.trackId),
      },
    );
  }

  toggleToFavorite = (event) => {
    const { checked } = event.target;
    this.setState(
      {
        musicFavorite: checked,
      },
    );
    if (checked) {
      this.addMusicsFavorites();
    } else {
      this.removeMusicsFavorites();
    }
  }

  render() {
    const { loading, musicFavorite } = this.state;
    const { previewUrl, trackName, trackId } = this.props;
    if (loading) return <Loading />;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="musicFavorite">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="musicFavorite"
            name="musicFavorite"
            onChange={ this.toggleToFavorite }
            checked={ musicFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  music: PropTypes.arrayOf(PropTypes.object).isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
