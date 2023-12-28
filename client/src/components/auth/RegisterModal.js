import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

class RegisterModal extends Component{
  state = {
    modal: false,
    name  :'',
    email: "",
    password:"",
    msg:null
  };
  static propTypes ={
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  componentDidUpdate(prevProps){
    const {error,isAuthenticated} = this.props;
    if(error != prevProps.error){
      //check for register error
      if (error.id === "LOGIN_FAIL"){
        this.setState({msg:error.msg.msg});
      }else{
        this.setState({msg:null});
      }
    }
  
// if authenticated, close modal
    if(this.state.modal){
      if(isAuthenticated){
        this.toggle();
      }
  }
}

toggle = () =>{
  // clear errors
  this.props.clearErrors();
  this.setState({
    modal: !this.state.modal
  });

};

onchange = e =>{
  this.setState({[e.target.name]: e.target.value});
};

onsubmit = e  =>{
  e.preventDefault();

  const {name,email,password} = this.state;

  // create user object
  const newUser = {
    name,
    email,
    password
  };


  // attempt to register
  this.props.register(newUser);
};

render(){
  return(
    <div>
      <NavLink onClick={this.toggle} href='#'>  
        Register
      </NavLink>
      <modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Register</ModalHeader>
        <ModalBody>
          {this.state.msg ?(
            <Alert color='danger'>{this.state.msg}</Alert>
          ):null}
          <from onSubmit={this.onSubmit}>
            <FormGroup>
              <label for='name'>Name</label>
              <input
              type='text'
              name='name'
              id='name'
              placeholder='Name'
              className='mb-3'
              onChange={this.onchange}
              />
              <label for='email'>Email</label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                className='mb-3'
                onChange={this.onChange}
              />
              <label for='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                className='mb-3'
                onChange={this.onChange}
              />
              <Button color='dark' style={{marginTop:'2rem'}} block>
                Register
              </Button>
            </FormGroup>
          </from>
        </ModalBody>
      </modal>
    </div>
  );
}
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
export default connect(
  mapStateToProps,
  { register , clearErrors})(RegisterModal);
