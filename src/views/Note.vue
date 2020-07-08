<template>
  <div
    class="container mx-auto w-1/3 p-6 bg-white flex flex-col shadow rounded items-center justify-center"
  >
    <div class="text-xl font-bold">
      {{ note.name }}
    </div>
    <div class="p-4 text-justify">{{ note.content }}</div>
    <form @submit.prevent="checkForm" class="w-full flex flex-no-wrap p-4">
      <div class="w-full flex flex-col">
        <input
          v-model="comment.author"
          type="text"
          placeholder="Автор"
          class="block w-full px-4 py-1 border-l border-t border-b border-gray-500 rounded-tl  appearance-none focus:outline-none"
        />
        <input
          v-model="comment.content"
          type="text"
          placeholder="Текст коментаря"
          class="block w-full px-4 py-1 border-l border-b border-gray-500 rounded-bl  appearance-none focus:outline-none"
        />
      </div>

      <button
        type="submit"
        class="px-4 py-2 flex items-center text-blue-500 border border-blue-500 rounded-r focus:outline-none hover:bg-blue-500 hover:text-white hover:shadow"
      >
        <i class="far fa-comment-alt fa-2x"></i>
      </button>
    </form>
    <ul v-if="errors.length" class="text-red-500 text-xs italic">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
    <span v-if="!comments.length">Поки немає коментарів</span>
    <div
      v-else
      class="w-full p-4 flex flex-col items-start "
      style="max-height: 50vh"
    >
      <h2 class="mb-4 text-xl font-bold">Коментарі</h2>
      <ul class="w-full h-full flex flex-col overflow-y-auto max-h-full">
        <li
          v-for="comment in comments"
          :key="comment.id"
          class="mb-4 w-full flex items-center bg-white rounded-lg border"
        >
          <i class="pl-4 far fa-comment-alt fa-2x"></i>
          <div class="p-4 flex flex-col items-start">
            <div class="text-blue-500">{{ comment.author }}</div>
            <div class="text-justify">{{ comment.content }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: ["note"],
  data() {
    return {
      comment: {
        author: "",
        content: ""
      },
      comments: [],
      errors: []
    };
  },
  methods: {
    async createComment() {
      if (!this.comments.length) {
        this.comments = [
          {
            author: this.comment.author,
            content: this.comment.content,
            created_at: new Date()
          }
        ];
      } else {
        this.comments = [
          {
            author: this.comment.author,
            content: this.comment.content,
            created_at: new Date()
          },
          ...this.comments
        ];
      }
      this.comment.author = "";
      this.comment.content = "";
      this.errors = [];
      const notes = this.$store.state.notes.map(note => {
        if (note.id === this.note.id) {
          return {
            id: this.note.id,
            name: this.note.name,
            content: this.note.content,
            comments: this.comments
          };
        } else {
          return note;
        }
      });
      await this.$store.dispatch("createComment", notes);
      localStorage.setItem("notes", JSON.stringify(notes));
    },
    checkForm: function(e) {
      if (this.comment.author && this.comment.content) {
        this.createComment();
        return;
      }
      this.errors = [];
      if (!this.comment.author) {
        this.errors.push(
          "Поле автор повинне мати два слова, обидва з великої букви"
        );
      }
      if (!this.comment.content) {
        this.errors.push("Текст коментаря не повинен бути пустим.");
      }

      e.preventDefault();
    }
  },
  created() {
    if (this.note.comments) {
      this.comments = this.note.comments;
    }
  }
};
</script>

<style lang="scss" scoped></style>
