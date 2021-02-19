function startingPlatform(startingLocationZ = 0)
{
    this.object = new THREE.Group();
    var sizeX = 10000,
        sizeZ = 600;
    var Plane = new THREE.Mesh(
        new THREE.PlaneGeometry(sizeX, sizeZ),
        new THREE.MeshLambertMaterial({ color: 0x888888, flatShading: true})
    );
    Plane.rotateX(-Math.PI / 2 );
    Plane.position.set(0,0,startingLocationZ);
    Plane.castShadow = true;
    Plane.receiveShadow = true;
    this.object.add(Plane);
    return this.object;
}