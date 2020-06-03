import React, { Component } from 'react';


export default class Activity extends Component {


    render() {
        const { props } = this.props

        const photo = require(`../../photos/activities/${props.photo}`)

        return (
            <div>
                <section className='section-activity'>
                    <h1 className='title-activity text-capitalize'>{props.title}</h1>
                    <div className="content-activity">
                        <p>{props.description}</p>
                        <a href="#">Delete</a>
                        <a href="#">Update</a>
                    </div>
                    <div className="img-activity">
                        <img style={{ maxWidth: "100%" }} src={photo} />
                    </div>
                </section>
            </div>
        )
    }
}
