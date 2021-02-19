function Car()
{
    this.WholeCar = new THREE.Group();

    var CarBody = new THREE.Mesh(
        new THREE.BoxGeometry(220, 100, 60),
        new THREE.MeshLambertMaterial({ color: 0xffffff, flatShading: true})
    );
    CarBody.translateY(600);
    CarBody.castShadow = true;
    CarBody.receiveShadow = true;
    this.WholeCar.add(CarBody);

    var CarMid = new THREE.Mesh(
        new THREE.BoxGeometry(130, 100, 50),
        new THREE.MeshLambertMaterial({ color: 0x4d2fff, flatShading: true})
    );
    CarMid.translateY(680);
    // CarMid.position.z = 50;
    CarMid.castShadow = true;
    CarMid.receiveShadow = true;
    this.WholeCar.add(CarMid);

    var Wheel1 = new THREE.Mesh(
        new THREE.BoxGeometry(48, 48, 88),
        new THREE.MeshLambertMaterial({ color: 0x333333, flatShading: true })
    );

    Wheel1.translateY(550);
    Wheel1.position.x = -60;
    Wheel1.position.z = 10;

    var Wheel2 = new THREE.Mesh(
        new THREE.BoxGeometry(48, 48, 88),
        new THREE.MeshLambertMaterial({ color: 0x333333, flatShading: true })
    );

    Wheel2.translateY(550);
    Wheel2.position.x = 60;
    Wheel2.position.z = 10;

    this.WholeCar.add(Wheel1);
    this.WholeCar.add(Wheel2);
    this.WholeCar.scale.set(1.5,1.5,1.5);
}