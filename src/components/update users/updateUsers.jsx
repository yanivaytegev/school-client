import React, { Component } from 'react';
import UpdateUser from './updateUser';
import Filter from './filter'
import { connect } from 'react-redux';
import { getUsers, myClass } from '../../actions/userAction';
import PropTypes from 'prop-types';
import Loader from '../default components/loader'


class UpdateUsers extends Component {

    static propTypes = {
        getUsers: PropTypes.func.isRequired,
        myClass: PropTypes.func.isRequired
    }

    state = {
        sort: null,
        teacher: null,
        loading: true
    }

    componentDidMount() {

        const { role } = this.props.authReducer;
        const { props } = this.props;

        if (role === 'teacher') {
            this.props.myClass(role);
        } else {
            this.props.getUsers(props);
        }

        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }

    handleChangeSort = (e) => {

        this.setState({
            sort: e.target.value
        })

    }

    handleChangeTeacher = (e) => {

        this.setState({
            teacher: e.target.value
        })
    }

    render() {

        const { users, msg, teachers } = this.props.userReducer;
        const { role } = this.props.authReducer;
        let filteredUsers = users;

        if (this.state.sort) {
            if (this.state.sort === 'ID') {
                filteredUsers = users.sort((a, b) => a.id > b.id ? 1 : -1)
            }
            if (this.state.sort === 'NameA-Z') {
                filteredUsers = users.sort((a, b) => a.firstName > b.firstName ? 1 : -1)
            }
            if (this.state.sort === 'NameZ-A') {
                filteredUsers = users.sort((a, b) => a.firstName < b.firstName ? 1 : -1)
            }
        } else {
            filteredUsers = filteredUsers.sort((a, b) => a.firstName > b.firstName ? 1 : -1)
        }

        if (this.state.teacher) {
            filteredUsers = users.filter((item) => item.teacherID === this.state.teacher)
        }

        return (
            <div>
                <h1 className='title'>{this.props.props.charAt(0).toUpperCase() + this.props.props.slice(1)}s</h1>
                <hr />
                {this.state.loading ?
                    <div className='container'>
                        <div className='row justify-content-center loader'>
                            <Loader loading={this.state.loading} />
                        </div>
                    </div>
                    :
                    <div>
                        <Filter handleChangeSort={this.handleChangeSort} handleChangeTeacher={this.handleChangeTeacher} count={filteredUsers.length} role={role === 'manager' ? this.props.props : null} teachers={teachers} />
                        <hr />
                        <div className='container'>
                            <div className='row justify-content-center'>

                                {this.props.props === msg && filteredUsers.length > 0 ? filteredUsers.map((item, index) => {
                                    return <UpdateUser role={this.props.props} key={index} props={item} teachers={teachers} />
                                }) : <h1 className='noFilteredUsers'>No Students Yet</h1>}
                            </div>
                        </div>
                    </div>
                }
                <hr />
            </div >
        );
    }
}
const mapStateToProps = state => ({
    userReducer: state.userReducer,
    authReducer: state.authReducer
})

export default connect(mapStateToProps, { getUsers, myClass })(UpdateUsers);
