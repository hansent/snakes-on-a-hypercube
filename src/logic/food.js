const gx = require('../gx');


exports.initFood = function(){
    var foods = gx.obj3d();

    foods.in3D = false;
    
    foods.eat = function(x, y, z){
        console.log("eat")
        var pos = gx.vec3(x,y,z);
        for (let c of foods.children){
            var d = pos.distanceTo(c.position)
            if(d < 1){
                foods.remove(c)
                foods.spawn();
                return true
            }
        }
    }

    foods.spawn = function(){
        if (foods.in3D)
            foods.add( exports.randomFood3D() );
        else
            foods.add( exports.randomFood2D() );
    }


    foods.spawn();
    foods.spawn();

    return foods;
}





exports.randomFood2D = function(){
    var x = _.random(-5,5);
    var y = 0;
    var z = _.random(-5,5);

    var cube = gx.food_cube();
    cube.position.set(x,y,z);
    return cube;
}



exports.randomFood3D = function(){
    var x = _.random(-10,10);
    var y = _.random(-10,10);
    var z = _.random(-10,10); 

    var cube = gx.food_cube();
    cube.position.set(x,y,z);
    return cube;
}
