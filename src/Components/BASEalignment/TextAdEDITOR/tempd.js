
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






    const [HEADING_SELECTION, setHEADING_SELECTION] = useState({
        heading_first: null,
        heading_second: null,
        heading_third: null,
        isHeadingSet: true
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
    const [discount, setDiscount] = useState({
        dis: null,
        isDis: false
    })






 

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
                    perExtraSep: edition.price_config.perExtraSep,
                    discount: edition.misc_config.discount
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







    const check_for_error = () => {
        handleUpdatePrice();
        const ___DEV__ = true;
        if (words < configurations.price_config.min_sep || words > configurations.price_config.max_sep) {
            alert("Min : 20 words | Max : 50 Words");
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
                isBgClr: adBGcolor,
                bg_color_charge: bgColorPrice,
                isBorder: isBorderOn,
                border_charge: isBorderOn === true ? borderCharge : 0,
                isMarker: isTickOn,
                marker_charge: isTickOn === true ? tickCharge : 0,

            }))

            dispatch(set_discount(discount));

            dispatch(set_ad_stats({
                base_price: price,
                price_before_payment_page: price,
                words_count: words,
                chars_count: chars
            }))

            dispatch(set_special_enhancement({
                isTranslation: enhansments.istranslationreq === true ? true : false,
                translation_charge: enhansments.istranslationreq === true ? 0 : 0
            }))

            dispatch(mark_compose_step_status(true));
            NAVIGATE("/ad/publish/payment");
        }

    }