import React, {ChangeEvent, FormEvent, useState} from "react";
import Dropzone from "react-dropzone";
import s from './ProfileEdit.module.css'
import {profileAPI} from "../../../../api/profileApi";
import {getCookie} from "../../Register/register";

type InputTextPropsType = {
  element: string,
  value: any,
  onChange: any

}

let InputText = (props: InputTextPropsType) => {
  return (<div><label>{props.element}</label>
    <input className='form-control' type="text" placeholder={props.element} id={props.element} value={props.value} onChange={props.onChange} required/>
    </div>
)}




const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
export type CustomDropZoneType = {
  label: string,
  onDrop: any,
  p: string,
  stateElement?: any,
  h5?: string,
  AllowButton: number,
  name?: string
}

  const CustomDropZone = (props: CustomDropZoneType) => {

    return(
      <div className={s.dropwrapper}>
        <label>{props.label}</label>
      <section  className={s.thumb}>

       <Dropzone onDrop={props.onDrop}>
         {({ getRootProps, getInputProps}) => (
           <div {...getRootProps({ className: "dropzone" })}>

             <input {...getInputProps()} />
             <div className={s.clip}/>
            <p>{props.p}</p>
             <h5>{props.h5}</h5>

           {props.AllowButton && (<button type="button" >
             Upload
           </button>)}
           </div>
         )}
       </Dropzone>
       </section>
       </div>
    )
  }

export const Document = () => {
  const [DocumentThumbnail, setDocumentThumbnail] = useState<Array<any>>([]);
  const [DocumentTitle, setDocumentTitle] = useState<string>('')
  const [DocumentDownload, setDocumentDownload] = useState<Array<any>>([])
  const csrftoken = getCookie('csrftoken');
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debugger
    let form_data_document = new FormData()
    form_data_document.append('Thumbnail', DocumentThumbnail[0], DocumentThumbnail[0].name);
    form_data_document.append('Download', DocumentDownload[0], DocumentDownload[0].name);
    form_data_document.append('Title', DocumentTitle);
    profileAPI.PostDocuments(form_data_document, csrftoken)

  }

    const thumbs2 = DocumentThumbnail.map((file: any)=> (
    <div className={s.preview} key={file.name}>
      <div className={s.thumbInner}>
        <img
          alt="thumbnail"
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

      const handleDrop3 = (acceptedFiles: any) => {
    setDocumentDownload(acceptedFiles.map((file: any) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }

  const handleDrop2 = (acceptedFiles: any) => {
    setDocumentThumbnail(acceptedFiles.map((file: any) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }

  return (
    <form onSubmit={handleSubmit}>
    <h2>Document</h2>
    <InputText element="DocumentTitle" value={DocumentTitle} onChange={(e: ChangeEvent<HTMLInputElement>) => setDocumentTitle(e.target.value)}/>
    <aside className={s.thumbsContainer}>
      {thumbs2}
    </aside>

    <CustomDropZone label = "Thumbnail" AllowButton={0} onDrop = {handleDrop2} p="Drag&Drop Your attachments here"/>
    <CustomDropZone label = "Download" AllowButton={1} onDrop = {handleDrop3} p="Drag&Drop Your attachments here"/>
    <button id="test" className={s.button} >Lets go</button>
    </form>
  )
}



