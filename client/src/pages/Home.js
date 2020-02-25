import React, { useState } from 'react';
import Layout from '../components/Layout';
import SketchNav from '../components/SketchNav';
import P5Wrapper from 'react-p5-wrapper';
import ActionButton from '../components/ActionButton';
import { Sketches } from '../animations/AllSketches';

import styled from 'styled-components';

function Home(props) {
  const [isLoop, setLoop] = useState(true);
  const [toReset, setReset] = useState(false);
  const [sketch, setSketch] = useState(0);

  const pauseChar = String.fromCharCode(10074);

  return (
    <Layout maxWidth={props.maxWidth}>
      <Sketch>
        <SketchNavPos setSketch={setSketch} />
        <P5Wrapper
          sketch={Sketches[sketch]}
          loop={isLoop}
          reset={toReset}
          setReset={setReset}
        />
        <CenterText>Hi, I'm Elvin Feng</CenterText>
        <ButtonContainer>
          <ActionButton
            name={'PAUSE ' + pauseChar + pauseChar}
            state={isLoop}
            action={setLoop}
          />
          <ActionButton name={'RESET'} state={toReset} action={setReset} />
        </ButtonContainer>
      </Sketch>
    </Layout>
  );
}

const Sketch = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SketchNavPos = styled(SketchNav)`
  position: absolute;
  top: 4px;

  @media (max-width: 450px) {
    top: auto;
    bottom: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 3px;
  right: 3px;

  @media (max-width: 450px) {
    right: auto;
  }
`;

const CenterText = styled.h1`
  position: absolute;
  margin-top: -10vh;
  color: #fff;
  font-size: 48px;
  user-select: none;
  opacity: 0.75;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

export default Home;
