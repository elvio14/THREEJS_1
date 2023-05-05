import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'

//DEBUG GUI
const gui = new GUI()

//LOADERS
const textureLoader = new THREE.TextureLoader()
const fontLoader = new FontLoader()


const matCapTexture = textureLoader.load('static/textures/matcaps/1.png')

fontLoader.load(
	'static/fonts/helvetiker_regular.typeface.json',
	(font)=>{
	const textGeometry = new TextGeometry(
		'Lalal ulala',{
			font: font,
			size: 0.5,
			height: 0.2,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness:0.03,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 5
		}
	)
	textGeometry.center()
	const textMaterial = new THREE.MeshMatcapMaterial({matcap: matCapTexture})
	// textMaterial.wireframe = true
	const text = new THREE.Mesh(textGeometry, textMaterial)
	scene.add(text)

	const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45)

	for(let i = 0; i < 99; i++){
		const donut = new THREE.Mesh(donutGeometry,textMaterial)

		donut.position.x = (Math.random() - 0.5) * 10
		donut.position.y = (Math.random() - 0.5) * 10
		donut.position.z = (Math.random() - 0.5) * 10

		donut.rotation.x = Math.random() * Math.PI
		donut.rotation.y = Math.random() * Math.PI
		scene.add(donut)
	}
	}
)

const scene = new THREE.Scene

//Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
scene.add(camera)
camera.position.z = 5


//renderer
const canvas = document.getElementById("webgl")
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize( sizes.width, sizes.height )
document.body.appendChild( renderer.domElement )

//controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.update()


function animate() {
	requestAnimationFrame(animate)
	render()
}

function render(){
	renderer.render(scene, camera)
}

animate()