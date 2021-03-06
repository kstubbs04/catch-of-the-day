import React from 'react';

class AddFishForm extends React.Component {

	createFish(event){

		event.preventDefault();

		const fish = {
			name: this.name.value,
			price: this.price.value,
			status: this.status.value,
			desc: this.desc.value,
			image: this.image.value
		}

		console.log(fish);
		this.props.addFish(fish); 
		this.fishForm.reset();
	}

    render() {
        return (
			<form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={(event) => this.createFish(event)} >
				<input ref={(input) => this.name = input} type="text" placeholder="Fish Name" />
				<input ref={(input) => this.price = input} type="text" placeholder="Fish Price" />
				<select ref={(input) => this.status = input}>
					<option value="available">Fresh !</option>
					<option value="unavailabe">Sold Out !</option>
				</select>
				<textarea ref={(input) => this.desc = input} type="text" placeholder="Fish Desc" />
				<input ref={(input) => this.image = input} type="text" placeholder="Fish Image" />
				<button type="submit">+ Add Item</button>
			</form>
        )
    }
}

const Types = React.PropTypes;

AddFishForm.propTypes = {
	addFish : Types.func.isRequired
}
 
export default AddFishForm;