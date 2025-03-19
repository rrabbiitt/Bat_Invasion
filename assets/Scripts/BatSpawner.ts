import { _decorator, Component, Node, Prefab, instantiate, randomRange, Vec3, tween, Tween, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BatSpawner')
export class BatSpawner extends Component {

    @property(Prefab)
    public blackBatPrefab: Prefab = null;

    @property(Prefab)
    public redBatPrefab: Prefab = null;

    @property
    public spawnHeight: number = 500; 
    
    @property
    public spawnInterval: number = 0.1; // 소환 간격 (초)

    @property
    public spawnXRange: number = 300;

    @property(Node)
    public bird: Node = null;

    @property
    public batSpeed: number = 300;

    @property
    public redBatSpeed: number = 500;

    onLoad() {
        this.schedule(this.spawnBat, this.spawnInterval);

        this.schedule(this.spawnRedBat, 10);
    }

    spawnBat() {
        const blackBat = instantiate(this.blackBatPrefab);

        const spawnX = randomRange(-this.spawnXRange, this.spawnXRange);
        const spawnY = this.spawnHeight;
        blackBat.setPosition(new Vec3(spawnX, spawnY, 0));

        this.node.addChild(blackBat);

        this.moveBatToBird(blackBat, this.batSpeed);
    }

    spawnRedBat() {
        const redBat = instantiate(this.redBatPrefab);

        const spawnX = randomRange(-this.spawnXRange, this.spawnXRange);
        const spawnY = this.spawnHeight;
        redBat.setPosition(new Vec3(spawnX, spawnY, 0));

        this.node.addChild(redBat);

        this.moveBatToBird(redBat, this.redBatSpeed);
    }

    moveBatToBird(bat: Node, speed: number) {
        if (!this.bird) return;

        // Bird로 이동하는 경로
        const birdPosition = this.bird.position;

        // Bat의 현재 위치와 Bird의 위치 차이 계산
        const batPosition = bat.position;
        const distanceToBird = birdPosition.subtract(batPosition).length();

        // 이동 시간 계산 (속도에 맞게)
        const duration = distanceToBird / speed;

        // Tween을 사용하여 박쥐가 Bird 위치를 지나 계속 이동하도록 설정
        tween(bat)
            .to(duration, { position: birdPosition }) // Bird로 이동
            .call(() => {
                // Bird 위치를 지나서 계속 이동하도록 추가
                this.continueBatMovement(bat, birdPosition, speed);
            })
            .start();
    }

    // Bird를 지나 계속 이동하는 함수
    continueBatMovement(bat: Node, birdPosition: Vec3, speed: number) {
        // 박쥐가 Bird 위치를 지나서 계속 나아가도록 설정
        const direction = birdPosition.subtract(bat.position).normalize();
        const newPosition = bat.position.add(direction.multiplyScalar(10)); // 계속해서 이동

        // 박쥐를 계속 이동시키는 함수
        this.schedule(() => {
            bat.setPosition(newPosition);
        }, 0.02); // 일정 시간마다 계속 이동
    }
}
