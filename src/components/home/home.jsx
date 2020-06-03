import React, { Component } from 'react';
import { UncontrolledCarousel } from 'reactstrap';

class Home extends Component {

    items = [
        {
            src: require('../../photos/school1.jpg'),
            altText: 'Slide 1',
            caption: 'You think you can I know you can',
            header: 'Our Motto',
            key: '1'
        },
        {
            src: require('../../photos/school2.jpg'),
            altText: 'Slide 2',
            caption: 'We believe every child can achieve greatness',
            header: 'Our Believe',
            key: '2'
        },
        {
            src: require('../../photos/school3.jpg'),
            altText: 'Slide 3',
            caption: 'This school will show the future opportunities to the children',
            header: 'Our Future',
            key: '3'
        }
    ];

    render() {

        const { logged } = this.props

        let links = {
            managers: "managers",
            teachers: "teachers",
            activities: "activities"
        }

        if (logged) {
            links = {
                managers: "updateManagers",
                teachers: "updateTeachers",
                activities: "activities"
            }
        }
        console.log(links)
        return (
            <div>
                <UncontrolledCarousel items={this.items} />
                <div id="content">
                    <a href={links.managers}>
                        <div className="circle managers">managers</div>
                    </a>
                    <a href={links.teachers}>
                        <div className="circle teachers">teachers</div>
                    </a>
                    <a href={links.activities}>
                        <div className="circle activities">activities</div>
                    </a>
                </div>
            </div>
        );
    }
}




export default Home