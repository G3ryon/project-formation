import { category } from "../models/category";
import { movie } from "../models/movie";

export class ApiCaller {

    async getData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
          },
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    async postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "text/plain"
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    async deleteData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          redirect: 'follow', // manual, *follow, error
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    async setData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    getAllMovies(){
        this.getData("https://firestore.googleapis.com/v1/projects/test-da96a/databases/(default)/documents/movies")
        .then((data) =>{
            const movies = []
            for (const key in data.documents) {
              if (Object.prototype.hasOwnProperty.call(data.documents, key)) {
                const element = data.documents[key];
                movies.push({
                  id: element.name,
                  box_office: element.fields.box_office.integerValue ,
                  budget: element.fields.budget.integerValue ,
                  category: element.fields.category.referenceValue ,
                  directed_by: element.fields.directed_by.stringValue ,
                  duration: element.fields.duration.integerValue ,
                  image: element.fields.image.stringValue ,
                  release_date: element.fields.release_date.timestampValue ,
                  title: element.fields.title.stringValue ,
                }as movie)
              }
            }
            console.log(movies)
            return movies
        })   
    }

    getAllCategories(){
          this.getData("https://firestore.googleapis.com/v1/projects/test-da96a/databases/(default)/documents/categories")
          .then((data) =>{
            const categories = []
            for (const key in data.documents) {
              if (Object.prototype.hasOwnProperty.call(data.documents, key)) {
                const element = data.documents[key];
                categories.push({
                  id: element.name,
                  name: element.fields.name.stringValue,
                  image: element.fields.image.stringValue 
                }as category)
              }
            }
            console.log(categories)
            return categories
          })
        }

    getMovieById(id:string){
      this.getData("https://firestore.googleapis.com/v1/"+id)//"projects/test-da96a/databases/(default)/documents/movies/IvBfgokrYb0rjX4pzrAi"
      .then((data) =>{
          var movie : movie
              const element = data;
              movie ={
                id: element.name,
                box_office: element.fields.box_office.integerValue ,
                budget: element.fields.budget.integerValue ,
                category: element.fields.category.referenceValue ,
                directed_by: element.fields.directed_by.stringValue ,
                duration: element.fields.duration.integerValue ,
                image: element.fields.image.stringValue ,
                release_date: element.fields.release_date.timestampValue ,
                title: element.fields.title.stringValue ,
              }
          console.log(movie)
          return movie
      })  

    }

    getCategoryById(id:string){
      this.getData("https://firestore.googleapis.com/v1/"+id)//"projects/test-da96a/databases/(default)/documents/movies/IvBfgokrYb0rjX4pzrAi"
      .then((data) =>{
          var category : category
              const element = data;
              category ={
                id: element.name,
                name: element.fields.name.stringValue,
                image: element.fields.image.stringValue 
              }
          console.log(category)
          return category
      })  
    }

    postMovie(data:movie){
      var dataFormat = {
        fields: {
          "directed_by": {
            "stringValue": data.directed_by
          },
          "duration": {
            "integerValue": data.duration
          },
          "release_date": {
            "timestampValue": data.release_date
          },
          "title": {
            "stringValue": data.title
          },
          "category": {
            "referenceValue": data.category
          },
          "box_office": {
            "integerValue": data.box_office
          },
          "budget": {
            "integerValue": data.budget
          },
          "image": {
            "stringValue": data.image
          }
      }}
      this.postData("https://firestore.googleapis.com/v1/projects/test-da96a/databases/(default)/documents/movies",dataFormat)//"projects/test-da96a/databases/(default)/documents/movies/IvBfgokrYb0rjX4pzrAi"
      .then((data) =>{
          console.log(data)
          return data
      }) 
    }

    postCategory(data:category){
      var dataFormat = {
        fields: {
            name: {
              stringValue: data.name
            },
            image: {
              stringValue: data.image
            }
      }}
      this.postData("https://firestore.googleapis.com/v1/projects/test-da96a/databases/(default)/documents/categories",dataFormat)//"projects/test-da96a/databases/(default)/documents/movies/IvBfgokrYb0rjX4pzrAi"
      .then((data) =>{
          console.log(data)
          return data
      }) 
    }

    updateMovie(id:string, data:movie){
      var dataFormat = {
        fields: {
          "directed_by": {
            "stringValue": data.directed_by
          },
          "duration": {
            "integerValue": data.duration
          },
          "release_date": {
            "timestampValue": data.release_date
          },
          "title": {
            "stringValue": data.title
          },
          "category": {
            "referenceValue": data.category
          },
          "box_office": {
            "integerValue": data.box_office
          },
          "budget": {
            "integerValue": data.budget
          },
          "image": {
            "stringValue": data.image
          }
      }}
      this.setData("https://firestore.googleapis.com/v1/" + id, dataFormat)
      .then((data) =>{
          console.log(data)
          return data
      }) 
    }

    updateCategory(id:string, data:category){
      var dataFormat = {
        fields: {
            name: {
              stringValue: data.name
            },
            image: {
              stringValue: data.image
            }
      }}
      this.setData("https://firestore.googleapis.com/v1/" + id, dataFormat)//"projects/test-da96a/databases/(default)/documents/movies/IvBfgokrYb0rjX4pzrAi"
      .then((data) =>{
          console.log(data)
          return data
      }) 
    }

    delete(id:string){
      this.deleteData("https://firestore.googleapis.com/v1/" + id)
      return "Done"
    }


}