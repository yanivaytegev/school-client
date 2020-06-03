import React, { Component } from 'react';
import UpdateModal from './updateModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/userAction'

class updateUser extends Component {

    state = {
        buy: true
    }

    static propTypes = {
        deleteUser: PropTypes.func.isRequired
    }

    bottom = 'bottom';

    toggle = () => {
        this.setState({
            buy: !this.state.buy
        })
    }

    userDelete = (e) => {
        e.preventDefault();
        this.props.deleteUser(this.props.props.id, this.props.role)
        this.toggle();
    }

    onClick = (e) => {
        e.preventDefault()
        if (this.state.buy) {
            this.bottom = 'bottom clicked';
        } else {
            this.bottom = 'bottom';
        }
        this.toggle();
    }


    render() {
        const { props, role, teachers } = this.props;
        const photo = require(`../../photos/users/${role}/${props.photo}`)

        let teacher = null
        if (role === 'student') teacher = teachers.find(item => item.id === props.teacherID)

        const style = {
            background: `url(${photo}) 0% 0% / 300px 400px no-repeat`
        };
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="top" style={style}></div>
                    <div className={this.bottom}>
                        <div className="left">
                            <div className="details text-capitalize">
                                <h1>{props.firstName}</h1>
                                <p>{props.lastName}</p>
                            </div>
                            <div className="buy" onClick={e => this.onClick(e)}><i className="material-icons">update</i></div>
                        </div>
                        <div className="right">
                            <div className="done"><i className="material-icons">done</i></div>
                            <div className="details">
                                <button type="button" className="btn btn-outline-light font-weight-bold border-0" style={{ margin: '5px' }}>
                                    <UpdateModal props={props} role={role} />
                                </button>
                                <button type="button" onClick={e => this.userDelete(e)} className="btn btn-outline-danger font-weight-bold border-0">
                                    Delete
                                </button>
                            </div>
                            <div className="remove" onClick={e => this.onClick(e)}><i className="material-icons">clear</i></div>
                        </div>
                    </div>
                </div>
                <div className="inside">
                    <div className="icon"><i className="material-icons">info_outline</i></div>
                    <hr />
                    <div className="contents">
                        <div className='text-center '>
                            <span className="font-weight-bold text-uppercase">{props.firstName} {props.lastName}</span>
                        </div>
                        <hr />
                        <p><span>ID :</span> {props.id}</p>
                        <p><span>Address :</span> {props.address}</p>
                        <p><span>Birth Date :</span> {props.birthDate}</p>
                        <p><span>Email :</span> {props.mail}</p>
                        <p><span>Phone :</span> {props.phone}</p>
                        <p><span>Gender :</span> {props.gender}</p>
                        {teacher ?
                            <span>
                                <p><span>Teacher :</span> {teacher.name}</p>
                                <p><span>Class :</span> {teacher.class}</p>
                            </span>
                            : null
                        }
                        {role === 'teacher' ?
                            <p><span>Class :</span> {props.class}</p>
                            : null
                        }
                    </div>
                </div>
            </div >
        );
    }
}


export default connect(null, { deleteUser })(updateUser);
