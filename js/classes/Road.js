
var roadTexture = new THREE.MeshLambertMaterial({ flatShading: true, map: THREE.ImageUtils.loadTexture('img/road/road-0.jpg')});
var roadTextureMid = new THREE.MeshLambertMaterial({ flatShading: true, map: THREE.ImageUtils.loadTexture('img/road/road-1.jpg')});
var roadTextureTop = new THREE.MeshLambertMaterial({ flatShading: true, map: THREE.ImageUtils.loadTexture('img/road/road-2.jpg')});
var roadTextureBottom = new THREE.MeshLambertMaterial({ flatShading: true, map: THREE.ImageUtils.loadTexture('img/road/road-3.jpg')});
function Road(LocationZ = 0,roadT = 0)
{
    roadTxture = roadTexture;
    switch(roadT){
        case 1:
            roadTxture = roadTextureMid;
            break;
        case 2:
            roadTxture = roadTextureTop;
            break;
        case 3:
            roadTxture = roadTextureBottom;
            break;
    }
    this.object = new THREE.Group();
    var sizeX = 20000,
        sizeZ = 600;
    var Plane = new THREE.Mesh(
        new THREE.PlaneGeometry(sizeX, sizeZ),
        roadTxture
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
            roadT = 0;
            if(roadsMap[i-1] == 1 && roadsMap[i+1] == 1){
                roadT=1;
            }else if(roadsMap[i-1] == 0 && roadsMap[i+1] == 1){
                roadT=3;
            }else if(roadsMap[i-1] == 1 && (roadsMap[i+1] == 0 || roadsMap[i+1] == undefined)){
                roadT=2;
            }
            let road = new Road(startingPositionZ - 600,roadT);
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
function removeRoad(road)
{
    scene.remove(road.road);
    
}