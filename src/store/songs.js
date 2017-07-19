const song = {
  state: {
    songs: []
  },
  getters: {
    getSongs (state) {
      return state.songs
    }
  },
  mutations: {
    songsAdd (state, song) {
      state.songs.push(song)
    },
    songsInit (state) {
      state.songs = []
    },
    setSongs (state, songs) {
      state.songs = songs
    },
    songsThumbsAdd (state, index) {
      state.songs[index].thumbs += 1
    }
  }
}

export default song
