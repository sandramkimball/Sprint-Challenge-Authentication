import React from 'react';
import axiosWithAuth from '../utilis/axiosWithAuth.js';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import JokeList from './JokeList';
import { BrowserRouter as Router } from "react-router-dom";



class Login extends React.Component{
    state = {
        credentials: {
            username: '',
            password: '',
        }
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        return <Redirect exact path='/jokes' component={JokeList}/>

    }

    login = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/api/auth/login', this.state.credentials)
        .then (res=> {
            console.log(res, 'Welcome, sport.');
            return (<Router to='/jokes' component={JokeList}/>)
        })
        .catch(err=>console.log('Dadgomit!', err))
    };

    render(){
        return (
            <div>
            <Form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    name='username'
                    value={this.state.credentials.username}
                    placeholder='username'
                    onChange={this.handleChange}
                />

                <input
                    type='password'
                    name='password'
                    value={this.state.credentials.password}
                    placeholder='password'
                    onChange={this.handleChange}
                />

                <Button type='submit' onClick={this.login}>Login</Button>

            </Form>
            </div>
        )
    }
}

export default Login;

const Form = styled.form`
    width: 300px;
    height: 300px;
    padding: 15px 5px;
    // background: #89b1a8;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    input{
        border: 1px solid black;
        width: 80%;
        height: 30px;
        margin: 15px auto;
    }
`;
const Button = styled.button`
    width: 100px;
    background: none;
    padding: 10px 0;
    margin: 0 auto;
    font-size: 16px;
    border: 1px solid black;
    :hover{
        transform: scale(1.1);
        cursor: pointer;
    }
`;