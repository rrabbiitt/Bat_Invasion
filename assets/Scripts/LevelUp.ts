import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

import { Results } from './Results';

@ccclass('LevelUp')
export class LevelUp extends Component {
    
    @property({
        type:Results,
    })
    
    public result: Results;

    @property({
        type: Node,
    })
    public levelUpNode: Node;

    public bulletSize: number = 1;
    public bulletSpeedIndex: number = 1;

    private levelUpTriggered: boolean = false;
    private levelUpTriggeredScores: number[] = [];

    onLoad() {
        this.schedule(this.checkLevelUp, 0.2);
    }

    checkLevelUp() {
        if (this.result.currentScore > 60) return;
        if (this.levelUpTriggeredScores.indexOf(this.result.currentScore) === -1) {
            if (this.result.currentScore % 10 === 0 && this.result.currentScore > 0) {
                this.levelUpTriggeredScores.push(this.result.currentScore);  // 현재 점수를 배열에 추가
                this.levelUpTriggered = true;  // 레벨업 상태로 설정
                director.pause();
                this.levelUpNode.active = true;
            }
        }
    }

    sizeUp(){
        if(this.bulletSize < 3){
            this.bulletSize++;
            this.levelUpTriggered = false;
            director.resume();
            this.levelUpNode.active = false;
        } else { }
    }

    speedUp(){
        if(this.bulletSpeedIndex < 3){
            this.bulletSpeedIndex++;
            this.levelUpTriggered = false;
            director.resume();
            this.levelUpNode.active = false;
        }
        else{ }
    }

    resetLevel(){
        this.bulletSize = 1;
        this.bulletSpeedIndex = 1;
        this.levelUpTriggeredScores = [];
    }
}


