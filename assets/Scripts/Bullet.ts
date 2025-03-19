import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, RigidBody2D} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    
     onLoad() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        } else {
            console.error("Collider가 없습니다.");
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        
        if (otherCollider.tag === 2) { 
            this.node.destroy();
        }
        
    }

    update(deltaTime: number) {
        // Y 좌표가 500 이상이면 오브젝트 삭제
        if (this.node.position.y >= 500) {
            this.node.destroy();
        }
    }



}


