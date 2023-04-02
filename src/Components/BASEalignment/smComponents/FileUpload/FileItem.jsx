import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { ReactComponent as CloudSvg } from "../../../../assets/svg/cloud.svg";
import { ReactComponent as UploadDone } from "../../../../assets/svg/uploaddone.svg";
const FileItem = ({ doc_name = "Undefined", max_size = 2, file_type = "Png", isRequired = false, error = null }) => {
    const [isUploading, setUploading] = useState(false);
    const [uploadProgress, setProgress] = useState(0);
    const [isUploadDone, setUploadDone] = useState(false);


    const [file, setFile] = useState([]);

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const updateProgress = () => {

        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }

    const handleFile = async (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);

        }

        if (!file) {
            alert("No file found!");
        } else {
            setUploading((prev) => prev = true);
            for (let i = 0; i < 10; i++) {
                if (uploadProgress === 100) {
                    break;
                }
                await delay(350);
                updateProgress();
            }

            setUploading(false);
            setUploadDone(true);



            console.log("uploading file...", file.name);
        }
        fetch("https://api.ksdesign/file/upload", {
            method: 'POST',
            body: file,

            headers: {
                'content-type': file.type,
                'content-length': file.size
            }
        }).then((res) => {
            console.log(res.json());
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <div style={{
            outline: ` ${error?.isErr === true ? "1px solid red" : "none"} `
        }} className="upload__blob">
            <div className="meta__info">
                <p className="file__title">
                    {doc_name}
                </p>
                <div className="minor__data__notes">
                    <p className={`file__size ${file?.length != 0 && "green"}`}>
                        {file?.length != 0 ? `${Math.round(file.size / 10000)} MB uploaded` : "2 MB max size"}

                    </p>
                    <p className="available__file__fontmats">
                        {file?.length != 0 ? `${String(file?.type).split("/")[1]}` : "   PNG,PFD"}

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
                        <Button sx={{
                            backgroundColor: "#EBEBEB",
                            color: "black",
                            padding: "6px 12px",
                        }} aria-label="upload picture" component="label" startIcon={<CloudSvg />}>
                            <input required onChange={handleFile} hidden accept="image/*" type="file" />

                            Upload
                        </Button>

                    </>}
        </div>
    )
}

export default FileItem