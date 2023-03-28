import { createMachine} from "xstate"


export interface PlayerState {
    // states: {
        player: string;
        volume: string;
    // },
}

type PlayerEvent = 
    | { type: 'PLAY' }
    | { type: 'PAUSE' }
    | { type: 'STOP' }
    | { type: 'MUTE' }
    | { type: 'UNMUTE' }



    export const PlayerMachine = createMachine<PlayerState,PlayerEvent>({
    	id: 'player',
        type: 'parallel',
        predictableActionArguments:true,
        states: {
        	player: {
            	initial: 'playing',
                states: {
                	playing: {
                    	on: {
                        	PAUSE: 'paused',
                            STOP: 'stopped'
                        },
                        after:{
                            1000:'stopped'
                        }
                    },
                    paused: {
                    	on: {
                        	PLAY: 'playing',
                            STOP: 'stopped'
                        }
                    },
                    stopped: {
                    	on: {
                        	PLAY: 'playing',
                            PAUSE: 'paused'
                        },
                    }
                }
            },
            volume: {
            	initial: 'normal',
                states: {
                	normal: {
                    	on: {
                        	MUTE: 'muted'
                        },
                        after:{
                            1000:'muted'
                        }
                    },
                    muted: {
                    	on: {
                        	UNMUTE: 'normal'
                        }
                    }
                }
            }
        }
    })
