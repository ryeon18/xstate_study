import { createMachine } from "xstate";

export interface PlayerState {
  player: string;
  volume: string;
  playing: string;
  paused: string;
  stopped: string;
  normal: string;
  muted: string;
}

type PlayerEvent =
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "STOP" }
  | { type: "MUTE" }
  | { type: "UNMUTE" }
  | { type: "BUY" };

export const PlayerMachine = createMachine<PlayerState, PlayerEvent>({
  id: "player",
  type: "parallel",
  predictableActionArguments: true,
  states: {
    player: {
      initial: "playing",
      states: {
        playing: {
          on: {
            PAUSE: "paused",
            STOP: "stopped",
          },
          after: {
            5000: "stopped",
          },
        },
        paused: {
          on: {
            PLAY: "playing",
            STOP: "stopped",
          },
        },
        stopped: {
          on: {
            PLAY: "playing",
            PAUSE: "paused",
          },
        },
      },
    },
    volume: {
      initial: "normal",
      states: {
        normal: {
          on: {
            MUTE: "muted",
          },
          after: {
            1000: "muted",
          },
        },
        muted: {
          on: {
            UNMUTE: "normal",
          },
        },
      },
    },
  },
});
