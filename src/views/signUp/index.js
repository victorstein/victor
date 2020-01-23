import React from 'react'
import {
  FormGroup,
  Label,
  Input,
  Button,
  Container, Row, Col, Card, CardBody, CardTitle, CardFooter, CardHeader
} from 'reactstrap'

const SignUpIndex = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>.col 1</Col>
          <Col>
            <div style={{ margin: '0 auto', float: 'none', marginTop: '10%' }}>
              <Card>
                <CardHeader className='text-center'>
                  <CardTitle tag='h4'>Register</CardTitle>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <label for='Name'>Name *</label>
                    <Input
                      id='Name'
                      name='Name'
                    />
                  </FormGroup>
                  <FormGroup>
                    <label id='lastName'>last name *</label>
                    <Input
                      id='lastName'
                      name='lastName'
                    />
                  </FormGroup>
                  <FormGroup>
                    <label for='email'>Email Address *</label>
                    <Input
                      name='email'
                      type='email'
                    />
                  </FormGroup>
                  <FormGroup>
                    <label for='Password'>Password *</label>
                    <Input
                      id='Password'
                      name='password'
                      type='password'
                      autoComplete='off'
                    />
                  </FormGroup>
                  <FormGroup>
                    <label for='PasswordConfirmation'>Confirm Password *</label>
                    <Input
                      equalto='#Password'
                      id='PasswordConfirmation'
                      name='PasswordConfirmation'
                      type='password'
                      autoComplete='off'
                    />
                  </FormGroup>
                </CardBody>
                <CardFooter className='text-right'>
                  <Button color='primary'>
                    Register
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SignUpIndex
