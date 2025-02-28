import AmbientLight from "../components/light/AmbientLight";
import Camera from "../components/Camera";
import DirecionalLight from "../components/light/DirecionalLight";
import GameObject from "../components/GameObject";
import MeshFilter from "../components/MeshFilter";
import PBRMaterial from "../graphics/material/PBRMaterial";
import MeshRenderer from "../graphics/mesh/MeshRenderer";
import MeshManager from "../managers/MeshManager";
import Color from "../math/color";
import Quaternion from "../math/Quaternion";
import Vector3 from "../math/Vector3";
import MeshBuilder from "./MeshBuilder";

export default class GameObjectBuilder {

    public static createMainCamera(): GameObject {
        const cameraObject = new GameObject("Camera");
        cameraObject.tags = ["MainCamera"];
        cameraObject.addComponent(Camera);
        cameraObject.transform.position = new Vector3(0, 0, 10);
        return cameraObject;
    }

    public static createCube(name?: string ): GameObject {
        const cubeGameObject = new GameObject();
        cubeGameObject.name = name ? name : `New Cube_${cubeGameObject.id}`;
        const cubeMesh = MeshManager.getByName("cube");
        const meshFilter = new MeshFilter(cubeMesh);
        const meshRenderer = new MeshRenderer();
        const material = new PBRMaterial();
        meshRenderer.material = material;
        cubeGameObject.addComponentInstance(meshRenderer);
        cubeGameObject.addComponentInstance(meshFilter);
        return cubeGameObject;
    }

    public static createSphere(name: string = "New Sphere"): GameObject {
        const sphere = new GameObject(name);
        const mesh = MeshBuilder.createSphere();
        const meshFilter = new MeshFilter(mesh);
        const meshRenderer = new MeshRenderer();
        const material = new PBRMaterial();
        meshRenderer.material = material;
        sphere.addComponentInstance(meshRenderer);
        sphere.addComponentInstance(meshFilter);
        return sphere;
    }

    public static createPlane(name: string = "New Plane"): GameObject {
        const planeGameObject = new GameObject(name);
        const planeMesh = MeshManager.getByName("plane");
        const meshFilter = new MeshFilter(planeMesh);
        const meshRenderer = new MeshRenderer();
        const material = new PBRMaterial();
        meshRenderer.material = material;
        planeGameObject.addComponentInstance(meshRenderer);
        planeGameObject.addComponentInstance(meshFilter);
        return planeGameObject;
    }

    public static createDirecionalLight(name: string = "New Direcional Light"): GameObject {
        const lightGameObject = new GameObject();
        lightGameObject.transform.rotation = Quaternion.eulerNumber(90, 0, 0);
        lightGameObject.transform.position = new Vector3(0, 5, 0);
        lightGameObject.name = name;
        const lightComponent = new DirecionalLight();
        lightComponent.setGameObject(lightGameObject);
        lightGameObject.addComponentInstance(lightComponent);
        return lightGameObject;
    }

    public static createSunLight(): GameObject {
        const lightGameObject = new GameObject();
        lightGameObject.transform.rotation =  Quaternion.fromEulerAnglesVector3(new Vector3(90, 0, 0)); 
        lightGameObject.transform.position = new Vector3(0, 5, 0);
        const lightComponent = new DirecionalLight();
        lightComponent.setGameObject(lightGameObject);
        lightGameObject.addComponentInstance(lightComponent);
        return lightGameObject;
    }

    public static createAmbientLight(color?: Color): GameObject {
        const lightGameObject = new GameObject();
        const lightComponent = new AmbientLight(color);
        lightComponent.setGameObject(lightGameObject);
        lightGameObject.addComponentInstance(lightComponent);
        return lightGameObject;
    }
}
