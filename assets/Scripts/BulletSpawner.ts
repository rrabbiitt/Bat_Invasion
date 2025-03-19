import { _decorator, Component, Node, Prefab, instantiate, RigidBody2D, Vec2, director } from 'cc';
const { ccclass, property } = _decorator;

import { LevelUp } from './LevelUp';

@ccclass('BulletSpawner')
export class BulletSpawner extends Component {

    @property({
        type:LevelUp
    })
    public levelUp: LevelUp;

    @property(Prefab)
    public bullet1Prefab: Prefab;

    @property(Prefab)
    public bullet2Prefab: Prefab;

    @property(Prefab)
    public bullet3Prefab: Prefab;

    @property
    public fireRate: number = 0.001;  // 총알 발사 주기 (기본값은 0.001초)

    @property
    public bulletSpawnDelay: number = 1;  // 총알 생성 속도 조절 (기본값 0.5초)

    @property(Node)
    public firePoint: Node;

    private spawnTimer: number = 0;  // 총알 생성 타이머
    public bulletPrefab: Prefab = null;

    @property
    public bulletSpeed: number = 10;

    onLoad() {
        // 최초 한 번 호출하여 타이머 설정 시작
        this.spawnTimer = this.bulletSpawnDelay;
        this.bulletPrefab = this.bullet1Prefab;
        this.schedule(this.checkBulletSizeSpeed, 1); // 1초마다 체크
    }

    checkBulletSizeSpeed(){
        if(this.levelUp.bulletSize == 1){
            this.bulletPrefab = this.bullet1Prefab;
        }
        if(this.levelUp.bulletSize == 2){
            this.bulletPrefab = this.bullet2Prefab;
        }
        if(this.levelUp.bulletSize == 3){
            this.bulletPrefab = this.bullet3Prefab;
        }
        if(this.levelUp.bulletSpeedIndex == 1){
            this.bulletSpawnDelay = 1;
        }
        if(this.levelUp.bulletSpeedIndex == 2){
            this.bulletSpawnDelay = 0.75;
        }
        if(this.levelUp.bulletSpeedIndex == 3){
            this.bulletSpawnDelay = 0.5;
        }
    }

    update(deltaTime: number) {
        // spawnTimer를 갱신하여 일정 간격마다 총알 발사
        this.spawnTimer -= deltaTime;
        
        if (this.spawnTimer <= 0) {
            this.fireBullet();  // 총알 발사
            this.spawnTimer = this.bulletSpawnDelay;  // 타이머 초기화
        }

    }

    fireBullet() {
        const bullet = instantiate(this.bulletPrefab);

        bullet.setPosition(this.firePoint.position); 

        this.node.parent.addChild(bullet);

        const rigidBody = bullet.getComponent(RigidBody2D);
        if (rigidBody) {
            // 일정한 속도를 설정
            rigidBody.linearVelocity = new Vec2(0, this.bulletSpeed);  // y축 방향으로 일정한 속도 설정
        }
    }

    resetBullet() {
        this.bulletPrefab = this.bullet1Prefab;
        this.bulletSpawnDelay = 1;
    }
}
