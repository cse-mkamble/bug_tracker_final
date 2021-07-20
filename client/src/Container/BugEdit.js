import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export default class BugEdit extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            priority: '',
            status: '',
            owner: '',
            title: '',
            email: '',
            readme: ''
        }
    }

    componentDidMount(){
        this.loadData();
    }

    componentDidUpdate(prevProps){
        if (this.props.match.params.id != prevProps.match.params.id) {
           this.loadData();
        }
    }

    loadData() {
        axios.get(`/api/bugs/${this.props.match.params.id}`)
            .then(response => {
                this.setState(response.data)
            })
    }

    onChange(){
        this.setState({
            priority: this.refs.priority.value,
            status: this.refs.status.value,
            owner: this.refs.owner.value,
            title: this.refs.title.value,
            email: this.refs.email.value,
            readme: this.refs.readme.value,
        })
    }

    submit(e){
        e.preventDefault();
        var bug = {
            status: this.state.status,
            priority: this.state.priority,
            owner: this.state.owner,
            title: this.state.title,
            email: this.state.email,
            readme: this.state.readme
        }
        axios.put(`/api/bugs/${this.props.match.params.id}`, bug)
            .then(response => this.setState({ bug: response.data }))
    }

    render(){
        return(
            <div className="container">
                <h1>Edit Bug - {this.props.match.params.id}</h1>
                
                <Link to="/"><h4>Back to bug list</h4></Link>
                
                <br/>
                <form onSubmit={this.submit.bind(this)}>
                    Priority:
                    <select ref="priority" name="priority" value={this.state.priority} onChange={this.onChange.bind(this)}>
                      <option value="P1">P1</option>
                      <option value="P2">P2</option>
                      <option value="P3">P3</option>
                    </select>
                    &nbsp;
                    Status:
                    <select ref="status" value={this.state.status} onChange={this.onChange.bind(this)}>
                      <option>New</option>
                      <option>Open</option>
                      <option>Fixed</option>
                      <option>Closed</option>
                    </select>
                    <br/>
                    <br/>
                    <input placeholder="Owner" ref="owner" className="form-control" type="text" value={this.state.owner} onChange={this.onChange.bind(this)}/>
                    <br/>
                    <input placeholder="Title" ref="title" className="form-control" type="text" value={this.state.title} onChange={this.onChange.bind(this)}/>
                    <br/>
                    <input placeholder="email" ref="email" className="form-control" type="email" value={this.state.email} onChange={this.onChange.bind(this)}/>
                    <br/>
                    <label htmlFor="story">Read Me</label>
                    <textarea cols="30" rows="10" className="form-control" ref="readme" name="readme"  value={this.state.readme} onChange={this.onChange.bind(this)} />
                    <br/>
                    <button className="btn btn-info" type="submit">Submit</button>
                    <br/>
                    <br/>
                    
                </form>
            </div>
        )
    }
}
