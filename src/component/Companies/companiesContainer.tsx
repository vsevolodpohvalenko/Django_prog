import React, {PureComponent} from "react";
import {connect, ConnectedProps} from "react-redux";
import {Companies} from "./companies";
import {GetCategory, GetCountries, GetProfiles, GetSearchedData} from "../../redux/reducers/ProfileReducer";
import {AppStateType} from "../../redux/redux_store";
import {Header} from "../layout/Header/Header";
import {Footer} from "../layout/Footer/Footer";


class CompaniesContainer extends PureComponent<PropsReduxType> {
    componentDidMount() {
        debugger
        this.props.GetCategory()
        this.props.GetCountries()

    }

    render() {
        return (
            <div>
                <Header/>
                <Companies type={this.props.type} profiles={this.props.profiles} GetSearchedData={this.props.GetSearchedData}
                           categories={this.props.categories} countries={this.props.countries}/>
                <Footer/>
            </div>
        )
    }
}


const mapStateToProps= (state:AppStateType) => {
    return{
        profiles: state.profile.profiles,
        countries: state.profile.countries,
        categories: state.profile.category,
        type: state.profile.type
    }
}
const connector = connect(mapStateToProps, {GetCountries, GetSearchedData, GetCategory, GetProfiles})

type PropsReduxType = ConnectedProps<typeof connector>

export default connector(CompaniesContainer)