export const namespaced = true;

export const state = {};
export const mutations = {};
export const actions = {
  setNotes() {
    localStorage.setItem("notes", JSON.stringify(this.state.notes));
  },
  getNotes({ commit }) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    commit("SET_NOTES", notes, { root: true });
    return true;
  },
  async createNote({ dispatch }, payload) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.unshift(payload);
    localStorage.setItem("notes", JSON.stringify(notes));
    await dispatch("getNotes");
  },
  async updateNote({ dispatch }, payload) {
    localStorage.setItem("notes", JSON.stringify(payload));
    await dispatch("getNotes");
  },
  async deleteNote({ dispatch }, id) {
    const notes = this.state.notes.filter(note => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
    await dispatch("getNotes");
  },
  async createComment({ dispatch }, payload) {
    localStorage.setItem("notes", JSON.stringify(payload));
    await dispatch("getNotes");
  }
};
export const getters = {};
