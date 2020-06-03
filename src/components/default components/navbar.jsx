import React, { Component, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import RegisterModal from '../auth/registerModal';
import Logout from '../auth/logout';
import LoginModal from '../auth/loginModal';
import PropTypes from 'prop-types';

class AppNavbar extends Component {

    state = {
        isOpen: false
    }

    static propTypes = {
        authReducer: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { name, role } = this.props.authReducer;
        let links = (
            <Fragment>
                <NavItem>
                    <LoginModal />
                </NavItem>
                <NavItem>
                    <Link className="nav-link" to="/teachers">Teachers</Link>
                </NavItem>
                <NavItem>
                    <Link className="nav-link" to="/managers">Managers</Link>
                </NavItem>
                <NavItem>
                    <Link className="nav-link" to="/activities">Activities</Link>
                </NavItem>
            </Fragment>
        );;

        if (role === 'teacher') {
            links = (
                <Fragment>
                    <NavItem>
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/updateStudents">My Class</Link>
                    </NavItem>
                    <NavItem>
                        <RegisterModal />
                    </NavItem>
                    <NavItem>
                        <Logout />
                    </NavItem>
                </Fragment>
            );
        }
        if (role === 'manager') {
            links = (
                <Fragment>
                    <NavItem>
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/updateTeachers">Teachers</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/updateStudents">Students</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/updateManagers">Managers</Link>
                    </NavItem>
                    <NavItem>
                        <RegisterModal />
                    </NavItem>
                    <NavItem>
                        <Logout />
                    </NavItem>
                </Fragment>
            );
        }
        if (role === 'student') {
            links = (
                <Fragment>
                    <NavItem>
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/myClass">My Class</Link>
                    </NavItem>
                    <NavItem>
                        <Logout />
                    </NavItem>
                </Fragment>
            );
        }


        return (
            <Navbar color="dark" dark expand="sm" >
                <Container>
                    <NavbarBrand href="/">School Network</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {name ? <NavItem className='navbar-nav'>
                            <Link to="/" className='nav-link'>welcome {name}</Link>
                        </NavItem> : null}
                        <Nav className="ml-auto" navbar>
                            {links}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }

}

const mapStateToProps = state => ({
    authReducer: state.authReducer
})

export default connect(mapStateToProps, null)(AppNavbar)