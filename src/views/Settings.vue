<template>
  <div
    class="container mx-auto w-1/3 p-6 bg-white flex flex-col shadow rounded items-center justify-center"
  >
    <div class="p-4 flex">
      <div class="form_radio mx-4">
        <!-- v-model="store" -->
        <input
          v-model="storeMethod"
          id="localStorage"
          type="radio"
          name="radio"
          value="localStorage"
          class="cursor-pointer"
          checked
        />
        <label for="localStorage" class="ml-2">Local Storage</label>
      </div>

      <div class="form_radio mx-4">
        <input
          v-model="storeMethod"
          id="firebase"
          type="radio"
          name="radio"
          value="firebase"
          class="cursor-pointer"
        />
        <label for="firebase" class="ml-2">Firebase</label>
      </div>
    </div>
    <button
      type="submit"
      class="px-4 py-2 text-blue-500 border border-blue-500 rounded focus:outline-none hover:bg-blue-500 hover:text-white hover:shadow"
      @click="changeStoreMethod"
    >
      Зберегти
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storeMethod: ""
    };
  },
  methods: {
    async changeStoreMethod() {
      this.$store.state.storeMethod = this.storeMethod;
      await this.$store.dispatch("setNotes");
    }
  },
  created() {
    this.storeMethod = this.$store.state.storeMethod;
  }
};
</script>

<style lang="scss" scoped></style>
