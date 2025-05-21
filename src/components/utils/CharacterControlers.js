import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { CharacterFSM } from "./StateMachine";
// Character proxy
class BasicCharacterControllerProxy {
  constructor(animations) {
    this._animations = animations;
  }
  getAnimations() {
    return this._animations;
  }
}

// character controller

export class BasicCharacterController {
  constructor(params) {
    this._params = params;
    this._deceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._animations = {};
    this._input = new BasicCharacterControllerInput();
    this._stateMachine = new CharacterFSM(
      new BasicCharacterControllerProxy(this._animations)
    );
    this._loadModels();
  }

  _loadModels() {
    const loader = new FBXLoader();
    loader.setPath("/");
    loader.load("warrior.fbx", (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse((c) => {
        c.castShadow = true;
      });
      this._target = fbx;
      this._params.scene.add(this._target);

      this._mixer = new THREE.AnimationMixer(this._target);
      this._manager = new THREE.LoadingManager();
      this._manager.onLoad = () => {
        this._stateMachine.SetState("idle");
      };

      const _OnLoad = (animName, anim) => {
        const clip = anim.animations[0];
        const action = this._mixer.clipAction(clip);

        this._animations[animName] = {
          clip: clip,
          action: action,
        };
      };

      const loader = new FBXLoader(this._manager);
      loader.setPath("./animations/");
      loader.load("idle.fbx", (anim) => {
        _OnLoad("idle", anim);
      });
      loader.load("walk.fbx", (anim) => {
        _OnLoad("walk", anim);
      });
      loader.load("run.fbx", (anim) => {
        _OnLoad("run", anim);
      });
      loader.load("runbackwards.fbx", (anim) => {
        _OnLoad("runbackwards", anim);
      });
      loader.load("walkback.fbx", (anim) => {
        _OnLoad("walkback", anim);
      });
      loader.load("attack.fbx", (anim) => {
        _OnLoad("attack", anim);
      });
    });
  }

  Update(timeInSeconds) {
    if (!this._target) return;
    this._stateMachine.Update(timeInSeconds, this._input);
    const velocity = this._velocity;
    const frameDeceleration = new THREE.Vector3(
      velocity.x * this._deceleration.x,
      velocity.y * this._deceleration.y,
      velocity.z * this._deceleration.z
    );
    frameDeceleration.multiplyScalar(timeInSeconds);
    frameDeceleration.z =
      Math.sign(frameDeceleration.z) *
      Math.min(Math.abs(frameDeceleration.z), Math.abs(velocity.z));

    velocity.add(frameDeceleration);

    const controlObject = this._target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();
    const acc = this._acceleration.clone();

    if (this._input._keys.shift) {
      acc.multiplyScalar(3.0);
    }

    if (this._input._keys.forward) {
      velocity.z += acc.z * timeInSeconds;
    }

    if (this._input._keys.backward) {
      velocity.z -= acc.z * timeInSeconds;
    }

    if (this._input._keys.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(
        _A,
        4.0 * Math.PI * timeInSeconds * this._acceleration.y
      );
      _R.multiply(_Q);
    }

    if (this._input._keys.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(
        _A,
        4.0 * -Math.PI * timeInSeconds * this._acceleration.y
      );
      _R.multiply(_Q);
    }

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    oldPosition.copy(controlObject.position);

    if (this._mixer) {
      this._mixer.update(timeInSeconds);
    }
  }
}

// Character input
class BasicCharacterControllerInput {
  constructor() {
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      shift: false,
      space: false,
    };
    document.addEventListener("keydown", (e) => this._onKeyDown(e), false);
    document.addEventListener("keyup", (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(e) {
    switch (e.keyCode) {
      case 87: // W
        this._keys.forward = true;
        break;
      case 83: // S
        this._keys.backward = true;
        break;
      case 65: // A
        this._keys.left = true;
        break;
      case 68: // D
        this._keys.right = true;
        break;
      case 16: // Shift
        this._keys.shift = true;
        break;
      case 32: // SPACE
        if (!this._keys.space)
          this._keys.space = true;
        break;
    }
  }
  _onKeyUp(e) {
    switch (e.keyCode) {
      case 87: // W
        this._keys.forward = false;
        break;
      case 83: // S
        this._keys.backward = false;
        break;
      case 65: // A
        this._keys.left = false;
        break;
      case 68: // D
        this._keys.right = false;
        break;
      case 16: // Shift
        this._keys.shift = false;
        break;
      case 32: // SPACE
        this._keys.space = false;
        break;
    }
  }
}