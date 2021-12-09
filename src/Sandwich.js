import React, { Component}  from 'react';
import axios from 'axios';

class Sandwich extends Component{

  constructor(){
    super();
    this.state = {
      sandwich: {}
    };
  }


  async componentDidMount(){
    const sandwich = (await axios.get(`/api/sandwiches/${this.props.selectedSandwich}`)).data;
 this.setState({ Sandwich });
  }

// //   async componentDidUpdate(prevProps){
// //     if(prevProps.selectedId !== this.props.selectedId){
// //       const sandwich = (await axios.get(`/api/users/${this.props.selectedSandwich}`)).data;
// //       this.setState({ sandwich });
// //     }
// //   }

render(){
const { sandwich } = this.state;
    return (
    <div> 
      test
{ Sandwich }
    </div>
    );
  }
}

export default Sandwich;