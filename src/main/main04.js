// 引入htree.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// console.dir(THREE)
/* 
  目标：控制3d物体移动,缩放，旋转
*/
// 1. 创建一个场景
const scene = new THREE.Scene()
// 2. 创建一个相机
/* 
  PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
  fov — 摄像机视锥体垂直视野角度
  aspect — 摄像机视锥体长宽比
  near — 摄像机视锥体近端面
  far — 摄像机视锥体远端面
*/
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)
// 3. 添加物体
// 创建几何体
const cubGeometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质
const cubMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// 根据集合体和材质创建物体
const cube = new THREE.Mesh(cubGeometry, cubMaterial)
// 将几何体添加到场景中
scene.add(cube)
console.dir(cube)
// 4. 初始化渲染器
const rennder = new THREE.WebGLRenderer()
// 设置渲染器尺寸大小
rennder.setSize(window.innerWidth, window.innerHeight)
// 将WebGL渲染的canvas内容添加到body
document.body.appendChild(rennder.domElement)
// 创建轨道控制器
const controls = new OrbitControls(camera, rennder.domElement)
// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
// 使用渲染器，通过相机将场景渲染出来
// rennder.render(scene, camera)
function render() {
  cube.position.x += 0.01
  if (cube.position.x > 5) {
    cube.position.x = 0
  }
  rennder.render(scene, camera)
  // 渲染下一帧的时候调用render函数
  requestAnimationFrame(render)
}
render()
