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

import proceedArrow from "../../../assets/png/proceedarrow.gif";


import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mark_compose_step_status, set_compose_step_config, set_ad_stats, set_special_enhancement, set_heading_config } from "../../../app/features/ad_config/ad_booking_config_slice";




const EditorText = () => {

    const dispatch = useDispatch();
    const NAVIGATE = useNavigate();
    const ad_state = useSelector((state) => state.ad_booking_config);
    const [COLORS_CONFIG, SETCOLORCONFIG] = useState(null);




    // application_state
    const [configurations, setConfigurestions] = useState({
        color_pallet_rules: null,
        other_pallet_rules: {
            rules: null,
            isTick: false,
            isBorder: false
        },
        special_enhancement: null,
        heading_config: null,
        selectedEditions: null,
        selectedPackages: null,
        price_config: {
            editions__prices: null,
            min_sep: null,
            max_sep: null,
            sep: null
        },
        from_paper: {
            paper_txt: null,
            paper_name: null
        }
    })



    const [enhansments, setEnhansments] = useState({
        istranslationreq: false,
    });

    const [applicationStates, setApplicationStates] = useState({
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
    const [bgColorPrice, setBgColorPrice] = useState(0);
    const [isTickOn, setTick] = useState(false); //push_to_pallet_config with price
    const [isBorderOn, setBorder] = useState(false); //push_to_pallet_config with price
    const [tickCharge, setTickCharge] = useState(0);
    const [borderCharge, setBorderCharge] = useState(0);
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
        configurations.color_pallet_rules.forEach((colr) => {
            if (colr.clr === e.target.dataset.clr) {
                setBGcolor(colr.price);
            }
        })
        setBGcolor((prev) => prev = e.target.value);
    }

    // handling_ad_live_preview_on_desktop
    const handleTyping = (e) => {
        handleADTEXT((prev) => prev = e.target.value);
    }


    const loadConfiguration = () => {
        const palletRulesArr = [];
        const othetpalletrules = [];
        const editions_prices = [];

        const TEMP_COLORS_CONFIG = [
            {
                value: "#ffffff",
                isActive: false,
                clr_name: "White",
                price: 0,
            },
            {
                value: "#F8CBCC",
                isActive: false,
                clr_name: "LightRed",
                price: 0,
            },
            {
                value: "#99CCFD",
                isActive: false,
                clr_name: "Blue",
                price: 0,
            },
            {
                value: "#FDCC32",
                isActive: false,
                clr_name: "Sunglow",
                price: 0,
            }
        ]


        const CLR_PRICE = [
            {
                clr: "White",
                price: 0
            },
            {
                clr: "LightRed",
                price: 0
            },
            {
                clr: "Blue",
                price: 0
            }, {
                clr: "Sunglow",
                price: 0
            }
        ]


        let totalTickCharge = 0;
        let totalBorderCharge = 0;


        if (ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions != null) {
            ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions.forEach((edition, index) => {

                palletRulesArr.push(edition.pallet_rules);
                othetpalletrules.push({
                    tempEDI: index,
                    tickPrice: edition.pallet_rules.isTick !== false ? edition.pallet_rules.isTick : 0,
                    borderPrice: edition.pallet_rules.isBorder !== false ? edition.pallet_rules.isBorder : 0,
                })
                editions_prices.push({
                    edition_name: edition.edition_name,
                    tempEDI: index,
                    basePrice: edition.price_config.minPrice,
                    perExtraSep: edition.price_config.perExtraSep
                })
            });



            for (let i = 0; i < palletRulesArr.length; i++) {
                if (palletRulesArr[i].isTick != false) {
                    totalTickCharge += palletRulesArr[i].isTick;
                }

                if (palletRulesArr[i].isBorder != false) {
                    totalBorderCharge += palletRulesArr[i].isBorder;
                   
                }

           
                
                Object.entries(palletRulesArr[i].colors).forEach((clr) => {
                    if (clr[0] === "isWhite" && clr[1] !== false) {
                        CLR_PRICE[0].price += palletRulesArr[i].colors.isWhite;
                    } else if (clr[0] === "isLightRed" && clr[1] !== false) {
                        CLR_PRICE[1].price += palletRulesArr[i].colors.isLightRed;
                    } else if (clr[0] === "isBlue" && clr[1] !== false) {
                        CLR_PRICE[2].price += palletRulesArr[i].colors.isBlue;
                    } else if (clr[0] === "isYellow" && clr[1] !== false) {
                        CLR_PRICE[3].price += palletRulesArr[i].colors.isYellow;
                    }
                })
            }
            CLR_PRICE[0].price = 0;
            console.log(totalTickCharge);
            console.log(totalBorderCharge);



            Object.entries(palletRulesArr[0].colors).forEach((clr) => {
                if (clr[0] === "isWhite" && clr[1] !== false) {
                    TEMP_COLORS_CONFIG[0].isActive = true;
                } else if (clr[0] === "isLightRed" && clr[1] !== false) {
                    TEMP_COLORS_CONFIG[1].isActive = true;
                } else if (clr[0] === "isBlue" && clr[1] !== false) {
                    TEMP_COLORS_CONFIG[2].isActive = true;
                } else if (clr[0] === "isYellow" && clr[1] !== false) {
                    TEMP_COLORS_CONFIG[3].isActive = true;
                }
            })




            setTickCharge(totalTickCharge);
            setBorder(totalBorderCharge);
            setConfigurestions((prev) => ({
                ...prev,
                color_pallet_rules: CLR_PRICE,
                other_pallet_rules: {
                    rules: othetpalletrules,
                    isBorder: othetpalletrules[0].borderPrice === 0 ? false : true,
                    isTick: othetpalletrules[0].tickPrice === 0 ? false : true,
                },
                price_config: {
                    editions__prices: editions_prices,
                    max_sep: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].maxSep,
                    min_sep: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].minSep,
                    sep: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].sep
                },
                from_paper: {
                    paper_name: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.newspaper_name,
                    paper_txt: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.from_the_paper
                }
            }))



            SETCOLORCONFIG((prev) => TEMP_COLORS_CONFIG);
        }










        setApplicationStates((prev) => ({
            ...prev,
            isLOADING: false
        }))
    }



    useEffect(() => {
        loadConfiguration()
    }, [])



    // handle_estimate_update
    const handleUpdatePrice = () => {
        let wordscount = 0;
        let charscount = 0;
        let priceTotal = 0;
        let extraPrice = 0;
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

            configurations.price_config.editions__prices.forEach((edition) => {
                priceTotal += edition.basePrice;
            })

            if (configurations.price_config.sep === "Word" && wordscount > configurations.price_config.min_sep) {
                let extraWords = wordscount - configurations.price_config.min_sep;
                configurations.price_config.editions__prices.forEach((edition) => {
                    priceTotal += (edition.perExtraSep * extraWords);
                })

            }
        }
        setWords((count) => count = wordscount);
        setChars((count) => count = charscount);
        setPrice((count) => count = priceTotal);


    }



    const check_for_error = () => {
        handleUpdatePrice();
        return false;
    }


    // dispathc_informaiton_and_step_forward
    const STEP_FOWRAED_HANDLER = () => {

        console.log(ADTEXT);
        console.log(adBGcolor);
        console.log(isTickOn);
        console.log(isBorderOn);
        console.log(enhansments.istranslationreq);
        console.log(borderCharge);
        console.log(tickCharge);
        console.log(price);
        console.log(words);
        console.log(chars);

        // if (check_for_error() === false) {
        //     dispatch(set_compose_step_config({
        //         ad_text: ADTEXT,
        //         isBgClr: adBGcolor,
        //         bg_color_charge: adBGcolor != "#ffffff" ? configurations.pallet_rules.color.charge : 0,
        //         isBorder: isBorderOn,
        //         border_charge: isBorderOn === true ? configurations.pallet_rules.border.charge : 0,
        //         isMarker: isMarkerOn,
        //         marker_charge: isMarkerOn === true ? configurations.pallet_rules.marker.charge : 0,
        //     }))


        //     dispatch(set_ad_stats({
        //         base_price: price,
        //         price_before_payment_page: price,
        //         words_count: words,
        //         chars_count: chars
        //     }))

        //     dispatch(set_special_enhancement({
        //         isEmail: enhansments.isemailreq === true ? enhansments.email_address : false,
        //         email_id_charge: enhansments.isemailreq === true ? configurations.special_enhancement.methods[0].charge : 0,
        //         isPhone: enhansments.ismobilereq === true ? enhansments.mobile_number : false,
        //         phone_number_charge: enhansments.ismobilereq === true ? configurations.special_enhancement.methods[2].charge : 0,
        //         isTranslation: enhansments.istranslationreq === true ? true : false,
        //         translation_charge: enhansments.istranslationreq === true ? configurations.special_enhancement.methods[1].charge : 0
        //     }))

        //     dispatch(mark_compose_step_status(true));
        //     NAVIGATE("/ad/publish/payment");
        // }

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
                                            <div className={`screen__heilight  ${isTickOn && "active__heilight"}`} ></div>
                                            <p className="preview__Text">{ADTEXT}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidepanel">
                                    <div className="bg__colors__outer">

                                        <div className="colors__palet">
                                            {COLORS_CONFIG.map(({ isActive, clr_name, value }) => {
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
                                                                data-clr={clr_name}
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
                                                disabled={configurations?.other_pallet_rules.isBorder === false ? true : false}
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
                                                boxShadow: `${isTickOn === true ? "rgba(214, 35, 3, 0.3) 0px 0px 0px 1px" : "rgba(3, 102, 214, 0.3) 0px 0px 0px 2px"}`,
                                            }}
                                            className="marker__box checkboxouter flex fd-col flex-aic">
                                            <input
                                                disabled={configurations?.other_pallet_rules.isTick === false ? true : false}
                                                className='marker__cb checkbox'
                                                type="checkbox"
                                                name="ad__marker"
                                                id="ad__marker"
                                                checked={isTickOn}
                                                onChange={(e) => {
                                                    setTick(!isTickOn);
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


                                <div className="special__enhancement__box">
                                    <p className="heading">Special Enhancement</p>
                                    <div className={`translation__enhancement enhancement`}>
                                        <input
                                            checked={enhansments.istranslationreq}
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
                                            <span>Let your Ad copy Translate in sevral Different languages for batter rechablity.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Newspaper related information & price list */}
                            <div className="second__lower__containor">


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

                                <div className="proceed_box">
                                    <Button
                                        className="proceed_box__btn"
                                        onClick={STEP_FOWRAED_HANDLER}
                                        id="update__price" variant="contained">
                                        Proceed to Next Step
                                        <img src={proceedArrow} alt="proceed" className='svg' />
                                    </Button>
                                </div>

                                <div className="price__list">
                                    <h2>Basic Rates </h2>
                                    <div className="price__slider">
                                        {configurations.price_config.editions__prices.map((edition) => {
                                            return (
                                                <>
                                                    <div className="rate__card">
                                                        <h3 className="newspaper__name">
                                                            {edition.edition_name}
                                                        </h3>
                                                        <div className="prices">
                                                            <p className="price__primery">Rs. {edition.basePrice} / {configurations.price_config.min_sep} {configurations.price_config.sep}</p>
                                                            <p className="price__extra">Rs. {edition.perExtraSep} /extra {configurations.price_config.sep}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}

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