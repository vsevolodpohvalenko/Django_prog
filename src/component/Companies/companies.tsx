import React, {SetStateAction, useEffect, useState} from "react";
import s from './companies.module.css'
import cn from "classnames";
import {ProfileType} from "../accounts/Profile/ProfileView/ProfileView";
import {CategoriesType} from "../accounts/Profile/ProfileEdit/ProfileEditContainer";
import {GetCountries, GetProfiles} from "../../redux/reducers/ProfileReducer";
import store from "../../redux/redux_store";
import {Typography} from "antd";


const OnClick = (props: string) => {
    window.location.href = `profile/${props}`

}

const Profile = (props: { id: number, companyLogo: string, companyName: string, country: string, companyDescription: string }) => {

    return (
        <div onClick={() => OnClick(String(props.id))} className={s.company}>
            <img alt={"Logo"} className={s.logo} src={props.companyLogo}/>
            <h5>{props.companyName}</h5>
            <h6>{props.country}</h6>
            <p>{props.companyDescription.slice(0, 64) + "..."}</p>
        </div>
    )
}

type RootProps = {
    GetSearchedData: (search: string) => void,
    profiles: ProfileType,
    categories: CategoriesType,
    countries: any,
    type: Array<{ Name: string }>

}
export const Companies = (props: RootProps) => {
    useEffect(() => {

        debugger
        store.dispatch(GetCountries())
        props.profiles[0] != undefined && (props.profiles[0].id == 0 && (store.dispatch(GetProfiles())))

    }, [])

    const [activeCountries, setActiveCountries] = useState<boolean>(false)
    const [activeCategories, setActiveCategories] = useState<boolean>(false)
    const [activeType, setActiveType] = useState<boolean>(false)
    const [search, setSearch] = useState<Array<string>>([])
    const [filter, setFilter] = useState<boolean>(false)

    const Search = (e: SetStateAction<any>) => {
        debugger
        setSearch(e)
        props.GetSearchedData(e)
    }

    const Check = (e: any) => {
        debugger
        const checkBox: null | HTMLInputElement | any = document.getElementById(`check${e}`);

        if (checkBox.checked) {
            const Actual = [...search, e]
            setSearch(Actual)
            props.GetSearchedData(Actual.join())
        } else {
            const Actual = search.filter(element => element !== e)
            setSearch(Actual)
            search.length !== 0 ? props.GetSearchedData(Actual.join()) : props.GetSearchedData("")
        }

    }
    const SearchButton1 = (name: string) => {
        debugger
        const checkBox: any = document.getElementById(`check${name}`);
        if (checkBox.checked) {
            setSearch([...search, name])
        } else {
            setSearch(search.filter(e => e !== name))
        }
    }

    const SearchButton2 = () => {
        props.GetSearchedData(search.join())
        setFilter(false)
    }
    const ClearAll = () => {
        debugger
        search.forEach(e => {
            const checkBox: any = document.getElementById(`check${e}`)
            checkBox.checked = false
        })
        setSearch([])
    }
    return (
        <div className={s.main}>
            <button onClick={() => setFilter(true)} className={s.sort}>Sort Results</button>
            <div className={cn({[s.active]: filter}, s.filter)}>
                <div className={s.filter_inner}>
                    <div className={s.buttons}>
                        <h3 onClick={() => setFilter(false)}>Close</h3> <h3 onClick={() => ClearAll()}>Clear All</h3><h3
                        onClick={() => SearchButton2()}>Apply</h3>
                    </div>
                    <h2>Sort results by</h2>
                    <input type={"text"} onChange={(e) => Search(e.target.value)} placeholder={"Search keywords"}
                           className={s.input}/>
                    <div className={s.title}><h3>Category</h3>
                        <div className={cn({[s.active]: activeCategories}, s.skip)}
                             onClick={() => setActiveCategories(!activeCategories)}/>
                    </div>

                    {props.categories.map(c => (
                        <div className={cn({[s.active]: activeCategories}, s.select)} key={c.id}>
                            <h6>{c.Name}</h6>
                            <input onClick={() => !filter ? Check(c.Name) : SearchButton1(c.Name)} type={"checkbox"}
                                   id={`check${c.Name}`} className={s.checkbox}/>
                        </div>
                    ))}
                    <div className={s.title}><h3>Purpose</h3>
                        <div className={cn({[s.active]: activeType}, s.skip)}
                             onClick={() => setActiveType(!activeType)}/>
                    </div>
                    {props.type.map((c, id) => (
                        <div className={cn({[s.active]: activeType}, s.select)} key={id}>
                            <h6>{c.Name}</h6>
                            <input onClick={() => !filter ? Check(c.Name) : SearchButton1(c.Name)} type={"checkbox"}
                                   id={`check${c.Name}`} className={s.checkbox}/>
                        </div>
                    ))}

                    <div className={s.title}><h3>Country</h3>
                        <div className={cn({[s.active]: activeCountries}, s.skip)}
                             onClick={() => setActiveCountries(!activeCountries)}/>
                    </div>
                    {props.countries.map((c: any, index: number) => (
                        <div className={cn({[s.active]: activeCountries}, s.select)} key={index}>
                            <h6>{c.name}</h6>
                            <input onClick={() => !filter ? Check(c.name) : SearchButton1(c.name)} type={"checkbox"}
                                   id={`check${c.name}`} className={s.checkbox}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.profiles}>
                {props.profiles.length == 0 && (
                    <div><Typography.Title style={{color: "lightgray", marginLeft: "10vw", marginTop: "20vh"}}
                                           level={4}>Nothing has been found on your request....</Typography.Title>
                    </div>)}
                {props.profiles[0] != undefined ? (props.profiles[0].id != 0 && props.profiles.map((p) => (
                    <Profile key={p.id} id={p.id} companyLogo={p.companyLogo} companyName={p.companyName}
                             country={p.country} companyDescription={p.companyDescription}/>
                ))) : (props.profiles.map((p) => (
                    <Profile key={p.id} id={p.id} companyLogo={p.companyLogo} companyName={p.companyName}
                             country={p.country} companyDescription={p.companyDescription}/>
                )))}

            </div>
        </div>
    )
}