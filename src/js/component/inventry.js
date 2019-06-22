import React from 'react';
import {Input} from 'semantic-ui-react';
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
        console.log(this.state.search);

        if(this.state.search === ""){
            filteredItems = this.props.allItems;
            console.log(this.props.allItems);
        }
        else{
            this.props.allItems.forEach((ele)=>{
                if(ele.name.includes(this.state.search)){
                    filteredItems.push(ele);
                }
            })
        }

        console.log("filtered:",filteredItems);

        let cards = filteredItems.map((i)=>{
            return(
            <div className="item-card" style={{margin:"10px"}}>
                <ItemCard item={i}/>
            </div>
            )
        })
        
        return (
            <div class="height-max">
                <h3>Inventry</h3>
                <Input onChange={this.handleSearchChange} value={this.state.search} placeholder='Search...' />
                <div className="flex-div">
                    {cards}
                </div>
            </div>

        )
    }
}

export default Inventry;