import { _decorator, Component, Node, Button, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayButton')
export class PlayButton extends Component {

    onPlayButtonClick() {
        // "GameScene" 씬으로 로드
        director.loadScene('GameScene');
    }

}
