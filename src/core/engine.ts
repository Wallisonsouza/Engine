import { Main } from "../../game/logic/main";
import LifeCycleEvents from "./components/CallbackManager";
import Camera from "./components/Camera";
import Display from "./components/Display";
import RendererManager from "./components/RenderManager";
import { loadDependencies } from "./EngineDependences";
import Input from "./input/Input";
import SceneManager from "./managers/SceneManager";
import Time from "./Time";

export default class Engine {

    public static gl: WebGL2RenderingContext;

    private time: Time;

    constructor(API: WebGL2RenderingContext) {
        Engine.gl = API;
        this.time = new Time(
            this.awake.bind(this),
            undefined,
            this.update.bind(this),
            this.fixedUpdate.bind(this),
        );
    }

    public init() {
        Main();
    }

    
    private awake() {
        LifeCycleEvents.emit("awake");
       
    }

    private fixedUpdate() {
       
    }

    private update(): void {
     
        const gl = Engine.gl;
        const camera = Camera.main;
        camera.aspectRatio = Display.getAspectRatio();
      
        camera.uniformBlock.setMat4("camera_view", camera.viewMatrix.getData());
        camera.uniformBlock.setMat4("camera_projection", camera.projectionMatrix.getData());
        camera.uniformBlock.setVec3("camera_position", camera.transform.position.toFloat32Array());
     
        const [r, g, b, a] = camera.clearColor.rgba;
        gl.clearColor(r, g, b, a);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        const gameObjects = SceneManager.getAllGameObjects();
        RendererManager.collectRenderers(gameObjects);
        LifeCycleEvents.emit("render", gl, camera);
        LifeCycleEvents.emit("update");
        Input.clearInputs();
      
    }


    public async load() {
        await loadDependencies();
    }

    public start() {
        Display.applyResolution();
        LifeCycleEvents.emit("start");
        Display.traceErrors = false;
        SceneManager.getCurrentScene();
        Display.traceErrors = true;
        this.time.start();
        Input.start();
    }

    public pause() {
        this.time.pause();
    }

    public resume() {
        this.time.resume();
    }

    public stop(): void {
        this.time.stop();
        console.info("Engine encerrada");
    }
}
