import React, { useState } from 'react'
// reactstrap components
import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    Button
  } from "reactstrap"

  import AlertGlobal from '../../components/AlertGlobal'

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

const Test1 = () => {
  const [message, setMessage] = useState(null)

  const CambiarMensage = () => {
    setMessage(makeid(20))
  }
    return (
        <Card className="card-stats">
                <CardBody>
                <AlertGlobal message={message} icon={'icon-controller'} />
                  <Row>
                    <Col xs="5">
                      <div className="info-icon text-center icon-warning">
                        <i className="tim-icons icon-chat-33" />
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Number</p>
                        <CardTitle tag="h3">150GB</CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                   <Button onClick={() => CambiarMensage()}>GGGGG</Button>
                  </div>
                </CardFooter>
              </Card>
    )
}

export default Test1