import { _decorator, Component, Node, AudioClip, AudioSource, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Audio')
export class Audio extends Component {

    @property({
        type: [AudioClip]
    })
    public clips: AudioClip[] = [];

    @property({
        type:AudioSource    
    })
    public _audioSource: AudioSource = null!;

    onLoad(){
        const audioSource = this.getComponent(AudioSource)!;
        this._audioSource = audioSource;
        director.addPersistRootNode(this.node);
    }

    onAudioQueue(index: number){
        let clip: AudioClip = this.clips[index];
        this._audioSource.playOneShot(clip);
    }

    start(){
        this._audioSource.play();
    }

    onGameOver(){
        this._audioSource.stop();
    }
}


