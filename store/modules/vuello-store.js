export const state = () => ({
  vuello: null
})

export const getters = {
  getVuelloDatas: (state) => {
    return state.vuello
  }
}

export const actions = {
  setVuello({ commit }, data) {
    commit('SET_VUELLO', data)
  }
}

export const mutations = {
  SET_VUELLO(state, data) {
    state.vuello = data
  }
}

export const vuelloModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
