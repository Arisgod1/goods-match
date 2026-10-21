import { _decorator, Component, Node, view, ResolutionPolicy } from 'cc';
import { UI } from './enum/UI';
import { Bundle } from './enum/Bundle';
import { ResMgr } from './manager/ResMgr';
import { UIMgr } from './manager/UIMgr';
const { ccclass, property } = _decorator;

@ccclass('Scene/Main')
export class Main extends Component {

    protected async start() {
        // The home/loading UI uses the same portrait frame as gameplay, including on desktop.
        view.setResolutionPolicy(ResolutionPolicy.SHOW_ALL)
        await ResMgr.loadDir(Bundle.Resources)
        UIMgr.open(UI.Loading, null, { uiBundle: Bundle.Resources })
    }

}


