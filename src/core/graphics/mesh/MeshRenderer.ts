import worldSettings from "../../../worldSettings/WorldSettings";
import BufferHelper from "../../managers/BufferHelper";
import Camera from "../../components/Camera";
import MeshFilter from "../../components/MeshFilter";
import Renderer from "../../components/Renderer";
import { NullReferenceException } from "../../Error";

export default class MeshRenderer extends Renderer {

    constructor() {
        super("MeshRenderer");
    }

    public render(gl: WebGL2RenderingContext, camera: Camera): void {

        const meshFilter = this.gameObject.getComponentByType<MeshFilter>("MeshFilter");
        if (!meshFilter) return;

        const mesh = meshFilter.mesh;
        if (!mesh) {
            console.error("Mesh ou propriedades essenciais não encontradas. Verifique se a malha e o material estão definidos.");
        }
        const shader = this.material?.shader;
        if (!shader) return;


      
        // Obtém o buffer da malha
        const meshBuffer = BufferHelper.getBufferArrayObject(mesh.id);

     
        if(meshBuffer) {
            const modelMatrix = this.transform.modelMatrix;
            shader.setMat4("u_modelMatrix", modelMatrix);
    
            gl.bindVertexArray(meshBuffer);
            gl.drawElements(worldSettings.renderMode, mesh.triangles.length, mesh.indexDataType, 0);
            gl.bindVertexArray(null);
        }
       
    }
}
