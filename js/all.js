var scene;
var camera;


var backwards;

var renderer, scene, camera;

function Snowman()
{
    var BaseBody = new THREE.Mesh(
        new THREE.SphereGeometry(300,400,400),
        new THREE.MeshLambertMaterial({color: 0xffffff , flatShading: true})
    );

    var MidBody = new THREE.Mesh(
        new THREE.SphereGeometry(200,200,300),
        new THREE.MeshLambertMaterial({color: 0xffffff , flatShading: true})
    );

    var HeadBody = new THREE.Mesh(
        new THREE.SphereGeometry(125,125,225),
        new THREE.MeshLambertMaterial({color: 0xffffff , flatShading: true})
    );

    HeadBody.translateY(612);
    MidBody.translateY(350);

    this.group = new THREE.Group();
    this.group.add(BaseBody);
    this.group.add(MidBody);
    this.group.add(HeadBody);

}

function Tree()
{
    this.WholeTree = new THREE.Group();

    var trunk = new THREE.Mesh(
        new THREE.BoxGeometry(30, 100, 40),
        new THREE.MeshLambertMaterial({ color: 0x4d2926, flatShading: true})
    );
    trunk.translateY(612);
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    var PositionCounter = 40;
    var PCounter = 400;
    var InitialTranslate = 650;

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



function CreateSnowman()
{
    var snowman = new Snowman();
    scene.add(snowman.group);
    snowman.group.position.set(0, 200, 0);
    return snowman.group;
}
function CreatePlatform(startingPosition = 0){
    var platform = new startingPlatform(startingPosition);
    scene.add(platform);

}
function CreateTree()
{
    var tree = new Tree();
    scene.add(tree.WholeTree);
    tree.WholeTree.position.set(0, 0, 0);
}

function CreateCar()
{
    var car = new Car();
    scene.add(car.WholeCar);
    return car.WholeCar;
}

function SpawnCar(road = {road:null,direction:0,difficulty:0}){
    var car = CreateCar();
    console.log(road);

    if(road.road !== null){
        var difficulty = road.difficulty,
            direction = road.direction,
            positionZ = road.road.position.z;
            console.log(positionZ);
            car.position.set(0,-400,positionZ);
    }else{
        console.error("Road is null");
    }
}

function Lights() 
{
    var frontLight = new THREE.DirectionalLight(0xffffff, 0.6);
  
    frontLight.castShadow = true;
  
    frontLight.shadow.camera.far = 5000;
  
    var ambLight = new THREE.AmbientLight(0x474747);

    scene.add(frontLight);
    scene.add(ambLight);
}
/**  @params roadMap: 1 = road, 0 = Resting Ground */
var roadsMap = [1,0,0,1,1,0,1,0,1];
var roads = [];
function createRoads(startingPositionZ = 0){
/**
 * @Params startingPositionZ: the position of the starting platform
 * We subtract 600 as it's the size of the starting platform
 */
    for(let i = 0; i<roadsMap.length; i++){
        if(roadsMap[i]){
            let road = new Road(startingPositionZ - 600);
            scene.add(road);
            var roadObj = 
            {
                road:road,
                direction:Math.floor(Math.random()*1+0.5),
                difficulty:Math.ceil(Math.random()*10)*100
            };
            roads.push(roadObj)
            SpawnCar(roadObj);
        }
        startingPositionZ-=600;
    }
    console.log("Roads:",roads);
    
}

function init() 
{
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 4000, 2000);
    camera.lookAt(0, 0, 0);
    camera.lookAt(new THREE.Vector3(0, 800, 0));
    var startingPositionZ = 1000;
    scene.add(camera);
    var c = CreateSnowman();
    CreatePlatform(startingPositionZ);
    c.position.set(0,0,startingPositionZ);
    // CreateTree();
    // CreateCar();
    Lights();
    createRoads(startingPositionZ);
    renderer.render(scene, camera);
}

init();