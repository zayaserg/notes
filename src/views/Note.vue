<template>
  <div class="note container">
    <div class="note__name">
      {{ note.name }}
    </div>
    <div class="note__content">{{ note.content }}</div>
    <Comments :note="note" />
  </div>
</template>

<script>
import Comments from "../components/Comments.vue";
export default {
  name: "Note",
  components: { Comments },
  props: ["note"]
};
</script>

<style lang="scss" scoped>
.note {
  @apply mx-auto w-1/3 p-6 bg-white flex flex-col shadow rounded items-center justify-center;

  &__name {
    @apply text-xl font-bold;
  }

  &__content {
    @apply p-4 text-justify;
  }
}
</style>
