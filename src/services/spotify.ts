import SpotifyWebApi from 'spotify-web-api-node';
const spotifyApi = new SpotifyWebApi({});
export class Spotify {
  constructor(private artist: string) {}

  async lookup() {
    return await spotifyApi.getArtist(this.artist);
  }
}
