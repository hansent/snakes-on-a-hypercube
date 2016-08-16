import THREE from 'three';

const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const coneGeometry = new THREE.ConeGeometry( 0.4, 1, 6 );
const purpleMaterial = new THREE.MeshPhongMaterial( {
    color: 0x6F6CC5,
    specular: 0xffffff,
    shininess: 0
});


function vec3(x,y,z){
    return new THREE.Vector3(x,y,z);
}

function mat4(){
    return new THREE.Matrix4();
}


function makeSnakeCube(pos){
    var cube = new THREE.Mesh( boxGeometry, purpleMaterial );
    cube.position.set(pos.x, pos.y, pos.z);
    console.log('cube position', cube.position, pos);

    return cube;
}


function makeSnakeBodyPart(pos){
    var bodyPart = new THREE.Mesh(coneGeometry, purpleMaterial);
    bodyPart.rotateZ(-Math.PI/2);
    bodyPart.position.set(pos.x, pos.y, pos.z);

    return bodyPart;

}


class Snake {

    constructor(){
        this.scene = new THREE.Object3D();

        this.headTransform = mat4().identity();
        this.direction = vec3(1,0,0);
        
        this.bodyParts = [];

        this.addBodyPart(vec3(0,0,0));
        this.addBodyPart(vec3(-1,0,0));
        this.addBodyPart(vec3(-2,0,0));
    }

    addBodyPart(pos){
        console.log("add part", pos);
        var cube = makeSnakeBodyPart(pos);
        this.scene.add(cube)
        this.bodyParts.push(cube);

    };

    

    tick(){

        var oldHeadPos = this.bodyParts[0].position;

        var direction = (vec3(1,0,0)).applyMatrix4(this.headTransform);
        var newPos = vec3(0,0,0);
        newPos.addVectors(oldHeadPos,  direction );

        // take off the back and add at the start of array
        var newHead = this.bodyParts.pop();
        this.bodyParts.unshift(newHead);
        newHead.position.copy(newPos);

        if(newHead.position.x > 10)
            newHead.position.setX(-10)
        if(newHead.position.x < -10)
            newHead.position.setX(10)
        
        if(newHead.position.y > 10)
            newHead.position.setY(-10)
        if(newHead.position.y < -10)
            newHead.position.setY(10)
    }

}



class Game {

    constructor(){
        const scene = this.scene =  new THREE.Scene();

        var light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(100, 100, 50);
        scene.add(light1);
        
        var light2 = new THREE.DirectionalLight(0xffffff, 1);
        light2.position.set(-100, -200, -50);
        scene.add(light2);

        var grid = new THREE.GridHelper(10, 1, 0xff0000, 0x333333);
        scene.add(grid);

        this.snake = new Snake();
        scene.add(this.snake.scene);
        
        
        
        setInterval(()=>{
            this.tick();
        }, 500)

    }


    onKey(){
        const key = event.keyCode;
        
        if (key == 37) // left
            this.snake.turnLeft();

        if (key == 39) // right
            this.snake.turnRight();

        if (key == 38) // right
            this.snake.turnDown();
        
        if (key == 40) // right
            this.snake.turnUp();
        
    }


    tick(){
        //this.snake.tick();
        //this.snake.position.add(this.v_forward);
    }

    

    
    
}


module.exports = Game;
