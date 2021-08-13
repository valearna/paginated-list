import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { getNumItemsPerPage } from '../redux/selector';
import { setNumItemsPerPage } from '../redux/actions';
import PropTypes from 'prop-types';

const NumItemsPerPage = ({ numItemsPerPage, setNumItemsPerPage }) => {
  const [validationState, setValidationState] = useState(null);
  const [numItemsPerPageTmp, setNumItemsPerPageTmp] = useState(numItemsPerPage);
  return (
    <div>
      <Form onSubmit={e => e.preventDefault()} inline>
        <FormGroup controlId="formValidationError2"
                   validationState={validationState}>
          <Form.Label>Items per page: &nbsp;</Form.Label>
          <FormControl
            type="text" autoComplete="off" maxLength="3" size="sm" style={{ maxWidth: '80px' }}
            placeholder={numItemsPerPage}
            onInput={(event) => {
              if (event.target.value !== '' && !isNaN(parseFloat(event.target.value)) &&
                isFinite(event.target.value) && parseFloat(event.target.value) > 0) {
                setValidationState(null);
                setNumItemsPerPageTmp(parseFloat(event.target.value));
              } else if (event.target.value !== '') {
                setValidationState('error');
              } else {
                setValidationState(null);
              }
            }}
            onKeyPress={(target) => {
              if (target.key === 'Enter') {
                setNumItemsPerPage(numItemsPerPageTmp);
              }
            }}
          />
          <Button variant="outline-primary" size="sm" onClick={() => {
            setNumItemsPerPage(numItemsPerPageTmp);
          }}>Refresh</Button>
        </FormGroup>
      </Form>
    </div>
  );
};

NumItemsPerPage.propTypes = {
  numItemsPerPage: PropTypes.number.isRequired,
  setNumItemsPerPage: PropTypes.func
};

const mapStateToProps = state => ({
  numItemsPerPage: getNumItemsPerPage(state)
});

export default connect(mapStateToProps, { setNumItemsPerPage })(NumItemsPerPage);
