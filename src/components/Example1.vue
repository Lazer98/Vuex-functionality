<template>
  <div id="app">
  <p>{{ counter }}</p>
  <p>{{ fullName }}</p>
  <p>{{ fullName }}</p>
  
  <button v-on:click="counter++">Increase Counter</button>
  <button v-on:click="changeName">Change Name</button>
  <button v-on:click="changeNameSetter">Change Name (setter)</button>
  <ol>
    <li v-for="movie in formattedMovies">{{ movie }}</li>
  </ol>

  <button v-on:click="addMovie">Add Movie</button>

  <p>{{ filterMessage | filter1 | removeSpaces}}</p>

 
</div>
</template>

<script>
export default {
  name: 'Example1',
  data () {
    return {
      filterMessage:'this is a filter prop',
      counter: 1,
      firstName: 'Bo',
      lastName: 'Andersen',
      movies: [
        { name: 'The Matrix', year: 1999 },
        { name: 'The Matrix Reloaded', year: 2003 },
        { name: 'The Matrix Revolutions', year: 2003 }
    ]
  }
},
  methods: {
  	changeName: function() {
    	this.firstName = 'Mark';
      this.lastName = 'Gonzales';
    },
    changeNameSetter: function() {
    	this.fullName = 'Mark Gonzales';
    },
    addMovie: function() {
    	this.movies.push({
      	name: 'The Fast and the Furious',
        year: 2001
      });
    }
  },
  filters:{
    filter1: function(value) {
    	if (!value) {
      	return '';
      }
      
      var parts = value.toString().split(' ');
      
      var uppercasedWords = parts.map(function(word) {
      	return word.charAt(0).toUpperCase() + word.slice(1);
      });

      return uppercasedWords.join(' ');
    },
    removeSpaces: function(value) {
    	if (!value) {
      	return '';
      }
      
      return value.toString().replace(/ /g, '');
    }
  },
  computed: {
    formattedMovies: function(){
      return this.movies.map(function (movie){
        return movie.name + " , " + movie.year;
      })
    },
  	fullName: {
    	get: function() {
      	alert("Assembling full name...");
    		return this.firstName + ' ' + this.lastName;
      },
      set: function(newValue) {
      	alert("Setting new name: " + newValue);
        var parts = newValue.split(' ');
	      this.firstName = parts[0];
  	    this.lastName = parts[parts.length - 1];
      }
    }
  },
  watch: {
    movies : function(movies){
      var newMovie = movies[movies.length-1];
      alert(newMovie.name + " from " + newMovie.year + " was just added!");
    }
  }
}
</script>

