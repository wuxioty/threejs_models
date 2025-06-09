import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import init from './init';

import './style.css';

const { sizes, camera, scene, canvas, controls, renderer } = init();

camera.position.set(0, 0, 0.5);

const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({
	color: '#444444',
	 metalness: 0,
	  roughness: 0.5,
	}),
);

floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = -1;
// scene.add(floor);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0,61);
hemiLight.position.set(0, 50, 50);
scene.add(hemiLight);

const light = new THREE.PointLight( 0xffffff, 10, 500, 1);
light.position.set( 0, 0, -10 );
scene.add( light );

const light2 = new THREE.PointLight( 0xffffff, 10, 500, 1);
light2.position.set( 0, 0, 10 );
scene.add( light2 );

const dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene.add(dirLight);

const loader = new GLTFLoader();

const dvd = document.getElementById('DVD');
const vinyl = document.getElementById('Vinyl');

vinyl.addEventListener('change', function() {
	if (this.checked) {
		loader.load(
			'/models/Vinyl/vinyl.gltf',
			(gltf) => {
				console.log('Модель успешно загружена!');
				console.log(gltf);
				// gltf.scene.scale.set(5, 5, 5);
				// scene.add(gltf.scene.children[0]);
				let i = 0;
				while (i < 3) {
					scene.add(gltf.scene.children[i]);
					i++
				};
			},
			(progress) => {
				console.log('Прогресс');
				console.log(progress);
			},
			(error) => {
				console.log('Произошла ошибка');
				console.log(error);
			},
				);
		}
	});

dvd.addEventListener('change', function() {
	if (this.checked) {
		loader.load(
			'/models/DVD/r.gltf',
			(gltf) => {
				console.log('Модель успешно загружена!');
				console.log(gltf);
				// gltf.scene.scale.set(5, 5, 5);
				scene.add(gltf.scene);
			},
			(progress) => {
				console.log('Прогресс');
				console.log(progress);
			},
			(error) => {
				console.log('Произошла ошибка');
				console.log(error);
			},
				);
		};
});


// loader.load(
// 	'/models/Vinyl/vinyl.gltf',
// 	(gltf) => {
// 		console.log('Модель успешно загружена!');
// 		console.log(gltf);
// 		// gltf.scene.scale.set(5, 5, 5);
// 		// scene.add(gltf.scene.children[0]);
// 		let i = 0;
// 		while (i < 3) {
// 			scene.add(gltf.scene.children[i]);
// 			i++
// 		};
// 	},
// 	(progress) => {
// 		console.log('Прогресс');
// 		console.log(progress);
// 	},
// 	(error) => {
// 		console.log('Произошла ошибка');
// 		console.log(error);
// 	},
// );

const tick = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};
tick();

/** Базовые обпаботчики событий длы поддержки ресайза */
window.addEventListener('resize', () => {
	// Обновляем размеры
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Обновляем соотношение сторон камеры
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Обновляем renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});
