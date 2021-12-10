import React, { Component}  from 'react';
import axios from 'axios';
import Sandwich from './Sandwich';
import { company } from 'faker';

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
    this.setState({ selectedSandwich: window.location.hash.slice(1)});
}


addSandwich = async() => {
  const {data} = await axios.post('/add')
  this.setState({
    sandwiches: [...this.state.sandwiches, data]

  })
}


deleteSandwich = async(id) => {
  console.log('eaten')
  await axios.delete(`/delete/${id}`)

  this.setState({
    sandwiches: this.state.sandwiches.filter(sandwich => {
      return sandwich.id !==id
    })
  })

}


render(){ 
    const { sandwiches, selectedSandwich} = this.state;
    return (
        <div>
          <form method="POST" action="/submit-form">
  <input type="text" name="Sandwich"  placeholder="Sandwich Name"/>
  <input type="text" name="Ingredients" placeholder="Ingredients" />
  <button onClick={this.addSandwich} > Build Sandwich</button>



  {/* postHandler = async (e) => {
        e.preventDefault()
        await axios.post('/db/post', {
            total_eligible: this.state.total,
            appNum: this.props._appNum
        })
        this.props.selectYear()
        this.props.selectYear(this.props.year)
    } */}


</form>
        <ul>
  
          
            <li><a href='#'>All</a></li>
           {
               sandwiches.map( sandwich => {
               return (
                 <li  className={ selectedSandwich*1 === sandwich.id ? 'selected': ''} key={ sandwich.id }>
                   <a href={`#${sandwich.id}`}>
                   { sandwich.name }
                   </a>
                   <button onClick={()=> this.deleteSandwich(sandwich.id)}>
                    Eat Sandwich
                   </button>
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