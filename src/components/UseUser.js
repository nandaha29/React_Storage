import React, { Component } from 'react';

export default class UseUser extends Component{
    constructor(){
        super()
        this.state = {
            user: "",
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

    render(){
        return(
            <>
            <strong>{this.state.user}</strong>
            </>
        )
    }
}


