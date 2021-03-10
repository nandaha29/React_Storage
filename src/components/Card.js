import React, { Component } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';

class Card extends Component {
    // state = {  }
    render() { 
        return (  
            <div className="col-lg-6 col-sm-12 p-2">
                <div className="card">
                    <div className="card-body row">
                        
                        <div className="col-5">
                            <img src={this.props.cover} className="img" height="200" />
                        </div>
                        
                        <div className="col-7">
                            <h5 className="text-info">
                                { this.props.judul }
                            </h5>
                            <h6 className="text-dark">
                               Chef: { this.props.koki }
                            </h6>

                            <h6 className="text-danger">
                                Harga: Rp { this.props.harga } 
                            </h6>
                            
                            <button className="btn btn-sm btn-primary m-1" onClick={ this.props.onEdit }>
                                <CreateIcon/>
                            </button>
                            <button className="btn btn-sm btn-danger m-1" onClick={ this.props.onDrop }>
                                <ClearIcon/>
                            </button>
                            {/* SATU */}
                            <button className="btn btn-sm btn-success m-1" onClick={this.props.onCart}>
                                Tambahkan ke keranjang belanja
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Card;