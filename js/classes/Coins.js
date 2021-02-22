

var coinScore = 0;
function Coin()
{
    this.WholeCoin = new THREE.Group();


    var PositionCounter = 0;
    var PCounter = 400;
    var InitialTranslate = 300;

  

    for(var i = 1; i <= 1;i++)
    {
        var x = i;
        x = new THREE.Mesh(
            new THREE.CylinderGeometry(120,120, 40,100),
            new THREE.MeshLambertMaterial({ color: 0xdeba07, flatShading: true})
        );
        x.translateY(150);
        x.castShadow = true;
        x.receiveShadow = true;
        x.rotation.x = 2
        x.rotation.y = 1.5
        this.WholeCoin.add(x);
    }
}



function CreateCoin()
{
    var coin = new Coin().WholeCoin;
    scene.add(coin);

    return coin;
}
function removeCoin(coin)
{
    scene.remove(coin);
    var I = coins.indexOf(coin);
    if (I > -1) {
        coins.splice(I, 1);
    }
}
var coins = [];
function CreateCoins()
{
    for(let i = platforms_count; i < platforms.length; i++){
        var coins_number = Math.round(Math.random()*1);
        var coinZ = platforms[i].position.z;
        for(let j = 0; j<coins_number;j++){
            var coin = CreateCoin();
            var coinX = 600*(Math.round(33 * Math.random())) - 10000;
            coinX-=100;
            for(let k = 0; k<coins.length; k++){
                if(coins[k].position.z == coinZ)
                    while((coins[k].position.x == coinX && coins[k].position.z == coinZ)){
                    coinX = 600*(Math.round(33 * Math.random())) - 10000 - 100;
                    k=0;
                }
            }
            for(let k = 0; k<trees.length;k++){
                if(trees[k].position.z == coinZ){
                    while(trees[k].position.x == coinX && trees[k].position.z == coinZ){
                        coinX = 600*(Math.round(33 * Math.random())) - 10000 - 100;
                        k=0;
                    }
                }
            }
            coin.position.set(coinX,0,coinZ);

            coins.push(coin);
        }
    }
}

function coinHit(player){
    var playerX = player.position.x,
        playerZ = player.position.z;
    for(let i = 0; i < coins.length;i++){
        var coinX = coins[i].position.x,
            coinZ = coins[i].position.z;
        if(playerX >= coinX - 250 && playerX <= coinX + 250){
            if(playerZ >= coinZ - 250 && playerZ <= coinZ + 250){
                coinScore+=10;
                removeCoin(coins[i]);
                user_interface.updateScore();
            }
        }
    }
}

function animateCoins(){
    for(let i = 0; i<coins.length; i++){
        if(-PLAYER.position.z + coins[i].position.z <= 600){
          coins[i].rotation.y+=0.01;
        }
    }
    window.requestAnimationFrame(animateCoins);
}
window.requestAnimationFrame(animateCoins);
