const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);
const loop = require('raf-loop');
const EventEmitter = require('events');


module.exports = function game(){

    var g = new EventEmitter();

    let renderer = initRenderer();
    let scene = initScene();
    let camera = initCamera(scene);

    // make these accesible on game object
    g.renderer = renderer;
    g.camera = camera;
    g.scene = scene;

    // render loop using request animation frame
    g._renderLoop = loop(function(dt){
        g.emit('tick', dt);
        renderer.render(scene, camera);
    });

    // start and stop functions to controll render loop
    g.start = function(){
        g.emit('start');
        g._renderLoop.start();
    }
    g.stop = function(){
        g.emit('stop');
        g._renderLoop.stop();
    }

    // dont add renderer dom element to body until page is loaded
    window.addEventListener('load', function() {
        g.emit('init');
        g.renderer.setSize(window.innerWidth, window.innerHeight);
        g.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderer.domElement);
        g.emit('ready');
    }, true);
    
    // always resize to fullscreen    
    window.addEventListener('resize', function(){
        let w = window.innerWidth;
        let h = window.innerHeight;
        g.emit('resize', w, h);
        g.renderer.setSize(w, h);
        g.camera.aspect = w / h;
        g.camera.updateProjectionMatrix();
    }, true); // use capture
    
    // pass on key event
    window.addEventListener("keydown", function(event){
        console.log('keydown', event.key);
        g.emit('keydown', event);
    }, true);


    // finally return the game
    return g;
}








function initRenderer(){
    let renderer = new THREE.WebGLRenderer({antialias: true});
    return renderer;
}


function initCamera(scene){
    let fov = 75;
    let aspect =  window.innerWidth / window.innerHeight;
    let near = 0.1;
    let far = 1000;
    let cam = new THREE.PerspectiveCamera(fov, aspect, near, far);

    let origin = new THREE.Vector3(0,0,0);
    let position = new THREE.Vector3(0,20,10);
    cam.position.copy(position);
    cam.lookAt(origin);

    cam.controls = new OrbitControls(cam);
    cam.controls.enableKeys = false;

    cam.light = new THREE.PointLight(0xaaeeaa);
    cam.add(cam.light);
    scene.add(cam);

    
    return cam;
}



function initGrid(){
    return 
}


function initScene(){
    let scene = new THREE.Scene();

    let light = new THREE.AmbientLight( 0x404040 );
    scene.add( light );
    
    let grid = new THREE.GridHelper(10,1, 0xff0000, 0x333333);
    scene.add(grid);

    return scene;
}

















