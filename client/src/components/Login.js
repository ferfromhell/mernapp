import React, { Component } from 'react'
// import axios from 'axios';

import {graphql, compose} from 'react-apollo';
import {Grid, Image} from "semantic-ui-react";
import { bake_cookie } from 'sfcookies';

import Signin from "./forms/Signin";
import Signup from "./forms/Signup";
import queries from '../utils/queries';

// axios.defaults.withCredentials= true;
const  styles = {
    grid:{
        height: '100%',width:'80%', margin:'0 auto'
    },
    box:{
        border:'1px solid #e6',background:'#fff',textAlign:'center',marginBottom:'1em',padding:'1em'
    }
}



 class Login extends Component {
    state={
        showLogin:true,
        showRegister:false,
        error: null,
        valerrors: null
    }
    showRegister = (e)=>{
        e.preventDefault()
        this.setState({showLogin:false,showRegister:true})
    }
    showLogin = (e)=>{
        e.preventDefault()
        this.setState({showLogin:true,showRegister:false})
    }
    handleLogin= async(e,args)=>{
        e.preventDefault();
        const response = await this.props.login({
            variables: args
        });
        const {errors, success, token} = response.data.login
        if(!success){
            this.setState({errorSignin:errors})
        }else{
            //Cookie
            bake_cookie('tokenbbs', token);
            localStorage.setItem('tokenbbs', token)
            this.props.history.push("/")
        }
    }
    handleRegister= async (e,args) => {
        e.preventDefault();
        const response = await this.props.register({
            variables: args
        })
          const {errors, success} = response.data.createUser;
        if(!success){
            this.setState({errorSignup:errors})
        }else{
            this.props.history.push("/")
        }
    }
    render() {
        const {showLogin, showRegister} = this.state;

        return (
        <div style={{height:"100%"}}>
            <Grid verticalAlign="middle" columns={3} divided centered style={styles.grid}> 
                    <Grid.Row>
                        <Grid.Column>
                            <Image src="https://trustedpartner.azureedge.net/images/library/DiscoveryRG2017/bulletin-board(1).jpg" fluid/>
                        </Grid.Column>
                        <Grid.Column>
                            {showLogin && <Signin styles={styles} handleClick={this.showRegister} handleSubmit={this.handleLogin} /> }
                            {showRegister && <Signup styles={styles} handleClick={this.showLogin} handleSubmit={this.handleRegister}  /> }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        </div>
        )
    }
}
export default compose(
    graphql(queries.mutation.createUser,{name:"register"}),
    graphql(queries.mutation.login,{name: "login"})
    )(Login)

