import { useState } from 'react'
import "./style.css";
import Button from '@mui/material/Button';
import { ReactComponent as ShowSVG } from "../../../assets/svg/show.svg";
import { ReactComponent as EditSvg } from "../../../assets/svg/edit.svg";
import { ReactComponent as UpdateSvg } from "../../../assets/svg/update.svg";
import TextField from '@mui/material/TextField';

const EditorText = () => {
    const BGCONFIG = {
        "BG_COLORS": [
            {
                clr: "#ffffff",
                value: "#ffffff",
                id: "white",
                name: "bgcolor",
            },
            {
                clr: "#F8CBCC",
                value: "#F8CBCC",
                id: "clr_second",
                name: "Lightred",
            },
            {
                clr: "#99CCFD",
                value: "#99CCFD",
                id: "clr_third",
                name: "Blue",

            },
            {
                clr: "#FDCC32",
                value: "#FDCC32",
                id: "clr_fourth",
                name: "Sunglow",
            }
        ],
    };




    const [showPreview, setPreview] = useState(0);
    const [adBGcolor, setBGcolor] = useState(BGCONFIG.BG_COLORS[0] ? BGCONFIG.BG_COLORS[0] : "#FFFFFF");
    const [isMarkerOn, setMarker] = useState(false);
    const [isBorderOn, setBorder] = useState(false);
    const [ADTEXT, handleADTEXT] = useState("");
    const [words, setWords] = useState(0);
    const [lines, setLines] = useState(0);
    const [chars, setChars] = useState(0);
    const [price, setPrice] = useState(0);
    const [iseEmailAdded, setEmailAddition] = useState(0);

    const handlePreview = () => {
        if (showPreview === 0) {
            setPreview((prev) => prev + 1);
        } else {
            setPreview((prev) => prev - 1);
        }
    }

    const handleBGclr = (e) => {
        setBGcolor((prev) => prev = e.target.value);
    }

    const handleTyping = (e) => {
        handleADTEXT((prev) => prev = e.target.value);
    }



    const handleUpdatePrice = () => {
        let wordscount = 0;
        let charscount = 0;
        let linescount = 0;

        if (ADTEXT.length > 0) {
            ADTEXT.split(" ").forEach(word => {
                if (word != "\n") {
                    wordscount += 1;
                }
            })

            ADTEXT.split("").forEach(char => {
                if (char != "\n") {
                    charscount += 1;
                }
            })


            ADTEXT.split("\n").forEach(line => {
                linescount += 1;
            })
        }
        setWords((count) => count = wordscount);
        setChars((count) => count = charscount);
        setLines((count) => count = linescount);

    }



    return (
        <section data-editor-type="classified-text-ad" className="TextEditor__ground">
            {/* Editro-box/Preiew/controlls/HeadingPrice */}
            <div className="main__upper__containor">

                <div className={`edit_n_preview__outer ${showPreview && "toggle__preview"}`}>
                    <div className="textad__area">
                        <textarea
                            onChange={handleTyping}
                            placeholder='Type your AD here...'
                            name="text__body"
                            id="textarea"
                            cols="auto"
                            rows="12"
                        ></textarea>
                    </div>
                    <div style={{
                        minHeight: "270px"
                    }} className="preview__box" id="previewbox">
                        <h2 className="preview__heading">Preview in Newspaper</h2>
                        <div
                            style={{
                                backgroundColor: `${adBGcolor}`
                            }}
                            className={`preview__box__inner__outer ${isBorderOn && "screen__border"}`} >
                            <div className={`screen__heilight  ${isMarkerOn && "active__heilight"}`} ></div>
                            <p className="preview__Text">{ADTEXT}</p>
                        </div>
                    </div>
                </div>
                <div className="sidepanel">
                    <div className="bg__colors__outer">

                        <div className="colors__palet">
                            {BGCONFIG.BG_COLORS.map(({ value, name, id }) => {
                                return (
                                    <>
                                        <div style={{
                                            backgroundColor: `${value}`,
                                            display: "flex",
                                            alignItems: "center"
                                        }} className="bgcls__jscket">
                                            <input
                                                className='radio__Clr'
                                                type="radio"
                                                value={value}
                                                name={name}
                                                id={id}
                                                checked={adBGcolor === value}
                                                onChange={handleBGclr}
                                            />
                                            <p style={{
                                                textTransform: "capitalize",
                                                color: "black",
                                                fontWeight: "600",
                                                fontSize: "clamp(12px,4vw,12px)",
                                                width: "100%",
                                                textAlign: "center",
                                            }} className="bg__cls">{name}</p>
                                        </div>
                                    </>
                                )
                            })}

                        </div>



                    </div>

                    <div className="sub__controlls flex  flex-aic">

                        {/* Marker & Border */}
                        <div
                            style={{
                                boxShadow: `${isBorderOn === true ? "rgba(214, 35, 3, 0.3) 0px 0px 0px 1px" : "rgba(3, 102, 214, 0.3) 0px 0px 0px 2px"}`

                            }}
                            className="border__box checkboxouter flex fd-col flex-aic">
                            <input
                                className='border__cb checkbox'
                                type="checkbox"
                                name="ad__border"
                                id="ad__border"
                                checked={isBorderOn}


                                onChange={(e) => {
                                    setBorder(!isBorderOn);
                                }}
                            />

                            Border <span style={{
                                fontSize: "8px"
                            }} >(25% Extra Charge)</span>

                        </div>


                        {/* Marker & Border */}
                        <div
                            style={{
                                boxShadow: `${isMarkerOn === true ? "rgba(214, 35, 3, 0.3) 0px 0px 0px 1px" : "rgba(3, 102, 214, 0.3) 0px 0px 0px 2px"}`,

                            }}
                            className="marker__box checkboxouter flex fd-col flex-aic">
                            <input
                                className='marker__cb checkbox'
                                type="checkbox"
                                name="ad__marker"
                                id="ad__marker"
                                checked={isMarkerOn}


                                onChange={(e) => {
                                    setMarker(!isMarkerOn);
                                }}
                            />

                            Marker <span style={{
                                fontSize: "8px"
                            }} >(25% Extra Charge)</span>

                        </div>

                    </div>


                </div>
                <div className="controlls__outer">
                    <div className="sample__disp__btn__jacket cont_jack">
                        <Button sx={{
                            padding: "10px 10px",
                            width: "100%",
                            borderRadious: "none",
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",

                        }} id="display__sample" disableElevation variant="outlined">
                            Sample AD
                        </Button>
                    </div>
                    <div className="show__preview__btn__jacket cont_jack">

                        <Button sx={{
                            padding: "10px 10px",
                            width: "100%",
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                            borderRadious: "0px",
                            background: "black",
                            color: "white",
                            '&hover': "none",
                            textTransform: "capitalize",
                            letterSpacing: "2px",
                            fontWeight: "500",
                            '&:hover': {
                                background: "black",
                            }
                        }} onClick={handlePreview} id="show__preview" disableElevation variant="contained" startIcon={showPreview === 1 ? <EditSvg style={{
                            width: "100%",
                            height: "100%",
                            maxWidth: "14px",
                        }} /> : <ShowSVG style={{
                            width: "100%",
                            height: "100%",
                            maxWidth: "14px"
                        }} />}>
                            {showPreview === 1 ? "Edit" : "Preview"}
                        </Button>
                    </div>
                    <div className="update__price__btn__jacket cont_jack">
                        <Button sx={{
                            padding: "10px 14px",
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                            borderRadious: "0px",
                            background: "black",
                            color: "white",
                            textTransform: "capitalize",
                            letterSpacing: "2px",
                            fontWeight: "500",
                            '&:hover': {
                                background: "black",
                            },
                            width: "100%"
                        }} onClick={handleUpdatePrice} id="update__price" disableElevation variant="contained" startIcon={<UpdateSvg style={{
                            width: "100%",
                            height: "100%",
                            maxWidth: "14px"
                        }} />}>
                            Estimate
                        </Button>

                    </div>
                </div>
                <div className="heading__outer">
                    <p className="words__outer stat__outer__mobile__stat">
                        <p className="int words">{words}</p>
                        <p className="sep_cover">
                            <div className="sep"></div>
                            <p className="stat__outer__mobile__stat__name">
                                Words
                            </p>
                        </p>
                    </p>
                    <p className="chars__outer stat__outer__mobile__stat chars">
                        <p className="int chars">{chars}</p>
                        <p className="sep_cover">
                            <div className="sep"></div>
                            <p className="stat__outer__mobile__stat__name">
                                Chars
                            </p>
                        </p>
                    </p>

                    <p className="words__outer stat__outer__mobile__stat lines">
                        <p className="int lines">{lines}</p>
                        <p className="sep_cover">
                            <div className="sep"></div>
                            <p className="stat__outer__mobile__stat__name">
                                Lines
                            </p>
                        </p>
                    </p>

                </div>
                <div className="special__enhancement__box">
                    <p className="heading">Special Enhancement</p>
                    <div className="email__enhancement enhancement">
                        <input
                            value={iseEmailAdded}
                            onChange={() => setEmailAddition(!iseEmailAdded)}
                            className='enhensmnt__checkbox' type="checkbox" name="isEmailNeeded" id="email__checkbox" />
                        <p>
                            Email
                            <span>(For email address within ad text, Rs. 100 extra will be chargeable)</span>
                        </p>
                    </div>
                    <div className="language__enhancement enhancement">
                        <input className='enhensmnt__checkbox' type="checkbox" name="iSlANGUAGE" id="LANGUAGE__checkbox" />
                        <p>
                            Language Translation
                            <span>(Have your Ad translated for release in the local language. 20% extra will be chargeable as line/words will increase in translation.)</span>
                        </p>
                    </div>

                    <div className="ehnesment__inpt__boxs">
                        <TextField
                            className='phone txtfeild'
                            label="Phone"
                            id="outlined-size-small"
                            size="meadium"
                            required


                        />

                        <TextField
                            className='email txtfeild'
                            label="Email"
                            id="outlined-size-small"
                            size="meadium"
                            required={iseEmailAdded === true ? "required" : null}
                        />
                    </div>
                </div>
            </div>

            {/* Newspaper related information & price list */}
            <div className="second__lower__containor">
                lower
            </div>
        </section >
    )
}

export default EditorText;