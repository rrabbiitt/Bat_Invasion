import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, RigidBody2D, Animation, AnimationClip, find } from 'cc';
const { ccclass, property } = _decorator;

import { Results } from './Results';
import { Audio } from './Audio';

@ccclass('BlackBat')
export class BlackBat extends Component {

    private result: Results;
    private audio: Audio;

    public blackBatAnimation: Animation;

    onLoad() {
        this.blackBatAnimation = this.getComponent(Animation);

        const resultNode = find("Canvas/Results");
        if (resultNode) {
            this.result = resultNode.getComponent(Results);
        } 

        const audioNode = find("AudioCtrl");
        if (audioNode) {
            this.audio = audioNode.getComponent(Audio);
        } 

        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        
        console.log(`BlackBat이(가) ${otherCollider.node.name}과(와) 충돌했습니다.`);

        if (otherCollider.tag === 3) { 
            this.result.addScore(); 
            this.audio.onAudioQueue(0);
            this.node.destroy();
        }

    }

    update(deltaTime: number) {
        if (this.node.position.y <= -500) {
            this.node.destroy();
        }
    }
}
