import { RenderMode } from "../core/enum/RenderMode";

export default class worldSettings {
    public static strength: number = 1.0;
    public static renderPass: number = 0;
    public static renderMode: RenderMode = RenderMode.TRIANGLES;
    public static environmentTexture: WebGLTexture | null = null;
}