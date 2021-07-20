import React from "react";
import axios from "axios";
import $ from 'jquery';
import BugFilter from "./BugFilter";
import BugTable from "./BugTable";
import BugAdd from "./BugAdd";

export default class BugList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bugs: []
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData(filter) {
    var query = this.props.location.query || {};
    var filter = { priority: query.priority, status: query.status };
    axios.get('/api/bugs')
      .then(response => this.setState({ bugs: response.data }))
  }

  changeFilter(newFilter) {
    console.log(newFilter.status)
    console.log(newFilter.priority)
    axios.get(`/api/bugs/filter/${newFilter.status}&&${newFilter.priority}`)
      .then(response => {
        this.setState({ bugs: response.data })
      })
  }

  addBug(bug) {
    console.log("Adding bug:", bug);
    axios.post('/api/bugs', bug)
      .then(response => {
        var bug = response.data;
        var bugsModified = this.state.bugs.concat(bug);
        this.setState({ bugs: bugsModified });
      })
  }

  render() {
    return (
      <div className="container">
        <div style={{
          display: 'flex',
          justifyItems: 'center',
          alignItems: 'center'
        }}>
          <img style={{ width: '64px', height: '64px' }} src='https://res.cloudinary.com/mayurkamble/image/upload/v1626768172/icon/ipd4gsdswurp4qbjcqww.png' />
          <h1>Bug Tracker</h1>
        </div>
        <hr />
        <BugFilter submitHandler={this.changeFilter.bind(this)} />
        <hr />
        <BugTable bugs={this.state.bugs} />
        <hr />
        <br />
        <BugAdd addBug={this.addBug.bind(this)} />
        <br />
        <br />
      </div>
    )
  }
}