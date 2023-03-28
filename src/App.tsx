import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { PlayerMachine,PlayerState } from './PlayerMachine';
import { useMachine } from '@xstate/react';
import { StateValue } from 'xstate';

export const App = ()=> {
  // const machine = useMemo(() => PlayerMachine,[])
  const myMachine = PlayerMachine;
  const [states,send]= useMachine(myMachine);

  console.log('state', states)

  function what(states: StateValue){
    const {player, volume}= states as unknown as PlayerState;
  }

  const stateVal = states.value as unknown as PlayerState;


 return (
    <div>
      <h2>Player: {stateVal.player}</h2>
      <h3>Volume: {stateVal.volume}</h3>

      <button onClick={() => send('PLAY')}>Play</button>
      <button onClick={() => send('PAUSE')}>Pause</button>
      <button onClick={() => send('STOP')}>Stop</button>
      <button onClick={() => send('MUTE')}>Mute</button>
      <button onClick={() => send('UNMUTE')}>Unmute</button>
    </div>
 )
}