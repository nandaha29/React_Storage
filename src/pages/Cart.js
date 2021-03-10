import React, {Component} from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PageHeader from "../components/PageHeader";
import Table from 'react-bootstrap/Table';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
import { Button } from '@material-ui/core';
import $ from 'jquery';

export default class Cart extends Component{
    constructor(){
        super()
        this.state = {
            cart: [],
            total: 0,
        }
    }

    initCart = () => {
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        this.setState({
            cart: tempCart,
        })
    }

    totalHarga = () => {

        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.harga * item.jumlahBeli)
        
        })
    
        //masukkan ke dalam state
        this.setState({total: totalHarga})
    }
    
    
    Drop = selectedItem => {
        //konfirmasi
        if(window.confirm(`Apakah anda yakin menghapus ${selectedItem.nama} dari cart?`)){
            //ambil data
            let tempCart = []
            if(localStorage.getItem("cart") !== null){
                tempCart = JSON.parse(localStorage.getItem("cart"))
            }
            //posisi index data akan hapus
            let index = tempCart.findIndex(it => it.id_prod === selectedItem.id_prod)
            tempCart.splice(index, 1)

            // update localStorage
            localStorage.setItem("cart", JSON.stringify(tempCart))

            // refersh cart
            this.initCart()
        }
    }
      

    Edit = selectedItem => {
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        // posisi yg akan di edit
        let index = tempCart.findIndex(it => it.id_prod === selectedItem.id_prod)
        let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.nama} yang beli`,selectedItem.jumlahBeli)
        tempCart[index].jumlahBeli = promptJumlah

        // update localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart))

        // refersh cart
        this.initCart()
    } 

    componentDidMount(){
        this.initCart()
    }

    render(){
        return(
            <>
            <PageHeader 
                title="List Belanja Kue"
                subTitle="Penilaian Keterampilan React JS Storage"
                icon={<ShoppingCartIcon fontSize="large"/>} 
            />
            <div className="container" style={{ margin: 'auto auto 50 50' }} >
            {/* TABEL */}
                <div className="row" > 
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nama Barang</th>
                                <th>Harga</th>
                                <th>Jumlah</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                this.state.cart.map( (item, index) => (
                                    <tr key={index}>
                                        <td>{item.nama}</td>
                                        <td>{item.harga}</td>
                                        <td>{item.jumlahBeli}</td>
                                        <td>{item.harga * item.jumlahBeli}</td>
                                        <td>
                                        <Button variant="contained"  onClick={() => this.Edit(item)} style={{  backgroundColor:'#c6cbef', margin: ' auto 13px'}}><CreateIcon /></Button>
                                        <Button variant="contained" onClick={() => this.Drop(item)} style={{  backgroundColor:'#fc9d9d'}}><ClearIcon /></Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>

                    {/* Total belanja */}
                    <div className="row" >
                        <h4 style={{margin:'auto 13px'}}>Total Belanja: Rp </h4>
                        <input 
                        type="number" 
                        className="form-control mb-3" 
                        value={this.state.total}
                        onChange={() => this.totalHarga()}
                        readOnly
                        style={{width: '200px', margin:'20px auto auto -5px'}}
                        />

                    <Button 
                        variant="outlined" 
                        onClick={() => this.totalHarga()}
                        style={{ margin: 'auto 20px auto 80px', color:'green', width: '200px', height: '50%'}}
                    >
                        Checkout
                    </Button>
                    </div>
                </div>
                
                </div>
            </>
        )
    }
}