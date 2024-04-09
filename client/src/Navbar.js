import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './styles/App.css';
import styled from 'styled-components';

const Container = styled.div`
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 75px;
    background: #22262b;
`;

const LeftContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
  
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
`;

const LeftContainerContent = styled.a`
    color: white;
    padding: 0 20px;
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
`;

const RightContainer = styled.div`
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
`;

const Navbar = () => {
    const browserHistory = useNavigate();

    const [idEntry, setIdEntry] = useState('');
    const [tagEntry, setTagEntry] = useState('');

    const handleIdChange = (e) => {
        setIdEntry(e.target.value);
    };

    const handleTagChange = (e) => {
        setTagEntry(e.target.value);
    };

    const handlePageNavigation = (to) => {
        browserHistory(to);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (idEntry.length === 0 || tagEntry.length === 0) return;
        
        // We want to go to the new path /display/:id/:tag
        const newPath = `/display/${idEntry}/${tagEntry}`;
        handlePageNavigation(newPath);
    };

    return (
        <Container>
            { /* This container will containe 4 text options that route to certain locations: Home, About, Champions, Modes */ }
            <LeftContainer>
                <LeftContainerContent href="/" onClick={() => { browserHistory.push("/") }}>Home</LeftContainerContent>
                <LeftContainerContent href="/about">About</LeftContainerContent>
                <LeftContainerContent href="/champions">Champions</LeftContainerContent>
                <LeftContainerContent href="google.com">Modes</LeftContainerContent>
            </LeftContainer>

            <RightContainer>
                <div style={{height: '43px'}}>
                    <input
                        className='StyledInput'
                        type="text"
                        placeholder='Riot ID'
                        value={idEntry}
                        onChange={handleIdChange}
                    />
                </div>
                <div style={{height: '43px'}}>
                    <input
                        className='StyledInput'
                        type="text"
                        placeholder='Tagline'
                        value={tagEntry}
                        onChange={handleTagChange}
                    />
                </div>
                <div style={{height: '43px'}}><button className="StyledButton" onClick={handleSubmit}>Search</button></div>
            </RightContainer>
        </Container>
    )
}

export default Navbar;