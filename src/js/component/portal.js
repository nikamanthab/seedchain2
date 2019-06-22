import React from 'react';
import {Button, Grid, Form} from 'semantic-ui-react';
import ItemCard from './../component/itemcard';
import Modal from 'react-responsive-modal';


class Portal extends React.Component {

    state = {
        open: false,
        started: false,
        isSeller: true
    }


    //modal handlers
    onOpenModal = () => {
        this.setState({ open: true });
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };

    render() {

        
        let batchbtn = (
            <div></div>
        )
        if (this.props.selectedItems.length > 1) {
            batchbtn = (
                <Button className="primaryF" color="yellow" onClick={this.props.handleBatch}>Batch</Button>
            )
        } else {
            batchbtn = (
                <Button className="primaryF" color="yellow" disabled>Batch</Button>
            )
        }

        //preparing the sell btn
        let sellbtn = (
            <div></div>
        )
        if (this.props.selectedItems.length >= 1) {
            sellbtn = (
                <Button className="primaryF" color="green" onClick={this.props.handleSell}>Sell</Button>
            )
        } else {
            sellbtn = (
                <Button className="primaryF" color="green" disabled>Sell</Button>
            )
        }

        //preparing the unbatch btn
        let unbatchbtn = (
            <div></div>
        )
        if (this.props.selectedItems.length === 1) {
            unbatchbtn = (
                <Button className="primaryF" color="red" onClick={this.props.handleUnbatch}>Unbatch</Button>
            )
        } else {
            unbatchbtn = (
                <Button className="primaryF" color="red" disabled>Unbatch</Button>
            )
        }

        //populate the cards
        let cards = (
            <div></div>
        )
        cards = this
            .props
            .selectedItems
            .map((i) => {
                return (
                    <div
                        // className="item-card"
                        style={{
                        margin: "10px"
                    }}>
                        <ItemCard item={i}/>
                    </div>
                )
            })

        let content = (
            <div></div>
        )
        if (this.state.isSeller) {
            content = (
                <div>
                    <div className="padding">
                        <Grid>
                            <Grid.Row col={3}>
                                <Grid.Column width={5}>{batchbtn}</Grid.Column>
                                <Grid.Column width={5}>{sellbtn}</Grid.Column>
                                <Grid.Column width={5}>{unbatchbtn}</Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    <div className="flex-div">
                        {cards}
                    </div>
                </div>
            )
        } else {
            content = (
                <div>
                    <Button className="primaryF" primary onClick={this.props.handleConfirm}>Confirm</Button>
                    <div className="flex-div overflow-div">
                        {cards}
                    </div>
                </div>
            )
        }

        return (
            <div className="height-max">
                <h3 className="primaryF">Portal</h3>
                {content}

                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <Form>
                        <Form.Field></Form.Field>
                    </Form>
                </Modal>
                
            </div>
        )
    }
}

export default Portal;