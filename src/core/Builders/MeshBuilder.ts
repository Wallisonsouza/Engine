import Mesh from "../graphics/mesh/Mesh";
import Vector2 from "../math/Vector2";
import Vector3 from "../math/Vector3";

export default class MeshBuilder {

    public static createCube(size: Vector3 = Vector3.one): Mesh {
        const halfSize = size.scale(0.5);
    
        const vertices: Vector3[] = [
            // Frente
            new Vector3(-halfSize.x, -halfSize.y, halfSize.z),
            new Vector3(halfSize.x, -halfSize.y, halfSize.z),
            new Vector3(halfSize.x, halfSize.y, halfSize.z),
            new Vector3(-halfSize.x, halfSize.y, halfSize.z),
    
            // Traseira
            new Vector3(-halfSize.x, -halfSize.y, -halfSize.z),
            new Vector3(halfSize.x, -halfSize.y, -halfSize.z),
            new Vector3(halfSize.x, halfSize.y, -halfSize.z),
            new Vector3(-halfSize.x, halfSize.y, -halfSize.z),
    
            // Topo
            new Vector3(-halfSize.x, halfSize.y, halfSize.z),
            new Vector3(halfSize.x, halfSize.y, halfSize.z),
            new Vector3(halfSize.x, halfSize.y, -halfSize.z),
            new Vector3(-halfSize.x, halfSize.y, -halfSize.z),
    
            // Fundo
            new Vector3(-halfSize.x, -halfSize.y, halfSize.z),
            new Vector3(halfSize.x, -halfSize.y, halfSize.z),
            new Vector3(halfSize.x, -halfSize.y, -halfSize.z),
            new Vector3(-halfSize.x, -halfSize.y, -halfSize.z),
    
            // Lado esquerdo
            new Vector3(-halfSize.x, -halfSize.y, halfSize.z),
            new Vector3(-halfSize.x, -halfSize.y, -halfSize.z),
            new Vector3(-halfSize.x, halfSize.y, -halfSize.z),
            new Vector3(-halfSize.x, halfSize.y, halfSize.z),
    
            // Lado direito
            new Vector3(halfSize.x, -halfSize.y, -halfSize.z),
            new Vector3(halfSize.x, -halfSize.y, halfSize.z),
            new Vector3(halfSize.x, halfSize.y, halfSize.z),
            new Vector3(halfSize.x, halfSize.y, -halfSize.z),
        ];
    
        const normals: Vector3[] = [
            // Frente
            ...Array(4).fill(new Vector3(0, 0, 1)),
            // Traseira
            ...Array(4).fill(new Vector3(0, 0, -1)),
            // Topo
            ...Array(4).fill(new Vector3(0, 1, 0)),
            // Fundo
            ...Array(4).fill(new Vector3(0, -1, 0)),
            // Lado esquerdo
            ...Array(4).fill(new Vector3(-1, 0, 0)),
            // Lado direito
            ...Array(4).fill(new Vector3(1, 0, 0)),
        ];
        
    
        const uvs: Vector2[] = Array(6).flatMap(() => [
            new Vector2(0, 0), 
            new Vector2(1, 0), 
            new Vector2(1, 1), 
            new Vector2(0, 1),
        ]);
    
        const triangles: number[] = [
            // Frente
            0, 2, 1, 0, 3, 2,
            // Traseira
            4, 6, 5, 4, 7, 6,
            // Topo
            8, 10, 9, 8, 11, 10,
            // Fundo
            12, 14, 13, 12, 15, 14,
            // Lado esquerdo
            16, 18, 17, 16, 19, 18,
            // Lado direito
            20, 22, 21, 20, 23, 22,
        ];
    
        return new Mesh(vertices, triangles, normals, uvs);
    }
    
    public static createSquare(size: Vector3 = Vector3.one) {
        const halfSize = size.scale(0.5);
    
        // Definindo as coordenadas dos vértices
        const VERTICES: Vector3[] = [
            new Vector3(-halfSize.x, -halfSize.y, 0),  // Vértice inferior esquerdo
            new Vector3(halfSize.x, -halfSize.y, 0),   // Vértice inferior direito
            new Vector3(-halfSize.x, halfSize.y, 0),   // Vértice superior esquerdo
            new Vector3(halfSize.x, halfSize.y, 0),    // Vértice superior direito
        ];
    
        const NORMALS: Vector3[] = [
            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),
        ];
    
        return new Mesh(VERTICES,[1, 1, 1, 1 , 1, 1, 1], NORMALS);
    }
   
    public static createSphere(radius: number = 1, latitudes: number = 64, longitudes: number = 64): Mesh {
        const vertices: Vector3[] = [];
        const normals: Vector3[] = [];
        const uvs: Vector2[] = [];
        const indices: number[] = [];
    
        // Gerar vértices, normais e coordenadas UV
        for (let lat = 0; lat <= latitudes; lat++) {
            const theta = lat * Math.PI / latitudes; // Ângulo latitudinal
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);
            
            // Ajuste para V usando a latitude, diminuindo esticamento próximo aos polos
            const v = lat / latitudes;
    
            for (let lon = 0; lon <= longitudes; lon++) {
                const phi = lon * 2 * Math.PI / longitudes; // Ângulo longitudinal
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);
    
                const u = lon  / longitudes; // Coordenada U (longitude)
    
                // Adiciona os dados
                vertices.push(new Vector3(radius * cosPhi * sinTheta, radius * cosTheta, radius * sinPhi * sinTheta));
                normals.push(new Vector3(cosPhi * sinTheta, cosTheta, sinPhi * sinTheta)); // Adiciona as normais
    
                // Mapeamento UV ajustado para reduzir esticamento
                uvs.push(new Vector2(u, 1 - v )); // Ajusta o V
            }
        }
    
        // Gerar índices
        for (let lat = 0; lat < latitudes; lat++) {
            for (let lon = 0; lon < longitudes; lon++) {
                const first = (lat * (longitudes + 1)) + lon;
                const second = first + (longitudes + 1);
    
                // Adiciona os índices das faces
                indices.push(first, second, first + 1);
                indices.push(second, second + 1, first + 1);
            }
        }
    
        return new Mesh(
            vertices, 
            indices,
            normals, 
            uvs, 
        );
    }

    public static createPlane(width: number = 100, depth: number = 100, subdivisionsX: number = 200, subdivisionsZ: number = 100): Mesh {
    
        const vertices: Vector3[] = [];
        const normals: Vector3[] = [];
        const uvs: Vector2[] = [];
        const indices: number[] = [];
    
        // Passo para subdividir o plano ao longo dos eixos X e Z
        const stepX = width / subdivisionsX;
        const stepZ = depth / subdivisionsZ;
    
        // Geração dos vértices, normais e UVs
        for (let z = 0; z <= subdivisionsZ; z++) {
            for (let x = 0; x <= subdivisionsX; x++) {
                // Posição do vértice
                const posX = x * stepX - width / 2;  // Centraliza no eixo X
                const posZ = z * stepZ - depth / 2;  // Centraliza no eixo Z
                vertices.push(new Vector3(posX, 0, posZ));
    
                // Normal apontando para cima
                normals.push(new Vector3(0, 1, 0));
    
                // Coordenadas UV
                const u = x / subdivisionsX;
                const v = z / subdivisionsZ;
                uvs.push(new Vector2(u, v));
            }
        }
    
        // Geração dos índices para conectar os vértices
        for (let z = 0; z < subdivisionsZ; z++) {
            for (let x = 0; x < subdivisionsX; x++) {
                // Cálculo dos índices dos vértices
                const topLeft = z * (subdivisionsX + 1) + x;
                const topRight = topLeft + 1;
                const bottomLeft = topLeft + subdivisionsX + 1;
                const bottomRight = bottomLeft + 1;
    
                // Primeiro triângulo do quad
                indices.push(topLeft, bottomLeft, topRight);
                // Segundo triângulo do quad
                indices.push(topRight, bottomLeft, bottomRight);
            }
        }
    
        // Retorna a malha com os dados gerados
        return new Mesh(
            vertices, 
            indices,
            normals,
            uvs, 
           
        );
    }
}