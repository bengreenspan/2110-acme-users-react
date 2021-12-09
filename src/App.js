import React, { Component}  from 'react';
import axios from 'axios';
import Sandwich from './Sandwich';

class App extends Component{
  constructor(){
    super();
    this.state = {
      sandwiches: [],
      selectedSandwich: ''
    };
  }
async componentDidMount(){
const sandwiches = (await axios.get('/api/sandwiches')).data;
    this.setState({ sandwiches });
    window.addEventListener('hashchange', ()=> {
      this.setState({ selectedSandwich: window.location.hash.slice(1)});
    });
    this.setState({ selectedSandwich: window.location.hash.slice(1) });
}

render(){ 
    const { sandwiches, selectedSandwich} = this.state;
    return (
        <div>
        <ul>
            <li><a href='#'>All</a></li>
           {
               sandwiches.map( sandwich => {
               return (
                 <li  className={ selectedSandwich*1 === sandwich.id ? 'selected': ''} key={ sandwich.id }>
                   <a href={`#${sandwich.id}`}>
                   { sandwich.name }
                   </a>
                </li>
              );
            })
          }
        </ul>
         <div>
    
         {
           !!selectedSandwich && <Sandwich selectedSandwich={ this.state.selectedSandwich }/>
         }
    
        </div>
        </div>
  
      
    );
  }
}

export default App; 