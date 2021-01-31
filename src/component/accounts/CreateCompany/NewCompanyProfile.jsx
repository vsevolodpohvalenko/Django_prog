import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../../redux/reducers/AuthReducer'
import {createMessage} from '../../../redux/reducers/MessageReducer'
import s from '../Login/login.module.css'
import {profileAPI} from "../../../api/profileApi";
import Select from "react-select";
import {GetCategory} from "../../../redux/reducers/ProfileReducer";
import {withRouter} from 'react-router-dom'
import {compose} from "redux";
import store from "../../../redux/redux_store";
import {CustomDropZoneType} from "../Profile/ProfileEdit/Document";
import style from "../Profile/ProfileEdit/ProfileEdit.module.css";
import Dropzone from "react-dropzone";


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

class NewCompanyProfile extends React.Component {
    componentDidMount() {
        this.props.GetCategory()
    }

    state = {
        CompanyName: '',
        CompanyDescriptions: '',
        ProductType: '',
        ProductDescriptions: '',
        logo: ''

    }


    onChange = e => {
        debugger
        this.setState({[e.target.name]: e.target.value})
    }
    onChange_1 = e => {
        debugger
        this.setState({["ProductType"]: e.value})
    }

    render() {

        const CustomDropZone = (props) => {
        return (
            <div>
                <label>{props.label}</label>
                <section className={style.thumb}>

                    <Dropzone onDrop={props.onDrop}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps({className: "dropzone"})}>

                                <input {...getInputProps()} />
                                <div className={s.clip}/>
                                <p>{props.p}</p>
                                <h5>{props.h5}</h5>

                                {!!props.AllowButton && (<button type="button">
                                    Upload
                                </button>)}
                            </div>
                        )}
                    </Dropzone>
                </section>
            </div>
        )
    }

        const handleDrop4 = (acceptedFiles) => {
            debugger
            this.setState({
                ["logo"]: acceptedFiles.map((file) => Object.assign(file, {
                        preview: URL.createObjectURL(file)

                    }
                ))
            });

        }

        const categoryOptions = this.props.categories.map(c => {
            return {value: c.Name, label: c.Name}
        })
        const csrftoken = getCookie('csrftoken');

        const {history} = this.props
        const onSubmit = (e) => {
            debugger
            e.preventDefault();
            const {CompanyName, CompanyDescriptions, logo, ProductType, ProductDescriptions} = this.state
            const owner = this.props.owner
            const section = [{Title: " ", Icon: ProductType, Text: ProductDescriptions}]
            profileAPI.PostProfile({
                CompanyName: CompanyName,
                companyLogo: logo[0],
                CompanyDescriptions: CompanyDescriptions,
                ProductType: ProductType,
                section: section,
                owner: owner
            }).then(r => history.push('/'),
                this.props.createMessage({log_in_ed: "New Company's Profile was created"}))
        }

        // if (this.props.isAuthenticated) {
        //     return <Redirect to="/"/>
        // }

        const {CompanyName, CompanyDescriptions, ProductType, ProductDescriptions} = this.state
        let CustomSelect = (props) => {
            return (
                <div className={s.customSelect}>
                    <label>{props.label}</label>
                    <Select className={s.select} name={props.name} options={props.options}
                            placeholder={props.placeholder} value={props.value}
                            onChange={props.onChange}/>
                </div>
            )
        }
        return (
            <div className="col-md-12">
                <div className={s.main}>
                    <h2 className={s.text}>Your Company</h2>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Company Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="CompanyName"
                                onChange={this.onChange}
                                value={CompanyName}
                            />
                        </div>
                        <div className="form-group">
                            <CustomDropZone label="Attachments" AllowButton={1} onDrop={handleDrop4}
                                            p="Drag&Drop Your attachments here"/>
                        </div>
                        <div className="form-group">
                            <label>Company Descriptions</label>
                            <textarea
                                className="form-control"
                                name="CompanyDescriptions"
                                onChange={this.onChange}
                                value={CompanyDescriptions}
                            />
                        </div>
                        <div className="form-group">
                            <CustomSelect value={{label: ProductType, value: ProductType}} label="Product Type"
                                          name="ProductType" options={categoryOptions}

                                          onChange={this.onChange_1}/>
                        </div>
                        <div className="form-group">
                            <label>ProductDescriptions</label>
                            <textarea

                                className="form-control"
                                name="ProductDescriptions"
                                onChange={this.onChange}
                                value={ProductDescriptions}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className={s.button}>
                                Create
                            </button>
                        </div>
                        <p>
                            Do you want to do it later? <Link to="/" className={s.link}>Home</Link>
                        </p>
                    </form>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    owner: state.auth.user.id,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    categories: state.profile.category
})

export default compose(withRouter, connect(mapStateToProps, {register, createMessage, GetCategory}))(NewCompanyProfile)