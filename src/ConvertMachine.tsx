import { createMachine, assign, send, actions } from "xstate";

const { log } = actions;

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
      value: string;
    }
  | {
      type: "SELECT_PART";
      value: string;
    }
  | {
      type: "SELECT_MATERIAL";
      value: string;
    }
  | {
      type: "RESET_PROPERTY";
      value: ViewerOption;
    }
  | {
      type: "OPEN_RESULT";
      value: string;
    }
  | {
      type: "OPEN_VIEWER_OPTION";
      value: string;
    }
  | {
      type: "SET_VIEWER_OPTION";
      value: string;
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
        selectedSpace: {},
        selectedPart: {},
        selectedMaterial: {},
      },
    },
    rightMenu: {
      viewerOption: false,
    },
    resultWindow: {
      open: false,
    },
    drawing2D: {
      selectedStory: "",
      selectedVdsUrl: null,
    },
    viewerOption: {
      showDrawing: true,
      showWireFrame: false,
      showName: false,
      showAreaSize: false,
      showBottom: false,
      showWall: false,
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
            // on: {
            //     SELECT_LEFT_MENU: {
            //       actions: (context, event) => {
            //         context.leftMenu.active = event.value;
            //       },
            //     },
            //   },
            none: {
              on: {
                SELECT_LEFT_MENU: {
                    actions: (context, event) => {
                        console.log('event.value: ', event.value)
                        context.leftMenu.active = event.value;
                        }
                }
              },
            },

            property: {
              on: {
                SELECT_LEFT_MENU: {
                  actions: (context, event) => {
                    console.log("clekc...");
                    if (context.leftMenu.active === event.value) {
                      context.leftMenu.active = LeftMenuXstate.none;
                    } else {
                      context.leftMenu.active = event.value;
                    }
                  },
                },
              },
            },

            measure: {
              on: {
                SELECT_LEFT_MENU: {
                  actions: (context, event) => {
                    context.leftMenu.active = event.value;
                  },
                },
              },
            },

            material: {
              on: {
                SELECT_LEFT_MENU: {
                  actions: (context, event) => {
                    context.leftMenu.active = event.value;
                  },
                },
              },
            },

            screenShot: {
              on: {
                SELECT_LEFT_MENU: {
                  actions: (context, event) => {
                    context.leftMenu.active = event.value;
                  },
                },
              },
            },
          },
        },

        // propertyMenu: {
        //   states: {
        //     active: {},
        //     selectedStory: {},
        //     selectedSpace: {},
        //     selectedPart: {},
        //     selectedMaterial: {},
        //   },
        // },
      },
    },

    // rightMenu: {
    //   states: {
    //     viewerOption: {},
    //   },
    // },

    // resultWindow: {
    //   states: {
    //     open: {},
    //   },
    // },

    // drawing2D: {
    //   states: {
    //     selectedStory: {},
    //     selectedVdsUrl: {},
    //   },
    // },

    // viewerOption: {
    //   states: {
    //     showDrawing: {},
    //     showWireFrame: {},
    //     showName: {},
    //     showAreaSize: {},
    //     showBottom: {},
    //     showWall: {},
    //     showCeil: {},
    //     showMeasurementUnit: {},
    //   },
    // },
  },
});
