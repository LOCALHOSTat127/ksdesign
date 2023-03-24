import { useState } from 'react'
import "./style.css";



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
                clr: "#65f360",
                value: "#65f360",
                id: "clr_second",
                name: "bgcolor",
            },
            {
                clr: "#c7f360",
                value: "#c7f360",
                id: "clr_third",
                name: "bgcolor",

            },
            {
                clr: "#6249f0f7",
                value: "#6249f0f7",
                id: "clr_fourth",
                name: "bgcolor",
            }
        ],
    };



    const [activeState, setState] = useState("chars");
    const [showPreview, setPreview] = useState(0);
    const [adBGcolor, setBGcolor] = useState(BGCONFIG.BG_COLORS[0] ? BGCONFIG.BG_COLORS[0] : "#FFFFFF");
    const [isMarkerOn, setMarker] = useState(false);
    const [isBorderOn, setBorder] = useState(false);
    const [ADTEXT, handleADTEXT] = useState("");
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

    return (
        <section data-editor-type="classified-text-ad" className="TextEditor__ground">
            {/* Editro-box/Preiew/controlls/HeadingPrice */}
            <div className="main__upper__containor">
                <div className="sidepanel">
                    <div className="bg__colors__outer">

                        <div className="colors__palet">
                            {BGCONFIG.BG_COLORS.map(({ value, name, id }) => {
                                return (
                                    <>
                                        <div style={{
                                            backgroundColor: `${value}`,

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
                                outline: `${isBorderOn === true ? "1px solid red" : "none"}`

                            }}
                            className="border__box checkboxouter">
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

                            Border <span>(25% Extra Charge)</span>

                        </div>


                        {/* Marker & Border */}
                        <div
                            style={{
                                outline: `${isMarkerOn === true ? "1px solid red" : "none"}`,

                            }}
                            className="marker__box checkboxouter">
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

                            Marker <span>(25% Extra Charge)</span>

                        </div>

                    </div>

                    {/* Words/Lines/Char Count */}

                    <div className="stat__outer">
                        <p style={{
                            display: `${(activeState === 'words' || activeState === 'all') ? "flex" : "none"}`
                        }} className="words__outer stat">
                            <p className="int words">340</p>
                            <p className="sep_cover">
                                <div className="sep"></div>
                                <p className="stat__name">
                                    Words
                                </p>
                            </p>
                        </p>

                        <p style={{
                            display: `${(activeState === 'lines' || activeState === 'all') ? "flex" : "none"}`
                        }} className="Lines__outer stat">
                            <p className="int Lines">455</p>
                            <p className="sep_cover">
                                <div className="sep"></div>
                                <p className="stat__name">
                                    Lines
                                </p>
                            </p>
                        </p>

                        <p style={{
                            display: `${(activeState === 'chars' || activeState === 'all') ? "flex" : "none"}`
                        }} className="Chars__outer stat">
                            <p className="int Chars">250</p>
                            <p className="sep_cover">
                                <div className="sep"></div>
                                <p className="stat__name">
                                    Chars
                                </p>
                            </p>
                        </p>
                    </div>




                </div>
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
                <div className="controlls__outer">
                    <div className="sample__disp__btn__jacket cont_jack">
                        <button className='btn__controll' id="display__sample">Sample AD</button>
                    </div>
                    <div className="show__preview__btn__jacket cont_jack">
                        <button onClick={handlePreview} className='btn__controll' id="show__preview">
                            {showPreview === 1 ? "Edit" : "Show Preview"}
                        </button>
                    </div>
                    <div className="update__price__btn__jacket cont_jack">
                        <button className='btn__controll' id="update__price">Update Price</button>
                    </div>
                </div>
                <div className="heading__outer">heading</div>
                <div className="proceed__next__outer">proceed btn</div>
            </div>

            {/* Newspaper related information & price list */}
            <div className="second__lower__containor">
                lower
            </div>
        </section>
    )
}

export default EditorText;