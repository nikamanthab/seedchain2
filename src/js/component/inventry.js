import React from 'react';
import {Input, Button} from 'semantic-ui-react';
import ItemCard from './itemcard';

class Inventry extends React.Component {

    state={
        search:""
    }

    handleSearchChange = (event)=>{
        this.setState({
            search:event.target.value
        })
    }

    render() {


        let filteredItems = [];

        if(this.state.search === ""){
            filteredItems = this.props.allItems;
        }
        else{
            this.props.allItems.forEach((ele)=>{
                if(ele.name.includes(this.state.search)){
                    filteredItems.push(ele);
                }
            })
        }

        //setting up the create asset btn
        let createbtn = (<div></div>)
        if(localStorage.getItem("seeduser") === "gov@gov.com"){
            createbtn = (
                <Button color="green" onClick={this.props.onOpenModal}>Create Asset</Button>
            )
        }


        let cards = filteredItems.map((i)=>{
            return(
            <div  style={{margin:"10px"}}>
                <ItemCard item={i}/>
            </div>
            )
        })
        
        return (
            <div class="height-max">
                <h3>Inventry</h3>
                {createbtn}
                <Input onChange={this.handleSearchChange} value={this.state.search} placeholder='Search...' />
                <div className="flex-div overflow-div">
                    {cards}
                </div>
            </div>

        )
    }
}

export default Inventry;