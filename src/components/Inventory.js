import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../Base';

class Inventory extends React.Component {

	constructor(){
		super();
		this.handleChange = this.handleChange.bind(this);
		this.renderInventory = this.renderInventory.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);

		this.state = {
			uid: null, 
			owner: null
		}
	}

	handleChange(e, key){
		const fish = this.props.fishes[key];
		const updatedFish = {...fish, [e.target.name]:e.target.value}
		this.props.updateFish(key, updatedFish);
	}

	authenticate(provider){
		console.log(`trying to authenticate with ${provider}`)
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	authHandler(err, authData){
		console.log(authData);
	}

	renderLogin(){
		return(
			<nav className="login">
		        <h2>Inventory</h2>
		        <p>Sign in to manage your store's inventory</p>
		        <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
		        <button className="facebook" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
		        <button className="twitter" onClick={() => this.authenticate('twitter')} >Log In with Twitter</button>
		    </nav>
      	)
	}

	renderInventory(key){

		const fish = this.props.fishes[key]; 

		return (
			<div className="fish-edit" key={key}>
				<input type="text" name="name" placeholder="Fish Name" value={fish.name} onChange={(e) => this.handleChange(e, key)}/>
				<input type="text" name="price" placeholder="Fish Price" value={fish.price} onChange={(e) => this.handleChange(e, key)}/>
				
				<select type="text" name="status" placeholder="Fish Status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
					<option value="available">Fresh !</option>
					<option value="unavailable">Sold Out !</option>
				</select>
				<textarea type="text" name="desc" placeholder="Fish Desc" value={fish.desc} onChange={(e) => this.handleChange(e, key)}>

				</textarea>

				<input type="text" name="image" placeholder="Fish Image" value={fish.image} onChange={(e) => this.handleChange(e, key)}/>
				<button onClick={() => this.props.removeFish(key)}> Remove Fish </button>
			</div>
		)
	}

	render (){

		const logout = <button>Log Out !</button>;

		//Verify not login
		if(!this.state.uid){
			return <div>{this.renderLogin()}</div>
		}

		if(this.state.uid !== this.state.owner){
			return (
				<div>
					<p>Sorry you aren't the owner of this store!</p>
				</div>
				)
		}

		return (
			<div>
				<p>Inventory</p>
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm addFish={this.props.addFish} addToOrder={this.props.addToOrder}/>
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
}

const Types = React.PropTypes;

Inventory.propTypes = {
	fishes: Types.object.isRequired,
	addFish: Types.func.isRequired,
	addToOrder: Types.func.isRequired,
	loadSamples: Types.func.isRequired,
	removeFish: Types.func.isRequired,
	updateFish: Types.func.isRequired
}

export default Inventory;