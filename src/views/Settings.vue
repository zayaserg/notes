<template>
  <div class="settings container">
    <div class="settings-wrapper">
      <div class="form-radio">
        <input
          v-model="method"
          id="local"
          type="radio"
          name="radio"
          value="local"
          class="settings__input"
          checked
        />
        <label for="local" class="ml-2">Local Storage</label>
      </div>

      <div class="form_radio mx-4">
        <input
          v-model="method"
          id="firebase"
          type="radio"
          name="radio"
          value="firebase"
          class="settings__input"
        />
        <label for="firebase" class="ml-2">Firebase</label>
      </div>
    </div>
    <button type="submit" class="settings__button" @click="changeStoreMethod">
      Зберегти
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      method: ""
    };
  },
  computed: {
    ...mapGetters(["storeMethod"])
  },
  methods: {
    async changeStoreMethod() {
      await this.$store.dispatch("changeStoreMethod", this.method);
      await this.$store.dispatch(`${this.storeMethod}/setNotes`);
    }
  },
  created() {
    this.method = this.storeMethod;
  }
};
</script>

<style lang="scss" scoped>
.settings {
  @apply mx-auto w-1/3 p-6 bg-white flex flex-col shadow rounded items-center justify-center;

  &-wrapper {
    @apply p-4 flex;
  }

  &__input {
    @apply cursor-pointer;
  }

  &__button {
    @apply px-4 py-2 text-blue-500 border border-blue-500 rounded;

    &:hover {
      @apply bg-blue-500 text-white shadow;
    }

    &:focus {
      @apply outline-none;
    }
  }
}
.form-radio {
  @apply mx-4;
}
</style>
