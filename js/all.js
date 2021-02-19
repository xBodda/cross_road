var scene;
var camera;


var backwards;

var renderer, scene, camera,cameraG;

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


function Lights() 
{
    var frontLight = new THREE.DirectionalLight(0xffffff, 0.6);
  
    frontLight.castShadow = true;
  
    frontLight.shadow.camera.far = 5000;
  
    var ambLight = new THREE.AmbientLight(0x474747);

    scene.add(frontLight);
    scene.add(ambLight);
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
    cameraG = new THREE.Group();
    cameraG.add(camera);
    var startingPositionZ = 1000;
    scene.add(cameraG);
    PLAYER = CreatePlayer();
    PlayerControls(PLAYER);
    CreatePlatform(startingPositionZ);
    PLAYER.position.set(0,0,startingPositionZ);

    // CreateTree();
    Lights();
    createRoads(startingPositionZ);
    renderer.render(scene, camera);
}

init();