
// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
    '@@xstate/typegen': true;
    internalEvents: {
        "xstate.after(10000)#player.player.playing": { type: "xstate.after(10000)#player.player.playing" };
        "xstate.after(5000)#player.player.stopped": { type: "xstate.after(5000)#player.player.stopped" };
        "xstate.after(5000)#player.volume.muted": { type: "xstate.after(5000)#player.volume.muted" };
        "xstate.after(5000)#player.volume.normal": { type: "xstate.after(5000)#player.volume.normal" };
        "xstate.init": { type: "xstate.init" };
    };
    invokeSrcNameMap: {

    };
    missingImplementations: {
        actions: never;
        delays: never;
        guards: never;
        services: never;
    };
    eventsCausingActions: {

    };
    eventsCausingDelays: {

    };
    eventsCausingGuards: {

    };
    eventsCausingServices: {

    };
    matchesStates: "player" | "player.paused" | "player.playing" | "player.stopped" | "volume" | "volume.muted" | "volume.normal" | {
        "player"?: "paused" | "playing" | "stopped";
        "volume"?: "muted" | "normal";
    };
    tags: never;
}
