<template>
  <div class="component-wrapper">
    <form @submit.prevent="checkForm" class="comment-form">
      <div class="comment-form__wrapper">
        <input
          v-model="comment.author"
          type="text"
          placeholder="Автор"
          class="comment-form__input comment-form__input--author"
        />
        <input
          v-model="comment.content"
          type="text"
          placeholder="Текст коментаря"
          class="comment-form__input comment-form__input--content"
        />
      </div>

      <button type="submit" class="comment-form__button">
        <i class="far fa-comment-alt fa-2x"></i>
      </button>
    </form>
    <ul v-if="errors.length" class="error">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
    <span v-if="!comments.length">Поки немає коментарів</span>
    <div v-else class="comments">
      <h2 class="comments__title">Коментарі</h2>
      <ul class="comments__list">
        <li v-for="comment in comments" :key="comment.id" class="comment">
          <i class="far fa-comment-alt fa-2x"></i>
          <div class="comment__wrapper">
            <div class="comment__author">{{ comment.author }}</div>
            <div class="comment__content">{{ comment.content }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
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
  computed: {
    ...mapGetters(["storeMethod", "notes"])
  },
  methods: {
    clearForm() {
      this.comment.author = "";
      this.comment.content = "";
    },
    async createComment() {
      this.comments = [
        {
          author: this.comment.author,
          content: this.comment.content,
          created_at: new Date()
        },
        ...this.comments
      ];
      console.log("22", this.comments);
      // }
      this.clearForm();
      this.errors = [];
      const notes = this.notes.map(note => {
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
      await this.$store.dispatch(`${this.storeMethod}/createComment`, notes);
    },
    checkForm: function(e) {
      if (
        /^[A-Z]\w*\s[A-Z]\w*$/.test(this.comment.author) &&
        this.comment.content
      ) {
        this.createComment();
        return;
      }
      this.errors = [];
      if (!/^[A-Z]\w*\s[A-Z]\w*$/.test(this.comment.author)) {
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

<style lang="scss" scoped>
.component-wrapper {
  @apply w-full;
}

.comment-form {
  @apply w-full flex p-4;

  &__wrapper {
    @apply w-full flex flex-col;
  }

  &__input {
    @apply block w-full px-4 py-1 border-gray-500 appearance-none;

    &:focus {
      @apply outline-none;
    }

    &--author {
      @apply border-l border-t border-b rounded-tl;
    }
    &--content {
      @apply border-l border-b rounded-bl;
    }
  }

  &__button {
    @apply px-4 py-2 flex items-center text-blue-500 border border-blue-500 rounded-r;

    &:hover {
      @apply bg-blue-500 text-white shadow;
    }

    &:focus {
      @apply outline-none;
    }
  }
}
.error {
  @apply text-red-500 text-xs italic;
}

.comments {
  @apply w-full p-4 flex flex-col items-start max-h-50vh;

  &__title {
    @apply mb-4 text-xl font-bold;
  }

  &__list {
    @apply w-full h-full flex flex-col overflow-y-auto max-h-full;
  }
}

.comment {
  @apply mb-4 w-full flex items-center bg-white rounded-lg border;

  & i {
    @apply pl-4;
  }

  &__wrapper {
    @apply p-4 flex flex-col items-start;
  }

  &__author {
    @apply text-blue-500;
  }

  &__content {
    @apply text-justify;
  }
}
</style>
