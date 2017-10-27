<template>
  <div class="col-md-12">
  <div class="panel panel-default ">
  <div class="panel-body bg">
  <div class="col-md-6">
    <img :src="movie.image" alt="" class="poster">
  </div>
  <div class="col-md-6" align="left">
    <h1>{{movie.title}}</h1><br>
    {{movie.info}}<br>
    <div class="col-md-10">
      <div class="progress">
      <div class="progress-bar progress-bar-success" :style="{width: (movie.like/movie.vote)*100 + '%'}">
      </div>
      <div class="progress-bar progress-bar-danger" :style="{width: 100 -((movie.like/movie.vote)*100)+ '%'}">
      </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10">
        <div class="rating" align="center">
          <button type="button" v-on:click="updateAddItem(movie)">add</button>
          <button type="button" v-on:click="updateSubItem(movie)">sub</button>
        </div>
        <p>{{ movie.vote }}</p>
        {{movie.like}}<br>
        {{movie.dislike}}
      </div>
    </div>
  </div>
  </div>
    <input type="text" v-model="message">
    <button type="button" @click="addComment(movie, message)">Comment</button>

    <div class="">
      <p>Review for {{movie.title}}</p>
    </div>


</div>
</div>

</div>
</template>

<script>
export default {
  props: ['id', 'movies', 'updateAddItem', 'updateSubItem', 'addComment'],
  data () {
    return {
      message: ''
    }
  },
  methods: {
  },
  computed: {
    movie () {
      return this.movies.find(movie => movie['.key'] === this.id)
    }
  }
}
</script>

<style lang="css">
.poster{
width: 280px;
height:442px;
}
.cont{
/*float: left;*/
margin-left: 40px;
}
</style>
