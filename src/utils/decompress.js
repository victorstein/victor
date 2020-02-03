var DecompressZip = require('decompress-zip')
const fs = require('fs')
const path = require('path')

export default (filePath, destinationPath) => {
  return new Promise(async (resolve, reject) => {
    let unzipper = new DecompressZip(filePath)
    let dirPath = `${destinationPath}\\original`

    // Add the error event listener
    unzipper.on('error', function (err) {
      reject(err)
    })

    // Notify when everything is extracted
    unzipper.on('extract', function (output) {
      resolve(output)
    })

    // check if folder exists if it does delete it and all its files
    const deleteFolderRecursive = (dirPath) => {
      if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file, index) => {
          const curPath = path.join(dirPath, file)
          if (fs.lstatSync(curPath).isDirectory()) {
            // recurse
            deleteFolderRecursive(curPath)
          } else { // delete file
            fs.unlinkSync(curPath)
          }
        })
      }
    }
    if (fs.existsSync(dirPath)) {
      await deleteFolderRecursive(dirPath)
      // Unzip !
      unzipper.extract({
        path: dirPath
      })
    } else {
      // Unzip !
      unzipper.extract({
        path: dirPath
      })
    }
  })
}
