import React from 'react'
import { Container, Row, Col } from 'reactstrap'

const LandingCreator = () => {
    return (
        <div className='w-100 px-3'>
            <Row>
                <Col xs={12} md={5} lg={4} className='bg-danger' style={{ height: '100vh' }}>
                    <Container>
                        <Row>
                        <Col xs={12} className='bg-primary' style={{ height: '25vh' }}>
                        </Col>
                        <Col xs={12} className='bg-warning' style={{ height: '75vh' }}>
                        </Col>
                        </Row>
                    </Container>
                </Col>
                <Col xs={12} md={7} lg={8} className='bg-white' style={{ height: '100vh' }}>
                    <Container>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}

export default LandingCreator

