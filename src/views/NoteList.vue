<template>
  <div class="notes container">
    <span v-if="!notes.length">Поки немає заміток</span>
    <div v-else>
      <ul class="notes-list">
        <li v-for="note in notes" :key="note.id" class="notes-item">
          <router-link
            :to="{
              name: 'Note',
              params: { id: note.id, note: note }
            }"
            class="notes-item__link"
          >
            {{ note.name }}
          </router-link>
          <div class="notes-item__button">
            <router-link :to="{ name: 'NoteEdit', params: { id: note.id } }">
              <i class="fas fa-edit notes-item__button-icon"></i>
            </router-link>
            <i
              class="fas fa-times notes-item__button-icon"
              @click="deleteNote(note.id)"
            ></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["storeMethod", "notes"])
  },
  methods: {
    async deleteNote(id) {
      await this.$store.dispatch(`${this.storeMethod}/deleteNote`, id);
    }
  }
};
</script>

<style lang="scss" scoped>
.notes {
  @apply mx-auto;

  &-list {
    @apply w-full flex flex-col items-center justify-center;
  }

  &-item {
    @apply mb-4 w-1/3 flex flex-no-wrap items-center justify-between bg-white rounded-lg border overflow-hidden;

    &__link {
      @apply w-full flex p-4 font-bold;

      &:hover {
        @apply text-blue-500;
      }
    }

    &__button {
      @apply w-32 px-4 py-4 bg-gray-100 border-l;

      &-icon {
        @apply w-8 cursor-pointer;
      }

      &-icon:hover {
        @apply text-blue-500;
      }
    }
  }
}
</style>
