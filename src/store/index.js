import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: [],
    storeMethod: "firebase"
    // storeMethod: "localStorage"
  },
  mutations: {
    SET_NOTES(state, payload) {
      state.notes = payload;
    }
  },
  actions: {
    async setNotes() {
      if (this.state.storeMethod === "localStorage") {
        localStorage.setItem("notes", JSON.stringify(this.state.notes));
      } else {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        try {
          return await firebase
            .database()
            .ref(`notes/`)
            .set(notes);
        } catch (e) {
          console.log("ERROR", e);
        }
      }
    },
    async getNotes({ commit }) {
      if (this.state.storeMethod === "localStorage") {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        commit("SET_NOTES", notes);
        return true;
      } else {
        try {
          const notes = (
            await firebase
              .database()
              .ref(`/notes/`)
              .once("value")
          ).val();
          if (!notes) {
            commit("SET_NOTES", []);
            return true;
          } else {
            commit(
              "SET_NOTES",
              Object.keys(notes).map(key => ({
                ...notes[key]
              }))
            );
            return true;
          }
        } catch (e) {
          console.log("ERROR", e);
        }
      }
    },
    async createNote({ dispatch }, payload) {
      if (this.state.storeMethod === "localStorage") {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.unshift(payload);
        localStorage.setItem("notes", JSON.stringify(notes));
        await dispatch("getNotes");
      } else {
        try {
          await firebase
            .database()
            .ref(`notes/`)
            .push(payload);
          await dispatch("getNotes");
        } catch (e) {
          console.log("ERROR", e);
          throw e;
        }
      }
    },
    async updateNote({ dispatch }, payload) {
      if (this.state.storeMethod === "localStorage") {
        localStorage.setItem("notes", JSON.stringify(payload));
        await dispatch("getNotes");
      } else {
        try {
          await firebase
            .database()
            .ref(`notes/`)
            .set(payload);
          await dispatch("getNotes");
        } catch (e) {
          console.log("ERROR", e);
          throw e;
        }
      }
    },
    async deleteNote({ dispatch }, id) {
      if (this.state.storeMethod === "localStorage") {
        const notes = this.state.notes.filter(note => note.id !== id);
        localStorage.setItem("notes", JSON.stringify(notes));
        await dispatch("getNotes");
      } else {
        try {
          const notesNew = this.state.notes.filter(note => note.id !== id);
          await firebase
            .database()
            .ref(`notes/`)
            .set(notesNew);
          await dispatch("getNotes");
        } catch (e) {
          console.log("ERROR", e);
          throw e;
        }
      }
    },
    async createComment({ dispatch }, payload) {
      if (this.state.storeMethod === "localStorage") {
        localStorage.setItem("notes", JSON.stringify(payload));
        await dispatch("getNotes");
      } else {
        try {
          await firebase
            .database()
            .ref(`notes/`)
            .set(payload);
          await dispatch("getNotes");
        } catch (e) {
          console.log("ERROR", e);
          throw e;
        }
      }
    }
  },
  modules: {}
});
