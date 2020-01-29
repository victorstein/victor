import React, { useEffect } from 'react'
import * as THREE from 'three'
import './stylesAuth.scss'

const Animation = () => {
  var camera, scene, renderer,
    geometry, material, mesh, cubeSineDriver
  var smokeParticles = []
  const clock = new THREE.Clock()
  let delta = 0

  const init = () => {
    renderer = new THREE.WebGLRenderer()
    const width = window.innerWidth
    const height = window.innerHeight
    renderer.setSize(width, height)

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000)
    camera.position.z = 1000
    scene.add(camera)

    geometry = new THREE.CubeGeometry(200, 200, 200)
    material = new THREE.MeshLambertMaterial({ color: 0xaa6666, wireframe: false })
    mesh = new THREE.Mesh(geometry, material)
    // scene.add( mesh );

    var textGeo = new THREE.PlaneGeometry(500, 380)
    THREE.ImageUtils.crossOrigin = '' // Need this to pull in crossdomain images from AWS
    var textTexture = THREE.ImageUtils.loadTexture('https://i.ibb.co/25pxzbq/Victor-transparency.png')
    var textMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff, opacity: 1, map: textTexture, transparent: true, blending: THREE.AdditiveBlending })
    var text = new THREE.Mesh(textGeo, textMaterial)
    text.position.z = 800
    scene.add(text)

    var light = new THREE.DirectionalLight(0xffffff, 0.5)
    light.position.set(-1, 0, 1)
    scene.add(light)

    var smokeTexture = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png')
    var smokeMaterial = new THREE.MeshLambertMaterial({ color: 0x00dddd, map: smokeTexture, transparent: true, opacity: 0.8 })
    var smokeGeo = new THREE.PlaneGeometry(300, 300)

    for (let p = 0; p < 150; p++) {
      var particle = new THREE.Mesh(smokeGeo, smokeMaterial)
      particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100)
      particle.rotation.z = Math.random() * 360
      scene.add(particle)
      smokeParticles.push(particle)
    }

    document.querySelector('#smoke').appendChild(renderer.domElement)
  }

  const animate = function () {
    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame(animate)
    delta = clock.getDelta()
    evolveSmoke()
    render()
  }

  const evolveSmoke = () => {
    var sp = smokeParticles.length
    while (sp--) {
      smokeParticles[sp].rotation.z += (delta * 0.2)
    }
  }

  const render = () => {
    mesh.rotation.x += 0.005
    mesh.rotation.y += 0.01
    cubeSineDriver += 0.01
    mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500)
    renderer.render(scene, camera)
  }

  useEffect(() => {
    init()
    animate()
  }, [])

  return (
    <div className='animationLogin w-100' id='smoke' />
  )
}

export default Animation
