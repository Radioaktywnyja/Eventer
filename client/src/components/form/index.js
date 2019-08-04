import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Field, Form } from 'formik';
import Yup from 'yup';
import { updateEventerEntry, newEventerEntry } from '../../actions/index';

const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required!'),
    last_name: Yup.string().required('Last name is required!'),
    event_date: Yup.date().required('Event date is required!'),
    email_address: Yup.string().email('Invalid email address!').required('Email address is required!'),
});

class form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: typeof this.props.row._id !== 'undefined' ? this.props.row._id : '',
      first_name: typeof this.props.row.first_name !== 'undefined' ? this.props.row.first_name : '',
      last_name: typeof this.props.row.last_name !== 'undefined' ? this.props.row.last_name : '',
      email_address: typeof this.props.row.email_address !== 'undefined' ? this.props.row.email_address : '',
      event_date: typeof this.props.row.event_date !== 'undefined' ? this.props.row.event_date : '',
      redirect: false
    }
  }

  async createUpdateRecord(values) {
    let results;
    if (this.props.mode === 'edit') {
      results = await this.props.updateEventerEntry(values);
      if (results.payload.data.response === 'success') {
        this.setState({ redirect: true });
      } else {
        console.log(results.payload.data.response);
      }
    } else {
      results = await this.props.newEventerEntry(values);
        if( results.payload.data.response === 'success' ) {
            this.setState({ redirect: true });
        } else {
            console.log(results.payload.data.response);
        }
    }
  }

  render() {
    if (this.state.redirect) {
      return(
        <Redirect to="/" />
      );
    }
    return (
      <div data-test="formComponent">
        <Formik
          initialValues={{
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email_address: this.state.email_address,
            event_date: this.state.event_date,
            id: this.state.id
          }}
          validationSchema={validationSchema}
          onSubmit={ values => {
            this.createUpdateRecord(values);
          }}
          render={({ errors, touched }) => (
            <Form>
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <h2>{ this.props.mode === 'edit' ? 'Edit Entry' : 'New Entry' }</h2>
                </div>
              </div>
              <div className="row">
                <div className={`form-group col-md-6 ${errors.first_name && touched.first_name && 'has-error'}`}>
                  <label htmlFor="first_name">First Name</label>
                  <Field name="first_name" className="form-control" placeholder="First Name" type="text" />
                  { errors.first_name && touched.first_name && <span className="badge badge-danger" data-test="fnameError">{errors.first_name}</span> }
                </div>
                <div className={`form-group col-md-6 ${errors.last_name && touched.last_name && 'has-error'}`}>
                  <label htmlFor="last_name">Last Name</label>
                  <Field name="last_name" className="form-control" placeholder="Last Name" type="text" />
                  { errors.last_name && touched.last_name && <span className="badge badge-danger" data-test="lnameError">{errors.last_name}</span> }
                </div>
              </div>
              <div className="row">
                <div className={`form-group col-md-6 ${errors.email_address && touched.email_address && 'has-error'}`}>
                  <label htmlFor="email_address">Email Address</label>
                  <Field name="email_address" className="form-control" placeholder="Email Address" type="text" />
                  { errors.email_address && touched.email_address && <span className="badge badge-danger" data-test="emailError">{errors.email_address}</span> }
                </div>
                <div className={`form-group col-md-6 ${errors.event_date && touched.event_date && 'has-error'}`}>
                  <label htmlFor="event_date">Event date</label>
                  <Field name="event_date" className="form-control" placeholder="Event date" type="date" />
                  { errors.event_date && touched.event_date && <span className="badge badge-danger" data-test="dateError">{errors.event_date}</span> }
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </div>
            </Form>
          )} />
      </div>
    );
  }
}

const mapStateToDispatch = (dispatch) => {
  return bindActionCreators({ updateEventerEntry, newEventerEntry }, dispatch);
};

export default connect(null, mapStateToDispatch)(form);
