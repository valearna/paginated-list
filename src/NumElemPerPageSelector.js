import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


class NumElemPerPageSelector extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      countValidationState: null,
      elemPerPage: props.elemPerPage,
    }
  }

  render() {
    return (

    );
  }
}

export default NumElemPerPageSelector;
