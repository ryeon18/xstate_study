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
            10000: "stopped",
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
          after: {
            5000: "playing",
          },
        },
      },
    },
    volume: {
      initial: "muted",
      states: {
        muted: {
          on: {
            MUTE: "normal",
          },
          after: {
            5000: "normal",
          },
        },
        normal: {
          on: {
            UNMUTE: "muted",
          },
          after: {
            5000: "muted",
          },
        },
      },
    },
  },
});
