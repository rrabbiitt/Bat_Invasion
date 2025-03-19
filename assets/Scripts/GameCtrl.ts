import { _decorator, Component, Node, CCInteger, input, Input, EventKeyboard, KeyCode, director, EventTouch, EventMouse, AudioClip, AudioSource,} from 'cc';
const { ccclass, property } = _decorator;

import { Sky } from './Sky';
import { Results } from './Results';
import { Bird } from './Bird';
import { BlackBat } from './BlackBat';
import { Bullet } from './Bullet';
import { BulletSpawner } from './BulletSpawner';
import { LevelUp } from './LevelUp';
import { Audio } from './Audio';

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type:Component,
    })
    public audio: Audio;

    @property({
        type:Component,
    })
    public sky: Sky;

    @property({
        type:CCInteger
    })
    public speed: number = 100;

    @property({
        type:Results,
    })
    public result: Results;

    @property({
        type: Bird,
    })
    public bird: Bird;

    @property({
        type:BlackBat,
    })
    public blackBat: BlackBat;

    @property({
        type:Bullet,
    })
    public bullet: Bullet;

    @property({
        type:BulletSpawner,
    })
    public bulletSpawner: BulletSpawner;

    @property({
        type:LevelUp,
    })
    public levelUp: LevelUp;

    public isGameOver: boolean = false;

    onLoad(){
        this.initListener();
        this.result.resetScore();
        this.startGame();
    }

    initListener(){
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
    }

    //테스트용
    onKeyDown(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.gameOver();
            break;
            case KeyCode.KEY_P:
                this.result.addScore();
            break;
            case KeyCode.KEY_Q:
                this.resetGame();
        }
    }

    onMouseDown(event: EventMouse){
        if (director.isPaused()){
            this.resetGame();
        }
    }

    onTouchStart(event: EventTouch){
        if(director.isPaused()){
            this.resetGame();
        }
    }

    startGame(){
        this.result.hideResults();
        this.bird.birdAnimation.play();
        this.audio.start();
        
        if(this.bird){
            this.bird.resetPosition();
        }

        this.result.resetScore();
        director.resume();
    }

    resumeGame(){
        this.result.hideResults();
        director.resume();
        this.isGameOver = false;
    }

    gameOver(){
        // 씬의 모든 하위 노드를 재귀적으로 탐색
        const scene = director.getScene();
    
        // 재귀적으로 자식 노드를 모두 탐색하는 함수
        const destroyNodesWithComponents = (node: Node) => {
            if (node.getComponent(BlackBat)) {
                node.destroy();
            }
            if (node.getComponent(Bullet)) {
                node.destroy();
            }
            // 자식 노드가 있으면 재귀적으로 호출
            node.children.forEach(child => {
                destroyNodesWithComponents(child);
            });
        };

        // 씬의 루트 노드부터 시작하여 탐색
        destroyNodesWithComponents(scene);
        this.audio.onAudioQueue(1);
        this.audio.onGameOver();
        this.result.showResults();
        director.pause();
        this.isGameOver = true;
    }

    resetGame(){
        this.result.resetScore();
        this.bulletSpawner.resetBullet();
        this.levelUp.resetLevel();
        this.startGame();
        this.isGameOver = false;
    }
}


