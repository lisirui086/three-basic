// 引入htree.js
import * as THREE from 'three'
// 引入动画库
import gsap from 'gsap'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/* 
  目标：根据尺寸变化实现自适应画面
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
// 修改物体位置,set(x,y,z)
// cube.position.set(5,0,0)
// 缩放物体位置
// cube.scale.set(3,2,1)
// cube.scale.x = 5
// 旋转物体 .rotation.set(x,y,z,旋转顺序默认：xyz)
cube.rotation.set(Math.PI/4, 0, 0, 'ZXY')
// 将几何体添加到场景中
scene.add(cube)
// console.dir(cube)
// 4. 初始化渲染器
const rennder = new THREE.WebGLRenderer()
// 设置渲染器尺寸大小
rennder.setSize(window.innerWidth, window.innerHeight)
// 将WebGL渲染的canvas内容添加到body
document.body.appendChild(rennder.domElement)
// 创建轨道控制器
const controls = new OrbitControls(camera, rennder.domElement)
// 设置控制器阻尼，让控制器更有真实效果，必须在动画循环里面调用.update()
controls.enableDamping = true
// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
// 设置动画
// 移动
const animation1 = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: 'power.inOut',
  // 执行次数 无线循环：-1
  repeat: -1,
  // 往返运动
  yoyo: true,
  // 延迟
  delay: 2,
  onStart: () => {
    console.dir('动画开始')
  },
  onComplete: () => {
    console.dir('动画完成')
  }
})
// 旋转
gsap.to(cube.rotation, {
  x: 2 * Math.PI,
  duration: 5,
  ease: 'power.inOut',
  repeat: -1,
  yoyo: true,
  delay: 2
})
// 使用渲染器，通过相机将场景渲染出来
// rennder.render(scene, camera)
function render() {
  // 调用.update()
  controls.update()
  rennder.render(scene, camera)
  // 渲染下一帧的时候调用render函数
  requestAnimationFrame(render)
}
render()
// 侦听画面变化，更新渲染画面
window.addEventListener('resize', () => {
  // console.dir('画面变化了')
  // 更新摄像头
  camera.aspect = (window.innerWidth/window.innerHeight)
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  rennder.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  rennder.setPixelRatio(window.devicePixelRatio)
})
