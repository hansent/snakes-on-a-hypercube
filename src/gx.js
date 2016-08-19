const _ = require('lodash');
const THREE = require('three');


const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );

const coneGeometry = new THREE.ConeGeometry( 1, 1, 8 );

const basicMaterial = new THREE.MeshPhongMaterial( {
    color: 0xcccccc,
    specular: 0x003300,
    shininess: 0
});

const foodMaterial = new THREE.MeshPhongMaterial( {
    color: 0xffaa44,
    specular: 0x333333,
    shininess: 1.0
});


function vec3(x,y,z){
    return new THREE.Vector3(x,y,z);
}

function mat4(){
    return new THREE.Matrix4();
}


function cube(opts){
    let pos = _.get(opts, 'pos', vec3(0,0,0));
    let material = _.get(opts, 'material', basicMaterial);
    
    var cube = new THREE.Mesh( boxGeometry, material );
    cube.position.copy(pos);

    return cube;
}

function food_cube(opts){
    return cube({material: foodMaterial});
}


function obj3d(){
    return new THREE.Object3D();ob
}



module.exports = {
    vec3,
    mat4,
    cube,
    obj3d,
    food_cube
};


