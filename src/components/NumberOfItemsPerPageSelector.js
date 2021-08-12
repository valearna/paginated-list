import React, {useState} from 'react'
import {Button, Form, FormControl} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {goToPage} from '../redux/actions'
import {connect} from 'react-redux'
import {getNumItemsPerPage, getTotalNumItems} from '../redux/selector'

const NumberOfItemsPerPageSelector = ({totNumItems, numItemsPerPage, goToPage}) => {
  const [activePageTmp, setActivePageTmp] = useState(undefined)
  const totNumPages = Math.ceil(totNumItems / numItemsPerPage)
  return (
    <div>
      Go to page:
      <Form onSubmit={e => e.preventDefault()} inline>
        <Form.Group>
          <FormControl
            type='text' autoComplete='off' size='sm'
            placeholder={'1..' + totNumPages} style={{maxWidth: '80px'}}
            onInput={(event) => {
              let pageNum = parseFloat(event.target.value)
              if (!event.target.value.includes(',') && !event.target.value.includes('.') &&
                !isNaN(pageNum) && isFinite(pageNum) && pageNum > 0 && pageNum <= totNumPages) {
                setActivePageTmp(parseFloat(event.target.value))
              } else {
                setActivePageTmp(null)
              }
            }}
            onKeyPress={(target) => {
              if (target.key === 'Enter') {
                goToPage(activePageTmp)
              }
            }}
          />
          <Button variant='outline-primary' size='sm' onClick={() => {
            goToPage(activePageTmp)
          }}>Go</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

NumberOfItemsPerPageSelector.propTypes = {
  totNumItems: PropTypes.number.isRequired,
  numItemsPerPage: PropTypes.number.isRequired,
  goToPage: PropTypes.func
}

const mapStateToProps = state => ({
  totNumItems: getTotalNumItems(state),
  numItemsPerPage: getNumItemsPerPage(state)
})

export default connect(mapStateToProps, {goToPage})(NumberOfItemsPerPageSelector)
