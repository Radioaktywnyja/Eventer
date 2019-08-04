import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { eventerListById } from '../../actions/index';
import Form from './../form';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = { row: [] }
  }

  async getRecord() {
    let result = await this.props.eventerListById(this.id);
    this.setState({ row: Object.assign( this.state.row, result.payload.data ) });
  }

  componentDidMount() {
    this.getRecord();
  }

  callForm() {
    if (Object.keys(this.state.row).length > 0) {
      return <Form mode="edit" row={this.state.row} />;
    }
  }

  render() {
    return(
      <div className="col-lg-12 col-md-12" data-test="editComponent">
        {this.callForm()}
      </div>
    );
  }
}


const mapStateToDispatch = (dispatch) => {
  return bindActionCreators({ eventerListById }, dispatch);
};

export default connect(null, mapStateToDispatch)(Edit);
