import React from 'react'
import FileItem from '../FileUpload/FileItem'


const FileSection = ({FILEBLOGCONFIG=null}) => {
    console.log(FILEBLOGCONFIG);

    return (
        <>
            <div className="section__required__docs component__div">
                <div className="heading__outer">
                    <h2>PLEASE PROVIDE THE FOLLOWING MANDATORY DETAILS</h2>
                    <p>These are Mandatory Documents which are need to be
                        submitted in order to publish your AD.</p>
                </div>
                <div className="docs__inner inner__section">
                    <div className="docs__upload">
                        {
                            FILEBLOGCONFIG.required__docs.map((({ doc_name, max_size, file_type, isRequired,index,file_name}) => {
                                return (
                                    <FileItem index={index} doc_name={doc_name} max_size={max_size} file_type={file_type} isRequired={isRequired} error={null} file_name={file_name} />
                                )
                            }))
                        }

                    </div>
                    <div className="docs__info">
                        <p className="info">
                            <span className="bold">Kindly Note :</span>
                            {FILEBLOGCONFIG.info__text}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FileSection