import logo from './logo.svg';
import './App.css';
import React, {useEffect} from 'react'
import axios from 'axios';
import cheerio from "cheerio";

function App() {

  const [names, setNames] = React.useState([]);

  useEffect( () => {
    axios.get(`https://pokedex.org/`)
    .then(function (response) {
      console.log(response.data)
      let namers = [];
      let $ = cheerio.load(response.data)
      $("li span").each(function(i,element){
        let name = $(element)
        .prepend()
        .text();
        namers.push(name);
      })
      console.log(namers)
      setNames(namers);
    })
    .catch(function (error) {
        console.log(error)
    })
},[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>hello</div>
        <div>
          <ul>
          {names.length ? names.map((name, i) => {
            return <li key={i}>{name}</li>;
          }) : null}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
