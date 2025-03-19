import { _decorator, Component, Node, Vec3, director } from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl';

@ccclass('Sky')
export class Sky extends Component {
    
    @property({
        type: Node,
    })
    public sky1: Node;

    @property({
        type: Node,
    })
    public sky2: Node;

    @property({
        type: Node,
    })
    public sky3: Node;

    public skyHeight: number = 960;
    
    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;
    public tempStartLocation3 = new Vec3;

    public gameCtrlSpeed = new GameCtrl;
    public skySpeed: number;

    onLoad() {
        this.startUp();
    }

    startUp() {
        // 배경들이 이어지도록 설정
        this.tempStartLocation1.y = 0;
        this.tempStartLocation2.y = this.skyHeight;  // skyHeight로 설정
        this.tempStartLocation3.y = this.skyHeight * 2; // skyHeight * 2로 설정
    
        this.sky1.setPosition(this.tempStartLocation1);
        this.sky2.setPosition(this.tempStartLocation2);
        this.sky3.setPosition(this.tempStartLocation3);
    }
    
    update(deltaTime: number) {
        this.skySpeed = this.gameCtrlSpeed.speed;

        this.tempStartLocation1 = this.sky1.position;
        this.tempStartLocation2 = this.sky2.position;
        this.tempStartLocation3 = this.sky3.position;
    
        // 배경들을 위로 움직이게 처리
        this.tempStartLocation1.y -= this.skySpeed * deltaTime;
        this.tempStartLocation2.y -= this.skySpeed * deltaTime;
        this.tempStartLocation3.y -= this.skySpeed * deltaTime;
    
        // sky가 -960에 도달하면 960으로 위치 변경
        if (this.tempStartLocation1.y <= -this.skyHeight) {
            this.tempStartLocation1.y = this.skyHeight * 2;  // 두 번째 배경에 이어지도록 설정
        }
    
        if (this.tempStartLocation2.y <= -this.skyHeight) {
            this.tempStartLocation2.y = this.skyHeight * 2;  // 두 번째 배경에 이어지도록 설정
        }
    
        if (this.tempStartLocation3.y <= -this.skyHeight) {
            this.tempStartLocation3.y = this.skyHeight * 2;  // 두 번째 배경에 이어지도록 설정
        }
    
        this.sky1.setPosition(this.tempStartLocation1);
        this.sky2.setPosition(this.tempStartLocation2);
        this.sky3.setPosition(this.tempStartLocation3);
    }
}
