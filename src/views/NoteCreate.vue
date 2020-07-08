<template>
  <div
    class="container mx-auto w-1/3 p-6 bg-white flex flex-col shadow rounded items-center justify-center"
  >
    <div class="text-xl font-bold">
      {{ $route.params.id ? "Редагувати" : "Створити" }} замітку
    </div>
    <form
      @submit.prevent="checkForm"
      class="w-full flex flex-col p-4 space-y-4"
    >
      <input
        v-model="note.name"
        type="text"
        placeholder="Текст замітки"
        class="block w-full px-4 py-1 border border-blue-500 rounded  appearance-none focus:outline-none"
      />
      <textarea
        v-model="note.content"
        placeholder="Опис ..."
        class="block w-full px-4 py-1 border border-blue-500 rounded  appearance-none focus:outline-none"
      ></textarea>

      <button
        type="submit"
        class="px-4 py-2 text-blue-500 border border-blue-500 rounded focus:outline-none hover:bg-blue-500 hover:text-white hover:shadow"
      >
        {{ $route.params.id ? "Зберегти" : "Створити" }}
      </button>
      <ul v-if="errors.length" class="text-red-500 text-xs italic">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </form>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
export default {
  name: "NoteCreate",
  data() {
    return {
      notes: [],
      note: {
        id: "",
        name: "",
        content: "",
        comments: []
      },
      errors: []
    };
  },
  watch: {
    "$route.path": function() {
      this.note.id = "";
      this.note.name = "";
      this.note.content = "";
    }
  },

  methods: {
    async createNote() {
      if (this.$route.params.id) {
        // edit note
        const notes = this.$store.state.notes.map(note => {
          if (note.id === this.$route.params.id) {
            console.log("000");
            return {
              id: this.$route.params.id,
              name: this.note.name,
              content: this.note.content,
              comments: this.note.comments
            };
          } else {
            return note;
          }
        });
        await this.$store.dispatch("updateNote", notes);
        this.$router.push("/");
      } else {
        // create note
        this.note.id = uuid();
        await this.$store.dispatch("createNote", this.note);
        this.$router.push("/");
      }
    },
    checkForm: function(e) {
      if (this.note.name && this.note.content) {
        this.createNote();
      }

      this.errors = [];

      if (!this.note.name) {
        this.errors.push("Текст замітки не повинен бути пустим");
      }
      if (!this.note.content) {
        this.errors.push("Опис замітки не повинен бути пустим.");
      }

      e.preventDefault();
    }
  },
  created() {
    if (this.$route.params.id) {
      const note = this.$store.state.notes.filter(
        note => note.id === this.$route.params.id
      );
      this.note.id = note[0].id;
      this.note.name = note[0].name;
      this.note.content = note[0].content;
      this.note.comments = note[0].comments | [];
    }
  }
};
</script>

<style lang="scss" scoped></style>
