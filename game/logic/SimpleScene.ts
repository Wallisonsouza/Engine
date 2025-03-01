import { GLBParser } from "../../plugins/glb/glbParser";
import Conversors from "../../plugins/GLTF/ConvertGltf";
import GLTFParser from "../../plugins/GLTF/GLTFLoader";
import GameObjectBuilder from "../../src/core/Builders/GameObjectBuilder";
import CameraControler from "./CameraControler";
import Camera from "../../src/core/components/Camera";
import Scrypt from "../../src/core/components/Scrypt";
import LoadResources from "../../src/core/managers/LoadResources";
import SceneManager from "../../src/core/managers/SceneManager";
import Color from "../../src/core/math/color";

export default class SimpleScene extends Scrypt {
        
    start(): void {

        const camera = GameObjectBuilder.createMainCamera();
        camera.addComponent(CameraControler);

        const cube = GameObjectBuilder.createCube();
    
        const sunLight = GameObjectBuilder.createSunLight();
        const ambientLight = GameObjectBuilder.createAmbientLight(new Color(0.051, 0.051, 0.051));
        const cam = camera.getComponentByType<Camera>(Camera.TYPE);
        if(cam) {
            cam.clearColor = new Color(0.051, 0.051, 0.051).toSRGB();
        }
    
        SceneManager.addGameObjects([
                camera, 
                ambientLight,
                sunLight,
                cube
            ]
        );

        LoadResources.loadGLB("assets/3d/car.glb").then((data) => {
            const gltf = GLBParser.toGLTF(data);
            const parsedGflt = GLTFParser.parse(gltf);
            
            Conversors.toEngine3dObject(parsedGflt,
                (object) =>{ 
                    SceneManager.addGameObject(object);
                    
                }
            );
        });
    }

}
