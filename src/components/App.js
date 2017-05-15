import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../Base';


class App extends React.Component {

	constructor(){
		super();
		this.state = {
			fishes: {},
			order: {}
		};
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.updateFish = this.updateFish.bind(this);
	}

	componentWillMount(){
		const db = `${this.props.params.storeId}/fishes`;
		this.ref = base.syncState(db,
		{
			context: this,
			state: 'fishes'
		});

		const localStorageKey = `order-${this.props.params.storeId}`;
		const keyIsPresent = localStorage.getItem(localStorageKey);

		if(keyIsPresent){
			this.setState({
				order: JSON.parse(keyIsPresent)
			});
		}
	}

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState){
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
	}

	loadSamples(){
		this.setState({
			fishes: sampleFishes
		});
	}

	addFish(fish){
		//copy current states
		const fishes = {...this.state.fishes};

		//add new fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;

		//set state
		this.setState({fishes: fishes});
	}

	updateFish(key, updatedFish){

		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({
			fishes:fishes
		});
	}

	addToOrder(key){
		const order = {...this.state.order};

		order[key] = order[key] + 1 || 1;

		this.setState({order: order});
	}

	render(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafod Market"/>
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes)
							.map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} params={this.props.params}/>
				<Inventory updateFish={this.updateFish} addFish={this.addFish} loadSamples={this.loadSamples} addToOrder={this.addToOrder} fishes={this.state.fishes} />
			</div>
		)
	}
}

export default App;