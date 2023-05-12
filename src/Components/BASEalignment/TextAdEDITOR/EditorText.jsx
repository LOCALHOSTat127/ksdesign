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

import discountGif from "../../../assets/png/discount.gif";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mark_compose_step_status, set_compose_step_config, set_discount, set_ad_stats, set_special_enhancement, set_heading_config } from "../../../app/features/ad_config/ad_booking_config_slice";




const EditorText = () => {

    const dispatch = useDispatch();
    const NAVIGATE = useNavigate();
    const ad_state = useSelector((state) => state.ad_booking_config);
    const [showPreview, setShowPrevice] = useState(0);
    const [isTick, setTick] = useState(false);
    const [iseBorder, setBorder] = useState(false);
    const [isbgclr, setbgclr] = useState(null);
    const [ADTEXT, setADTEXT] = useState("");
    const [bgClrCharge, setBgClrCharge] = useState(0);
    const [words, setWords] = useState(0);
    const [chars, setChars] = useState(0);
    const [adPrice, setPrice] = useState(0);
    const [isDisOpIN, setDisOptIn] = useState(false);
    const [isTranslationSelected, setTranslation] = useState(false);
    const [isPhotoOptIn, setPhotoOptin] = useState(false);

    const [HEADING_SELECTION, setHEADING_SELECTION] = useState({
        heading_first: null,
        heading_second: null,
        heading_third: null,
        isHeadingSet: true
    })



    const [applicationStates, setApplicationStates] = useState({
        isLOADING: true
    })


    const INBUILD_PHOTO_CONFIG = [
        {
            photo_type: 0,
            photo_name: "House",
            photo_charge: 500,
            per_day: true
        },
        {
            photo_type: 1,
            photo_name: "Vehical",
            photo_charge: 500,
            per_day: true
        }
    ]











    const [PRIMERY_CONFIGBASE, SET_PRIMERY_CONFIG] = useState({
        isDone: false,
        colors_config: {
            TOTAL_BG_CLR_CHARGE: 0,
            colors: [
                {
                    isInUse: false,
                    isActive: false,
                    clr: "White",
                    value: "#ffffff",
                    price: 0,
                    id: "White",
                },
                {
                    isInUse: false,
                    isActive: false,
                    clr: "LightRed",
                    value: "#F8CBCC",
                    price: 0,
                    id: "LightRed",
                },
                {
                    isInUse: false,
                    isActive: false,
                    clr: "Blue",
                    value: "#99CCFD",
                    price: 0,
                    id: "Blue",
                },
                {
                    isInUse: false,
                    isActive: false,
                    clr: "Sunglow",
                    value: "#FDCC32",
                    price: 0,
                    id: "Sunglow",
                }
            ]
        },
        secondry_pallet_config: {
            isTickActive: false,
            isTickInUse: false,
            TICK_PRICES: null,
            isBorderActive: false,
            BORDER_PRICES: null,
            isBorderInUse: false
        },

        stats_prices: {
            stats: {
                words: 0,
                chars: 0,
                main_sep: null,
                max_sep: null,
                min_sep: null,
            },
            prices: {
                card_name: null,
                edition: null,
                package: null,
                basePrice: null,
                extraSepPrice: null,
                total_ad_cost: 0,
                total_tick_charge: 0,
                total_bg_charge: 0,
                is_discount_opt_in: false,


                discount: {
                    isDiscount: false,
                    discount_name: null,
                    discount_type: null,
                    discount: null
                }

            }
        },

        misc_config: {
            heading_config: {
                IS_HEADING_DONE: false,
                first_heading: null,
                second_heading: null,
                third_heading: null,
            },
            enhansments: {
                isTranslationSelected: false,
                translationCharge: 100,
                isBuiltinPhoto: false,
                photo_type: null
            },

            from_paper: {
                paper_name: null,
                paper_text: null,
            }
        }
    })





    // handling_ad_preview_on_mobile
    const handlePreview = () => {
        if (showPreview === 0) {
            setShowPrevice((prev) => prev + 1);
        } else {
            setShowPrevice((prev) => prev - 1);
        }
    }


    // handle_set_bg_clr
    const handleBGclr = (e) => {
        PRIMERY_CONFIGBASE.colors_config.colors.forEach((colr) => {
            if (colr.clr === e.target.dataset.clr) {
                setBgClrCharge(colr.price);
            }
        })
        setbgclr((prev) => prev = e.target.value);
    }

    // handling_ad_live_preview_on_desktop
    const handleTyping = (e) => {
        setADTEXT((prev) => prev = e.target.value);
    }






    // SETTING_UP_CONFIG_TO_LOCAL_STATE
    const SETUP_LOCAL_STATE = () => {

        if (ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_package === null) {
            SET_PRIMERY_CONFIG((prev) => ({
                ...prev,
                stats_prices: {
                    stats: {
                        words: 0,
                        chars: 0,
                        main_sep: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].sep,
                        max_sep: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].maxSep,
                        min_sep: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].minSep,
                    },
                    prices: {
                        card_name: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].edition_name,
                        edition: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0],
                        package: null,
                        basePrice: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].price_config.minPrice,
                        extraSepPrice: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].price_config.perExtraSep,
                        total_ad_cost: 0,
                        total_tick_charge: 0,
                        total_bg_charge: 0,
                        is_discount_opt_in: false,

                    },
                    discount: {
                        isDiscount: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].misc_config.discount !== null ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].misc_config.discount : false,
                        discount_name: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].misc_config.discount !== null ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].misc_config.discount.disName : null,
                        discount_type: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].misc_config.discount !== null ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].misc_config.discount.idsType : null,
                        discount: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].misc_config.discount !== null ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].misc_config.discount.dis : null,
                    }
                },
                secondry_pallet_config: {
                    isTickActive: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.isTick !== false ? true : false,
                    TICK_PRICES: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.isTick !== false ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.isTick : 0,
                    isBorderActive: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.isBorder !== false ? true : false,
                    BORDER_PRICES: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.isBorder !== false ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.isBorder : 0,
                },

                colors_config: {
                    TOTAL_BG_CLR_CHARGE: 0,
                    colors: [
                        {
                            isInUse: false,
                            isActive: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.colors.isWhite !== false ? true : false,
                            clr: "White",
                            value: "#ffffff",
                            price: 0,
                            id: "White",
                        },
                        {
                            isInUse: false,
                            isActive: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.colors.isLightRed !== false ? true : false,
                            clr: "LightRed",
                            value: "#F8CBCC",
                            price: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.colors.isLightRed !== false ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.colors.isLightRed : 0,
                            id: "LightRed",
                        },
                        {
                            isInUse: false,
                            isActive: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.colors.isBlue !== false ? true : false,
                            clr: "Blue",
                            value: "#99CCFD",
                            price: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.colors.isBlue !== false ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.colors.isBlue : 0,
                            id: "Blue",
                        },
                        {
                            isInUse: false,
                            isActive: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.colors.isYellow !== false ? true : false,
                            clr: "Sunglow",
                            value: "#FDCC32",
                            price: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.colors.isYellow !== false ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].pallet_rules.colors.isYellow : 0,
                            id: "Sunglow",
                        }
                    ]
                },
                misc_config: {
                    from_paper: {
                        paper_name: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.newspaper_name,
                        paper_text: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.from_the_paper
                    },
                    heading_config: {
                        IS_HEADING_DONE: false,
                        first_heading: null,
                        second_heading: null,
                        third_heading: null,
                    },
                    enhansments: {
                        isTranslationSelected: false,
                        translationCharge: 100,
                        isBuiltinPhoto:  ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].misc_config.isInBuiltPhoto && true,
                        photo_type: ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id === "14009" ? 1 : ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id === "14005" ? 0 : ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id === "14004" ? 0 : null,
                    },
                },
                isDone: true
            }))

         
        } else {
            SET_PRIMERY_CONFIG((prev) => ({
                ...prev,
                stats_prices: {
                    stats: {
                        words: 0,
                        chars: 0,
                        main_sep: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP?.config_info?.selected_package?.complete_package?.price_config.sep,
                        max_sep: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP?.config_info?.selected_package?.complete_package?.price_config.maxSep,
                        min_sep: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.price_config.minSep,
                    },
                    prices: {
                        card_name: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.packageName,
                        edition: null,
                        package: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package,
                        basePrice: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.price_config.minPrice,
                        extraSepPrice: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package?.price_config.perExtraSep,
                    },

                    discount: {
                        isDiscount: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.misc_config.discount !== null ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.misc_config.discount : false,
                        discount_name: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.misc_config.discount !== null ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.misc_config.discount.isSpecialDiscount : null,
                        discount_type: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.misc_config.discount !== null ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.misc_config.discount.dis_type : null,
                        discount: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.misc_config.discount !== null ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.misc_config.discount.discount_price : null,
                    }
                },
                secondry_pallet_config: {
                    isTickActive: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.isTick !== false ? true : false,
                    TICK_PRICES: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.isTick !== false ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.isTick : 0,
                    isBorderActive: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.isBorder !== false ? true : false,
                    BORDER_PRICES: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.isBorder !== false ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.isBorder : 0,
                },

                colors_config: {
                    TOTAL_BG_CLR_CHARGE: 0,
                    colors: [
                        {
                            isInUse: false,
                            isActive: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.colors.isWhite !== false ? true : false,
                            clr: "White",
                            value: "#ffffff",
                            price: 0,
                            id: "White",
                        },
                        {
                            isInUse: false,
                            isActive: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.colors.isLightRed !== false ? true : false,
                            clr: "LightRed",
                            value: "#F8CBCC",
                            price: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.colors.isLightRed !== false ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.colors.isLightRed : 0,
                            id: "LightRed",
                        },
                        {
                            isInUse: false,
                            isActive: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.colors.isBlue !== false ? true : false,
                            clr: "Blue",
                            value: "#99CCFD",
                            price: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.colors.isBlue !== false ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.colors.isBlue : 0,
                            id: "Blue",
                        },
                        {
                            isInUse: false,
                            isActive: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.colors.isYellow !== false ? true : false,
                            clr: "Sunglow",
                            value: "#FDCC32",
                            price: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.colors.isYellow !== false ? ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.paller_config.colors.isYellow : 0,
                            id: "Sunglow",
                        }
                    ]
                },
                misc_config: {
                    from_paper: {
                        paper_name: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.newspaper_name,
                        paper_text: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.from_the_paper
                    },
                    heading_config: {
                        IS_HEADING_DONE: false,
                        first_heading: null,
                        second_heading: null,
                        third_heading: null,
                    },
                    enhansments: {
                        isTranslationSelected: false,
                        translationCharge: 100,
                        isBuiltinPhoto: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info?.selected_package?.complete_package.misc_config.isInBuiltPhoto && true,
                        photo_type: ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id === "14009" ? 1 : ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id === "14005" ? 0 : ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id === "14004" ? 0 : null,
                    },
                },
                isDone: true
            }))

      

        }





        setApplicationStates((prev) => ({
            ...prev,
            isLOADING: false
        }))

    }



    // handle_estimate_update
    const handleUpdatePrice = () => {
        let wordscount = 0;
        let charscount = 0;
        let priceTotal = 0;
        let extra_price = 0;



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


            let extra_words = 0;
            if (wordscount > PRIMERY_CONFIGBASE.stats_prices.stats.min_sep) {
                extra_words = wordscount - PRIMERY_CONFIGBASE.stats_prices.stats.min_sep;

                for (let i = 1; i <= extra_words; i++) {
                    extra_price += PRIMERY_CONFIGBASE.stats_prices.prices.extraSepPrice;
                }
            }

           
            console.log(PRIMERY_CONFIGBASE.stats_prices.prices.extraSepPrice);
            priceTotal = PRIMERY_CONFIGBASE.stats_prices.prices.basePrice + extra_price;

        }
        setWords(wordscount);
        setChars(charscount);
        setPrice(priceTotal);
    }





    const check_for_error = () => {
        handleUpdatePrice();
        if (words < PRIMERY_CONFIGBASE.stats_prices.stats.min_sep || words > PRIMERY_CONFIGBASE.stats_prices.stats.max_sep) {
            alert(`Min : ${PRIMERY_CONFIGBASE.stats_prices.stats.min_sep} words | Max : ${PRIMERY_CONFIGBASE.stats_prices.stats.max_sep} Words`);
            return true;
        } else if (HEADING_SELECTION.isHeadingSet === false) {
            alert("Please Select Heading");
            return true;
        } else {
            return false;
        }
    }


    // dispathc_informaiton_and_step_forward
    const STEP_FOWRAED_HANDLER = () => {
   

        if (check_for_error() === false) {

            dispatch(set_compose_step_config({
                ad_text: ADTEXT,
                isBgClr: isbgclr,
                bg_color_charge: bgClrCharge,
                isBorder: iseBorder,
                border_charge: iseBorder === true ? PRIMERY_CONFIGBASE.secondry_pallet_config.BORDER_PRICES : 0,
                isMarker: isTick,
                marker_charge: isTick === true ? PRIMERY_CONFIGBASE.secondry_pallet_config.TICK_PRICES : 0,

            }))

            dispatch(set_discount(PRIMERY_CONFIGBASE.stats_prices.discount));

            dispatch(set_ad_stats({
                base_price: adPrice,
                price_before_payment_page: adPrice,
                words_count: words,
                chars_count: chars
            }))

            dispatch(set_special_enhancement({
                isTranslation: isTranslationSelected === true ? true : false,
                translation_charge: isTranslationSelected === true ? PRIMERY_CONFIGBASE.misc_config.enhansments.translationCharge : 0,
                isDiscount: isDisOpIN,
                isInBuildPhoto: isPhotoOptIn
            }))

            dispatch(mark_compose_step_status(true));
            NAVIGATE("/ad/publish/payment");
        }

    }


    // local_local_state_on_page_load
    useEffect(() => {
        SETUP_LOCAL_STATE();
        if (PRIMERY_CONFIGBASE.isDone === true) {
            console.log(PRIMERY_CONFIGBASE);
        }
    }, [])


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
                                                backgroundColor: `${isbgclr}`
                                            }}
                                            className={`preview__box__inner__outer ${iseBorder && "screen__border"}`} >
                                            <div className={`screen__heilight  ${isTick && "active__heilight"}`} ></div>
                                            <p className="preview__Text">{ADTEXT}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidepanel">
                                    <div className="bg__colors__outer">

                                        <div className="colors__palet">
                                            {PRIMERY_CONFIGBASE?.colors_config?.colors.map(({ clr, id, isActive, value }) => {
                                                return (
                                                    <>
                                                        <div key={id} style={{
                                                            backgroundColor: `${value}`,
                                                            display: "flex",
                                                            alignItems: "center"
                                                        }} className="bgcls__jscket">
                                                            <input
                                                                disabled={isActive === true ? false : true}
                                                                className='radio__Clr'
                                                                type="radio"
                                                                data-clr={clr}
                                                                value={value}
                                                                name={clr}
                                                                id={value}
                                                                checked={isbgclr === value}
                                                                onChange={handleBGclr}
                                                            />
                                                            <p style={{
                                                                textTransform: "capitalize",
                                                                color: "black",
                                                                fontWeight: "600",
                                                                fontSize: "clamp(12px,4vw,12px)",
                                                                width: "100%",
                                                                textAlign: "center",
                                                            }} className="bg__cls">{clr}</p>
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
                                                boxShadow: `${iseBorder === true ? "rgba(214, 35, 3, 0.3) 0px 0px 0px 1px" : "rgba(3, 102, 214, 0.3) 0px 0px 0px 2px"}`

                                            }}
                                            className="border__box checkboxouter flex fd-col flex-aic">
                                            <input
                                                disabled={PRIMERY_CONFIGBASE.secondry_pallet_config.isBorderActive === false ? true : false}
                                                className='border__cb checkbox'
                                                type="checkbox"
                                                name="ad__border"
                                                id="ad__border"
                                                checked={iseBorder}
                                                onChange={(e) => {
                                                    setBorder(!iseBorder)
                                                }}
                                            />

                                            Border <span style={{
                                                fontSize: "8px"
                                            }} >{`( ${PRIMERY_CONFIGBASE.secondry_pallet_config.BORDER_PRICES} Extra Charge)`}</span>

                                        </div>


                                        {/* Marker & Border */}
                                        <div
                                            style={{
                                                boxShadow: `${isTick === true ? "rgba(214, 35, 3, 0.3) 0px 0px 0px 1px" : "rgba(3, 102, 214, 0.3) 0px 0px 0px 2px"}`,
                                            }}
                                            className="marker__box checkboxouter flex fd-col flex-aic">
                                            <input
                                                disabled={PRIMERY_CONFIGBASE.secondry_pallet_config.isTickActive === false ? true : false}
                                                className='marker__cb checkbox'
                                                type="checkbox"
                                                name="ad__marker"
                                                id="ad__marker"
                                                checked={isTick}
                                                onChange={(e) => {
                                                    setTick(!isTick);
                                                }}
                                            />

                                            Marker <span style={{
                                                fontSize: "8px"
                                            }} >{`( ${PRIMERY_CONFIGBASE.secondry_pallet_config.TICK_PRICES} Extra Charge)`}</span>

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
                                        }} className="int lines">₹{"   "}{adPrice}</p>
                                        <p className="sep_cover">
                                            <div className="sep"></div>
                                            <p className="stat__outer__mobile__stat__name">
                                                AD Cost
                                            </p>
                                        </p>
                                    </p>

                                </div>


                                <div className="special__enhancement__box">
                                    <p className="heading">Special Enhancement & Discounts</p>
                                    <div className={`translation__enhancement enhancement`}>
                                        <input
                                            checked={isTranslationSelected}
                                            onChange={(e) => {
                                                setTranslation(!isTranslationSelected);
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
                                    { PRIMERY_CONFIGBASE?.stats_prices?.discount.discount &&
                                        <>
                                            <div className={`translation__enhancement enhancement`}>
                                                <input
                                                    checked={isDisOpIN}
                                                    onChange={(e) => {
                                                        setDisOptIn(!isDisOpIN);
                                                    }}
                                                    className='enhensmnt__checkbox'
                                                    type="checkbox"
                                                    name={PRIMERY_CONFIGBASE.stats_prices.discount.discount_name}
                                                    id={`translation__checkbox`} />
                                                <p>
                                                    <div style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "9px"
                                                    }}>
                                                        {PRIMERY_CONFIGBASE.stats_prices.discount.discount_name}
                                                        <img style={{
                                                            width: "100%",
                                                            height: "auto",
                                                            maxWidth: "31px",
                                                        }} src={discountGif} alt="discount" />
                                                    </div>
                                                    <span>You can OPTin for {PRIMERY_CONFIGBASE.stats_prices.discount.discount_name} Discount. But if your AD is not elegible to {PRIMERY_CONFIGBASE.stats_prices.discount.discount_name} Discount your AD might not Publish.</span>
                                                </p>
                                            </div>

                                        </>}
                                    {PRIMERY_CONFIGBASE?.misc_config.enhansments.isBuiltinPhoto &&
                                        <>
                                            <div className={`Inbutild__photo enhancement`}>
                                                <input
                                                    checked={isPhotoOptIn}
                                                    onChange={(e) => {
                                                        setPhotoOptin(!isPhotoOptIn);
                                                    }}
                                                    className='enhensmnt__checkbox'
                                                    type="checkbox"
                                                    name={INBUILD_PHOTO_CONFIG[PRIMERY_CONFIGBASE?.misc_config.enhansments.photo_type].photo_name}
                                                    id={`Inbutild__photo`} />
                                                <p>
                                                    <div style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "9px"
                                                    }}>
                                                        Primery Icon for {ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_name} AD
                                                    </div>
                                                    <span>OPTin for Primery Icon to increase chances for your ad to be noticed by many customers. it Would cost {INBUILD_PHOTO_CONFIG[PRIMERY_CONFIGBASE?.misc_config.enhansments.photo_type].photo_charge} Daily</span>
                                                </p>
                                            </div>

                                        </>}
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
                                        <div className="rate__card">
                                            <h3 className="newspaper__name">
                                                {PRIMERY_CONFIGBASE.stats_prices.prices.card_name}
                                            </h3>
                                            <div className="prices">
                                                <p className="price__primery">Rs. {PRIMERY_CONFIGBASE.stats_prices.prices.basePrice} / {PRIMERY_CONFIGBASE.stats_prices.stats.min_sep} {PRIMERY_CONFIGBASE.stats_prices.stats.main_sep}</p>
                                                <p className="price__extra">Rs. {PRIMERY_CONFIGBASE.stats_prices.prices.extraSepPrice} /extra {PRIMERY_CONFIGBASE.stats_prices.stats.main_sep}</p>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                <div className="from__newspaper">
                                    <h2>From the Newspaper </h2>
                                    <div className="innertext">
                                        <p className="newspapername">{PRIMERY_CONFIGBASE.misc_config.from_paper.paper_name} : </p>
                                        <p className="innertext__inline">{PRIMERY_CONFIGBASE.misc_config.from_paper.paper_text}</p>
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