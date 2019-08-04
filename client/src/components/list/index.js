import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteEventerEntry, eventerList } from '../../actions/index';
import { Link } from "react-router-dom";
import Error from '../../utils/Error'
import Loader from '../../utils/Loader'

const isEven = (x) => !(x % 2); 

class List extends Component {
  constructor(props){
    super(props);
    this.state = { 
      list: [] ,
      error: false,
      isLoading: true,
    };
    this.confirmDelete = this.confirmDelete.bind(this);
   }

  async getAList() {
    try {
      let results = await this.props.eventerList();
      this.setState({ 
        list: results.payload.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({ error: true })
    }
  }

  componentDidMount() {
    this.getAList();
  }

  async confirmDelete(e) {
    if (window.confirm('Please confirm that you want to delete this item')) {
      let results = await this.props.deleteEventerEntry(e.target.id);
      if (results.payload.data.response === 'success') {
        this.getAList();
      }
    }
  }

  displayAList() {
    if (this.state.error === true) {
      return <Error />
    } else if (this.state.isLoading === true) {
      return <Loader />
    } else if (Object.keys(this.state.list).length > 0) {
      const row = this.state.list.map( (item, i) => {
        let rowNumber = i + 1;
        return <tr key={i} className={isEven(i) ? "bg-secondary" : ""}>
          <th scope="row" className="p-1">{rowNumber}</th>
          <td className="p-1">{item.first_name}</td>
          <td className="p-1">{item.last_name}</td>
          <td className="p-1">{item.email_address}</td>
          <td className="p-1">{item.event_date.substring(0, 10)}</td>
          <td className="p-1">
            <Link className="btn btn-warning mr-2 py-1" data-test="editButton" to={"/edit/"+item._id}>Edit</Link>
            <Link id={item._id} onClick={this.confirmDelete} className="btn btn-danger py-1" data-test="deleteButton" to="/">Delete</Link>
          </td>
        </tr>
      });
      return (
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Event Date</th>
              <th scope="col">Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            { row }
          </tbody>
        </table>
      );
    } else {
      return <p><em>There are no listings at the moment.</em></p>;
    }
   }
   
   render() {
     return(
       <div className="col-lg-12 col-md-12" data-test="listComponent">
         <h2>Participants:</h2>
         { this.displayAList() }
       </div>
     );
   }
}

const mapStateToDispatch = (dispatch) => {
  return bindActionCreators({ eventerList, deleteEventerEntry }, dispatch);
};

export default connect(null, mapStateToDispatch)(List);
