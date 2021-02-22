function Car()
{
    this.WholeCar = new THREE.Group();

    var CarBody = new THREE.Mesh(
        new THREE.BoxGeometry(220, 100, 100),
        new THREE.MeshLambertMaterial({ color: 0xffffff, flatShading: true})
    );
    CarBody.translateY(80);
    CarBody.castShadow = true;
    CarBody.receiveShadow = true;
    this.WholeCar.add(CarBody);

    var CarMid = new THREE.Mesh(
        new THREE.BoxGeometry(130, 100, 100),
        new THREE.MeshLambertMaterial({ color: 0x4d2fff, flatShading: true})
    );
    CarMid.translateY(160);
    // CarMid.position.z = 50;
    CarMid.castShadow = true;
    CarMid.receiveShadow = true;
    this.WholeCar.add(CarMid);
    var wheelMesh = new THREE.CylinderGeometry(30, 30, 30);
    var wheelMat = new THREE.MeshLambertMaterial({ color: 0x333333, flatShading: true });

    var Wheel1 = new THREE.Mesh(wheelMesh,wheelMat),
        Wheel2 = new THREE.Mesh(wheelMesh,wheelMat);
    Wheels = new THREE.Group();
    Wheel2.translateX(120);
    Wheel1.translateX(0);
    Wheels.add(Wheel1);
    Wheels.add(Wheel2);
    Wheels.translateY(30);
    Wheels.position.x = -60;
    Wheels.position.z = 40;
    Wheels.rotateX(Math.PI/2);


    this.WholeCar.add(Wheels);
    this.WholeCar.scale.set(1.5,1.5,1.5);
}

function CreateCar()
{
    var car = new Car();
    scene.add(car.WholeCar);
    return car.WholeCar;
}
var cars = [];
function SpawnCar(road = {road:null,direction:0,difficulty:0,lane:0}){
    if(Math.abs(playerPosition - road.lane) < 7){
        if(road.road !== null){
            var car = CreateCar();
            var difficulty = road.difficulty,
                direction = road.direction,
                positionZ = road.road.position.z;

                car.position.set(-8000*((direction)?1:-1),0,positionZ);
                cars.push({car:car,road:road});
        }else{
            console.error("Road is null");
        }
    }
}

function SpawnCars(){
    if(!pause)
    for(let i = car_roads_count; i<roads.length; i++){
        SpawnCar(roads[i]);
        renderer.render(scene, camera);
        setInterval(function(){
            SpawnCar(roads[i]);
            renderer.render(scene, camera);
        },5000-(roads[i].difficulty*4)%4000);
    }
}

function animateCars(){
    if(!pause)
    for(let i = 0; i<cars.length;i++){
        var car = cars[i].car;
        var difficulty = cars[i].road.difficulty;
        var direction = cars[i].road.direction;
        direction = ((direction)?1:-1);
        var speed = (difficulty*100 / 500 + 100) * direction;
        car.translateX(speed);
        carCrash(car);
        if(car.position.x > 10000 || car.position.x < -10000){
            scene.remove(car);
            var I = cars.indexOf(car);
            if (I > -1) {
                cars.splice(I, 1);
            }
        }
    }
    renderer.render(scene, camera);
    window.requestAnimationFrame(function(){
        animateCars();
    });
}
window.requestAnimationFrame(function(){
    animateCars();
});
//Check car hits player
function carCrash(car){
    if(pause)
        return;
    var carX = car.position.x,
        carZ = car.position.z;
    var PlayerX = PLAYER.position.x;
        PlayerZ = PLAYER.position.z;

    if(PlayerX >= carX - 200 && PlayerX <= carX + 200){
        if(PlayerZ >= carZ - 200 && PlayerZ <= carZ + 200){
            alert('game over');
        }
    }
}
