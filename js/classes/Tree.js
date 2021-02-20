
function Tree()
{
    this.WholeTree = new THREE.Group();

    var trunk = new THREE.Mesh(
        new THREE.BoxGeometry(30, 300, 40),
        new THREE.MeshLambertMaterial({ color: 0x4d2926, flatShading: true})
    );
    trunk.translateY(150);
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    var PositionCounter = 40;
    var PCounter = 400;
    var InitialTranslate = 300;

    this.WholeTree.add(trunk);
    for(var i = 1; i <= 5;i++)
    {
        var x = i;
        x = new THREE.Mesh(
            new THREE.BoxBufferGeometry(PCounter -= PositionCounter, 50, PCounter -= PositionCounter),
            new THREE.MeshLambertMaterial({ color: 0x7aa21d, flatShading: true})
        );
        x.translateY(InitialTranslate+=PositionCounter);
        x.castShadow = true;
        x.receiveShadow = false;
        this.WholeTree.add(x);
    }
}


function CreateTree()
{
    var tree = new Tree().WholeTree;
    scene.add(tree);
    return tree;
}

var trees = [];
function CreateTrees()
{
    for(let i = 0; i < platforms.length; i++){
        var trees_number = Math.floor(Math.random() * 20 + 2);
        var treeZ = platforms[i].position.z;
        for(let j = 0; j<trees_number;j++){
            var tree = CreateTree();
            var treeX = 600*(Math.round(33 * Math.random())) - 10000;
            for(let k = 0; k<trees.length; k++){
                while(trees[k].position.x == treeX && trees[k].position.z == treeZ){
                    treeX = 600*(Math.round(33 * Math.random())) - 10000;
                }
            }
            tree.position.set(treeX,0,treeZ);
            tree.translateX(-100);

            trees.push(tree);
        }
    }
}

function treeHit(player,direction){
    var playerX = player.position.x,
        playerZ = player.position.z;
    for(let i = 0; i < trees.length;i++){
        var treeX = trees[i].position.x,
            treeZ = trees[i].position.z;
        if(playerX >= treeX - 250 && playerX <= treeX + 250){
            if(playerZ >= treeZ - 250 && playerZ <= treeZ + 250){
                directionReverse = "Down";
                if(direction == "Down")      directionReverse = "Up";
                else if(direction == "Left") directionReverse = "Right";
                else if(direction == "Right") directionReverse = "Left";
                animateMove(player,directionReverse,true);
            }
        }
    }
}
