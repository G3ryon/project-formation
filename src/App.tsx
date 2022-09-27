import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApiCaller } from './shared/Services/ApiCaller';
import { category } from './shared/models/category';
import { movie } from './shared/models/movie';

function App() {
  const api = new ApiCaller()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={()=>api.getAllMovies()}>
          TEST get
      </button>
      <button onClick={()=>api.getMovieById("projects/test-da96a/databases/(default)/documents/movies/IvBfgokrYb0rjX4pzrAi")}>
          TEST get by id
      </button>
      <button onClick={()=>api.postCategory(
        {
          "name":  "the hoit",
          "image":  "https://firebasestorage.googleapis.com/v0/b/test-da96a.appspot.com/o/The%20Hobbit%20Collection.png?alt=media"
        }as category
      )}>
          TEST post cat
      </button>
      <button onClick={()=>api.postMovie(
        {
          "directed_by": "George Lucas",
          "duration":179,
          "release_date": new Date("2002-12-04T23:00:00.602Z"),
          "title": "The new hope",
          "category":  "projects/test-da96a/databases/(default)/documents/categories/iQ1cMEaeBZ81J5faiZiW",
          "box_office":  947500000,
          "budget":  94000000,
          "image":  "https://firebasestorage.googleapis.com/v0/b/test-da96a.appspot.com/o/The%20Lord%20of%20the%20Rings-%20The%20Two%20Towers%20(2002).jpeg?alt=media"
        }as movie
      )}>
          TEST post mov
      </button>
      <button onClick={()=>api.delete("projects/test-da96a/databases/(default)/documents/movies/xxxxx")}>
          TEST delete
      </button>
      <button onClick={()=>api.updateCategory("projects/test-da96a/databases/(default)/documents/categories/DbTCy6GVmcg6aW2KNhqt",{
          "name":  "the hommit",
          "image":  "https://firebasestorage.googleapis.com/v0/b/test-da96a.appspot.com/o/The%20Hobbit%20Collection.png?alt=media"
        }as category)}>
          TEST update
      </button>
    </div>
  );
}

export default App;
