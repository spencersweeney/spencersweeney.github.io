import { FiniteStateMachine, State } from "./fsm";
import { Space } from "../apps/space";
import { PlanetWorld } from "../apps/landed-planet";

export class WorldAppManager extends FiniteStateMachine {
    constructor() {
        super();
    }

    get CurrentState() {
        return this._currentState;
    }

    AddApp(name, appClass) {
        this._AddState(name, appClass);
    }

    SwitchApp(name, params) {
        const prevState = this._currentState;

        if (prevState) {
            if (prevState.Name == name) {
                return;
            }
            prevState.Exit();
        }

        const state = new this._states[name](this, params);

        this._currentState = state;
        state.Enter(prevState);
    }
}

class App extends State {
    constructor(manager, params) {
        super(manager); // Pass the AppManager reference to the parent
        this._params = params;
    }

    Enter(previousApp) {
        console.log(`Entering app: ${this.constructor.name}`);
    }

    Exit() {
        console.log(`Exiting app: ${this.constructor.name}`);
    }

    Update(timeElapsed, input) {
    }
}

export class SpaceApp extends App {
    constructor(manager, params) {
        super(manager, params);
        this._spaceInstance = null;
    }

    get Name() {
        return 'space';
    }

    Enter(previousApp) {
        super.Enter(previousApp);
        console.log('Entering SpaceApp');

        this._spaceInstance = new Space(this._params);
    }

    Exit() {
        super.Exit();
        console.log('Exiting SpaceApp');

        // Clean up the Space instance
        if (this._spaceInstance) {
            this._spaceInstance.Cleanup();
            this._spaceInstance = null;
        }
    }

    Update(timeElapsed) {
        if (this._spaceInstance) {
            this._spaceInstance.Update(timeElapsed);
        }
    }

    get LookedAtObject() {
        return this._spaceInstance.LookedAtObject;
    }
}

export class PlanetApp extends App {
    constructor(manager, params) {
        super(manager, params);
        this._planetInstance = null;
    }

    get Name() {
        return 'planet';
    }

    Enter(previousApp) {
        super.Enter(previousApp);
        console.log('Entering PlanetApp');

        this._planetInstance = new PlanetWorld(this._params);
    }

    Exit() {
        super.Exit();
        console.log('Exiting SpaceApp');

        // Clean up the Space instance
        if (this._planetInstance) {
            this._planetInstance.Cleanup();
            this._planetInstance = null;
        }
    }

    Update(timeElapsed) {
        if (this._planetInstance) {
            this._planetInstance.Update(timeElapsed);
        }
    }
}
