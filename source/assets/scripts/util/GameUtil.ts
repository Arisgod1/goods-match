import { Vec3, game, sys } from "cc";

export class GameUtil {

    public static exit(): void {
        switch (sys.platform) {
            case sys.Platform.MOBILE_BROWSER:
            case sys.Platform.DESKTOP_BROWSER:
            case sys.Platform.ANDROID:
                game.end()
                break;
        }
    }

}


