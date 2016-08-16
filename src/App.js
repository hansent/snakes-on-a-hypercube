const THREE = require('three');
const DAT = require('dat-gui');
const OrbitControls = require('three-orbit-controls')(THREE);

const Game = require('./Game');




const NEAR = 0.1;
const FAR = 1000;


export default class App {
    constructor() {

        //this._gui = new DAT.GUI();
        //this._state = {};

        this._renderer = new THREE.WebGLRenderer({antialias: true});
        this._camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, NEAR, FAR);
        this._camera.position.set(0,5,10);
        this._camera.lookAt(new THREE.Vector3(0,0,0));
        this._controls = new OrbitControls(this._camera);
        this._controls.enableKeys = false;

        
        this._setup3D();
        //this._setupGUI();

        this._game = new Game();

        

        window.addEventListener('resize', (e) => this._handleResize(e), false);
        window.addEventListener('keydown', (e) => this._keyPress(e), false);

    }

    start() {
        requestAnimationFrame(()=>this._render());
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].binkeyPressd(this));
    }

    _setup3D() {
        const renderer = this._renderer;   
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderer.domElement);
    }
    
    _setupGUI(){
        const gui  = this._gui;
        const state = this._state;
        
//        gui.remember(state);
        
    }

    _render(timestamp) {
        const game = this._game;
        const scene = this._game.scene;
        const state = this._state;
        const camera = this._camera;
        const renderer = this._renderer;

        // camera.rotation.x = state.camera_angle * (Math.PI/180.0);
        // camera.position.y = state.camera_y;
        // camera.position.z = state.camera_z;
        renderer.render(scene, camera);
        requestAnimationFrame(()=>this._render());
    }


    _keyPress(event){
        console.log('key press:', event);
        this._game.onKey(event);
        
        
        
    }
    
    _handleResize(event) {
        const renderer = this._renderer;
        const camera = this._camera;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
