import { RenderMode } from "../core/enum/RenderMode";
import Color from "../core/math/color";

export default class worldSettings {
    public static color: Color  = new Color(0.51, 0.51, 0.51);
    public static strength: number = 1.0;
    public static renderPass: number = 0;
    public static renderMode: RenderMode = RenderMode.TRIANGLES;
    public static environmentTexture: WebGLTexture | null = null;
}