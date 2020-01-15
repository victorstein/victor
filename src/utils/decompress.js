var DecompressZip = require('decompress-zip')

export default (filePath, destinationPath) => {
  return new Promise((resolve, reject) => {
    let unzipper = new DecompressZip(filePath)

    // Add the error event listener
    unzipper.on('error', function (err) {
      reject(err)
    })

    // Notify when everything is extracted
    unzipper.on('extract', function (output) {
      resolve(output)
    })

    // make the new path
    let newPath = `${destinationPath}\\original`
    // Unzip !
    unzipper.extract({
      path: newPath
    })
  })
}
