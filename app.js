var scene = new THREE.Scene();
var boxSize = 15;
var dustSpread = 7.5;
var speed = 0.001;
var dustAmount = 15000;
var dustSize = 0.05;
var lightColor = 0xFF0000;
var lightColor2 = 0xCB29EA;
var lightColor3 = 0xC1BD30;
var boxColor2 = 0xCB29EA;
var boxColor = 0x551C60;
var sphereColor = 0xF7F7F7;

//Set _Background 
var renderer = new THREE.WebGLRenderer({ antialia: true });
renderer.setClearColor("#41170E");
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enable = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
document.body.appendChild(renderer.domElement);

//Camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, -50);
controls.update();

//Responsive Browser Window
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})


//Make Dust
var dustGeometry = new THREE.Geometry();
const textureLoader = new THREE.TextureLoader();

for (var i = 0; i < dustAmount; i++) {

    var dust = new THREE.Vector3();
    dust.x = THREE.Math.randFloatSpread((dustSpread*2));
    dust.y = THREE.Math.randFloatSpread(dustSpread*2);
    dust.z = THREE.Math.randFloatSpread(dustSpread*2);

    var color = new THREE.Color(0xFFFFFF);

    dustGeometry.vertices.push(dust);
    dustGeometry.colors.push(color);
}

var dustMaterial = new THREE.PointsMaterial({
    size: dustSize,
    //map: textureLoader.load("Picture/dust.png"),     
    transparent: true,
    opacity: 1,
    vertexColors: THREE.VertexColors,
    blending: THREE.AdditiveBlending
});
var dustField = new THREE.Points(dustGeometry, dustMaterial);
scene.add(dustField);
dustField.recieveShadow = true;


//Floating object
var sphere = new THREE.SphereGeometry(2, 32, 32);
var sphereMaterial = new THREE.MeshPhongMaterial({ color: sphereColor });
var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
sphereMesh.position.set(0, 0, 0);
scene.add(sphereMesh);
sphereMesh.castShadow = true;


//Box and "lightbox"
var box = new THREE.CubeGeometry(boxSize, boxSize, boxSize);
var boxMaterial = new THREE.MeshPhongMaterial({ color: boxColor, side: THREE.BackSide });
var boxMesh = new THREE.Mesh(box, boxMaterial); 
scene.add(boxMesh);

var lightBox = new THREE.BoxGeometry(15, 9, 3); 
lightBox.computeBoundingBox();


//Light
var light1 = new THREE.PointLight(lightColor, 1, 15)
light1.position.set(-7, 0, 0);
light1.lookAt(7, 0, 0);
scene.add(light1);
light1.castShadow = true;
var light2 = new THREE.PointLight(lightColor2, 1, 15)
light2.position.set(7, 3, 0);
light2.lookAt(-7, 3, 0);
scene.add(light2);
light2.castShadow = true;
var light3 = new THREE.PointLight(lightColor3, 1, 15)
light3.position.set(7, -3, 0);
light3.lookAt(-7, -3, 0);
scene.add(light3);
light3.castShadow = true;


//Skybox    (front - back - up - down - right- left)
const skymapFolder = 'Picture/';
const skymapTexture = LoadSkymap(skymapFolder);

function LoadSkymap(skymapFolder) {
    const urls = [skymapFolder + "rt.bmp", skymapFolder +"lf.bmp",
                  skymapFolder + "up.bmp", skymapFolder +"dn.bmp",
                  skymapFolder + "bk.bmp", skymapFolder +"ft.bmp"];
    const textureSkymap = new THREE.CubeTextureLoader().load( urls );

    return textureSkymap;
}
scene.background = skymapTexture;


//Move around
function DriftAround() {
    var sg = sphereMesh.position;
    sg.y += 0.01;
    if (sg.y > 6) { sg.y *= -1 }
    for (var i = 0; i < dustGeometry.vertices.length; i++) {
        var dgv = dustGeometry.vertices[i];
        dgv.x += speed/2;
        dgv.y += speed;
        if (dgv.x > dustSpread) { dgv.x *= -1 }
        if (dgv.y > dustSpread) { dgv.y *= -1 }

        if (lightBox.boundingBox.containsPoint(dgv)) {
            if (dgv.y < -1.5)       { dustGeometry.colors[i].set(lightColor3); }
            else if (dgv.y > 1.5)   { dustGeometry.colors[i].set(lightColor2); }
            else                    { dustGeometry.colors[i].set(lightColor);  }
        } else                      { dustGeometry.colors[i].set(0X000000);    }
    }    
}


//Render
function Render() {
    dustGeometry.verticesNeedUpdate = true;
    dustGeometry.colorsNeedUpdate = true;

    renderer.render(scene, camera);
    DriftAround();    
    requestAnimationFrame(Render);
}
requestAnimationFrame(Render);