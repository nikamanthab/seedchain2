import React from 'react';

class Govhome extends React.Component {
    state = {}
    render = () => {

        let form = (
            <form class="ui form">
                    <div class="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name of Product"></input>
                    </div>
                    <div class="field">
                        <label>Weight</label>
                        <input type="text" name="weight" placeholder="Weight"></input>
                    </div>
                    <div class="field">
                        <label>Price</label>
                        <input type="text" name="Price" placeholder="Price"></input>
                    </div>
                    <div className="field">
                        <label>Manufacturing Date</label>
                        <input type="text" name="mdf" placeholder="Date of Manufacture"></input>
                    </div>
                    <div class="field">
                        <label>Expiry Date</label>
                        <input type="text" name="exp" placeholder="Date of Expiry"></input>
                    </div>
                    <button class="ui button" type="submit"><b>ADD</b></button>
                </form>
        );

        return (
            <div className="ui container">
                {form}
            </div>
        );
    }
}