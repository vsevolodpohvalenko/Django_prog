import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../../redux/reducers/AuthReducer'
import {createMessage} from '../../../redux/reducers/MessageReducer'
import s from '../Login/login.module.css'

export function getCookie(name) {
            debugger
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
class Register extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',

    }


    onChange = e => {
        debugger
        this.setState({[e.target.name]: e.target.value})
    }

    render() {

        const csrftoken = getCookie('csrftoken');

        const onSubmit = e => {
            debugger
            e.preventDefault();
            console.log('Submit!')
            const {last_name, first_name, email, password} = this.state
            const NewUser = {
                email,
                first_name,
                last_name,
                password,
            }
            localStorage.setItem('password', NewUser.password)
            localStorage.setItem('email', NewUser.email)
            this.props.register({
                email: NewUser.email,
                first_name: NewUser.first_name,
                last_name: NewUser.last_name,
                password: NewUser.password,
                csrf_token: csrftoken,
            })
        }

        if (this.props.isAuthenticated) {
            return <Redirect to="/new_company"/>
        }

        const {first_name, last_name, email, password} = this.state

        return (
            <div className="col-md-12">
                <div className={s.main}>
                    <h2 className={s.text}>Register</h2>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                onChange={this.onChange}
                                value={first_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                onChange={this.onChange}
                                value={last_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className={s.button}>
                                Register
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login" className={s.link}>Login</Link>
                        </p>
                    </form>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, {register, createMessage})(Register)