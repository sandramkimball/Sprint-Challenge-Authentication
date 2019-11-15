import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utilis/axiosWithAuth';
import styled from 'styled-components';

const UserList = () => {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        axiosWithAuth()
        .get(`/api/jokes/jokes`)
        .then(res=> {
            console.log('List of Jokes: ', res.data);
            setJokes(res.data);
        })
        .catch(err=> console.log(err))
    }, []);

    return(
        <div>
            <Container>
                {jokes.map(j=> (
                    <LI key={j.id}>{j.joke}</LI>
                ))}
            </Container>
        </div>
    )
}

export default UserList;

const LI = styled.li`
    margin: 10px auto;
    font-size: 16px;
    text-align: left;
    color: gray;
    list-style: none;
    padding-bottom: 5px;
    :hover{
        color: black;
        transform: scale(1.025);
        cursor: pointer;
    }
`;

const Container = styled.div`
    margin: 0 auto;
    width: 90%;
    
`;

const H2 = styled.h2`
    font-family: 'Pompiere', cursive;
    font-size: 16px;
    text-align: left;
    padding: 5px;
    font-weight: 300;
`;

 /* font-family: 'Voltaire', sans-serif;
font-family: 'Pompiere', cursive;
font-family: 'Aref Ruqaa', serif; */