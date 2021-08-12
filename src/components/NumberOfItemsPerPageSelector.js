import React from 'react'

const NumberOfItemsPerPageSelector = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          &nbsp;
        </Col>
      </Row>
      <Row>
        <Col sm='12'>
          <Container fluid>
            <Row>
              <Col sm="12">
                <Form onSubmit={e => e.preventDefault()} inline>
                  <FormGroup controlId="formValidationError2"
                             validationState={this.state.countValidationState}>
                    <Form.Label>Elements per page: &nbsp;</Form.Label>
                    <FormControl
                      type="text" autoComplete="off" maxLength="3" size="sm"
                      placeholder={this.state.elemPerPage}
                      onInput={(event) => {
                        if (event.target.value !== "" && !isNaN(parseFloat(event.target.value)) &&
                          isFinite(event.target.value) && parseFloat(event.target.value) > 0) {
                          this.setState({
                            elemPerPage: event.target.value,
                            countValidationState: null
                          })
                        } else if (event.target.value !== "") {
                          this.setState({
                            countValidationState: "error"
                          })
                        } else {
                          this.setState({
                            countValidationState: null
                          })
                        }
                      }}
                      onKeyPress={(target) => {
                        if (target.key === 'Enter' &&
                          this.state.elemPerPage > 0) {
                          this.props.setNumElemPerPageCallback(parseInt(this.state.elemPerPage));
                        }
                      }}
                    />
                    <Button variant="outline-primary" size="sm" onClick={() => {
                      if (
                        this.state.elemPerPage > 0) {
                        this.props.setNumElemPerPageCallback(parseInt(this.state.elemPerPage));
                      }
                    }}>Refresh</Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default NumberOfItemsPerPageSelector
