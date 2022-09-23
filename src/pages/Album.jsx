import PropTypes from 'prop-types';
import React from 'react';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumMusics: [],
      albumData: {},
      loading: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getMusicsByAlbumId(id);
  }

  getMusicsByAlbumId = async (id) => {
    const albumMusics = await getMusics(id);
    this.setState(
      {
        albumData: albumMusics[0],
        albumMusics: albumMusics.slice(1),
      },
    );
  }

  render() {
    const { albumMusics, albumData, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
        <div>
          <p data-testid="artist-name">{ albumData.artistName }</p>
          <p data-testid="album-name">{ albumData.collectionName }</p>
        </div>
        {
          albumMusics.map((music) => (
            <MusicCard
              key={ music.trackId }
              previewUrl={ music.previewUrl }
              trackName={ music.trackName }
              trackId={ music.trackId }
              music={ music }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.object,
    ],
  ).isRequired,
};

export default Album;
