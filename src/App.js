import './App.css';
import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {

  // 1. initialize the value first 
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  // 2. this will run after initializing any state
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(
        () => {
          return { monsters: users }
        }
      ))
  }
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  }
  // 3. call the render to re-render the user interface...
  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filterMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">

        <h1 className='appTitle'> Monsters Rolodex </h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder='Search here...'
          className='monsters-search-box'
        />
        <CardList monsters={filterMonsters} />
      </div>
    );
  }
}

export default App;
