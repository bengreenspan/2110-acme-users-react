import React, { Component}  from 'react';
import axios from 'axios';

class Sandwich extends Component{

  constructor(){
    super();
    this.state = {
      sandwich: {},
      selectedSandwich: {}
    };
  }

  async componentDidMount(){
    const sandwich = (await axios.get(`/api/sandwiches/${this.props.selectedSandwich}`)).data;
 this.setState({ sandwich });

 console.log(this)

  }

  async componentDidUpdate(prevProps){
    if(prevProps.selectedSandwich !== this.props.selectedSandwich){
      const sandwich = (await axios.get(`/api/sandwiches/${this.props.selectedSandwich}`)).data;
      this.setState({ sandwich });
    }
  }

render(){
const { sandwich } = this.state;
    return (
    <div> 
      {
        sandwich.ingredients
      }
    </div>
    );
  }
}

export default Sandwich;