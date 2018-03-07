import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from "../actions";

class PostsNew extends Component {
    renderField(field) {
        const className = `form-group ${field.meta.touched && field.meta.error? 'has-danger' : ''}`;

        return (
            <div className= { className }>
                <label>{ field.label }</label>
                <input
                    className="form-control"
                    type="text"
                    { ...field.input }
                />
                <div className="text-help">
                    { field.meta.touched ? field.meta.error: ""}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title for post"
                    name="title"
                    component={ this.renderField }
                />
                <Field
                    label="Tags"
                    name="tags"
                    component={this.renderField}
                />
                <Field
                    label="Post content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}


// function validateMac(values) {
//     const errors = {};
//     const addMacReg = "^[0-9A-F]{2}-[0-9A-F]{2}-[0-9A-F]{2}-[0-9A-F]{2}-[0-9A-F]{2}-[0-9A-F]{2}$";
//
//     const regex = new RegExp(addMacReg);
//
//     if (regex.test(values.title)) {
//         errors.title= "MAC Address OK";
//     }
//     else{
//         errors.title= "Invalid";
//     }
// }

function validate(values) {
    const errors = {};

    if(!values.title || values.title.length < 3 ) {
        errors.title = "Enter a title";
    }

    if(!values.tags) {
        errors.tags = "Enter some tags";
    }

    if(!values.content) {
        errors.content = "Enter some conent please";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);






