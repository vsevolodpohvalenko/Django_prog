import React from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {ProfileEdit} from './ProfileEdit'
import {
    GetCountries,
    GetProfiles,
    GetDocuments,
    updateManufacturer,
    updateDocument,
    postDocument,
    GetCategory
} from '../../../../redux/reducers/ProfileReducer'
import {AppStateType} from "../../../../redux/redux_store";
import {compose} from "redux";
import {withRouter} from "react-router";

export type CategoriesType = Array<{
        id: number,
        Name: string
    }>

class ProfileEditContainer extends React.PureComponent<PropsFromRedux> {
    componentDidMount() {
        debugger
        this.props.GetProfiles()
        this.props.GetCountries()
        this.props.GetDocuments()
        this.props.GetCategory()
    }

    render() {
        return this.props.profile[0].id !== 0 ?
            <ProfileEdit category={this.props.category} postDocument={this.props.postDocument}
                          updateDocument={this.props.updateDocument}
                         updateManufacturer={this.props.updateManufacturer} documents={this.props.my_documents}
                         userID={this.props.userID} previousProfile={this.props.profile}
                         countries={this.props.countries}/> : <div>Loading</div>
    }
}

let mapStateToProps = (state: AppStateType) => {
    debugger
    return {
        countries: state.profile.countries,

        userID: state.auth.user.id ,
        profile: state.profile.profiles,
        my_documents: state.profile.documents,
        category: state.profile.category
    }
}

const connector = connect(mapStateToProps, {
    GetCountries,
    GetProfiles,
    GetCategory,
    GetDocuments,
    updateManufacturer,
    postDocument,
    updateDocument
})

type PropsFromRedux = ConnectedProps<typeof connector>

export default compose(withRouter, connector)(ProfileEditContainer)