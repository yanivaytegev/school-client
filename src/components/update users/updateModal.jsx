import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalFooter, CardImg, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUser } from '../../actions/userAction';
import { claerErrors } from '../../actions/errorAction';

class UpdateModal extends Component {

    state = {
        modal: false,
        nestedModal: false,
        user: {
            password: '',
            confirmPassword: ''
        },
        role: null
    }

    classes = ['1st grade', '2nd grade', '3rd grade', '4th grade', '5th grade', '6th grade']

    static propTypes = {
        errorReducer: PropTypes.object.isRequired,
        updateUser: PropTypes.func.isRequired,
        claerErrors: PropTypes.func.isRequired
    }

    UNSAFE_componentWillMount() {

        const { props, role } = this.props;

        this.setState({
            user: { ...this.state.user, ...props },
            role: role
        })
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
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
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

        const { user, role, photo } = this.state;
        const newUser = new FormData();

        if (user.password === user.confirmPassword) {

            if (typeof (photo) === 'object') {

                newUser.append('image', photo, photo.name)
                newUser.photo = photo.name;
            }

            newUser.append('user', JSON.stringify(user));
            this.props.updateUser(newUser, role);
        }
        else {
            alert('passwords not match')
        }
    }

    render() {

        const { user, role } = this.state;
        const { msg, id } = this.props.errorReducer;
        const { teachers } = this.props.userReducer;

        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Update
              </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader className="text-capitalize" toggle={this.toggle}>
                        {user.firstName} {user.lastName}
                    </ModalHeader>
                    <ModalBody>
                        {id === 'UPDATE_FAIL' ?
                            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested}>
                                <ModalHeader>Update Status</ModalHeader>
                                <ModalBody>{Object.keys(msg).map(key => {
                                    return <Alert color='danger' key={key} >{key} : {msg[key]}</Alert>
                                })}</ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
                                </ModalFooter>
                            </Modal> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup >
                                <CardImg top width="100%" src={require(`../../photos/users/${role}/${user.photo}`)} alt="Card image cap" />
                                <hr />
                                <Label for='photo'>Photo</Label>
                                <Input type='file' onChange={this.onChangePhoto} placeholder='Photo' className='mb-3' name='photo' id='photo' />
                                <Label for='firstName'>First Name</Label>
                                <Input type='text' onChange={this.onChange} placeholder={user.firstName} className='mb-3' name='firstName' id='firstName' />
                                <Label for='lastName'>Last Name</Label>
                                <Input type='text' onChange={this.onChange} placeholder={user.lastName} className='mb-3' name='lastName' id='lastName' />
                                <Label for='phone'>Phone</Label>
                                <Input type='text' onChange={this.onChange} placeholder={user.phone} className='mb-3' name='phone' id='phone' />
                                <Label for='address'>Address</Label>
                                <Input type='text' onChange={this.onChange} placeholder={user.address} className='mb-3' name='address' id='address' />
                                <Label for='birthDate'>Birth Date</Label>
                                <Input type='text' onChange={this.onChange} placeholder={user.birthDate} className='mb-3' name='birthDate' id='birthDate' onFocus={(e) => e.currentTarget.type = "date"} onBlur={(e) => e.currentTarget.type = "text"} />
                                <Label for='password'>Password</Label>
                                <Input type='password' onChange={this.onChange} placeholder='*********' className='mb-3' name='password' id='password' />
                                <Label for='confirmPassword'>Confirm Password</Label>
                                <Input type='password' onChange={this.onChange} placeholder='*********' className='mb-3' name='confirmPassword' id='confirmPassword' />
                                <Label for='mail'>Mail</Label>
                                <Input type='email' onChange={this.onChange} placeholder={user.mail} className='mb-3' name='mail' id='mail' />
                                <Label for='gender'>Gender</Label>
                                <select id="gender" name='gender' value={user.gender} className="form-control" size="0" onChange={this.onChange}>
                                    <option value={user.gender} >{user.gender}</option>
                                    {user.gender === 'male' ? <option value='female'>female</option> : <option value='male'>male</option>}>
                                                    </select>
                                {role === 'student' ?
                                    <Fragment>
                                        <Label for='teacherID'>Teacher Name</Label>
                                        <select id="teacherID" name='teacherID' value={this.state.teacherID} onChange={this.onChange} className="form-control" size="0">
                                            <option value=''>Teacher</option>
                                            {teachers.map((item, key) => <option key={key} value={item.id}>{item.name}</option>)}
                                        </select>
                                    </Fragment>
                                    : ''}
                                {this.state.role === 'teacher' ?
                                    <Fragment>
                                        <Label for='class'>Class</Label><br />
                                        <select id="class" name='class' value={user.class} onChange={this.onChange} className="form-control" size="0" required>
                                            {this.classes
                                                .map((item, key) => <option key={key} value={item}>{item}</option>)}
                                        </select>
                                    </Fragment>
                                    : ''}

                                <Button type='submit' color='danger' block style={{ marginTop: '2em' }}>Update</Button>
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

export default connect(mapStateToProps, { updateUser, claerErrors })(UpdateModal);
