


function Road(LocationZ = 0)
{
    this.object = new THREE.Group();
    var sizeX = 20000,
        sizeZ = 600;
    var Plane = new THREE.Mesh(
        new THREE.PlaneGeometry(sizeX, sizeZ),
        new THREE.MeshLambertMaterial({flatShading: true, map: THREE.ImageUtils.loadTexture('img/road.jpg')})
    );
    Plane.rotateX(-Math.PI / 2 );
    Plane.castShadow = true;
    Plane.receiveShadow = true;
    this.object.add(Plane);
    this.object.position.set(0,0,LocationZ);
    return this.object;
}
var roads = []; 
function createRoads(startingPositionZ = 0){
/**
 * @Params startingPositionZ: the position of the starting platform
 * We subtract 600 as it's the size of the starting platform
 */
    for(let i = roads_count; i<roadsMap.length; i++){
        if(roadsMap[i]){
            let road = new Road(startingPositionZ - 600);
            scene.add(road);
            var roadObj = 
            {
                road:road,
                direction:Math.floor(Math.random()*1+0.5),
                difficulty:Math.ceil(Math.random()*10)*100,
                lane:i
            };
            roads.push(roadObj)
        }
        startingPositionZ-=600;
    }
    SpawnCars()
    
}