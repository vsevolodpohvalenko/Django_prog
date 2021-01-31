import React from "react";
import defaultImage from "../../../../media/default.jpg";
import s from './ProfileView.module.css'
import {Link} from "react-router-dom";
import {
    ApiOutlined,
    BulbOutlined,
    CarOutlined,
    CoffeeOutlined, FormatPainterOutlined,
    SettingOutlined,
    ShopOutlined,
    SkinOutlined
} from "@ant-design/icons";

export type SectionType = Array<{
    Text: string,
    Icon: string,
    Title: string
}>

export type ProfileType = Array<{
    id: number,
    companyProfilePicture: string,
    companyName: string,
    companyDescription: string,
    country: string,
    companyLogo: string,
    sections: any,
    owner: number
}>

export type DocType = Array<{
    id: number,
    Title: string,
    Thumbnail: string,
    Download: string,
    profile: number
}>

type RootProps = {

    profiles: ProfileType,
    my_documents: DocType
}

export const ProfileView = (props: RootProps) => {
    debugger

    return <div className={s.main}>
        {props.profiles.map((p, index) => (
            <div key={index}>
                <div className={s.back} style={
                    {backgroundImage: ` linear-gradient( rgba(56, 56, 56, 0.596), rgba(56, 56, 56, 0.596), rgba(56, 56, 56, 0.596), rgba(255, 255, 255, 0.56) ),  url(${(p.companyProfilePicture || defaultImage)})`}}>
                    <div className={s.name_country}>
                        <img alt={"logo"} className={s.logo} src={p.companyLogo}/>
                        <div>
                            <h3>{p.companyName}</h3>
                            <h5>{p.country}</h5>
                        </div>
                    </div>
                    <div className={[s.edit_button, s.edit].join(' ')}><Link
                        to={`/profileEdit/${index + 1}`}>Edit</Link></div>
                </div>

                <div className={s.box_size}>
                    <div className={[s.button].join(' ')}><Link to={`/profileEdit/${index}`}>Edit</Link></div>
                    <p>{p.companyDescription}</p>
                    <div className={s.Sections}>
                        {/*<p>{p.section}</p>*/}
                        {props.profiles[0] && JSON.parse(p.sections).map((e: {
                                Text: string,
                                Icon: string,
                                Title: string
                            }, index: number) => (
                                <div key={index} className={s.section}>
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
                <div className={[s.Documents].join(' ')}>
                    {props.my_documents && props.my_documents.map(d => (d.profile === p.id && <div key={d.id}>
                            <a href={d.Download} download><img alt={"thumbnail"} src={d.Thumbnail}/></a>
                            <p>{d.Title}</p>
                            <a href={d.Download} download>Download</a>
                        </div>
                    ))}
                </div>
            </div>
        ))}

        <div style={{justifyContent: 'center', display: "flex"}}><Link className={s.add} to={`/new_company`}>Add Company
            Profile</Link></div>
    </div>

}