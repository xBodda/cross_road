var PLAYER;
function CreatePlayer()
{
    var snowman = new Snowman().group;
    scene.add(snowman);
    snowman.position.set(0, 200, 0);
    return snowman;
}
var moveDistance = 600;
var canMove = true;
var treeMove = true;
var animationSteps = 10;
var animationSpeed = 5; // 5 milliseconds for each step (10*5) = 50 milliseconds
function animateJump(player){
    if(!pause){
        for(let i = 0; i<moveDistance/animationSteps/2;i++)
            setTimeout(function(){
                player.translateY(20);
            },i*animationSpeed);
        setTimeout(function(){
            for(let i = 0; i<moveDistance/animationSteps/2;i++)
            setTimeout(function(){
                player.translateY(-20);
            },i*animationSpeed);
        },moveDistance/animationSteps/2*animationSpeed);
    }

}
function animateMove(player, direction,treeMoveC = false){
    if(!pause){
    updateLevel();
    if(canMove || (treeMove && treeMoveC)){
    if(treeMoveC){
        treeMove = false;
        canMove = false;
    }
    setPosition(direction);
    user_interface.updateScore();
    animateJump(player);
    canMove = false;
    for(let i = 0; i<moveDistance/animationSteps;i++)
        setTimeout(function(){
            if(!treeMoveC)
                treeHit(player,direction);
            coinHit(player);

            if(direction == "Up" || direction == "Down"){
                player.translateZ(10*(direction=="Up"?-1:1));
                cameraG.translateZ(10*(direction=="Up"?-1:1));
            }
            else{
                player.translateX(10*(direction=="Left"?-1:1));

            }
        },i*animationSpeed);
        if(!canMove)
        setTimeout(function(){
            canMove = true;
            treeMove = true;
        },moveDistance/animationSteps*5);
    }
    }
}
function PlayerControls(player = PLAYER){
    var b = document.body;
    b.addEventListener('keydown',function(e){
        if(pause)
            return;
        e.preventDefault();
        if(e.key == 'w' || e.key == 'ArrowUp'){
            animateMove(player, "Up");
            return;
        }

        if(e.key == 'd' || e.key == 'ArrowRight'){
            animateMove(player, "Right");
            return;
        }

        if(e.key == 's' || e.key == 'ArrowDown'){
            if(maxPlayerPosition - playerPosition > 4 || playerPosition == -1)
                return;
            animateMove(player, "Down");
            return;
        }

        if(e.key == 'a' || e.key == 'ArrowLeft'){
            animateMove(player, "Left");
            return;
        }
    })
}
var playerPosition = -1;
var maxPlayerPosition = playerPosition;
function setPosition(direction = ""){
    if(pause)
        return;
    if(direction == "Up"){
        playerPosition++;
        if(playerPosition > maxPlayerPosition) maxPlayerPosition = playerPosition;
    }
    else if(direction == "Down"){
        playerPosition--;
    }
}
function getPlayerPosition(){
    return playerPosition;
}
