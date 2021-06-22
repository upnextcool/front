import gql from "graphql-tag";

export const SPOTIFY_RECOMMENDATIONS = gql`
  query {
    spotifyRecommendations
  }
`;

export const SPOTIFY_PLAYLIST = gql`
  query ($playlistId: String!) {
    playlist: spotifyPlaylist(playlistId: $playlistId)
  }
`;

export const SPOTIFY_ALBUM = gql`
  query ($albumId: String!) {
    album: spotifyAlbum(albumId: $albumId)
  }
`;

export const SPOTIFY_ARTIST = gql`
  query ($artistId: String!) {
    artist: spotifyArtist(artistId: $artistId)
  }
`;

export const PARTY = gql`
  query {
    party {
      id
      code
      name
      createdAt
      spotifyPlaylistId
      members {
        id
        username
        score
      }
      playlist {
        id
        name
        artist
      }
    }
  }
`;

export const QUEUE = gql`
  query {
    queue {
      id
      albumArtwork
      artist
      addedAt
      addedBy {
        id
        username
      }
      name
      party {
        id
        name
      }
      spotifyId
      votes {
        id
        member {
          id
        }
        type
      }
    }
  }
`;

export const SPOTIFY_SEARCH = gql`
  query ($query: String!) {
    spotifySearch(query: $query)
  }
`;

export const GET_PARTY_STATE = gql`
  query {
    partyState {
      artist
      artwork
      duration
      name
      playing
      progress
      spotifyId
      palette {
        vibrant
        lightVibrant
        darkVibrant
      }
    }
  }
`;
