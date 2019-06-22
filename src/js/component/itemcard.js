import React from 'react';
import ImgBox from './../../images/1280px-Simple_cardboard_box.svg.png';
import ImgPak from './../../images/snacks-packet-1557133-1319666.png';
import Modal from 'react-responsive-modal';

class ItemCard extends React.Component {
    state = {
        open: false
    };

    handleDate = (date) => {
        var d = new Date(date);
        return d.toLocaleTimeString();
    }

    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    onRender = () => {
        if (this.props.item.isPacket) {
            return ImgPak
        }
        return ImgBox
    }

    render() {
        const {open} = this.state;

        return (
            <div
                className="ui card"
                style={{
                textAlign: 'center'
            }}>
                <div className="header">
                    <strong>{this.props.item.itemid}</strong>
                </div>
                <div className="description">
                    <strong>{this.props.item.name}</strong>
                </div>
                <div
                    className="content extra"
                    style={{
                    textAlign: 'center'
                }}>
                    <img
                        style={{
                        width: '50px',
                        height: '50px'
                    }}
                        src={this.onRender()}
                        alt="BOX"></img>
                </div>
                <div className="content extra">
                    <button onClick={this.onOpenModal} className="ui fluid button black">
                        <strong>EXPLORE</strong>
                    </button>
                    
                    
                    <Modal open={open} onClose={this.onCloseModal} center>
                        <div
                            className="ui card"
                            style={{
                            margin: "10px",
                            padding: "10px"
                        }}>
                            <div className="header">
                                Item ID :
                                <strong>{this.props.item.itemid}</strong>
                            </div>
                            <div className="description">
                                Name :
                                <strong>{this.props.item.name}</strong>
                            </div>
                            <div
                                className="content extra"
                                style={{
                                textAlign: 'center'
                            }}>
                                <img
                                    style={{
                                    width: '50px',
                                    height: '50px'
                                }}
                                    src={this.onRender()}
                                    alt="BOX"></img>
                            </div>
                            <div className="description">
                                <span>
                                    <b>Manufacturing Date :
                                    </b>
                                </span>{this.handleDate(this.props.item.mfd)}
                            </div>
                            <div className="description">
                                <span>
                                    <b>Expiry Date :
                                    </b>
                                </span>{this.handleDate(this.props.item.mfd)}
                            </div>
                            <div className="description">
                                <b>
                                    Weight :
                                </b>{this.props.item.weight}
                            </div>
                            <div className="description">
                                <b>
                                    Price :</b>
                                {this.props.item.price}
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default ItemCard;