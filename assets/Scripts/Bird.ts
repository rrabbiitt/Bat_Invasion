import { _decorator, Component, Node, Vec3, EventTouch, Animation, AnimationClip, Prefab, instantiate, PhysicsSystem2D, RigidBody2D, Vec2, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl';

@ccclass('Bird')
export class Bird extends Component {
    
    @property({
        type:GameCtrl,
    })
    public gameCtrl: GameCtrl;

    private isDragging: boolean = false;
    private offset: Vec3 = new Vec3();
    private startPosition: Vec3 = new Vec3();

    public birdAnimation: Animation;

    onLoad() {
        this.startPosition.set(this.node.position);
        this.birdAnimation = this.getComponent(Animation);
        
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag === 2) { 
            this.gameCtrl.gameOver(); 
            //this.node.destroy();
        }
    }

    resetPosition(){
        this.node.setPosition(this.startPosition);
    }

    onTouchStart(event: EventTouch) {
        const touchPos = event.getUILocation();
        const worldPos = this.node.getWorldPosition();
        this.offset.set(worldPos.x - touchPos.x, worldPos.y - touchPos.y, 0);
        this.isDragging = true;
    }

    onTouchMove(event: EventTouch) {
        if (!this.isDragging) return;
        const touchPos = event.getUILocation();
        this.node.setWorldPosition(new Vec3(touchPos.x + this.offset.x, touchPos.y + this.offset.y, 0));
    }

    onTouchEnd(event: EventTouch) {
        this.isDragging = false;
    }
}


