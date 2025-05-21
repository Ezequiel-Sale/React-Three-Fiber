import * as THREE from "three";
class FiniteStateMachine {
  constructor() {
    this._states = {};
    this._currentState = null;
  }
  _AddState(name, type) {
    this._states[name] = type;
  }
  SetState(name) {
    console.log(`Changing state to: ${name}`);
    const prevState = this._currentState;
    if (prevState) {
      if (prevState.Name == name) return;
      prevState.Exit();
    }
    const state = new this._states[name](this);
    this._currentState = state;
    state.Enter(prevState);
  }
  Update(timeElapsed, input) {
    if (this._currentState) {
      this._currentState.Update(timeElapsed, input);
    }
  }
}

// character state machine

export class CharacterFSM extends FiniteStateMachine {
  constructor(proxy) {
    super();
    this._proxy = proxy;
    this._AddState("idle", IdleState);
    this._AddState("walk", WalkState);
    this._AddState("run", RunState);
    this._AddState("runbackwards", RunBackwardsState);
    this._AddState("walkback", WalkBackState);
    this._AddState("attack", AttackState);
  }
}

// character states

class State {
  constructor(parent) {
    this._parent = parent;
  }
  Enter() {}
  Exit() {}
  Update() {}
}

class IdleState extends State {
  constructor(parent) {
    super(parent);
  }
  get Name() {
    return "idle";
  }
  Enter(prevState) {
    const idleAction = this._parent._proxy._animations["idle"].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      idleAction.time = 0.0;
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1.0);
      idleAction.setEffectiveWeight(1.0);
      idleAction.crossFadeFrom(prevAction, 0.5, true);
      idleAction.play();
    } else {
      idleAction.play();
    }
  }
  Exit() {}
  Update(_, input) {
    if (input._keys.forward) {
      this._parent.SetState("walk");
    }
    if (input._keys.backward) {
      this._parent.SetState("walkback");
    }
    if (input._keys.space) {
      this._parent.SetState("attack");
    }
  }
}

class WalkState extends State {
  constructor(parent) {
    super(parent);
  }
  get Name() {
    return "walk";
  }
  Enter(prevState) {
    const currAction = this._parent._proxy._animations["walk"].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      currAction.enabled = true;

      if (prevState.Name == "run") {
        const ratio =
          currAction.getClip().duration / prevAction.getClip().duration;
        currAction.time = prevAction.time * ratio;
      } else {
        currAction.time = 0.0;
        currAction.setEffectiveTimeScale(1.0);
        currAction.setEffectiveWeight(1.0);
      }
      currAction.crossFadeFrom(prevAction, 0.5, true);
      currAction.play();
    } else {
      currAction.play();
    }
  }
  Exit() {}
  Update(_, input) {
    if (input._keys.forward) {
      if (input._keys.shift) {
        this._parent.SetState("run");
      }
      return;
    }
    this._parent.SetState("idle");
  }
}

class RunState extends State {
  constructor(parent) {
    super(parent);
  }
  get Name() {
    return "run";
  }
  Enter(prevState) {
    const currAction = this._parent._proxy._animations["run"].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      currAction.enabled = true;

      if (prevState.Name == "walk") {
        const ratio =
          currAction.getClip().duration / prevAction.getClip().duration;
        currAction.time = prevAction.time * ratio;
      } else {
        currAction.time = 0.0;
        currAction.setEffectiveTimeScale(1.0);
        currAction.setEffectiveWeight(1.0);
      }
      currAction.crossFadeFrom(prevAction, 0.5, true);
      currAction.play();
    } else {
      currAction.play();
    }
  }
  Exit() {}
  Update(_, input) {
    if (input._keys.forward) {
      if (!input._keys.shift) {
        this._parent.SetState("walk");
      }
      return;
    }
    this._parent.SetState("idle");
  }
}
class RunBackwardsState extends State {
  constructor(parent) {
    super(parent);
  }
  get Name() {
    return "runbackwards";
  }
  Enter(prevState) {
    console.log(`Entering state: ${this.Name}`);
    const currAction = this._parent._proxy._animations["runbackwards"].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      currAction.enabled = true;

      if (prevState.Name == "walkback") {
        const ratio =
          currAction.getClip().duration / prevAction.getClip().duration;
        currAction.time = prevAction.time * ratio;
      } else {
        currAction.time = 0.0;
        currAction.setEffectiveTimeScale(1.0);
        currAction.setEffectiveWeight(1.0);
      }
      currAction.crossFadeFrom(prevAction, 0.5, true);
      currAction.play();
    } else {
      currAction.play();
    }
  }
  Exit() {}
  Update(_, input) {
    console.log(`Updating state: ${this.Name}`);
    if (input._keys.backward) {
      if (!input._keys.shift) {
        this._parent.SetState("walkback");
      }
      return;
    }
    this._parent.SetState("idle");
  }
}
class WalkBackState extends State {
  constructor(parent) {
    super(parent);
  }
  get Name() {
    return "walkback";
  }
  Enter(prevState) {
    console.log(`Entering state: ${this.Name}`);
    const currAction = this._parent._proxy._animations["walkback"].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      currAction.enabled = true;

      if (prevState.Name == "runbackwards") {
        const ratio =
          currAction.getClip().duration / prevAction.getClip().duration;
        currAction.time = prevAction.time * ratio;
      } else {
        currAction.time = 0.0;
        currAction.setEffectiveTimeScale(1.0);
        currAction.setEffectiveWeight(1.0);
      }
      currAction.crossFadeFrom(prevAction, 0.5, true);
      currAction.play();
    } else {
      currAction.play();
    }
  }
  Exit() {}
  Update(_, input) {
    console.log(`Updating state: ${this.Name}`);
    if (input._keys.backward) {
      if (input._keys.shift) {
        this._parent.SetState("runbackwards");
      }
      return;
    }

    this._parent.SetState("idle");
  }
}

class AttackState extends State {
  constructor(parent) {
    super(parent);
    this._finishedCallback = null; // Guarda la referencia al callback
  }

  get Name() {
    return "attack";
  }

  Enter(prevState) {
    console.log(`Entering state: ${this.Name}`);
    const currAction = this._parent._proxy._animations["attack"].action;

    // Limpia cualquier evento previo para evitar duplicados
    if (this._finishedCallback) {
      currAction.getMixer().removeEventListener("finished", this._finishedCallback);
    }

    // Define el callback para el evento "finished"
    this._finishedCallback = () => {
      if (this._parent._currentState.Name === "attack") {
        console.log("Jump attack finished, transitioning to idle");
        this._parent.SetState("idle"); // Cambia al estado idle cuando termine
      }
    };

    // Registra el evento "finished"
    currAction.getMixer().addEventListener("finished", this._finishedCallback);

    // Configura y reproduce la animación
    currAction.enabled = true;
    currAction.loop = THREE.LoopOnce; // Ejecuta la animación solo una vez
    currAction.clampWhenFinished = true; // Detiene la animación al final
    currAction.time = 0.0; // Reinicia la animación
    currAction.reset(); // Asegúrate de reiniciar la animación
    currAction.setEffectiveTimeScale(1.0);
    currAction.setEffectiveWeight(1.0);

    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      currAction.crossFadeFrom(prevAction, 0.5, true);
    }

    currAction.play();
  }

  Exit() {
    const currAction = this._parent._proxy._animations["attack"].action;

    // Elimina el evento "finished" para evitar duplicados
    if (this._finishedCallback) {
      currAction.getMixer().removeEventListener("finished", this._finishedCallback);
      this._finishedCallback = null; // Limpia la referencia al callback
    }
  }

  Update() {
    console.log(`Updating state: ${this.Name}`);
    // No permite transiciones adicionales mientras se ejecuta el ataque
  }
}