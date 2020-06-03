import React, { Component } from 'react'

export default class Filter extends Component {

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4 text-center text-capitalize'>
                        <span className='bg-dark text-white rounded-circle px-3 py-2 mx-2 h5'>{this.props.count}</span> {this.props.role}s found
                    <hr />
                    </div>
                    <div className='col-md-4'>
                        <label>Order By </label>
                        <select className='form-control' value={this.props.sort} onChange={this.props.handleChangeSort}>
                            <option value='' >Select</option>
                            <option value='ID' >ID</option>
                            <option value='NameA-Z' >Name A-Z</option>
                            <option value='NameZ-A' >Name Z-A</option>
                        </select>

                    </div>
                    {this.props.role === 'student' ?
                        <div className='col-md-4'>
                            <label>Order By Teacher Name</label>
                            <select className="form-control text-capitalize" value={this.props.teacher} onChange={this.props.handleChangeTeacher}>
                                <option value='' >Select</option>
                                {this.props.teachers.map((teacher, key) => {
                                    return <option key={key} value={teacher.id}>{teacher.name}</option>
                                })}
                            </select>
                        </div> : null}
                </div>
            </div>
        )
    }
}
