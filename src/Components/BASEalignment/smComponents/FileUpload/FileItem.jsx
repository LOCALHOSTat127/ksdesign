import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {
    ref,
    uploadBytesResumable, getDownloadURL
} from "firebase/storage";

import storage from "../../../../Api/Firebase/firebase";
import { Base64 } from 'js-base64';
import { useDispatch, useSelector } from 'react-redux';
import { set_bucket_uri, push_bucket_doc } from "../../../../app/features/ad_config/ad_booking_config_slice";
import Firebase_Utils from '../../../../Api/Firebase/firebase_utils';

import { ReactComponent as CloudSvg } from "../../../../assets/svg/cloud.svg";
import { ReactComponent as UploadDone } from "../../../../assets/svg/uploaddone.svg";
const FileItem = ({ doc_name, max_size = 2, file_type, isRequired = false, error = null, index, file_name }) => {
    const [isUploading, setUploading] = useState(false);
    const [uploadProgress, setProgress] = useState(0);
    const [isUploadDone, setUploadDone] = useState(false);
    const ad_state = useSelector((state) => state.ad_booking_config);
    const store_bucket_url = ad_state.THIRD_STEP.config_info.documents.bucket_uri;
    const isStepLocked = ad_state.THIRD_STEP.config_info.customer_contact_info.isDone;



    let dispatch = useDispatch();
    const [file, setFile] = useState({
        fileblob: null,
        blobID: null
    });




    const uploadFIle = () => {
        let folder_name = null;
        setUploading((prev) => prev = true);

        // generating_bucket_uri
        if (store_bucket_url === null) {
            folder_name = Base64.encodeURL(Firebase_Utils.get_bucket_uri(ad_state.THIRD_STEP.config_info.customer_contact_info.contact_person_name.split(" ")[0],
            ad_state.THIRD_STEP.config_info.customer_contact_info.contact_phone));
            dispatch(set_bucket_uri(folder_name));
        }


        const storageRef = ref(storage, `/${folder_name === null ? store_bucket_url : folder_name}/${file_name}.${file.fileblob.name.split(".")[1]}`);



        const uploadTask = uploadBytesResumable(storageRef, file.fileblob);
        // uploading_file
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(Math.round(progress))
            }, (err) => alert("error"),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    dispatch(push_bucket_doc({
                        file_name: `${file_name}.${file.fileblob.type}`,
                        download_url: url,
                    }));
                    setUploading(false);
                    setUploadDone(true);
                });
            })



    }

    const handleFile = (e) => {

        setFile((prev) => ({
            fileblob: e.target?.files[0],
            blobID: e.target.dataset.blobId
        }));

    }

    useEffect(() => {
        if (file.fileblob != null) {
            uploadFIle();
        }

    }, [file])



    return (
        <div
            id={`FILE_${index}`}
            style={{
                outline: ` ${error?.isErr === true ? "1px solid red" : "none"} `
            }} className="upload__blob">
            <div className="meta__info">
                <p className="file__title">
                    {doc_name}
                </p>
                <div className="minor__data__notes">
                    <p className={`file__size`}>
                        {max_size} MB max size

                    </p>
                    <p className="available__file__fontmats">
                        {file_type}

                    </p>
                    <p style={{
                        display: ` ${error?.isErr === false ? "none" : "flex"} `,
                        color: "red",
                        fontWeight: "500",
                        fontSize: "13px"
                    }} className="error">
                        {error?.msg}
                    </p>
                </div>
            </div>

            {(isUploading === true && isUploadDone === false) ?
                <>
                    <CircularProgress sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        '.MuiCircularProgress-svg': {
                            width: "100%",
                            height: "auto",
                            maxWidth: "24px",
                        }
                    }} variant="determinate" value={uploadProgress} />
                </> : (isUploading === false && isUploadDone === true) ?

                    <>

                        <UploadDone style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "24px",
                        }} />

                    </> :
                    <>
                        <Button
                            disabled={isStepLocked === false ? true : false}
                            sx={{
                                backgroundColor: "#EBEBEB",
                                color: "black",
                                padding: "6px 12px",
                            }} aria-label="upload picture" component="label" startIcon={<CloudSvg />}>
                            <input data-blob-id={`FILE_${index}`} required onChange={handleFile} hidden accept={`*image/${file_type.split(",")[0],file_type.split(",")[1]}`} type="file" />

                            Upload
                        </Button>

                    </>}
        </div>
    )
}

export default FileItem