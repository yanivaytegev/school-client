import React, { Component } from 'react';
import { loadUser } from '../../actions/authAction';
import { updateUser } from '../../actions/userAction';
import { connect } from 'react-redux';
import { claerErrors } from '../../actions/errorAction';
import { Modal, ModalHeader, ModalFooter, Button, ModalBody, Alert } from 'reactstrap';

import PropTypes from 'prop-types';

class Profile extends Component {

    state = {
        modal: false,
        msg: null,
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
        gender: '',
        teacherID: '',
        class: ''
    }

    role = this.props.authReducer.role;

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    static propTypes = {
        loadUser: PropTypes.func.isRequired,
        updateUser: PropTypes.func.isRequired,
        authReducer: PropTypes.object,
        userReducer: PropTypes.object,
        claerErrors: PropTypes.func.isRequired
    }

    UNSAFE_componentWillMount() {
        this.props.loadUser();
    }

    shouldComponentUpdate(nextProps, nextState) {

        const endProps = nextProps.authReducer.user

        if (this.props !== nextProps) {

            this.setState(endProps)
            return true
        }
        if (this.state !== nextState) {

            return true
        }
        return false
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

        if (this.state.confirmPassword === this.state.password) {

            const user = new FormData();

            let newUser = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                id: this.state.id,
                phone: this.state.phone,
                address: this.state.address,
                birthDate: this.state.birthDate,
                mail: this.state.mail,
                photo: this.state.photo,
                gender: this.state.gender,
            }

            if (this.state.password) newUser.password = this.state.password
            else newUser.password = '********'

            switch (this.role) {
                case 'teacher':
                    newUser.class = this.state.class
                    break;
                case 'student':
                    newUser.teacherID = this.state.teacherID
                    break;
                default: break;
            }

            if (typeof (this.state.photo) === 'object') {

                user.append('image', this.state.photo, this.state.photo.name)
                newUser.photo = this.state.photo.name;
            }

            user.append('user', JSON.stringify(newUser));

            this.props.updateUser(user, this.props.authReducer.role);
            this.toggle();
        }
        else {
            alert('passwords not match')
        }
    }

    render() {

        const { id, msg } = this.props.errorReducer;
        const { user } = this.props.authReducer;

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Update Status</ModalHeader>
                    <ModalBody>
                        {id === 'UPDATE_FAIL' ? Object.keys(msg).map(key => {
                            return <Alert color='danger' key={key} >{key} : {msg[key]}</Alert>
                        })
                            : null}
                        {this.props.userReducer.msg ?
                            <Alert color='success'>{this.props.userReducer.msg}</Alert>
                            : null}
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
                        </ModalFooter>
                    </ModalBody>
                </Modal>
                <h1 className='title'>Profile</h1>
                <div className="container py-3">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="profileCard" >
                                <img src={require(`../../photos/users/${this.role}/${user ? user.photo : this.state.gender ? this.state.gender === 'male' ? 'male.jpg' : 'female.jpg' : 'male.jpg'}`)} alt="..." className="card-img-top" />
                                <div className="card-body">
                                    Select new photo: <input type="file" id='photo' name="photo" onChange={this.onChangePhoto} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="profileCard">
                                <div className="card-header text-center">
                                    <h4 className="mb-0">User Information</h4>
                                    <hr />
                                    <h5>ID: {this.state.id}</h5>
                                </div>
                                <div className="card-body">
                                    <form className="form" onSubmit={this.onSubmit} autoComplete="off">
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">First Name</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" name='firstName' type="text" placeholder={this.state.firstName} onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Last Name</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" name='lastName' placeholder={this.state.lastName} onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="email" name='mail' placeholder={this.state.mail} onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Phone</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" name='phone' placeholder={this.state.phone} onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Address</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" name='address' placeholder={this.state.address} onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Gender</label>
                                            <div className="col-lg-9">
                                                <select id="gender" name='gender' value={this.state.gender} className="form-control" size="0" onChange={this.onChange}>
                                                    <option value={this.state.gender} >{this.state.gender}</option>
                                                    {this.state.gender === 'male' ? <option value='female'>female</option> : <option value='male'>male</option>}>
                                                    </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Birth Date</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" name='birthDate' placeholder={this.state.birthDate} onFocus={(e) => e.currentTarget.type = "date"} onBlur={(e) => e.currentTarget.type = "text"} onChange={this.onChange} />
                                            </div>
                                        </div>
                                        {this.role === 'student' ? <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">My Teacher</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="" name='teacherID' placeholder={this.state.teacherID} onChange={this.onChange} />
                                            </div>
                                        </div> : ''}
                                        {this.role === 'teacher' ? <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">My Class</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="" name='class' placeholder={this.state.class} onChange={this.onChange} />
                                            </div>
                                        </div> : ''}
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Password</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="password" name='password' placeholder='*********' onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Confirm Password</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="password" name='confirmPassword' placeholder='*********' onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label"></label>
                                            <div className="col-lg-9">
                                                <input type="submit" className="btn btn-primary" value="Save Changes" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authReducer: state.authReducer,
    userReducer: state.userReducer,
    errorReducer: state.errorReducer
})

export default connect(mapStateToProps, { updateUser, loadUser, claerErrors })(Profile);