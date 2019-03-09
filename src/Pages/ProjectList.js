import React, { Component } from 'react';
import Input from './../Components/Input/Input';
import {connect} from 'react-redux';
import './../App.css';
import {LOGOUT} from './../Utility/helper';
import { debounce } from "throttle-debounce";
import ListView from './../Components/ListView/ListView';
import { bindActionCreators } from 'redux'
import * as planetActions from './../Store/Actions/action'

class ProjectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue : ""
    }
  }

  handleChange = event => {
    this.setState({dropValue: event.target.value, searchValue : ""})
    this.props.onSearch("DEFAULT","")
  }

  componentWillMount () {
    if(localStorage.getItem("user") === null)
      this.props.history.push('/login')
  }

  SearchHandler = (e) => {
    let { searchValue} = this.state
    this.setState({searchValue :  e.target.value})
    debounce(500,this.props.actions.searchPlanet(e.target.value))
  }

  render() {
    let placeholder = "Search Filter"
		return (
      <div className = "container">
        <div className="inputSearch">
          <input type ='text'
            name = 'search'
            value={this.state.searchValue}
            onChange = {(e)=>this.SearchHandler(e)}
            placeholder = {placeholder} />
          
          <button className="button custom" onClick={()=>LOGOUT(this.props)}>Logout</button>
        </div>
        <div> 
        {
          this.props.planets.length > 0
          ?
            <ListView data = {this.props} />
          :
            "No Data Found"
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    planets : state.searchRed.planets
  }
}

const mapDispatchToProps = (dispatch) => { return {actions: bindActionCreators(planetActions, dispatch)}}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
