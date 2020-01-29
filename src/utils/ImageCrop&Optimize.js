const { ipcRenderer } = require('electron')

const slider = (total) => new Promise((resolve, reject) => {
  let counter = 0
  ipcRenderer.on('slider-ready', (event, arg) => {
    counter = counter + arg
    if (counter === total) resolve()
  })
})

const cta = (total) => new Promise((resolve, reject) => {
  let counter = 0
  ipcRenderer.on('cta-ready', (event, arg) => {
    counter = counter + arg
    if (counter === total) resolve()
  })
})

const gallery = (total) => new Promise((resolve, reject) => {
  let counter = 0
  ipcRenderer.on('gallery-ready', (event, arg) => {
    counter = counter + arg
    if (counter === total) resolve()
  })
})

const general = (total) => new Promise((resolve, reject) => {
  let counter = 0
  ipcRenderer.on('general-ready', (event, arg) => {
    counter = counter + arg
    if (counter === total) resolve()
  })
})

export default async function cropperAndOptimizer (images, setButtonText, setLoading) {
  setLoading(true)
  for (let x of images.slider) {
    ipcRenderer.send('trigger-jimp', {
      filepath: x.filepath,
      rootPath: x.rootPath,
      fileName: x.fileName,
      width: 1200,
      height: 800,
      folder: 'slider',
      type: 'slider'
    })
  }

  setButtonText('CREATING SLIDER IMAGES...')
  await slider(images.slider.length)

  for (let x of images.callToAction) {
    ipcRenderer.send('trigger-jimp', {
      filepath: x.filepath,
      rootPath: x.rootPath,
      fileName: x.fileName,
      width: 1200,
      height: 600,
      folder: 'call to action',
      type: 'cta'
    })
  }

  setButtonText('CREATING CALL TO ACTION IMAGES...')
  await cta(images.callToAction.length)

  for (let x of images.gallery) {
    ipcRenderer.send('trigger-jimp', {
      filepath: x.filepath,
      rootPath: x.rootPath,
      fileName: x.fileName,
      width: 800,
      height: 800,
      folder: 'gallery',
      type: 'gallery'
    })
  }

  setButtonText('CREATING GALLERY IMAGES...')
  await gallery(images.gallery.length)

  for (let x of images.general) {
    ipcRenderer.send('trigger-jimp', {
      filepath: x.filepath,
      rootPath: x.rootPath,
      fileName: x.fileName,
      width: 800,
      height: 600,
      folder: 'general',
      type: 'general'
    })
  }

  setButtonText('CREATING GENERAL IMAGES...')
  await general(images.general.length)
  ipcRenderer.removeAllListeners(['slider-ready', 'cta-ready', 'gallery-ready', 'general-ready'])
  setButtonText('DONE')
  setLoading(true)
}
