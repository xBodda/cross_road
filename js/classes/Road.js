function Road(LocationZ = 0)
{
    this.object = new THREE.Group();
    var sizeX = 10000,
        sizeZ = 600;
    var Plane = new THREE.Mesh(
        new THREE.PlaneGeometry(sizeX, sizeZ),
        new THREE.MeshLambertMaterial({ color: 0x444444, flatShading: true})
    );
    Plane.rotateX(-Math.PI / 2 );
    Plane.castShadow = true;
    Plane.receiveShadow = true;
    this.object.add(Plane);
    this.object.position.set(0,0,LocationZ);
    return this.object;
}