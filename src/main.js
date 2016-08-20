const _ = require('lodash')
const game = require('./game');
const gx = require('./gx');

const food = require('./logic/food');


const g = game();
g.on('init', initScene );
g.on('keydown', onKey);
g.start();

window.g = g;
window.update = update;
window.moveSnake = moveSnake;
window.printSnake = printSnake;




function initScene(){
    g.food = food.initFood();
    g.scene.add(g.food);
    
    g.snake = initSnake(4);
    g.scene.add(g.snake);

}

function update(){
    
    updateDirection();
    moveSnake();
    updateFood();
    
}

function onKey(event){
    console.log("keydown", event);

    if (event.key == "Enter")
        return update();

    if (event.key == "g"){
        printSnake();
        growSnake();
        printSnake();
        return;
    }


    if (event.key == "f"){
        console.log(g.food);
        updateFood();
        console.log(g.food);
        return;
    }

    
    g.lastKey = event.key;
    update();
}




function updateDirection(){
    let d = gx.vec3(1,0,0);

    if (_.includes(['ArrowLeft', 'a'], g.lastKey))
        d.set(-1,0,0);
    if (_.includes(['ArrowRight', 'd'], g.lastKey))
        d.set(1,0,0);
    if (g.lastKey == 'ArrowUp')
        d.set(0,0,-1);
    if (g.lastKey == 'ArrowDown')
        d.set(0,0,1);
    if (g.lastKey == 'w')
        d.set(0,1,0);
    if (g.lastKey == 's')
        d.set(0,-1,0);    
    g.snake.userData.direction.copy(d);
}


function updateFood(){
    console.log("updateFood", g.snakeHead.position);

    var x = g.snakeHead.position.x;
    var y = g.snakeHead.position.y;
    var z = g.snakeHead.position.z;

    var ate_food = g.food.eat(x,y,z);
    
    console.log("ate food: ", ate_food);

    if( ate_food )
        growSnake();

    
}



function growSnake(incr){
    incr = incr || 1;
    g.snake.userData.length += incr;
    console.log('growSnake', incr);
}


function moveSnake(){
    let snake = g.snake;
    let length = snake.userData.length;
    let direction = snake.userData.direction;

    // propagate head
    for(let block of snake.children){
        let age = block.userData.age +1;
        block.userData.age = age;
        if(age >= length)
            snake.remove(block);
    }

    let oldHead = _.last(snake.children);
    let newHead = snakeBlock(1);
    newHead.position.copy(oldHead.position);
    newHead.position.add(direction);

    g.snakeHead = newHead;
    
    snake.add(newHead);
}


function snakeBlock(age){
    let block = gx.cube();
    block.userData.age = age || 0;
    return block;
}








function initSnake(length){
    let snake = gx.obj3d();

    snake.userData.length = length;
    snake.userData.direction = gx.vec3(1,0,0);

    for (let i=0; i<length; i++){
        let age = length - i;
        let block = snakeBlock(age);
        let x = age * -1;
        block.position.set(x, 0, 0);
        snake.add(block);
    }

    g.snakeHead = _.last(snake.children);
    
    return snake;
}


function printBlock(b){
    let age = b.userData.age;
    let pos = b.position.toArray()
    console.log(`[block] age:${age} pos:${pos}`);
}


function printSnake(s){
    let snake = s || g.snake;

    let length = snake.userData.length
    console.log(`[SNAKE]  lenght:${length}`);
    for(let b of snake.children){
        printBlock(b);
    }
    console.log('');
}














