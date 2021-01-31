import React, {useEffect} from "react";
import defaultImage from "../../media/default.jpg";
import s from './Profile.module.css'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {GetDocumentsSelector, GetSuitableProfile} from "../../redux/reducers/Profile-selectors";
import {GetDocuments, GetProfiles} from "../../redux/reducers/ProfileReducer";
import {RouteComponentProps, withRouter, WithRouterProps, WithRouterStatics} from "react-router";
import {
    ApiOutlined,
    BulbOutlined,
    CarOutlined,
    CoffeeOutlined,
    FormatPainterOutlined,
    SettingOutlined,
    ShopOutlined,
    SkinOutlined
} from "@ant-design/icons";
import store from "../../redux/redux_store";

type PropsType = {

    ProfileId: number,

}

export const Profile: React.ComponentClass<Omit<RouteComponentProps<any>, keyof RouteComponentProps<any>> & WithRouterProps<(props: number) => JSX.Element>> & WithRouterStatics<(props: any) => JSX.Element> = withRouter((props:any) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetDocuments())
        dispatch(GetProfiles())
    }, [])

    const profiles: Array<{
        id: number,
        companyProfilePicture: string,
        companyName: string,
        companyDescription: string,
        country: string,
        companyLogo: string,
        sections: string,
        owner: number
    }> = props.profiles



    const profile = profiles.filter(p => p.id === Number(props.match.params.id))
    console.log(props.my_documents)

    const my_documents =(props.my_documents && profile[0]) ? props.my_documents.filter((e: {
        id: number,
        Title: string,
        Thumbnail: string,
        Download: string,
        owner: number
    }) => e.owner && (e.owner == profile[0].owner) ): []
    const onclick:any = (link: string) => {window.open(link, '_blank')}
    return <div className={s.main}>
        {profile.map(p => (
            <div>
                <div className={s.back} style={
                    {backgroundImage: ` linear-gradient( rgba(56, 56, 56, 0.596), rgba(56, 56, 56, 0.596), rgba(56, 56, 56, 0.596), rgba(255, 255, 255, 0.56) ),  url(${(p.companyProfilePicture || defaultImage)})`}}>
                    <div className={s.name_country}>
                        <img alt={"logo"} className={s.logo} src={p.companyLogo}/>
                        <div>
                            <h3>{p.companyName}</h3>
                            <h5>{p.country}</h5>
                        </div>
                    </div>
                </div>
                <div className={s.box_size}>
                    <p>{p.companyDescription}</p>
                    {profile && JSON.parse(p.sections).map((e: {
                            Text: string,
                            Icon: string,
                            Title: string,

                        }) => (
                            <div className={s.section}>
                                <div>
                                    {e.Icon === "Logistics companies" && (
                                        <CarOutlined className={s.icon}/>)}
                                    {e.Icon === "Restaurant business" && (
                                        <CoffeeOutlined className={s.icon}/>)}
                                    {e.Icon === "Grocery supplier" && (
                                        <ShopOutlined className={s.icon}/>)}
                                    {e.Icon === "Small manufacturers" && (
                                        <BulbOutlined className={s.icon}/>)}
                                    {e.Icon === "Fabric supplier" && (
                                        <SkinOutlined className={s.icon}/>)}
                                    {e.Icon === "Supplier of kitchen utensils" && (
                                        <SettingOutlined className={s.icon}/>)}
                                    {e.Icon === "Supplier of household appliances" && (
                                        <ApiOutlined className={s.icon}/>)}
                                    {e.Icon === "Interior designers" && (
                                        <FormatPainterOutlined className={s.icon}/>)}


                                    <h3>{e.Title}</h3>
                                </div>
                                <p>{e.Text}</p>

                            </div>
                        )
                    )}
                </div>
            </div>
        ))}
        {props.my_documents && my_documents.map((d: any) => (<div className={s.box_size}>
                <a href={d.Download} download><img alt={"thumbnail"} style={{borderRadius: '10px'}} src={d.Thumbnail}/></a>
                <small>{d.Title}</small>
                <Link  to={d.Download}  download>Download</Link>
            </div>
        ))}

    </div>

})