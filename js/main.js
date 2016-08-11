
var container, stats;

var camera, scene, renderer;

var cube, plane, world;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var direction;


init();
animate();

function init() {

        direction = new THREE.Vector3(1,0,0);
    
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );


        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.y = 20;
        camera.position.z = 20;
        camera.rotation.x =  - Math.PI / 4

        scene = new THREE.Scene();
        world = new THREE.Object3D();
        scene.add(world);
    

        // Cube
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
        cube = new THREE.Mesh( geometry, material );
        cube.position.y = 1;
        world.add( cube );

        // Plane

        var geometry = new THREE.PlaneBufferGeometry( 20, 20 );
        geometry.rotateX( - Math.PI / 2 );

        var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );

        plane = new THREE.Mesh( geometry, material );
        world.add( plane );


        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );


        document.addEventListener('keydown', onKeyDown, false); 
        window.addEventListener( 'resize', onWindowResize, false );

}

function onKeyDown(e) {

    e = e || window.event;

    var m = new THREE.Matrix4();
    
    // if (e.keyCode == '38') {
    //     console.log('up');
    //     if (rotateX)
    //         m.makeRotationX(-Math.PI/2);
    //     else
    //         m.makeRotationZ(-Math.PI/2);
    // }
    // else if (e.keyCode == '40') {
    //     console.log('down');
    //     if (rotateX)
    //         m.makeRotationX(-Math.PI/2);
    //     else
    //         m.makeRotationZ(-Math.PI/2);
            
    // }
    if (e.keyCode == '37') {
        console.log('left');
        m.makeRotationY(Math.PI/2);
       // left arrow
    }
    else if (e.keyCode == '39') {
        console.log('right');
        m.makeRotationY(-Math.PI/2);
    }


    direction.applyMatrix4(m);

}




function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseDown( event ) {

        event.preventDefault();

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'mouseout', onDocumentMouseOut, false );

        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove( event ) {

        mouseX = event.clientX - windowHalfX;

        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

}

function onDocumentMouseUp( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart( event ) {

        if ( event.touches.length === 1 ) {

                event.preventDefault();

                mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
                targetRotationOnMouseDown = targetRotation;

        }

}

function onDocumentTouchMove( event ) {

        if ( event.touches.length === 1 ) {

                event.preventDefault();

                mouseX = event.touches[ 0 ].pageX - windowHalfX;
                targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

        }

}


function update(){
    cube.position.add(direction);

    if(cube.position.x > 10 || cube.position.x < -10)
        cube.position.x *= -1;

    else if(cube.position.y > 10 || cube.position.y < -10)
        cube.position.y *= -1;
    
    else if(cube.position.z > 10 || cube.position.z < -10)
        cube.position.z *= -1;
}

setInterval(update, 500);


function animate() {
        requestAnimationFrame( animate );
        render();
}

function render() {

        world.rotation.y  += ( targetRotation - world.rotation.y ) * 0.05;
        renderer.render(scene, camera);
}
