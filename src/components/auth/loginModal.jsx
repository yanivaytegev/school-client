import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authAction';
import { claerErrors } from '../../actions/errorAction';

class LoginModal extends Component {

    state = {
        modal: false,
        id: '',
        password: '',
        msg: null,
        role: ''
    }

    static propTypes = {
        error: PropTypes.object,
        login: PropTypes.func.isRequired,
        claerErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // Check for login error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault()
        this.props.claerErrors();
        // const user = {
        //     id: this.state.id,
        //     password: this.state.password,
        //     role: this.state.role
        // }
        // const user = {
        //     id: "123456789",
        //     password: "987654321",
        //     role: 'teacher'
        // }
        const user = {
            id: "111111111",
            password: "111111111",
            role: 'manager'
        }
        // const user = {
        //     id: "333333333",
        //     password: "111111111",
        //     role: 'student'
        // }
        this.props.login(user)
    }

    render() {

        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Login
              </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup check>
                                <Label for='id'>Id</Label>
                                <Input type='text' onChange={this.onChange} placeholder='Id' className='mb-3' name='id' id='id' required />
                                <Label for='password'>Password</Label>
                                <Input type='password' onChange={this.onChange} placeholder='Password' className='mb-3' name='password' id='password' required />
                                <Label className='col-md-4' >
                                    <Input type="radio" value='teacher' onChange={this.onChange} name='role' id="teacher" required />{' '}teacher
                               </Label>
                                <Label className='col-md-4' >
                                    <Input type="radio" value='manager' onChange={this.onChange} name='role' id="manager" required />{' '}manager
                               </Label>
                                <Label className='col-md-4' >
                                    <Input type="radio" value='student' onChange={this.onChange} name='role' id="student" required />{' '}student
                                 </Label>
                                <Button color='danger' block style={{ marginTop: '2em' }}>Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}


const mapStateToProps = state => ({
    userReducer: state.userReducer,
    error: state.errorReducer
})

export default connect(mapStateToProps, { login, claerErrors })(LoginModal);
