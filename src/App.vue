<template>
  <div id="app" class="bg">
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <a class="navbar-brand" href="#" style="padding-top: 0;">
            <img src="./image/rottentext.png" class="logo" alt="">
          </a>
          <div class="navbar-header navbar-right" >
            <ul class="nav navbar-nav ">
                  <li>
                    <div v-if="ready">
                      <div v-if="auther">
                        <button type="button" @click="logout()">Logout</button>
                      </div>
                      <div v-else>
                        <button type="button" @click="login()"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></button>
                      </div>
                    </div>
                    <div v-else>
                      <p>Loading....</p>
                    </div>
                  </li>
            </ul>
          </div>
        </div>
    </nav>
    <router-view :movies = "movies" :profile = "profile" :logout = "logout"
    :update-add-item = "updateAddItem" :update-sub-item = "updateSubItem" :add-comment = "addComment"></router-view>
    <div class="col-md-12">
      <div class="panel panel-default">
        <div class="panel-heading">MOVIE</div>
          <div class="panel-body bg">
            <div class="col-sm-5 col-md-3">
              <div class="thumbnail">
                <img src="./image/Guardians.jpg" alt="...">
                <div class="caption">
                  <h3>Thumbnail label</h3>
                  <p>...</p>
                <!-- <router-link to="/Test">Test</router-link> -->
                  <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
                </div>
              </div>
            </div>
            <div class="col-sm-5 col-md-3">
              <div class="thumbnail">
                <img src="./image/Guardians.jpg" alt="...">
                <div class="caption">
                  <h3>Thumbnail label</h3>
                  <p>...</p>
                  <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
                </div>
              </div>
            </div>
            <div class="col-sm-5 col-md-3">
              <div class="thumbnail">
                <img src="./image/Guardians.jpg" alt="...">
                <div class="caption">
                  <h3>Thumbnail label</h3>
                  <p>...</p>
                  <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
                </div>
              </div>
            </div>
            <div class="col-sm-5 col-md-3">
              <div class="thumbnail">
                <img src="./image/Guardians.jpg" alt="...">
                <div class="caption">
                  <h3>Thumbnail label</h3>
                  <p>...</p>
                  <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  // Initialize Firebase
  import firebase from 'firebase'
  var firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyB0BoqBlmjwwZGcMl-g5oPVNrT0iNQsorI',
    authDomain: 'rotten-durian.firebaseapp.com',
    databaseURL: 'https://rotten-durian.firebaseio.com',
    projectId: 'rotten-durian',
    storageBucket: 'rotten-durian.appspot.com',
    messagingSenderId: '431169168698'
  })
  var db = firebaseApp.database()
  var provider = new firebase.auth.FacebookAuthProvider()

  // let moviesRef = db.ref('movies')
export default {
    name: 'app',
    data () {
      return {
        todos: [],
        ready: false,
        auther: false,
        like: 0,
        dislike: 0,
        movies: []
      }
    },
    methods: {
      login () {
        firebase.auth().signInWithRedirect(provider)
      },
      logout () {
        let vm = this
        firebase.auth().signOut().then(function () {
          vm.auther = false
        }, function (error) {
          console.error(error)
        })
      },
      updateAddItem: function (movie) {
        this.$firebaseRefs.movies.child(movie['.key']).update({
          like: movie.like += 1,
          vote: movie.vote += 1
        })
      },
      updateSubItem: function (movie) {
        this.$firebaseRefs.movies.child(movie['.key']).update({
          dislike: movie.dislike += 1,
          vote: movie.vote += 1
        })
      },
      addComment (movie, message) {
        this.$firebaseRefs.movies.child(movie['.key'] + '/comments').push({
          message: message,
          id: this.profile.uid,
          name: this.profile.displayName,
          photo: this.profile.photoURL
        })
      }
    },
    mounted () {
      this.$router.push('/')
      let vm = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          vm.auther = true
          vm.profile = user
          console.log(vm.profile)
          vm.$bindAsArray('movies', db.ref('movies/'))
        }
        vm.ready = true
      })
      firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {}
      }).catch((error) => {
        console.error(error)
      })
    }

  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
body {
  background-color:rgba(153, 255, 153, 0.5);
  background-image: url("image/rotten.png");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
}
.bg{
  /*opacity: 0.4;*/
}
.logo{
  /*width: 10vw;*/
  height: 4vw;
}
</style>
