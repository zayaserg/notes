<template>
  <div id="app" class="bg-teal-200 h-screen">
    <div
      v-if="isLoading"
      class="w-screen h-screen flex flex-col items-center justify-center bg-gray-300"
    >
      <h1 class="text-6xl">NOTES</h1>
      <i class="fas fa-sync fa-spin fa-3x ml-4" />
    </div>
    <div v-else>
      <div id="nav">
        <router-link to="/">Замітки</router-link> |
        <router-link to="/create">Створити</router-link> |
        <router-link to="/settings">Налаштування</router-link> |
        {{ storeMethod }}
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    storeMethod() {
      return this.$store.getters.storeMethod;
    }
  },
  async created() {
    this.$router.push("/");
    const processes = ["firebase/getNotes"];
    await Promise.all(
      processes.map(async process => {
        await this.$store.dispatch(process);
      })
    );
    this.isLoading = false;
  }
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  background-color: #fff;
  width: 16px;
}

::-webkit-scrollbar-track {
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 16px;
  border: 5px solid #fff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #4299e1;
      // color: #42b983;
    }
  }
}
</style>
