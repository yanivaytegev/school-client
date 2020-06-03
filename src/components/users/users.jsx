import React, { Component } from 'react';
import User from './user';
import { connect } from 'react-redux';
// import { claerErrors } from '../../actions/errorAction';
import { getUsers, myClass } from '../../actions/userAction';
import PropTypes from 'prop-types';
import Loader from '../default components/loader'


class Users extends Component {

    state = {
        loading: true
    }

    static propTypes = {
        getUsers: PropTypes.func.isRequired
    }

    UNSAFE_componentWillMount() {

        const { props } = this.props
        if (props === 'student') {
            this.props.myClass(props)
        }
        else {
            this.props.getUsers(props);
        }

        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }

    render() {

        const { users, msg } = this.props.userReducer
        const { props } = this.props;
        let title = `Our ${props.charAt(0).toUpperCase() + props.slice(1)}s`
        if (props === 'student') title = 'My Class'

        return (
            <div>
                <h1 className='title'>{title}</h1>
                <hr />
                {this.state.loading ?
                    <div className='container'>
                        <div className='row justify-content-center loader'>
                            <Loader loading={this.state.loading} />
                        </div>
                    </div>
                    :
                    <div className='row justify-content-center m-0'>
                        {props === msg ? users.map((item, index) => {
                            return <User role={this.props.props} key={index} props={item} />
                        }) : null}
                    </div>
                }
                <hr />
            </div>

        );
    }
}
const mapStateToProps = state => ({
    userReducer: state.userReducer
})

export default connect(mapStateToProps, { getUsers, myClass })(Users);
