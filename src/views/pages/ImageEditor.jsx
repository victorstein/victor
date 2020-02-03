import React, { useState } from 'react'
import { Row, Col, Input, Button, FormGroup } from 'reactstrap'
import uncompress from '../../utils/decompress'
import Sorter from '../components/SorterOptimizer'

const { dialog } = require('electron').remote

const chooseLocation = () => new Promise(async (resolve, reject) => {
  try {
    const result = await dialog.showOpenDialog({
      title: 'Select destination folder where the content should be decompressed',
      properties: ['openDirectory']
    })
    resolve(result)
  } catch (e) {
    console.log(e)
    reject(e)
  }
})

const chooseZip = () => new Promise(async (resolve, reject) => {
  try {
    const result = await dialog.showOpenDialog({
      title: 'Select the zip file with your images',
      filters: [
        { name: '.ZIP Files', extensions: ['zip'] }
      ]
    })
    resolve(result)
  } catch (e) {
    console.log(e)
    reject(e)
  }
})

function ImageEditor () {
  const [files, setFiles] = useState(null)
  const [zipSelected, setZipSelected] = useState(false)
  const [pathSelected, setPathSelected] = useState(false)
  const [zipPath, setZipPath] = useState('')
  const [finalPath, setFinalPath] = useState('')

  const openModal = async () => {
    let filePath = await chooseZip()

    if (!filePath.canceled) {
      setZipPath(filePath.filePaths[0])
      setZipSelected(true)
    } else {
      console.log('Zip file selection cancelled')
    }
  }

  const openModalPath = async () => {
    let uncompressPath = {}
    uncompressPath = await chooseLocation()
    if (!uncompressPath.canceled) {
      setFinalPath(uncompressPath.filePaths[0])
      setPathSelected(true)
    } else {
      console.log('Extraction path not specified')
    }
  }

  const unZip = async () => {
    let extracted = await uncompress(zipPath, finalPath)
    setFiles(extracted)
    console.log(extracted)
  }

  return (
    <div className='content'>
      <Row>
        <Col xs='12'>
          <h1 className='mb-0'>MuMM RA</h1>
          <h5 className='mb-4'>Multi Media Management & Resizing Algorithm</h5>
        </Col>
      </Row>
      <Row className='d-flex align-items-baseline'>
        <Col>
          <FormGroup className={zipSelected ? 'has-success' : 'has-info'}>
            <Input type='button' id='select-file' onClick={() => openModal()} value='1. Select .zip file' />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup className={pathSelected ? 'has-success' : 'has-info'}>
            <Input disabled={!zipSelected} type='button' id='select-file' onClick={() => openModalPath()} value='2. Select converted zip output' />
          </FormGroup>
        </Col>
        <Col>
          <Button disabled={!pathSelected || files !== null} onClick={() => unZip()} color='success'>START THE PROCESS</Button>
        </Col>
      </Row>
      <div className='mt-5'>
        <Sorter files={files} finalPath={finalPath} />
      </div>
    </div>
  )
}

export default ImageEditor
