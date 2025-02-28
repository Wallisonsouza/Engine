import Color from "../../math/color";
import Component from "../Component";

export default class Light extends Component {
    
    public color: Color;
    public intensity: number;

    private static _allLights: Light[] = [];

    public static addLight(light: Light) {
        if(!this._allLights?.includes(light)) {
            this._allLights.push(light);
        }
    }

    public static getLights() {
        return this._allLights;
    }

    constructor(
        type: string = "Light",
        color: Color = Color.WHITE,
        intensity: number = 1.0,
       
    ) {
        super(type,"Light");
        this.color = color;
        this.intensity = intensity;
       
    }
}
