import firebase from "firebase/app";

export const namespaced = true;

export const state = {};
export const mutations = {};
export const actions = {
  async setNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    try {
      return await firebase
        .database()
        .ref(`notes/`)
        .set(notes);
    } catch (e) {
      alert(e);
    }
  },
  async getNotes({ commit }) {
    try {
      const notes = (
        await firebase
          .database()
          .ref(`/notes/`)
          .once("value")
      ).val();
      if (!notes) {
        commit("SET_NOTES", [], { root: true });
        return true;
      } else {
        commit(
          "SET_NOTES",
          Object.keys(notes).map(key => ({
            ...notes[key]
          })),
          { root: true }
        );
        return true;
      }
    } catch (e) {
      alert(e);
    }
  },
  async createNote({ dispatch }, payload) {
    try {
      await firebase
        .database()
        .ref(`notes/`)
        .push(payload);
      await dispatch("getNotes");
    } catch (e) {
      alert(e);
    }
  },
  async updateNote({ dispatch }, payload) {
    try {
      await firebase
        .database()
        .ref(`notes/`)
        .set(payload);
      await dispatch("getNotes");
    } catch (e) {
      alert(e);
    }
  },
  async deleteNote({ dispatch }, id) {
    try {
      const notesNew = this.state.notes.filter(note => note.id !== id);
      await firebase
        .database()
        .ref(`notes/`)
        .set(notesNew);
      await dispatch("getNotes");
    } catch (e) {
      alert(e);
    }
  },
  async createComment({ dispatch }, payload) {
    try {
      await firebase
        .database()
        .ref(`notes/`)
        .set(payload);
      await dispatch("getNotes");
    } catch (e) {
      alert(e);
    }
  }
};
export const getters = {};
