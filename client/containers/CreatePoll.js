import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import {createPoll} from '../actions/VoteActions'
import {Redirect, Link} from 'react-router-dom'


class CreatePoll extends Component {
  constructor(props){
  	super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
  	this.state = {textValue: '', textArea: ''}
  }

  handleTextChange(event){
    this.setState({textValue: event.target.value})
  }
  handleTextAreaChange(event){
    this.setState({textArea: event.target.value})
  }
  handleSubmit(event) {
    const title = this.state.textValue
    const options = this.state.textArea.split('\n')
    this.props.createPoll(title, options)
    event.preventDefault()
  }

  render() {
    const {isAuth} = this.props.Auth
    if (!isAuth) {
      return (<Redirect to='/'/>)
    }
    return (
      <div>
        <Grid>
          <Col sm={8} xsOffset={2}>
            <h1>Make a new poll!</h1>
            <Jumbotron>
              <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="formControlsText">
                  <ControlLabel>Title:</ControlLabel>
                  <FormControl componentClass="input" value={this.state.textValue} onChange={this.handleTextChange}/>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Options (seperated by line):</ControlLabel>
                  <FormControl componentClass="textarea" rows="5" value={this.state.textArea} onChange={this.handleTextAreaChange}/>
                </FormGroup>
                <Button type="submit" bsStyle="primary">
                  Make!
                </Button>
              </form>
            </Jumbotron>
          </Col>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    Auth: state.authReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createPoll: bindActionCreators(createPoll, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll)
