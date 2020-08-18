import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

import styled from 'styled-components';

function Patreon(props) {
  const [userData, setUser] = useState([false, false]);
  const [username, setUsername] = useState('Username');
  const [id, setId] = useState('Not Connected');

  const [patreonEmail, setPatreonEmail] = useState('Email');
  const [patreonId, setPatreonId] = useState('Not Connected');

  const [finalized, setFinalized] = useState('Not Finalized');

  const baseURL = 'https://patreon.com/oauth2/authorize?response_type=code';
  const clientID =
    'CgeJe4-OBtoHV6X6Sn9HJLpwOklY3Zi5muhjSkMTK_Phfuck3Eg7UsSLBHsMxKyV';
  //const redirectURL = 'http://elvinfeng.com/auth/patreon/';
  const redirectURL = 'http://localhost:5000/auth/patreon/';

  const patreonURL =
    baseURL + '&client_id=' + clientID + '&redirect_uri=' + redirectURL;

  async function fetchSteamUser() {
    if (userData[0] === false) {
      try {
        const res = await fetch('/auth/steam/account');
        const json = await res.json();

        console.log(json);

        if (json !== null) {
          setUser([true, userData[1]]);
          setUsername(json.displayName);
          setId(json.id);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function fetchPatreonUser() {
    if (userData[1] === false) {
      try {
        const res = await fetch('/auth/patreon/account');
        const json = await res.json();

        console.log(json);

        if (json !== null) {
          setUser([userData[0], true]);
          setPatreonEmail(json.email);
          setPatreonId(json.Id);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function finalize() {
    try {
      const res = await fetch('/auth/firebase/');
      const json = res.json();

      if (res.status === 200 || res.status === 400) {
        setFinalized(json.msg);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchSteamUser();
  }, [userData[0]]);

  useEffect(() => {
    fetchPatreonUser();
  }, [userData[1]]);

  return (
    <Layout maxWidth={props.maxWidth}>
      <PatreonContainer maxWidth={props.maxWidth}>
        <h1>Escape the Undying Dead Patreon</h1>
        <p>
          Authenticate your Patreon and Steam account below to receive your
          ingame items.
        </p>
        <Filler />

        <h3>1. Connect to your Steam account</h3>
        <SteamButton href='/auth/steam/'>
          <SteamButtonImg src='misc/steamConnectIcon.png' alt='Steam Sign In' />
        </SteamButton>
        <h3>2. Connect to your Patreon account</h3>
        <PatreonButton href={patreonURL}>
          <p>Connect to Patreon</p>
        </PatreonButton>
        <h3>3. Finalize if Steam and Patreon accounts are connected</h3>
        <FinalizeButton
          onClick={finalize}
          disabled={!userData[0] || !userData[1]}
        >
          <p>Finalize</p>
        </FinalizeButton>

        <Filler />
        <h1>Status</h1>
        <h3>Steam Info</h3>
        <SteamInfo connected={userData[0]}>
          {username} ({id})
        </SteamInfo>
        <h3>Patreon Info</h3>
        <PatreonInfo connected={userData[1]}>
          {patreonEmail} ({patreonId})
        </PatreonInfo>
        <h3>Status</h3>
        <FinalizedInfo finalized={finalized === 'Done'}>
          {finalized}
        </FinalizedInfo>
      </PatreonContainer>
    </Layout>
  );
}

const PatreonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin: 20px;
    border-bottom: 2px #ffffff solid;
  }
`;

const Filler = styled.div`
  height: 50px;
`;

const SteamButton = styled.a`
  background: #000000;
  border: 0px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 25px;
`;

const SteamButtonImg = styled.img`
  background: #000000;
`;

const PatreonButton = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 180px;
  height: 35px;
  color: black;
  background: rgb(232, 91, 70);
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  border: 2px solid white;
  margin-top: 10px;
  margin-bottom: 25px;
`;

const FinalizeButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 180px;
  height: 35px;
  color: white;
  background: black;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  border: 2px solid white;
  margin-top: 10px;
  cursor: pointer;

  :disabled {
    cursor: not-allowed;
  }
`;

const SteamInfo = styled.h4`
  color: ${(props) => (props.connected ? 'green' : 'red')};
  margin-bottom: 25px;
`;

const PatreonInfo = styled.h4`
  color: ${(props) => (props.connected ? 'green' : 'red')};
  margin-bottom: 25px;
`;

const FinalizedInfo = styled.h4`
  color: ${(props) => (props.finalized ? 'green' : 'red')};
`;

export default Patreon;
