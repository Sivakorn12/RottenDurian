<template>
  <div class="listmovie">
    <h2>{{ profile.displayName }}</h2>
    <div class="" v-for="movie in movies">
      <router-link :to="'/movie/' + movie['.key']">{{movie.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listmovie',
  props: ['movies', 'profile', 'logout', 'updateAddItem', 'updateSubItem'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
h3, h4 {
  font-weight: lighter;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #0a8c51;
}
</style>
