import sizeOf from 'image-size'

export default async (files, path) => {
  let initialArray = []
  let dimensions = {
    slider: [],
    gallery: [],
    general: [],
    callToAction: []
  }

  return new Promise(async (resolve, reject) => {
    try {
      for await (let x of files) {
        let filePath = `${path}\\original\\${x.deflated}`
        let imageDimensions = sizeOf(filePath)
        initialArray.push({ fileName: x.deflated, filepath: filePath, rootPath: path, width: imageDimensions.width, height: imageDimensions.height })
      }

      let filteredSlider = initialArray.filter((x) => {
        return x.width >= 1200 && x.height >= 800
      })

      let filteredGeneral = initialArray.filter((x) => {
        return x.width >= 640 && x.height >= 480
      })

      let filteredCTA = initialArray.filter((x) => {
        return x.width >= 1500 && x.height >= 400
      })

      dimensions.slider.push(...filteredSlider)
      dimensions.gallery.push(...initialArray)
      dimensions.general.push(...filteredGeneral)
      dimensions.callToAction.push(...filteredCTA)

      resolve(dimensions)
    } catch (error) {
      reject(error)
    }
  })
}
