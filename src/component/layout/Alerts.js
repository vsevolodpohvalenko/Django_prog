import React, { PureComponent , Fragment} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux'
class Alerts extends PureComponent {

    componentDidUpdate(prevProps){
        const {error, message} = this.props;
        if (error !== prevProps.error){
            if (error.msg.email)
                this.props.alert.error(`Email: ${error.msg.email.join()}`)
            if (error.msg.password)
                this.props.alert.error(`Password: ${error.msg.password.join()}`)
            if (error.msg.non_field_errors)
                this.props.alert.error(`${error.msg.non_field_errors.join()}`)
            if (error.msg.first_name)
                {this.props.alert.error(`First name ${error.msg.first_name.join()}`)}
            if (error.msg.last_name)
                {this.props.alert.error(`Last name ${error.msg.last_name.join()}`)}
            if (error.msg.password1)
                {this.props.alert.error(`Password ${error.msg.password1.join()}`)}}
        if (message !== prevProps.message){
            debugger
            if (message.log_in_ed)
                {this.props.alert.success(`${message.log_in_ed}`)}
            if (message.registered)
                {this.props.alert.success(`${message.registered}`)}
        }
    }
    render() {
        return <Fragment>

        </Fragment>
    }
}

const mapStateToProps = (state) => {
    return{
    error: state.error,
    message: state.message
}}

export default connect(mapStateToProps)(withAlert()(Alerts))