import React, { Component}  from 'react';
import axios from 'axios';

class Sandwich extends Component{

  constructor(){
    super();
    this.state = {
      sandwich: {} 
    };
  }

  componentDidMount(){
    console.log(this.props)
  }

//   async componentDidMount(){
//       console.log(this.props);
// //     const sandwich = (await axios.get(`/api/sandwiches/${this.props.selectedSandwich}`)).data;
// //    console.log(sandwich);
//   }

// //   async componentDidUpdate(prevProps){
// //     if(prevProps.selectedId !== this.props.selectedId){
// //       const sandwich = (await axios.get(`/api/users/${this.props.selectedSandwich}`)).data;
// //       this.setState({ sandwich });
// //     }
// //   }

render(){
// const { sandwich } = this.state;
    return (
    <hr />

      
    
    );
  }
}

export default Sandwich;