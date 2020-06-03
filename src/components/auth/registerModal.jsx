import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalFooter, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser, teachers } from '../../actions/userAction';
import { claerErrors } from '../../actions/errorAction';

class RegisterModal extends Component {

    state = {
        modal: false,
        nestedModal: false,
        firstName: '',
        lastName: '',
        id: '',
        phone: '',
        address: '',
        birthDate: '',
        password: '',
        confirmPassword: '',
        mail: '',
        photo: '',
        gender: 'male',
        teacherID: '',
        class: '',
        role: '',
        msg: null
    }

    classes = ['1st grade', '2nd grade', '3rd grade', '4th grade', '5th grade', '6th grade']

    static propTypes = {
        errorReducer: PropTypes.object.isRequired,
        addUser: PropTypes.func.isRequired,
        teachers: PropTypes.func.isRequired,
        claerErrors: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.teachers()
    }

    shouldComponentUpdate(nextProps, nextState) {

        const { id } = this.props.errorReducer

        if (id !== nextProps.errorReducer.id && nextProps.errorReducer.id) {

            this.toggleNested()
            return true
        }
        if (this.state !== nextState) {

            return true
        }

        return false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    toggleNested = () => {
        this.setState({
            nestedModal: !this.state.nestedModal
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangePhoto = (e) => {
        this.setState({
            photo: e.target.files[0],
        })
    }

    onSubmit = (e) => {

        e.preventDefault()
        this.props.claerErrors();
        const user = new FormData();
        let userRole = this.state.role;

        if (this.state.password === this.state.confirmPassword) {

            const newUser = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                id: this.state.id,
                phone: this.state.phone,
                address: this.state.address,
                birthDate: this.state.birthDate,
                mail: this.state.mail,
                photo: this.state.photo,
                gender: this.state.gender,
                password: this.state.password
            }

            switch (userRole) {
                case 'teacher':
                    newUser.class = this.state.class
                    break;
                case 'student':
                    newUser.teacherID = this.state.teacherID
                    break;
                case '':
                    newUser.teacherID = this.state.teacherID
                    userRole = 'student'
                    break;
                default: break;
            }

            if (typeof (this.state.photo) === 'object') {
                user.append('image', this.state.photo, this.state.photo.name)
                newUser.photo = this.state.photo.name;
                user.append('user', JSON.stringify(newUser));
                this.props.addUser(user, userRole);
            } else {
                alert('please upload photo')
            }
        }
        else {
            alert('passwords not match')
        }
    }

    render() {

        const { role } = this.props.authReducer;
        const { msg, id } = this.props.errorReducer;
        const { teachers } = this.props.userReducer;
        let radioButtons = '';

        if (role === 'manager') {
            radioButtons = (<Fragment>
                <div className='container'>
                    <Label className='col-md-4' >
                        <Input type="radio" value='teacher' onChange={this.onChange} name='role' id="teacher" required />{' '}teacher
            </Label>
                    <Label className='col-md-4' >
                        <Input type="radio" value='manager' onChange={this.onChange} name='role' id="manager" required />{' '}manager
           </Label>
                    <Label className='col-md-4' >
                        <Input type="radio" value='student' onChange={this.onChange} name='role' id="student" required />{' '}student
            </Label>
                    <hr />
                </div>
            </Fragment>)
        }

        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Register
              </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Register {role === "teacher" ? " New Student" : ''}
                    </ModalHeader>
                    <ModalBody>
                        <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested}>
                            <ModalHeader>Register Status</ModalHeader>
                            <ModalBody>
                                {id === 'REGISTER_FAIL' ? Object.keys(msg).map(key => {
                                    return <Alert color='danger' key={key} >{key} : {msg[key]}</Alert>
                                }) : null}
                                {this.props.userReducer.msg ?
                                    <Alert color='success'>{this.props.userReducer.msg}</Alert>
                                    : null}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
                            </ModalFooter>
                        </Modal>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup >
                                {radioButtons}
                                <Label for='firstName'>First Name</Label>
                                <Input type='text' onChange={this.onChange} placeholder='First Name' className='mb-3' name='firstName' id='firstName' required />
                                <Label for='lastName'>Last Name</Label>
                                <Input type='text' onChange={this.onChange} placeholder='Last Name' className='mb-3' name='lastName' id='lastName' required />
                                <Label for='id'>Id</Label>
                                <Input type='text' onChange={this.onChange} placeholder='Id' className='mb-3' name='id' id='id' required />
                                <Label for='phone'>Phone</Label>
                                <Input type='text' onChange={this.onChange} placeholder='Phone' className='mb-3' name='phone' id='phone' required />
                                <Label for='address'>Address</Label>
                                <Input type='text' onChange={this.onChange} placeholder='Address' className='mb-3' name='address' id='address' required />
                                <Label for='birthDate'>Birth Date</Label>
                                <Input type='date' onChange={this.onChange} placeholder='Birth Date' className='mb-3' name='birthDate' id='birthDate' required />
                                <Label for='password'>Password</Label>
                                <Input type='password' onChange={this.onChange} placeholder='Password' className='mb-3' name='password' id='password' required />
                                <Label for='confirmPassword'>Confirm Password</Label>
                                <Input type='password' onChange={this.onChange} placeholder='Confirm Password' className='mb-3' name='confirmPassword' id='confirmPassword' required />
                                <Label for='mail'>Mail</Label>
                                <Input type='email' onChange={this.onChange} placeholder='Mail' className='mb-3' name='mail' id='mail' required />
                                <Label for='photo'>photo</Label>
                                <Input type='file' onChange={this.onChangePhoto} placeholder='Photo' className='mb-3' name='photo' id='photo' required />
                                <Label for='gender'>Gender</Label>
                                <select id="gender" name='gender' value={this.state.gender} onChange={this.onChange} className="form-control" size="0" required>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                                {this.state.role === 'student' || role === 'teacher' ?
                                    <Fragment>
                                        <Label for='teacherID'>Teacher Name</Label>
                                        <select id="teacherID" name='teacherID' value={this.state.teacherID} onChange={this.onChange} className="form-control text-capitalize" size="0" required>
                                            <option>Teacher Name</option>
                                            {teachers.map((item, key) => <option key={key} value={item.id}>{item.name}</option>)}
                                        </select>
                                    </Fragment>
                                    : ''}
                                {this.state.role === 'teacher' ?
                                    <Fragment>
                                        <Label for='class'>Class</Label><br />
                                        <select id="class" name='class' value={this.state.class} onChange={this.onChange} className="form-control" size="0" required>
                                            <option value=''>Class</option>
                                            {this.classes
                                                .map((item, key) => <option key={key} value={item}>{item}</option>)}
                                        </select>
                                    </Fragment>
                                    : ''}

                                <Button type='submit' color='danger' block style={{ marginTop: '2em' }}>Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    authReducer: state.authReducer,
    errorReducer: state.errorReducer,
    userReducer: state.userReducer
})

export default connect(mapStateToProps, { addUser, teachers, claerErrors })(RegisterModal);
