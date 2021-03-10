import React, { Component } from 'react';
import PageHeader from "../components/PageHeader";
import CollectionsIcon from '@material-ui/icons/Collections';
import { TextField, Button } from '@material-ui/core';
import $ from 'jquery';
import Card from '../components/Card';

export default class Belanja extends Component {

    constructor(){
        super()
        this.state = {
            produk: [
                { id_prod: 121, nama: "Pizza", harga: 2000, jumlahBeli: 0, koki: "Mb Nana" ,cover: "https://drive.google.com/uc?id=1fgW1LFZqqKUD33UygCv1GUwNgsvkCANh"},
				{ id_prod: 212, nama: "Donat", harga: 12000, jumlahBeli: 0,koki: "Mb Nani" ,cover: "https://drive.google.com/uc?id=1lMmA8aIAebIpkGwqOoqYM7jeQOF_Q2f3" },
				{ id_prod: 343, nama: "Bolu", harga: 3000, jumlahBeli: 0, koki: "Mb Nunu" ,cover: "https://drive.google.com/uc?id=1VPEh3h15NP7HO6i42HbgBA2DZON5bYax"},
				{ id_prod: 454, nama: "Makaron", harga: 5000, jumlahBeli: 0, koki: "Mb Nino" ,cover: "https://drive.google.com/uc?id=1jrZdvKKzi_3DfrJHXmy-t-2NqQL8MVba"},
				{ id_prod: 565, nama: "Kue Tart", harga: 30000, jumlahBeli: 0, koki: "Mb Noni" ,cover: "https://drive.google.com/uc?id=1UXa5oJm5SWNX9p2JrPRjdwOcxaqmP3Xs"},
            ],

            // MANAGE LIST
            action: "",
            nama: "",
            harga: 0,
            total: 0,
            selectedItem: null,

            // FITUR SEACRH
            keyword: "",
            filterProduk: [],
            // user: ""
        }
        this.state.filterProduk = this.state.produk
    }

        Add = () => {
            $("#modal_produk").modal("show")
            // update state
            this.setState({
                nama:  "",
                harga: "",
                //value add
                action: "insert"
            })
        }    

        Edit = (item) => {
            $("#modal_produk").modal("show")
            //update state
            this.setState({
                nama: item.nama,
                harga: item.harga,
                //value ad
                action: "update",
                selectedItem: item
            })
        }

        Save = (event) => {
            
            let tempProduk = this.state.produk
    
            if (this.state.action === "insert") {
                //tambah data
                tempProduk.push({
                    nama: this.state.nama,
                    harga: this.state.harga,
                })
            } else if (this.state.action === "update") {
                //simpan data
                let index = tempProduk.indexOf(this.state.selectedItem)
                tempProduk[index].nama = this.state.nama
                tempProduk[index].harga = this.state.harga
            }
            //ubah dari index -> tempProduk
            this.setState({prod: tempProduk})
            //tutup komponen modal
            $("#modal_produk").modal("hide")

            event.preventDefault();
        }

        Drop = (item) => {
            //konfirmasi
            if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
                //tampung data
                let tempProduk = this.state.produk
                //posisi index data akan hapus
                let index = tempProduk.indexOf(item)
                //hapus data
                tempProduk.splice(index, 1)
                this.setState({prod: tempProduk})
            }
        }

        searching = event => {
            if(event.keyCode === 13){
                // 13 adalah kode untuk tombol enter
        
                let keyword = this.state.keyword.toLowerCase()
                let tempProduk = this.state.produk
                let result = tempProduk.filter(item => {
                    return item.nama.toLowerCase().includes(keyword) 
                })
        
                this.setState({filterProduk: result})
            }
        }

        setUser = () => {
            // cek eksistensi dari session storage
            if(localStorage.getItem("user") === null){
                // kondisi jika session storage "user" belum dibuat
                let prompt = window.prompt("Masukkan Nama Anda","")
                if(prompt === null || prompt === ""){
                    // jika user tidak mengisikan namanya
                    this.setUser()
                }else{
                    // jika user telah mengisikan namanya
        
                    // simpan nama user ke session storage
                    localStorage.setItem("user", prompt)
        
                    // simpan nama user ke state.user
                    this.setState({user: prompt})
                }
            }else{
                // kondisi saat session storage "user" telah dibuat
        
                // akses nilai dari session storage "user"
                let name = localStorage.getItem("user")
                this.setState({user: name})
            }
        }
        
        componentDidMount(){
            // fungsi yg dijalankan setelah fungsi render
            this.setUser()
        }

        addToCart = (selectedItem) => {
            // membuat sebuah variabel untuk menampung cart sementara
            let tempCart = []
        
            // cek eksistensi dari data cart pada localStorage
            if(localStorage.getItem("cart") !== null){
                tempCart = JSON.parse(localStorage.getItem("cart"))
                // JSON.parse() digunakan untuk mengonversi dari string -> array object
            }          

            // cek data yang dipilih user ke keranjang belanja menghindari doble data
            let existItem = tempCart.find(item => item.id_prod === selectedItem.id_prod)
        
            if(existItem){
                // jika item yang dipilih ada pada keranjang belanja
                window.alert("Anda telah memilih item ini")
            }else{
                // user diminta memasukkan jumlah item yang dibeli
                // let promptJumlah = window.prompt("Masukkan jumlah item yang beli","")
                let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.nama} yang beli`, "")
                if(promptJumlah !== null && promptJumlah !== ""){
                    // jika user memasukkan jumlah item yg dibeli
        
                    // menambahkan properti "jumlahBeli" pada item yang dipilih
                    selectedItem.jumlahBeli = promptJumlah
                    
                    // masukkan item yg dipilih ke dalam cart
                    tempCart.push(selectedItem)
        
                    // simpan array tempCart ke localStorage
                    localStorage.setItem("cart", JSON.stringify(tempCart))
                }
            }
        }        

    render(){
        return(
            <>
            <PageHeader 
                title="Katalog Kue"
                subTitle="Penilaian Keterampilan React JS Storage"
                icon={<CollectionsIcon fontSize="large"/>} 
            />
            
            <div className="container" style={{ margin: 'auto auto 50 50' }} >
                    {/* SEARCHING */}
                    <div style={{ margin: '3% auto 3% auto' }}>
                        <TextField 
                            id="outlined-required" 
                            label="Cari yuk" 
                            variant="outlined"  
                            //action
                            value={this.state.keyword} 
                            onChange= {ev => this.setState({keyword: ev.target.value})}
                            onKeyUp={ev => this.searching(ev)}
                            style={{ width: '850px'}}
                        />

                        <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={() => this.Add()} 
                            style={{ margin: '10px 10px 0 20px' }}
                        >
                            + Tambah Data
                        </Button>
                    </div>
                   
                   {/* Card */}
                   <div className="row">
                        { this.state.filterProduk.map( (item,index) => (
                            <Card 
                            judul={item.nama}
                            koki={item.koki}
                            harga={item.harga}
                            cover={item.cover}

                            onEdit={ () => this.Edit(item)}
                            onDrop={ () => this.Drop(item)}
                            onCart={ () => this.addToCart(item)}
                            />
                        )) }  
                    </div>


                    {/* FORM */}
                    <div className="modal" id="modal_produk">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header" style={{textAlign: 'center', margin: '20px 20px 0 10px'}} >
                                    <h4>Form Belanja</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ ev => this.Save(ev)} style={{textAlign: 'center',}}>
                                        
                                        <TextField 
                                            id="outlined-required" 
                                            label="Barang" 
                                            variant="outlined"
                                            //value add
                                            value={ this.state.nama }
                                            onChange={ ev => this.setState({ nama: ev.target.value}) }
                                            required
                                            style={{marginBottom: '20px'}}
                                        /><br />
                                        <TextField 
                                            id="outlined-required" 
                                            label="Harga" 
                                            variant="outlined"
                                            //value add
                                            value={ this.state.harga }
                                            onChange={ ev => this.setState({ harga: ev.target.value}) }
                                            required
                                            style={{marginBottom: '20px'}}
                                        /><br />
                                        {/* <TextField 
                                            id="outlined-required" 
                                            label="Jumlah" 
                                            variant="outlined"
                                            //value add
                                            value={ this.state.jumlah }
                                            onChange={ ev => this.setState({ jumlah: ev.target.value}) }
                                            required
                                        /> */}
                                        <div style={{margin: '25px auto'}}>
                                            <Button variant="contained" color="primary" type="submit">
                                                Submit
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </>
        )
    }
}