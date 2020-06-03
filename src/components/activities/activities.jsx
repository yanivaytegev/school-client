import React, { Component } from 'react'
import Activity from './activity.jsx'
import { connect } from 'react-redux';
import { getActivities, addActivity } from '../../actions/userAction';
import { claerErrors } from '../../actions/errorAction';
import PropTypes from 'prop-types';
import Loader from '../default components/loader';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

class Activities extends Component {

    state = {
        loading: true,
        modal: false,
        title: '',
        description: '',
        photo: ''
    }

    static propTypes = {
        getActivities: PropTypes.func.isRequired,
        addActivity: PropTypes.func.isRequired,
        claerErrors: PropTypes.func.isRequired
    }

    UNSAFE_componentWillMount() {

        this.props.getActivities()

        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
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

    onChangePhoto = (e) => {
        this.setState({
            photo: e.target.files[0],
        })
    }

    onSubmit = (e) => {

        e.preventDefault()
        this.props.claerErrors();

        const activity = new FormData();

        if (typeof (this.state.photo) === 'object') {
            activity.append('image', this.state.photo, this.state.photo.name)

            const newActivity = {
                title: this.state.title,
                description: this.state.description,
                photo: this.state.photo.name
            }

            activity.append('activity', JSON.stringify(newActivity));
            this.props.addActivity(activity);

        } else {
            alert('please upload photo')
        }
    }

    render() {

        const { id, msg } = this.props.errorReducer;
        const { activities } = this.props.userReducer;
        const { props } = this.props;

        return (
            <div>
                <h1 className='title'>Activities</h1>
                <hr />

                {props === 'manager' ?
                    <div>
                        <div className='container text-right'>
                            <button className='btn btn-primary' onClick={this.toggle}>Add Activity</button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>Add Activity</ModalHeader>
                                <ModalBody>
                                    {id === 'ADD_ACTIVITY_FAIL' ? Object.keys(msg).map(key => {
                                        return <Alert color='danger' key={key} >{key} : {msg[key]}</Alert>
                                    }) : null}
                                    <Form onSubmit={this.onSubmit}>
                                        <FormGroup check>
                                            <Label for='title'>Title</Label>
                                            <Input type='text' onChange={this.onChange} placeholder='title' className='mb-3' name='title' id='title' required />
                                            <Label for='description'>Description</Label>
                                            <Input type='textarea' onChange={this.onChange} placeholder='description' className='mb-3' name='description' id='description' required />
                                            <Label for='photo'>Photo</Label>
                                            <Input type='file' onChange={this.onChangePhoto} placeholder='photo' className='mb-3' name='photo' id='photo' required />

                                            <Button color='danger' block style={{ marginTop: '2em' }}>Add</Button>
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                            </Modal>
                        </div>
                        <hr />
                    </div>
                    : null}
                {this.state.loading ?
                    <div className='container'>
                        <div className='row justify-content-center loader'>
                            <Loader loading={this.state.loading} />
                        </div>
                    </div>
                    :
                    <div>
                        {activities.map((item, index) => {
                            return <Activity key={index} props={item} />
                        })}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userReducer: state.userReducer,
    errorReducer: state.errorReducer
})

export default connect(mapStateToProps, { getActivities, addActivity, claerErrors })(Activities);
