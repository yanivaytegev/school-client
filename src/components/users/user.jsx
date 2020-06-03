import React, { Component } from 'react';

class User extends Component {

    state = {
        active: true
    }

    button = null;
    title = 'title-cotact-me';
    nav = null;

    toggle = () => {
        this.setState({
            active: !this.state.active
        })
    }

    onClick = (e) => {
        e.preventDefault()
        if (this.state.active) {
            this.button = 'active';
            this.title = 'title-cotact-me active';
            this.nav = 'active';
        } else {
            this.button = null;
            this.title = 'title-cotact-me';
            this.nav = null;
        }
        this.toggle();
    }

    render() {
        const { props, role } = this.props;

        return (
            <div className="contact-area">
                <div className="contact">
                    <main>
                        <section style={props.gender === 'male' ? { 'backgroundColor': '#4d4da0' } : { 'backgroundColor': '#eb524a' }}>
                            <div className="content text-capitalize">
                                <img src={require(`../../photos/users/${role}/${props.photo}`)} alt="wave" />
                                <aside>
                                    <h1>{props.firstName} {props.lastName}</h1>
                                    {role === 'teacher' ?
                                        <p>{props.class} teacher</p>
                                        : null}
                                </aside>
                                <button className={this.button} onClick={e => this.onClick(e)}>
                                    <span>Contact Me</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"> <g className="nc-icon-wrapper" fill="#444444"> <path d="M14.83 30.83L24 21.66l9.17 9.17L36 28 24 16 12 28z"></path> </g> </svg>
                                </button>
                            </div>
                            <div className={this.title} style={props.gender === 'male' ? { 'backgroundColor': '#37366c' } : { 'backgroundColor': '#c63535' }}><p>Contact Me</p></div>
                        </section>
                    </main>
                    <nav className={this.nav}>
                        <a href="#gmail" className="gmail">
                            <div className="icon">
                                <i className="material-icons red">email</i>                            </div>
                            <div className="content">
                                <h1>Email</h1>
                                <span>{props.mail}</span>
                            </div>
                        </a>
                        <a href="#phone" className="phone">
                            <div className="icon">
                                <i className="material-icons blue">settings_cell</i>
                            </div>
                            <div className="content">
                                <h1>Phone</h1>
                                <span>{props.phone}</span>
                            </div>
                        </a>
                    </nav>
                </div>
            </div >
        );
    }
}

export default User;