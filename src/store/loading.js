const loading = {
  state: {
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateLoadingStatus (state, payLoad) {
      state.isLoading = payLoad.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  }
}

export default loading
