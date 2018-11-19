import React, { Component } from 'react';
import _ from 'lodash';

import BeerContainer from './BeerContainer'

import styles from './styling/app.module.css'

class App extends Component {
  //where is the best place to make an API call in a Reac† application
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      beers: [],
      indexOfSelected: null
    };
  }

  componentDidMount() {
    let query1 = 'beer+beaus';
    let query2 = 'is_seasonal';
    let query3 =  'is_discontinued';
    let query4 = 'is_dead';

	let url = 'https://lcboapi.com/products?per_page=100&q=' 
    + query1 
    + '&where=' + query2 
    + '&where_not=' + query3
    + '&where_not=' + query4;

	let access_key = 'MDozY2YyMTQwNC1jNGExLTExZTctODNhMi0xZjVkYjdiNThhNmI6NjB4dnpWNE5qSHNBd0tmQVM4V202ZUJ3QmhleW9aTkExWFBN';

    fetch(url, {
      headers: { 'Authorization': 'Token ' + access_key } })
      .then(res => res.json())
      .then(
        (result) => {
		  const beers = result.result
          this.setState({
            isLoaded: true,
            beers: beers
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  getDataFromChild = (index) => {
    this.setState({
      indexOfSelected: index
    })
  }

  showBeerText = (index) => {
    if (index === this.state.indexOfSelected){
      return true;
    }
  }

renderBeers = () => {
  const { beers } = this.state; 

	const beerContainer = beers.map((beer) => 
		<BeerContainer 
      key={beer.id} 
      index={beer.id}
			src={beer.image_thumb_url} 
			alt={beer.name}
			name={beer.name}
			style={beer.style}
			tertiary_category={beer.tertiary_category}
			tasting_note={beer.tasting_note}
      alcohol_content={beer.alcohol_content}
      passDataToParent={this.getDataFromChild}
      showBeerText={this.showBeerText(beer.id)}
			/>	
  )

	return beerContainer;
  }

  render() {
    return (
      <div className={styles.mainContainer}>
         {this.renderBeers() }
      </div>
    );
  }
}

export default App;
