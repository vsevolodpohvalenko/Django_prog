import React from "react";
import {connect, ConnectedProps} from "react-redux";
import { ProfileView} from "./ProfileView";
import { GetDocuments, GetProfiles} from '../../../../redux/reducers/ProfileReducer'
import {AppStateType} from "../../../../redux/redux_store";

class ProfileViewContainer extends React.Component<PropsReduxType> {
    componentDidMount() {
        this.props.GetDocuments()
        this.props.GetProfiles()
    }

    render() {
        return(
            <ProfileView profiles = {this.props.profiles} my_documents= {this.props.my_documents}/>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    debugger
    return {
        profiles: state.profile.profiles.filter((e: {
        id: number,
        companyProfilePicture: string,
        companyName: string,
        companyDescription: string,
        country: string,
        companyLogo: string,
        sections: string,
        owner: number
    }) => e.owner === state.auth.user.id),
        my_documents: state.profile.documents
    }
}

const connector = connect(mapStateToProps, {GetProfiles, GetDocuments})

type PropsReduxType = ConnectedProps<typeof connector>

export  default  connector(ProfileViewContainer)