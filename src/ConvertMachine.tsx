import { createMachine, assign, send, actions } from "xstate";
import { compact } from "lodash";

export enum LeftMenuXstate {
  property = "property",
  material = "material",
  measure = "measure",
  screenShot = "screenShot",
  none = "none",
}

export enum PropertyMenu {
  byStory = "byStory",
  bySpace = "bySpace",
  byPart = "byPart",
  byMaterial = "byMaterial",
  none = "none",
}

export enum ViewerOption {
  showDrawing = "showDrawing",
  showWireFrame = "showWireFrame",
  showName = "showName",
  showAreaSize = "showAreaSize",
  showBottom = "showBottom",
  showWall = "showWall",
  showCeil = "showCeil",
  showMeasurementUnit = "showMeasurementUnit",
}

type ViewerOptionType = {
  [key in ViewerOption]: boolean;
};

export interface State {
  leftMenu: {
    active: LeftMenuXstate;
    propertyMenu: {
      active: PropertyMenu;
      selectedStory: string | null;
      selectedSpace: { [key: string]: boolean };
      selectedPart: { [key: string]: boolean };
      selectedMaterial: { [key: string]: boolean };
    };
  };
  rightMenu: {
    viewerOption: boolean;
  };
  resultWindow: {
    open: boolean;
  };
  drawing2D: {
    selectedStory: string;
    selectedVdsUrl: string | null;
  };
  viewerOption: ViewerOptionType;
}

export type Events =
  | {
      type: "SELECT_LEFT_MENU";
      value: LeftMenuXstate;
    }
  | {
      type: "SELECT_PROPERTY_MENU";
      value: PropertyMenu;
    }
  | {
      type: "SELECT_STORY";
      value: string;
    }
  | {
      type: "SELECT_SPACE";
      value: {
        check: { [key: string]: boolean };
        totalLength: number;
      };
    }
  | {
      type: "SELECT_PART";
      value: {
        check: { [key: string]: boolean };
        totalLength: number;
      };
    }
  | {
      type: "SELECT_MATERIAL";
      value: {
        check: { [key: string]: boolean };
        totalLength: number;
      };
    }
  | {
      type: "RESET_PROPERTY";
    }
  | {
      type: "OPEN_RESULT";
      value: boolean;
    }
  | {
      type: "OPEN_VIEWER_OPTION";
    }
  | {
      type: "SET_VIEWER_OPTION";
      value: ViewerOption;
    };


export const ConvertMachine = createMachine<State, Events>({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMCuAnAhgFwJYHsA7AOgBswAzbAWTENWM2TwDcxjCiwBiAZQFEAMvwDCAFQD6wgGKTq-AHIBVANoAGALqJQAB3yxceItpAAPRAE41a4hYCMagGwWALAFY1AZgDsADhcATAA0IACeiL6OAcTWLr6edt4ungEuXgC+6SFoWEYk5FS09IzMuGzEOuj4OmDo2KF8QqKSMnKKqpomegZ5JuYIztF2jolq3nZ2bomeLiHhCN5uvsTePkl2vhauVp6Z2Rg4BPmUNHQMTKzsALZgmLAYPALC4lL8shLyyupaSCDdhkc+ohHC5HMQAt4AvYEs5ImoLHNgT5bL4AlFPBYlktFnsQDlDkQyCciudSuUrjharhMKRGs8Wm82l9Or9-r1fv1HF5iA5HFNPJ54S4-L5EQgpjY3FZHFE7BYUhZ4rssniDnkiYUziVLsRYMh0GA6LwABb4bB05qvd6fDo-XT6AHGDnAuzRSGQtL+XxuFx2TxitLeYgeNQuUEBVIBV2OTIqzgQOAmfHs+09QHOhAAWl9bls8u8FlSS0i8rF2d8NkWPmFfMF3lDuOTRw1p3oXQdKbMiEzaOWoc9fscvnrrlmYUQcrs4ICkQLm1Rw+83kbaubBVbpMu7bTTtA-UjPKcXgcnkcPlhYpSNjUdhrkVSgrcy5VTcJ65J2rK7E4hDA28dhBAggUI2Lyx5eGeS5ig4ELEBiN6+HCbgBEsyr7Lka7ElqFxfhUVQ1HU8ypgBQEgYeXIJBBazQcMU7DhYS6MXyyRuCuGFvlhxQ4eStz3Aa-6dvuVjkeBp7UeOCCuhYYKnvKMquH4M4uGxBLHJqXFktclLoNSpACeme6IGRYGUWJUESbegrEN6mzJChWyohYKnqu+2Gabq+qGoQJpmvpu5dsBwkmSekHeNBbh8nBcRTJikJ+n4zmYepDCVNUtT1CSfmARmPYBNeYZqL4g7DkKY7zBCyzjMkcTRQxqSJRxyV4WlhEftxf6sh2BkBZmkwuCsYantYEUFl4-oSaeYJ5bEkTDCxdgNWpG7NQRGVarAYDkMwkC8Ng+DoERfxdf5-S9RFKz2GeiFQshoYBpsMT+H1kJuCkUwxi+q6NctqWraEH4bVt2A7ToTAdcRgndok0T9oVxUjmGYoisQQ7SQkEKuBCz7oapLYfr96X-etm1gNtEAAAqYHUWVAb1kIxAVRWniVo5ioWng8gWAQCnlrqePEi141qBOtcTQOQNQ2m6TTOXQwzA7MwjZUTmoT4o0O8RTNzoZOZ97EkDpUDGhuMuGZJp7EMK3PSbN9hxGWcocxFIzDD4smTYLhvGx+LC4GAADutQAPI6J2bLdf0Gz9VbGJDiMduihJvVOI9ob80uPizspeu4wa9ykNgADquCEBA+D+6bPWoisGyjH6nhSq6DuIcGPpPu4cWBMkntwKgBfF6X5fEGl2UQxH3YzDXRX1vXjfBEnDhTk4iHSXV3NuKxOfqhAWD+yXUABAAIpXp2nkGWw+IW7iIc443zL1LejK9V6LIhEWCzvmB74QB+H7qJNk12vtQ64cToT0mHBKwhYpgRUXMOB21gUZeg3lybwQ45of13vvI+-9xYQAAGoQFgEodAelOo7lHj1BIFg8yXyLDfUsSdAg8kxKkV0hV+bCmzjjdUvsA7B1Dt1UBlD+ijVsGMJwSQkjc0QmWDEHNewSNVjCGYH0eHNj4YHdAId1SwFNP7Q+WCf4nwiKsFYqQ0GBExAxaSZYLHgkLIsDe3M0gYkFpogRuj9HFwNNILANwTEIEiP1DEeVZpPgLAKMs4xrKpCPIhFi0l3F+y0To5sejy4KEwAE8hJEMzXWsnKVEKEpTVTkarFYqJZKFghNYXwyT+HaMEYSDJ-sACCBpMC8FwAAL3BkdChQFhwwxKa9aBaJfQBlzJMDwckZhFVVhvBpqTmkkFaQAITNHtK4gTFyWwjM4dBj5EjQW5CCUEApFign8GiZZnj0neJpGQseYCgkt3eoEJ8ioQR8mbssCsCRfSul9BIhaW8NEpPuS0-RIgwC4GeQMvJZsV62BSMkSEDEFl3yhlZBIQ0HChm5gKO5TSvHl1oHcB4NxCDYCUIQQwuz+biPrI4KRgR+aJ3vn6OCMwwwgm9E4BIPpYzpCAA */
  id: "curation",
  type: "parallel",
  predictableActionArguments: true,
  context: {
    leftMenu: {
      active: LeftMenuXstate.none,
      propertyMenu: {
        active: PropertyMenu.none,
        selectedStory: null,
        selectedSpace: { all: true },
        selectedPart: { all: true },
        selectedMaterial: { all: true },
      },
    },
    rightMenu: {
        viewerOption: false,
    },
    resultWindow: {
      open: false,
    },
    drawing2D: {
        selectedStory: "1F",
        selectedVdsUrl: null,
    },
    viewerOption: {
        showDrawing: true,
        showWireFrame: false,
        showName: false,
        showAreaSize: false,
        showBottom: true,
        showWall: true,
        showCeil: false,
        showMeasurementUnit: false,
    },
  },
  states: {
    leftMenu: {
      type: "parallel",
      states: {
        active: {
          initial: LeftMenuXstate.none,
          states: {
            none: {
                on: {
                    SELECT_LEFT_MENU: {
                        actions: (context, event) => {
                          if (context.leftMenu.active === event.value) {
                            context.leftMenu.active = LeftMenuXstate.none;
                          } else {
                            context.leftMenu.active = event.value;
                          }
                          context.resultWindow.open = openResultWindowController(context.leftMenu);
                        },
                      },
                      
                  },
                },
    
                property: {
                  on: {
                    SELECT_LEFT_MENU: {
                      actions: (context, event) => {
                        if (context.leftMenu.active === event.value) {
                          context.leftMenu.active = LeftMenuXstate.none;
                        } else {
                          context.leftMenu.active = event.value;
                        }
                        context.resultWindow.open = openResultWindowController(context.leftMenu);
                      },
                    },
                  },
                },

            measure: {
              on: {
                SELECT_LEFT_MENU: {
                  actions: (context, event) => {
                    if (context.leftMenu.active === event.value) {
                      context.leftMenu.active = LeftMenuXstate.none;
                    } else {
                      context.leftMenu.active = event.value;
                    }
                    context.resultWindow.open = openResultWindowController(context.leftMenu);
                  },
                },
              },
            },

            material: {
              on: {
                SELECT_LEFT_MENU: {
                  actions: (context, event) => {
                    if (context.leftMenu.active === event.value) {
                      context.leftMenu.active = LeftMenuXstate.none;
                    } else {
                      context.leftMenu.active = event.value;
                    }
                    context.resultWindow.open = openResultWindowController(context.leftMenu);
                  },
                },
              },
            },

            screenShot: {
              on: {
                SELECT_LEFT_MENU: {
                  actions: (context, event) => {
                    if (context.leftMenu.active === event.value) {
                      context.leftMenu.active = LeftMenuXstate.none;
                    } else {
                      context.leftMenu.active = event.value;
                    }
                    context.resultWindow.open = openResultWindowController(context.leftMenu);
                  },
                },
              },
            },
          },
        },

        propertyMenu: {
            type: "parallel",
            states: {
                active: {
                    initial: PropertyMenu.none,
                    states: {
                        none: {
                            on: {
                                SELECT_PROPERTY_MENU: {
                                    actions: (context, event) => {
                                        if (
                                        context.leftMenu.propertyMenu.active === event.value
                                        ) {
                                        context.leftMenu.propertyMenu.active =
                                            PropertyMenu.none;
                                        } else {
                                        context.leftMenu.propertyMenu.active = event.value;
                                        }
                                    },
                                },
                            },
                        },
                        byStory: {
                            on: {
                                SELECT_PROPERTY_MENU: {
                                    actions: (context, event) => {
                                        if (
                                        context.leftMenu.propertyMenu.active === event.value
                                        ) {
                                        context.leftMenu.propertyMenu.active =
                                            PropertyMenu.none;
                                        } else {
                                        context.leftMenu.propertyMenu.active = event.value;
                                        }
                                    },
                                },
                            },
                        },
                        bySpace: {
                            on: {
                                SELECT_PROPERTY_MENU: {
                                    actions: (context, event) => {
                                        if (
                                        context.leftMenu.propertyMenu.active === event.value
                                        ) {
                                        context.leftMenu.propertyMenu.active =
                                            PropertyMenu.none;
                                        } else {
                                        context.leftMenu.propertyMenu.active = event.value;
                                        }
                                    },
                                },
                            },
                        },
                        byPart: {
                            on:{
                                SELECT_PROPERTY_MENU: {
                                    actions: (context, event) => {
                                        if (
                                        context.leftMenu.propertyMenu.active === event.value
                                        ) {
                                        context.leftMenu.propertyMenu.active =
                                            PropertyMenu.none;
                                        } else {
                                        context.leftMenu.propertyMenu.active = event.value;
                                        }
                                    },
                                }
                            }
                        }
                    },
                },
            selectedStory: {
                on:{
                    SELECT_STORY:{
                        actions:(context,event)=>{
                            console.log('contetx',context)
                            context.leftMenu.propertyMenu.selectedStory = event.value;
                            context.resultWindow.open = openResultWindowController(context.leftMenu);
                            context.drawing2D.selectedStory = event.value || "1F";
                        }
                    }
                }
            },
            selectedSpace: {
                on:{
                    SELECT_SPACE:{
                        actions:(context,event)=>{
                            const updateState = checkboxController(
                                context.leftMenu.propertyMenu.selectedSpace,
                                event.value.check,
                                event.value.totalLength,
                              );
                              context.leftMenu.propertyMenu.selectedPart = updateState;
                              context.resultWindow.open = openResultWindowController(context.leftMenu);
                        }
                    }
                }
            },
            selectedPart: {
                on:{
                    SELECT_PART:{
                        actions:(context,event)=>{
                            const updateState = checkboxController(
                                context.leftMenu.propertyMenu.selectedPart,
                                event.value.check,
                                event.value.totalLength,
                              );
                              context.leftMenu.propertyMenu.selectedPart = updateState;
                              context.resultWindow.open = openResultWindowController(context.leftMenu);
                        }
                    }
                }
            },
            selectedMaterial: {
                on:{
                    SELECT_MATERIAL:{
                        actions:(context,event)=>{
                            const updateState = checkboxController(
                                context.leftMenu.propertyMenu.selectedMaterial,
                                event.value.check,
                                event.value.totalLength,
                              );
                              context.leftMenu.propertyMenu.selectedMaterial = updateState;
                              context.resultWindow.open = openResultWindowController(context.leftMenu);
                        }
                    }
                }
            },
          },
        },
      },
    },
  },
  on:{
    RESET_PROPERTY: {
        actions:(context, event) => {
            context.leftMenu.propertyMenu.selectedStory = null;
            context.leftMenu.propertyMenu.selectedSpace = { all: true };
            context.leftMenu.propertyMenu.selectedPart = { all: true };
            context.leftMenu.propertyMenu.selectedMaterial = { all: true };
            context.resultWindow.open = openResultWindowController(context.leftMenu);
        }
    },
    OPEN_RESULT:{
        actions:(context, event) => {
            context.resultWindow.open = event.value;
        }
    },
    OPEN_VIEWER_OPTION:{
        actions:(context) => {
            context.rightMenu.viewerOption = !context.rightMenu.viewerOption;
        }
    },
    SET_VIEWER_OPTION:{
        actions:(context, event) => {
            context.viewerOption[event.value] = !context.viewerOption[event.value];
        }
    },
    SELECT_LEFT_MENU: {
        actions: (context, event) => {
          if (context.leftMenu.active === event.value) {
            context.leftMenu.active = LeftMenuXstate.none;
          } else {
            context.leftMenu.active = event.value;
          }
          context.resultWindow.open = openResultWindowController(context.leftMenu);
        },
      },
},
});


function openResultWindowController(state: State["leftMenu"]) {
    const {
      propertyMenu: {
        selectedStory,
        selectedSpace: { all: spaceAll },
        selectedPart: { all: partAll },
        selectedMaterial: { all: materialAll },
      },
    } = state;
    if (!selectedStory && spaceAll && partAll && materialAll) {
      return false;
    }
    return true;
  }
  function checkboxController(
    state: { [key: string]: boolean },
    payload: { [key: string]: boolean },
    totalLength: number,
    // propertyKey: keyof ModelState
  ) {
    const [key] = Object.keys(payload);
    const [value] = Object.values(payload);
    // 전체 체크하는 경우 전체를 제외한 나머지 항목 false
    if (key === "all" && value) {
      state["all"] = true;
      Object.keys(state).map((item) => {
        if (item !== "all") {
          state[item] = false;
        }
      });
    } else {
      // 전체가 아닌 항목을 체크하는 경우 전체 체크 해제
      state["all"] = false;
      state[key] = value;
    }
    const checked = compact(
      Object.entries(state).map((item) => {
        const [key, value] = item;
        if (key === "all") return null;
        return { key, value };
      }),
    ).filter((item) => item.value);
    if (checked.length === totalLength) {
      state["all"] = true;
      Object.keys(state).map((item) => {
        if (item !== "all") {
         state[item] = false;
        }
      });
    }
    return state;
  }