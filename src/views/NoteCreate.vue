<template>
  <div class="note-create-wrapper container">
    <div class="note-create-title">
      {{ $route.params.id ? "Редагувати" : "Створити" }} замітку
    </div>
    <form @submit.prevent="checkForm" class="note-create-form">
      <input
        v-model="note.name"
        type="text"
        placeholder="Текст замітки"
        class="note-create-form__input"
      />
      <textarea
        v-model="note.content"
        placeholder="Опис ..."
        class="note-create-form__input"
      ></textarea>

      <button type="submit" class="note-create-form__button">
        {{ $route.params.id ? "Зберегти" : "Створити" }}
      </button>
      <ul v-if="errors.length" class="errors">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </form>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import { mapGetters } from "vuex";
export default {
  name: "NoteCreate",
  data() {
    return {
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
      this.clearForm();
    }
  },
  computed: {
    ...mapGetters(["storeMethod", "notes"])
  },
  methods: {
    clearForm() {
      this.note.id = "";
      this.note.name = "";
      this.note.content = "";
    },
    async createNote() {
      if (this.$route.params.id) {
        // edit note
        const notes = this.notes.map(note => {
          if (note.id === this.$route.params.id) {
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
        await this.$store.dispatch(`${this.storeMethod}/updateNote`, notes);
        this.$router.push("/");
      } else {
        // create note
        this.note.id = uuid();
        await this.$store.dispatch(`${this.storeMethod}/createNote`, this.note);
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
      const note = this.notes.filter(note => note.id === this.$route.params.id);
      this.note.id = note[0].id;
      this.note.name = note[0].name;
      this.note.content = note[0].content;
      this.note.comments = note[0].comments | [];
    }
  }
};
</script>

<style lang="scss" scoped>
.note-create {
  &-wrapper {
    @apply mx-auto w-1/3 p-6 bg-white flex flex-col shadow rounded items-center justify-center;
  }

  &-title {
    @apply text-xl font-bold;
  }

  &-form {
    @apply w-full flex flex-col p-4;

    &__input {
      @apply mb-4 block w-full px-4 py-1 border border-blue-500 rounded  appearance-none;

      &:focus {
        @apply outline-none;
      }
    }

    &__button {
      @apply mb-4 px-4 py-2 text-blue-500 border border-blue-500 rounded;

      &:hover {
        @apply bg-blue-500 text-white shadow;
      }
      &:focus {
        @apply outline-none;
      }
    }
  }
}
.errors {
  @apply text-red-500 text-xs italic;
}
</style>
