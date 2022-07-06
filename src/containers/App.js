import React, { useState, useEffect } from 'react';

import './App.css';
// import { robots } from './robots';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

const AppHooks = () => {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [count, setCount] = useState(0);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);

  const filteredRobots = robots.filter((robot) =>
    robot.name.toLowerCase().includes(searchField.toLowerCase()),
  );
  return !robots.length ? (
    <h1>Loading...</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <button onClick={() => setCount(count + 1)}>Click Me: {count}</button>
      <SearchBox searchField={searchField} searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
};

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       robots: [],
//       searchField: '',
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => this.setState({ robots: users }));
//   }

//   onSearchChange = (event) => {
//     this.setState({ searchField: event.target.value });
//   };

//   render() {
//     const { robots, searchField } = this.state;
//     const filteredRobots = robots.filter((robot) =>
//       robot.name.toLowerCase().includes(searchField.toLowerCase()),
//     );
//     return !robots.length ? (
//       <h1>Loading...</h1>
//     ) : (
//       <div className="tc">
//         <h1 className="f1">RoboFriends</h1>
//         <SearchBox
//           searchField={searchField}
//           searchChange={this.onSearchChange}
//         />
//         <Scroll>
//           <ErrorBoundary>
//             <CardList robots={filteredRobots} />
//           </ErrorBoundary>
//         </Scroll>
//       </div>
//     );
//   }
// }

export default AppHooks;
