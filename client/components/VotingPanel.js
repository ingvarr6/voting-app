import React, {Component} from 'react'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import '../assets/styles/votingpanel.css'

class VotingPanel extends Component {
  constructor(props) {
      super(props)
      this.state = { valid: null }
    }

  voteOptionClick() {
      const { id } = this.props
      const selectedOption = this.select.value
      selectedOption ? this.props.voteOptionClick(id,selectedOption) : this.setState({valid: "error"})
  }

  changeSelect() {
    this.setState({valid: null})
  }

  render() {
    const {title, options} = this.props;
    const twitterUrl = `https://twitter.com/intent/tweet?url=http://localhost&text=${title}%20%7C%20VotingApp`
    return (
      <div>
        <Form className="form">
          <h3>{title}</h3>
          <FormGroup validationState={this.state.valid} controlId="formControlsSelect">
            <ControlLabel>I'd like to vote for...:</ControlLabel>
            <FormControl onChange={this.changeSelect.bind(this)} componentClass="select" inputRef={ref => { this.select = ref }}>
              <option hidden="true" value="">Choose an option:</option>
              {options.map((opt) => {
                return <option key={opt} value={opt}>{opt}</option>
              })}
            </FormControl>
          </FormGroup>
          <Button onClick={this.voteOptionClick.bind(this)} bsStyle="primary" className="btn_submit">
            Submit
          </Button>
        </Form>
        <div style={{marginTop: "70"}}>
        <Button href={twitterUrl} bsStyle="info" className="btn_submit">
          Share on Twitter
        </Button>
        </div>
      </div>
    )
  }
}

export default VotingPanel
