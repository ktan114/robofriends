import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './App.css';
// import { robots } from './robots';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

import { setSearchField } from '../actions';

const mapStateToProps = (state) => {
  return {
    searchField: state.searchField,
  };
};

// Send actions to the reducer
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
  };
};

// const AppHooks = () => {
//   const [robots, setRobots] = useState([]);
//   const [searchField, setSearchField] = useState('');
//   const [count, setCount] = useState(0);

//   const onSearchChange = (event) => {
//     setSearchField(event.target.value);
//   };

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => setRobots(users));
//   }, []);

//   const filteredRobots = robots.filter((robot) =>
//     robot.name.toLowerCase().includes(searchField.toLowerCase()),
//   );
//   return !robots.length ? (
//     <h1>Loading...</h1>
//   ) : (
//     <div className="tc">
//       <h1 className="f1">RoboFriends</h1>
//       <button onClick={() => setCount(count + 1)}>Click Me: {count}</button>
//       <SearchBox searchField={searchField} searchChange={onSearchChange} />
//       <Scroll>
//         <ErrorBoundary>
//           <CardList robots={filteredRobots} />
//         </ErrorBoundary>
//       </Scroll>
//     </div>
//   );
// };

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }
  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredRobots = robots.filter((robot) =>
      robot.name.toLowerCase().includes(searchField.toLowerCase()),
    );
    return !robots.length ? (
      <h1>Loading...</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchField={searchField} searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}

// Subscribe to any state changes in the Redux store
// connect(stateProps, dispatchToProps)
// stateProps - which part of state this component cares about
// dispatchToProps - maps the actions to this component
export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect(mapStateToProps, mapDispatchToProps)(AppHooks);
