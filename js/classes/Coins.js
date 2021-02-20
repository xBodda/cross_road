
function Coin()
{
    this.WholeCoin = new THREE.Group();


    var PositionCounter = 0;
    var PCounter = 400;
    var InitialTranslate = 300;


    for(var i = 1; i <= 5;i++)
    {
        var x = i;
        x = new THREE.Mesh(
            new THREE.BoxBufferGeometry(120,120, 40,),
            new THREE.MeshLambertMaterial({ color: 0xdeba07, flatShading: true})
        );
        x.translateY(150);
        x.castShadow = true;
        x.receiveShadow = true;
        this.WholeCoin.add(x);
    }
}


function CreateCoin()
{
    var coin = new Coin().WholeCoin;
    scene.add(coin);

    return coin;
}

var coins = [];
function CreateCoins()
{
    for(let i = 0; i < platforms.length; i++){
        var coins_number = Math.floor(Math.random()*5+ 2);
        var coinZ = platforms[i].position.z;
        for(let j = 0; j<coins_number;j++){
            var coin = CreateCoin();
            var coinX = 600*(Math.round(33 * Math.random())) - 10000;
            for(let k = 0; k<coins.length; k++){
                while(coins[k].position.x == coinX && coins[k].position.z == coinZ){
                    coinX = 600*(Math.round(33 * Math.random())) - 10000;
                }
            }
            coin.position.set(coinX,0,coinZ);
            coin.translateX(-100);

            coins.push(coin);
        }
    }
}

function coinHit(player,direction){
    var playerX = player.position.x,
        playerZ = player.position.z;
    for(let i = 0; i < coins.length;i++){
        var coinX = coins[i].position.x,
            coinZ = coins[i].position.z;
        if(playerX >= coinX - 250 && playerX <= coinX + 250){
            if(playerZ >= coinZ - 250 && playerZ <= coinZ + 250){
                directionReverse = "Down";
                if(direction == "Down")      directionReverse = "Up";
                else if(direction == "Left") directionReverse = "Right";
                else if(direction == "Right") directionReverse = "Left";
                animateMove(player,directionReverse,true);
            }
        }
    }
}
