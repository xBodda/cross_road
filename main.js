function main() {
  var ww = window.innerWidth,
	wh = window.innerHeight;
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(ww,wh);
  //fov,aspect,near,far
  const camera = new THREE.PerspectiveCamera(100, ww/wh, 1, 10000);
  camera.position.x=0;
  camera.position.y=0.5;
  camera.position.z=3;
  camera.lookAt(new THREE.Vector3(0,0,0));

  const scene = new THREE.Scene();

  {
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(0, 0, 100);
    scene.add(light);
  }


  const grassGeometry = new THREE.PlaneGeometry( wh, 0.8, 10 );
  const grassMaterial = new THREE.MeshBasicMaterial( {color: 0x1ec329, side: THREE.DoubleSide} );
  const grass = new THREE.Mesh( grassGeometry, grassMaterial );
  grass.position.z=2;
  scene.add( grass );

  const roadGeometry = new THREE.PlaneGeometry( wh, 7, 10 );
  const roadMaterial = new THREE.MeshBasicMaterial( {color: 0x696969, side: THREE.DoubleSide} );
  const road = new THREE.Mesh( roadGeometry, roadMaterial );
  road.position.z=-8;
  road.position.y=2;
  scene.add( road );

  renderer.render(scene, camera);


}
