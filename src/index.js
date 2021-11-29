import React, { Component}  from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class User extends Component {
  constructor(){
    super();
    this.state = {
      user: {}
    };
  }
  async componentDidUpdate(prevProps){
    if(prevProps.selectedId !== this.props.selectedId){
      const user = (await axios.get(`/api/users/${this.props.selectedId}`)).data;
      this.setState({ user });
    }
  }
  async componentDidMount(){
    const user = (await axios.get(`/api/users/${this.props.selectedId}`)).data;
    this.setState({ user });
  }
  render(){
    const { user } = this.state;
    return (
      <div>
        { user.bio }
      </div>
    );
  }
}

class App extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      selectedId: ''
    };
  }
  async componentDidMount(){
    const users = (await axios.get('/api/users')).data;
    this.setState({ users });
    window.addEventListener('hashchange', ()=> {
      this.setState({ selectedId: window.location.hash.slice(1) });
    });
    this.setState({ selectedId: window.location.hash.slice(1) });
  }
  render(){
    const { users, selectedId } = this.state;
    return (
      <div>
        <h1>Acme Users</h1>
        <ul>
          <li><a href='#'>All</a></li>
          {
            users.map( user => {
              return (
                <li key={ user.id }>
                  <a href={`#${user.id}`}>
                  { user.name }
                  </a>
                </li>
              );
            })
          }
        </ul>
        {
          !!selectedId && <User selectedId={ selectedId }/>
        }
      </div>
    );
  }
}

render(<App />, document.querySelector('#root'));
