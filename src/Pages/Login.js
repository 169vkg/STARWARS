import React, { Component } from 'react';
import Input from './../Components/Input/Input';
import {connect} from 'react-redux';
import './../App.css';
import {BASE_URL} from './../Utility/helper';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isInvalid : false,
      loginForm: {
        username : {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter your username'
          },
          value: ''
        },
        password :{
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Enter your password'
          },
          value: ''
        }
      }
    }
  }

  componentWillMount () {
    if(localStorage.getItem("user") === null)
      this.props.history.push('/login')
    else
    this.props.history.push('/home')
  }

  inputChangedHandler = (e, inputIdentifier) => {
    const updatedLoginForm = {
      ...this.state.loginForm
    }
    const updatedFormElement ={...updatedLoginForm[inputIdentifier]}
    updatedFormElement.value = e.target.value
    updatedLoginForm[inputIdentifier] = updatedFormElement
    this.setState({loginForm:updatedLoginForm})
  }

  loginHandler = (e) => {
    e.preventDefault()
    let loginPayLoad = {}
    for (let payloadIdentifier in this.state.loginForm) {
      loginPayLoad[payloadIdentifier] = this.state.loginForm[payloadIdentifier].value
    }
    fetch(BASE_URL+'people/?search='+loginPayLoad.username)
      .then(resp => resp.json())
      .then(data => {
        let credentialsValidation = data.results.find(o=>o.name === loginPayLoad.username && o.birth_year === loginPayLoad.password)
        let isInvalid = credentialsValidation === undefined ?  true : false
        this.setState({isInvalid})
        if(!isInvalid) {
          localStorage.setItem("user", loginPayLoad.username);
          this.props.history.push('/home')
        }
        else {
          localStorage.clear();
        }
      })  
  }

  loginCancel = (e) => {
    e.preventDefault()
    const updatedLoginForm = {
      ...this.state.loginForm
    }
    let updatedFormElement ={...updatedLoginForm['username']}
    updatedFormElement.value = ''
    updatedLoginForm['username'] = updatedFormElement
    updatedFormElement ={...updatedLoginForm['password']}
    updatedFormElement.value = ''
    updatedLoginForm['password'] = updatedFormElement
    this.setState({loginForm:updatedLoginForm})
    this.setState({isInvalid:false})
  }

  render() {
    const formElementArray =[]
    for (let key in this.state.loginForm) {
      formElementArray.push({
        id: key,
        config: this.state.loginForm[key]
      })
    }
    let form = (
      <form onSubmit ={()=>false}>
        {
          formElementArray.map((formElement)=>(
            <Input
              key = {formElement.id}
              elementType ={formElement.config.elementType}
              elementConfig ={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(e)=>this.inputChangedHandler(e, formElement.id)}/>
          ))
        }
        <button className="button" onClick={this.loginHandler}>Login</button>
        <button className="button" onClick={this.loginCancel}>Cancel</button>
      </form>
    )
    return (
      <div className = "container">
        {form}
        <p className="inValid">{this.state.isInvalid ? "Invalid Credentials" : null}</p>
      </div>
    )
  }
}


export default Login;
