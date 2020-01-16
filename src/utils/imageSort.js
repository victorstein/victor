import sizeOf from 'image-size'

export default async (files, path) => {
  let dimensions = []

  for await (let x of files) {
    let filePath = `${path}\\original\\${x.deflated}`
    let imageDimensions = sizeOf(filePath)
    dimensions.push({ filepath: filePath, width: imageDimensions.width, height: imageDimensions.height })
  }

  console.log(dimensions)

  return files
}
