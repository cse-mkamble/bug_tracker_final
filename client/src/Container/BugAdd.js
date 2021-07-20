import React from "react";

export default class BugAdd extends React.Component{

    handleSubmit(e){
        e.preventDefault();
        var form = document.forms.bugForm;
        this.props.addBug({
            owner: form.owner.value,
            title: form.title.value,
            email: form.email.value,
            readme: form.readme.value,
            status: 'New',
            priority: 'P1'
        });
        form.owner.value = '';
        form.title.value = '';
        form.email.value = '';
        form.readme.value = '';
    }

    render(){
        return(
            <div>
                <form name="bugForm">
                    <input type="text" className="form-control" placeholder="Owner" name="owner"/>
                    <br/>
                    <input type="text" className="form-control" placeholder="Title" name="title"/>
                    <br/>
                    <input type="email" className="form-control" placeholder="email" name="email"/>
                    <br/>
                    <label htmlFor="story">Read Me</label>
                    <textarea cols="30" rows="10" className="form-control" name="readme" />
                    <br/>
                    <input type="button" className="btn btn-primary" value="Submit" onClick={this.handleSubmit.bind(this)}/>
                </form>
            </div>
        )
    }
}
