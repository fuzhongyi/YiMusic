const loading = {
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payLoad) {
      state.isLoading = payLoad.isLoading
    }
  }
}

export default loading
