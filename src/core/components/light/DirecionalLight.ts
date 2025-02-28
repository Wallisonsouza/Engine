import Gizmos from "../../factory/Gizmos";
import Color from "../../math/color";
import Vector3 from "../../math/Vector3";
import Light from "./Light";

export default class DirecionalLight extends Light {

    public static readonly TYPE = "DirecionalLight";

    constructor() {
        super(DirecionalLight.TYPE);
    }

    public static angle: number = 0.0;
    
    public onDrawGizmos(): void {

        Gizmos.color = Color.YELLOW;
    
        const start = this.transform.position; 
        const lineLength = 5.0; 
        const end = this.transform.position.add(this.transform.forward.multiplyScalar(lineLength)); // Escala o vetor forward
    
        const center = this.transform.position;
        const rayLength = 0.5;
        const numRays = 6;
    
        for (let i = 0; i < numRays; i++) {
          
            const angle = (i / numRays) * Math.PI * 2; 
            const direction = new Vector3(Math.cos(angle), Math.sin(angle));
            const end = center.add(direction.multiplyScalar(rayLength));
    
            Gizmos.drawLine(center, end);
        }
        
        Gizmos.color = Color.ORANGE;
        Gizmos.drawLine(start, end);
    }
    
}