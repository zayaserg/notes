<template>
  <div class="container mx-auto">
    <span v-if="!notes.length">Поки немає заміток</span>
    <div v-else class="">
      <ul class="w-full flex flex-col items-center justify-center">
        <li
          v-for="note in notes"
          :key="note.id"
          class="mb-4 w-1/3 flex flex-no-wrap items-center justify-between bg-white rounded-lg border overflow-hidden"
        >
          <router-link
            :to="{
              name: 'Note',
              params: { id: note.id, note: note }
            }"
            class="w-full flex p-4 font-bold hover:text-blue-500"
          >
            {{ note.name }}
          </router-link>
          <div class="w-32 px-8 py-4 bg-gray-100 border-l">
            <router-link :to="{ name: 'NoteEdit', params: { id: note.id } }">
              <i class="fas fa-edit cursor-pointer hover:text-blue-500"></i>
            </router-link>
            <i
              class="ml-4 fas fa-times cursor-pointer hover:text-blue-500"
              @click="deleteNote(note.id)"
            ></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notes: []
    };
  },
  watch: {
    "$store.state.notes": function(newVal) {
      console.log("NEW_VAL", newVal);
      this.notes = newVal;
    }
  },
  methods: {
    async deleteNote(id) {
      await this.$store.dispatch("deleteNote", id);
    }
  },
  async created() {
    this.notes = this.$store.state.notes;
  }
};
</script>

<style lang="sass" scoped></style>
