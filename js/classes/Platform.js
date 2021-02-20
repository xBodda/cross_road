function Platform(startingLocationZ = 0)
{
    this.object = new THREE.Group();
    var sizeX = 20000,
        sizeZ = 600;
    var Plane = new THREE.Mesh(
        new THREE.PlaneGeometry(sizeX, sizeZ),
        new THREE.MeshLambertMaterial({ color: 0x006400, flatShading: true})
    );
    Plane.rotateX(-Math.PI / 2 );
    Plane.position.set(0,0,0);
    Plane.castShadow = true;
    Plane.receiveShadow = true;
    this.object.add(Plane);
    this.object.position.set(0,0,startingLocationZ);
    return this.object;

}

function CreatePlatform(startingPosition = 0){
    var platform = new Platform(startingPosition);
    scene.add(platform);
    return platform;
}
var platforms = [];

function createPlatforms(startingPositionZ = 0){
    /**
     * @Params startingPositionZ: the position of the starting platform
     * We subtract 600 as it's the size of the starting platform
     */
        for(let i = 0; i<roadsMap.length; i++){
            if(!roadsMap[i]){
                var platform = CreatePlatform(startingPositionZ - 600);
                platforms.push(platform);
            }
            startingPositionZ-=600;
        }

        CreateCoins();
        CreateTrees();
}
