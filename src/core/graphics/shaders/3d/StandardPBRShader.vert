#version 300 es
precision highp float;

layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_normal;
layout(location = 2) in vec2 a_uv;
layout(location = 3) in vec3 a_tangent;

layout(std140) uniform CameraUniform {
    mat4 viewMatrix;
    mat4 projectionMatrix;
    vec3 cameraPosition;
};

uniform mat4 u_modelMatrix;

struct PassData {
    vec3 localSpace; 
    vec3 worldSpace; 
    vec3 cameraSpace; 
    vec3 screenSpace; 
    vec2 uv;
    vec3 tangent;
    vec3 bitangent;
    vec3 normal;
    vec3 cameraPosition;
};

out PassData pass;

void main() {


    vec4 localSpace = vec4(a_position, 1.0); 
    vec4 worldSpace = u_modelMatrix * localSpace; 
    vec4 cameraSpace = viewMatrix * worldSpace; 
    vec4 screenSpace = projectionMatrix * cameraSpace; 

    mat3 normalMatrix = mat3(inverse(transpose(u_modelMatrix)));

    // normais, tangentes e bitangentes
    pass.normal = normalize(normalMatrix * a_normal);
    pass.tangent = normalize(normalMatrix * a_tangent);
    pass.bitangent = normalize(cross(pass.normal, pass.tangent));

    pass.uv = a_uv;
    pass.localSpace = localSpace.xyz; 
    pass.worldSpace = worldSpace.xyz;
    pass.cameraSpace = cameraSpace.xyz;
    pass.screenSpace = screenSpace.xyz;
    pass.cameraPosition = cameraPosition;

    gl_Position = screenSpace;
}
