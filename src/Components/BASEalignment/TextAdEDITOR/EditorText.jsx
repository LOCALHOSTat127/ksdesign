import { useState, useEffect } from 'react'
import "./style.css";
import generalColorPallerConfig from "../../../data/config/general_style_pallet_config.json";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import { ReactComponent as ShowSVG } from "../../../assets/svg/show.svg";
import { ReactComponent as EditSvg } from "../../../assets/svg/edit.svg";
import { ReactComponent as UpdateSvg } from "../../../assets/svg/update.svg";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { mark_compose_step_status, set_compose_step_config, set_ad_stats, set_special_enhancement, set_heading_config } from "../../../app/features/ad_config/ad_booking_config_slice";


const EditorText = () => {

    const dispatch = useDispatch();
    const NAVIGATE = useNavigate();

    // application_state
    const [configurations, setConfigurestions] = useState({
        pallet_rules: null,
        special_enhancement: null,
        heading_config: null,
        from_paper: {
            paper_txt: null,
            paper_name: null
        }
    })

    const [enhansments, setEnhansments] = useState({
        isemailreq: false,
        email_address: "",
        ismobilereq: false,
        mobile_number: "",
        istranslationreq: false,
    });  // push_to_ad_state with price



    const [applicationStates, setStates] = useState({
        isOFLINE: false,
        isLOADING: true
    })



    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSubCategory, setActiveSubCategory] = useState(null);
    const [showPreview, setPreview] = useState(0);



    // ad_state //push_to_states with price
    const [words, setWords] = useState(0);
    const [price, setPrice] = useState(0);
    const [chars, setChars] = useState(0);




    // user_inputs
    const [adBGcolor, setBGcolor] = useState(generalColorPallerConfig.color__pallet[0] ? generalColorPallerConfig.color__pallet[0].clr : "#FFFFFF"); // push_to_pallet_config with price
    const [isMarkerOn, setMarker] = useState(false); //push_to_pallet_config with price
    const [isBorderOn, setBorder] = useState(false); //push_to_pallet_config with price
    const [ADTEXT, handleADTEXT] = useState(""); //push_to_ad_text






    // handling_ad_preview_on_mobile
    const handlePreview = () => {
        if (showPreview === 0) {
            setPreview((prev) => prev + 1);
        } else {
            setPreview((prev) => prev - 1);
        }
    }


    // handle_set_bg_clr
    const handleBGclr = (e) => {
        setBGcolor((prev) => prev = e.target.value);
    }

    // handling_ad_live_preview_on_desktop
    const handleTyping = (e) => {
        handleADTEXT((prev) => prev = e.target.value);
    }







    // handle_estimate_update
    const handleUpdatePrice = () => {
        let wordscount = 0;
        let charscount = 0;

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



        }
        setWords((count) => count = wordscount);
        setChars((count) => count = charscount);


    }




    // loading_configurations_on_page_load
    const fetch_cat_config = async () => {
        if (!navigator.onLine) {
            setStates((prev) => ({
                isLOADING: false,
                isOFLINE: true
            }))
            return false;
        }

        const server_reponse = await axios({
            method: "post",
            url: "http://172.20.10.2:5000/db/get_cat_config",
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",

                // API_KEY_INCREPTED
                Authorization: 'Bearer ' + process.env.REACT_APP_BACKEND_API_KEY,
            },
            data: {
                caegory_config_id: "8D6a9YEu8uVHXd6RBCJg",
                category_id: "CC_126001",
            }
        });


        if (server_reponse.data.status === 200) {
            setConfigurestions((prev) => ({
                pallet_rules: server_reponse.data.data.paller_rules,
                special_enhancement: server_reponse.data.data.special_enhansment,
                heading_config: server_reponse.data.data.headingconfig,
                from_paper: {
                    paper_name: server_reponse.data.data.newspaper_name,
                    paper_txt: server_reponse.data.data.from_the_paper
                }
            }))
            setStates((prev) => ({
                isLOADING: false,
                isOFLINE: false,
            }))
        } else {
            alert("Error while loading configurations");
        }
    }


    // fetching_category_config
    useEffect(() => {

        fetch_cat_config();

    }, [])


    const check_for_error = () => {
        handleUpdatePrice();

        return false;
    }


    // dispathc_informaiton_and_step_forward
    const STEP_FOWRAED_HANDLER = () => {
        if (check_for_error() === false) {
            dispatch(set_compose_step_config({
                ad_text: ADTEXT,
                isBgClr: adBGcolor,
                bg_color_charge: adBGcolor != "#ffffff" ? configurations.pallet_rules.color.charge : 0,
                isBorder: isBorderOn,
                border_charge: isBorderOn === true ? configurations.pallet_rules.border.charge : 0,
                isMarker: isMarkerOn,
                marker_charge: isMarkerOn === true ? configurations.pallet_rules.marker.charge : 0,
            }))


            dispatch(set_ad_stats({
                base_price: price,
                price_before_payment_page: price,
                words_count: words,
                chars_count: chars
            }))

            dispatch(set_special_enhancement({
                isEmail: enhansments.isemailreq === true ? enhansments.email_address : false,
                email_id_charge: enhansments.isemailreq === true ? configurations.special_enhancement.methods[0].charge : 0,
                isPhone: enhansments.ismobilereq === true ? enhansments.mobile_number : false,
                phone_number_charge: enhansments.ismobilereq === true ? configurations.special_enhancement.methods[2].charge : 0,
                isTranslation: enhansments.istranslationreq === true ? true : false,
                translation_charge: enhansments.istranslationreq === true ? configurations.special_enhancement.methods[1].charge : 0
            }))

            dispatch(mark_compose_step_status(true));
            NAVIGATE("/ad/publish/payment");
        }

    }



    return (
        <>
            {
                applicationStates.isLOADING === false ?
                    <>
                        <section
                            data-editor-type="classified-text-ad" className="TextEditor__ground">
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
                                            {configurations?.pallet_rules?.color?.colors.map(({ value, isActive, clr_name }) => {
                                                return (
                                                    <>
                                                        <div style={{
                                                            backgroundColor: `${value}`,
                                                            display: "flex",
                                                            alignItems: "center"
                                                        }} className="bgcls__jscket">
                                                            <input
                                                                disabled={isActive === true ? false : true}
                                                                className='radio__Clr'
                                                                type="radio"
                                                                value={value}
                                                                name={clr_name}
                                                                id={value}
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
                                                            }} className="bg__cls">{clr_name}</p>
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
                                                disabled={configurations?.pallet_rules?.border?.isActive === false ? true : false}
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
                                                disabled={configurations?.pallet_rules?.marker?.isActive === false ? true : false}
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
                                            Sample
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
                                        <p style={{

                                            color: "rgb(9 112 0)",
                                        }} className="int lines">₹{"   "}{price}</p>
                                        <p className="sep_cover">
                                            <div className="sep"></div>
                                            <p className="stat__outer__mobile__stat__name">
                                                AD Cost
                                            </p>
                                        </p>
                                    </p>

                                </div>
                                {
                                    configurations?.special_enhancement &&
                                    <>

                                        <div className="special__enhancement__box">
                                            <p className="heading">Special Enhancement</p>
                                            {
                                                configurations.special_enhancement != null ?
                                                    <>
                                                        <div className={`Email__enhancement enhancement`}>
                                                            <input
                                                                className='enhensmnt__checkbox'
                                                                type="checkbox"
                                                                checked={enhansments.isemailreq}
                                                                onChange={(e) => {
                                                                    setEnhansments((prev) => ({
                                                                        ...prev,
                                                                        isemailreq: (!enhansments.isemailreq)
                                                                    }))
                                                                }}
                                                                name={`isEmail`}
                                                                id={`Email__checkbox`} />
                                                            <p>
                                                                Email Address
                                                                <span>{configurations.special_enhancement.methods[0].desc}</span>
                                                            </p>
                                                        </div>

                                                        {/* mobile number  */}
                                                        <div className={`mobile__enhancement enhancement`}>
                                                            <input
                                                                checked={enhansments.ismobilereq}
                                                                onChange={(e) => {
                                                                    setEnhansments((prev) => ({
                                                                        ...prev,
                                                                        ismobilereq: (!enhansments.ismobilereq)
                                                                    }))
                                                                }}
                                                                className='enhensmnt__checkbox'
                                                                type="checkbox"
                                                                name={`isMobile`}
                                                                id={`Mobile__checkbox`} />
                                                            <p>
                                                                Mobile Number
                                                                <span>{configurations.special_enhancement.methods[2].desc}</span>
                                                            </p>
                                                        </div>
                                                        {/* Language Translation  */}
                                                        <div className={`translation__enhancement enhancement`}>
                                                            <input
                                                                checked={enhansments.ismobilistranslationreqereq}
                                                                onChange={(e) => {
                                                                    setEnhansments((prev) => ({
                                                                        ...prev,
                                                                        istranslationreq: (!enhansments.istranslationreq)
                                                                    }))
                                                                }}
                                                                className='enhensmnt__checkbox'
                                                                type="checkbox"
                                                                name={`isTranslation`}
                                                                id={`translation__checkbox`} />
                                                            <p>
                                                                Language Translation
                                                                <span>{configurations.special_enhancement.methods[1].desc}</span>
                                                            </p>
                                                        </div>
                                                    </>
                                                    : null
                                            }


                                            <div className="ehnesment__inpt__boxs">
                                                <TextField
                                                    value={enhansments.mobile_number}
                                                    onChange={(e) => {
                                                        setEnhansments((prev) => ({
                                                            ...prev,
                                                            mobile_number: e.target.value
                                                        }))
                                                    }}
                                                    sx={{
                                                        display: `${enhansments.ismobilereq === true ? "flex" : "none"}`
                                                    }}
                                                    className='phone txtfeild'
                                                    label="Phone"
                                                    id="outlined-size-small"
                                                    size="meadium"
                                                    required={enhansments.ismobilereq === true ? "required" : null}


                                                />

                                                <TextField
                                                    value={enhansments.email_address}
                                                    onChange={(e) => {
                                                        setEnhansments((prev) => ({
                                                            ...prev,
                                                            email_address: e.target.value
                                                        }))
                                                    }}
                                                    sx={{
                                                        display: `${enhansments.isemailreq === true ? "flex" : "none"}`
                                                    }}
                                                    className='email txtfeild'
                                                    label="Email"
                                                    id="outlined-size-small"
                                                    size="meadium"
                                                    required={enhansments.isemailreq === true ? "required" : null}
                                                />
                                            </div>
                                        </div>
                                    </>
                                }


                            </div>

                            {/* Newspaper related information & price list */}
                            <div className="second__lower__containor">
                                {
                                    configurations.heading_config &&
                                    <>

                                        <div className="ad__heading__containor">
                                            <h2 className="panel__heading">
                                                <h2>AD Heading</h2>
                                                <p>Please Provide Heading & sub Heading for your AD.</p>
                                            </h2>

                                            <div className="heading__window">
                                                <FormControl sx={{ m: 1, maxWidth: "200px", minWidth: "100%" }} size="meadium">
                                                    <InputLabel id="select__category__main">Sub-Category</InputLabel>
                                                    <Select
                                                        labelId="select__category__main"
                                                        id="select__category__main"

                                                        label="Sub-Category"
                                                        onChange={((e) => {
                                                            setActiveCategory((prev) => e.target.value);
                                                        })}
                                                    >

                                                        <MenuItem value={null}>
                                                            <em>None</em>
                                                        </MenuItem>



                                                    </Select>
                                                </FormControl>


                                                <FormControl sx={{ m: 1, maxWidth: "200px", minWidth: "100%" }} size="meadium">
                                                    <InputLabel id="select__classification">Classification</InputLabel>
                                                    <Select
                                                        labelId="select__classification"
                                                        id="select__classification"

                                                        onChange={((e) => {
                                                            setActiveSubCategory((prev) => prev = e.target.value);
                                                        })}

                                                        label="Classification"
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>

                                                    </Select>
                                                </FormControl>


                                                <FormControl id="last__select" sx={{ m: 1, maxWidth: "200px", minWidth: "100%" }} size="meadium">
                                                    <InputLabel id="select__sub__classification">Sub-Classification</InputLabel>
                                                    <Select
                                                        labelId="select__sub__classification"
                                                        id="select__sub__classification"

                                                        label="Sub-Classification"
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>

                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>


                                    </>


                                }
                                <div style={{
                                    background: "#F8F8F8",
                                    padding: "20px 40px",
                                    minHeight: "80px",

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                }} className="proceed_box">
                                    <Button
                                        onClick={STEP_FOWRAED_HANDLER}
                                        sx={{
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



                                        }} id="update__price" disableElevation variant="contained" startIcon={<UpdateSvg style={{
                                            width: "100%",
                                            height: "100%",
                                            maxWidth: "14px"
                                        }} />}>
                                        Proceed to Next Step
                                    </Button>
                                </div>

                                <div className="price__list">
                                    <h2>Basic Rates </h2>
                                    <div className="price__slider">
                                        <div className="rate__card">
                                            <h3 className="newspaper__name">
                                                {configurations.from_paper && configurations.from_paper.paper_name}
                                            </h3>
                                            <p className="package__desc">
                                                (Rajasthan + Madhya Pradesh+ Chhattisgarh)
                                            </p>

                                            <div className="prices">
                                                <p className="price__primery">Rs. 3000 / 20 Words</p>
                                                <p className="price__extra">Rs. 20 /extra Words</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="from__newspaper">
                                    <h2>From the Newspaper </h2>
                                    <div className="innertext">
                                        <p className="newspapername">{configurations.from_paper && configurations.from_paper.paper_name} : </p>
                                        <p className="innertext__inline">{configurations.from_paper && configurations.from_paper.paper_txt}</p>
                                    </div>
                                </div>
                            </div>
                        </section >
                    </> : <div className="loading__box">
                        <CircularProgress size={20} />
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <strong>Please wait</strong>
                            <p>Loading configurations...</p>
                        </div>
                    </div>
            }

        </>
    )
}

export default EditorText;