import { createMachine } from "xstate";

enum PlayerStateType {
  player = "player",
  playing = "playing",
  paused = "paused",
  stopped = "stopped",
  volume = "volume",
  normal = "normal",
  muted = "muted",
}

export interface PlayerState {
  player: PlayerStateType;
  playing: PlayerStateType;
  paused: PlayerStateType;
  stopped: PlayerStateType;

  volume: PlayerStateType;
  normal: PlayerStateType;
  muted: PlayerStateType;
}

type PlayerEvent =
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "STOP" }
  | { type: "MUTE" }
  | { type: "UNMUTE" }
  | { type: "BUY" };

export const PlayerMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcA2BDAnmATgOjS1wI0wEsA7KAYgAUBBAVQGUBRAbQAYBdRFAe1hkALmX4U+IAB6IATLIDMeAGwBWBcoAsADm0BGBQHZZ2zYYA0ITIk0BOTngWa9ek7Nsu9t1QF8flwmx8QOJAyhpmABUAeVouXiQQZEERMQlEmQR5JTUNHX0jEzNLayzDBz1tZT1DW2rOQ31bPwDSULbg0nDqKVhhdGEwPHQAM0GcAAo9ThnOAEpqEM6iZfIqeMlkoVFxSUzslXUtXQNjUwsrRAVZBy1bYz1VVU1le8NffySOkhWCdABXWCQOgAGXoAE0Noktqldhk5Ko9I5qnV3KdtLJVLISjYFLY8NpDO8qk5jJwNB9Wr8ln9AcCorEoQJtmk9jY1ATlIZKnYSXYnDiEJo8QSiao+WSKS0vtTvn1+MhkMDaGDITxNikdulQJkdIZHK4XgV7HjVILqkiGiZbLZZMoFA1DJppTSafLFcqmGwmUlNaz4UKiXhOHbOJVqppVOStIK7A4nC43B4XN4Xd83cIFUqID0+gMhqNxhMozMFq65ZmPRAfTCtWyhRyqtzTLY+bYBZcEI8HN5tAo9DpKrJDMpOJSZUE8AA3fiof4AWyG8-+gxzAFlGJEOOroX64TrEF59eoFNonn33ApVNVBfptHgzAZI0ZNGPTGnfjO54u8MvV7n+kGYYxlwYtZjLb4vwXJcV0gGs921aRD3uPATzPcVrnba89FvZR73bfJDH7WonVkD9Jygn8KH4HB53QVBqEYAA5Dct3gll9yQrsULQ89MKvG9Ow8ZRHHsapXhDVtlHI4hKKGajaPogD82AosS3mRZINnaC8AUujUHY2FEP2EM8Hbd4w0xO0tAuUoiUtR5qlURp7BeQw-E+aiIDgTYOg1DjjMQABaWRNEFELNGDWZ5H0Z5lFeIkZNWXB-KM+tQvNJQzA8ZwqlHaY8SSn5JzCKhUrrANjEFPR7UcB0sTMLFMUJbQitdAEgQgcr-QPBAryUI8PHbKpXyxZRYx0B8XhqrEPDtVw2orLNIG6zjMlHfEB1MUKLXi+RBWuJF+04ZRMRq84XmdT4aTk1bAqyMLOzwpQjk0TQTA0Ro9CKuTf1grrdwC+sqs7L7g0ja8jFqU6wx+7SqJo-S7vrBQNDwWRKidThCRI94zU7DFIodM5h3ex5Hg8nwgA */
  id: "player",
  type: "parallel",
  predictableActionArguments: true,
  tsTypes: {} as import("./PlayerMachine.typegen").Typegen0,
  schema:{
    context:{} as PlayerState,
    events: {} as PlayerEvent
  },
  states: {
    player: {
      initial: PlayerStateType.playing,
      states: {
        playing: {
          on: {
            PAUSE: PlayerStateType.paused,
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
