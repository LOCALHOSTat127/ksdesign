import { useState, useEffect } from 'react'
import "./style.css";


import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {
    mark_paper_info_step_status,
    set_paper_basic_info,
    set_paper_editions,
    set_paper_package,
    mark_first_step_status,
  

} from "../../../app/features/ad_config/ad_booking_config_slice";

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ReactComponent as EditionsSvg } from '../../../assets/svg/editions.svg';
import { ReactComponent as PackageSvg } from '../../../assets/svg/packages.svg';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LinearProgress from '@mui/material/LinearProgress';



import Firebase_Utils from '../../../Api/Firebase/firebase_utils';







export const Section = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const ad_state = useSelector((state) => state.ad_booking_config);

    const [newsPapersList, setNewsPapersList] = useState(null);
    const [fetchedEditionsList, setFetchedEditionsList] = useState(null);
    const [fetchedPackageList, setFetchedPackageList] = useState(null);
    const [currentNewsPapaer, setCurrentNewsPaper] = useState(null);
    const [isFetching, setFetching] = useState(false);
    const [isUiRendered, setUIRendred] = useState(false);
    let selectedEditionsToGo = [];
















    const fetch_rate_card = async () => {
        setFetching(true);
        setUIRendred(false);
        let response = await Firebase_Utils.fetch_price_list(
            currentNewsPapaer.total_editions,
            ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id,
            currentNewsPapaer.NID.split("_")[1]
        );

        let packages_response = await Firebase_Utils.fetch_packages_list(
            currentNewsPapaer.NID.split("_")[1],
            ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id
        );
        
  
        setFetching(false);
        setUIRendred(true);

        if (response.status === 200) {
            console.log(response.data);
            const tempRateCards = [];
            if (response.items > 0) {
                response.data.map((card) => {
                    tempRateCards.push({
                        edition_name: card.editionName,
                        price_config: card.price_config,
                        price: card.price_config.minPrice,
                        minSep: card.price_config.minSep,
                        sep: card.price_config.sep,
                        maxSep: card.price_config.maxSep,
                        doc_config: card.documents_config,
                        misc_config: card.misc_config,
                        pallet_rules: card.paller_config,
                        schemes: card.schemes,
                    })
                });
                setFetchedEditionsList(tempRateCards);
            } else {
                setFetchedEditionsList(null);
            }
        }


        if (packages_response.status === 200) {
            const tempPackages = [];
            if (packages_response.data?.packages) {
                packages_response?.data?.packages.map((packg) => {
                    tempPackages.push({
                        complete_package : packg,
                        pacakge_name: packg.packageName,
                        package_desc: packg.packageDesc,
                        package_price: packg.price_config.minPrice,
                        sep: packg.price_config.sep,
                        discount : packg?.discount,
                        min_sep: packg.price_config.minSep,
                        max_sep: packg.price_config.maxSep
                    })
                })
            
                setFetchedPackageList(tempPackages)
            } else {
                setFetchedPackageList(null)
            }
        }

    }

    // handle_paper_Select
    const handlePaperSelect = (e) => {
        setFetchedEditionsList(null);
        setFetchedPackageList(null);
        if (e.target.value === "None") {
            setFetchedEditionsList([]);
            setUIRendred(false);
            setCurrentNewsPaper(null);
            return false;
        }

        const current_paper = newsPapersList.filter((paper) => {
            if (paper.NID === e.target.value) {
                return paper;
            }
        })

        setCurrentNewsPaper(current_paper[0]);
    }






    const handle_edition_select = (e) => {
        if (e) {
            if (e.target.offsetParent.classList.contains("selected") === false) {
                const new_edition = fetchedEditionsList.filter((edition) => {
                    if (edition.edition_name === e.target.offsetParent.id) {
                        return edition;
                    }
                })

                selectedEditionsToGo.push(...new_edition);
                e.target.offsetParent.classList.add("selected");
            } else {
                const filted_editions = selectedEditionsToGo.filter((edition) => {
                    if (edition.edition_name != e.target.offsetParent.id) {
                        return edition;
                    }
                })
                selectedEditionsToGo = new Array(...filted_editions);
                e.target.offsetParent.classList.remove("selected");
            }


        }
    }






    const PROCEED_TO_COMPOSE = (e) => {
    
        if (!e.target?.dataset?.handlercaller) {
            return false;
        }


        if (e.target?.dataset?.handlercaller === "edition") {
            if (selectedEditionsToGo.length <= 0) {
                alert("Select atleast 1 Edition");
                return false;
            }

            dispatch(set_paper_editions(selectedEditionsToGo));
            dispatch(set_paper_basic_info({
                nid: currentNewsPapaer.NID.split("_")[1],
                paperName: currentNewsPapaer.newsPaperName,
                from_the_paper: currentNewsPapaer.fromThePaper,
                cat_config_id: ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id
            }))
 
            dispatch(mark_paper_info_step_status(true));
            dispatch(mark_first_step_status(true));
            dispatch(set_paper_package(null));

            if (ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.isDone === true && ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.isDone === true) {
                navigate(`/ad/compose/${ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.config_info.ad_type === 'classified_text' ? 'textad' :
                    ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.config_info.ad_type === 'textdisplayad' ? 'textdisplayad' : '/'}`);
            } else {
                navigate(`/ad/select/category`);
            }
        } else if (e.target?.dataset?.handlercaller === "package") {


            let selectedPackage = null;
            fetchedPackageList.forEach((pckg, index) => {
                if (index == e.target.dataset.packageid) {
                    selectedPackage = pckg;
                }
            })


            if (selectedPackage === null) {
                alert("Select Any Pacakge");
                return false;
            }

     
            dispatch(set_paper_editions(null));
            dispatch(set_paper_basic_info({
                nid: currentNewsPapaer.NID.split("_")[1],
                paperName: currentNewsPapaer.newsPaperName,
                from_the_paper: currentNewsPapaer.fromThePaper,
                cat_config_id: ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id
            }))
            dispatch(mark_paper_info_step_status(true));
            dispatch(mark_first_step_status(true));
            dispatch(set_paper_package(selectedPackage));

            if (ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.isDone === true && ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.isDone === true) {
                navigate(`/ad/compose/${ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.config_info.ad_type === 'classified_text' ? 'textad' :
                    ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.config_info.ad_type === 'textdisplayad' ? 'textdisplayad' : '/'}`);
            } else {
                navigate(`/ad/select/category`);
            }
        }
    }



    // fetching-Newspapers-on-page-load
    useEffect(() => {
        async function fetch_newspapers() {
            setFetching(true);

            let response = await Firebase_Utils.get_newspapers();
            if (response?.status === 200) {
                setNewsPapersList(response.data.newspaper_collection);
                setFetching(false);
                console.log(response.data.newspaper_collection);
            }
        }
        fetch_newspapers();
    }, [])




    useEffect(() => {
        if (currentNewsPapaer != null) {
            fetch_rate_card();
        }
    }, [currentNewsPapaer])








    return (
        <section className="select_newspaper_n_edition">
            <div className="selection__controlls__jacket">
                <LinearProgress sx={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    display: `${isFetching === true ? "flex" : "none"}`
                }} />
                <div className="heading__outer">
                    <h2>Select Newspaper & Editions</h2>
                    <p>Select from any Special  Offer(s) if available.</p>
                </div>
                <div className="flex__outer">
                    <FormControl disabled={isFetching === true ? true : false} sx={{ m: 1, maxWidth: "300px", width: "100%" }} size="meadium">
                        <InputLabel id="select_newspaper">Newspaper</InputLabel>
                        <Select
                            labelId="select_newspaper"
                            id="select_newspaper"
                            onChange={handlePaperSelect}
                            value={currentNewsPapaer?.NID}
                            label="Newspaper"

                        >
                            <MenuItem value="None">
                                <em>Select Newspaper</em>
                            </MenuItem>

                            {newsPapersList?.map((paper) => {
                                return (
                                    <MenuItem disabled={isFetching === true ? true : false} value={paper?.NID}>
                                        {paper.newsPaperName}
                                    </MenuItem>
                                )
                            })}


                        </Select>
                    </FormControl>

                    <div className="meta_data">
                        <div className="paper__logo">
                            <img src={currentNewsPapaer && currentNewsPapaer.paperLogo} alt={currentNewsPapaer && currentNewsPapaer.newsPaperName} />
                        </div>

                        <p>
                            Category :
                            <p className="cat_name">{ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_name}</p>
                        </p>
                    </div>
                </div>
            </div>

            <div className={`price_list_outlet_main ${isUiRendered == true ? "show_results" : null}`}>

                {fetchedEditionsList && <>
                    <div className="editions__cards_display">
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }} className="status__line">
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "7px",
                                background: "#0072ff17",
                                width: "fit-content",
                                padding: "6px",
                                borderRadius: "4px"
                            }}>
                                <EditionsSvg style={{
                                    width: "20px",
                                    height: "20px"
                                }} className='svg' />
                                <h2 style={{
                                    color: "black"
                                }}>Select Edition(s)</h2>

                            </div>
                            <button
                                data-handlercaller="edition"
                                onClick={PROCEED_TO_COMPOSE}
                                className="proceed_with_editions">
                                Proceed & Compose AD
                                <KeyboardArrowRightIcon data-handlercaller="edition" sx={{
                                    position: "absolute",
                                    right: "8px",
                                    top: "50%",
                                    transform: "translateY(-50%)",


                                }} className='svg' />
                            </button>
                        </div>

                        <div className="editions__cards">
                            {fetchedEditionsList && fetchedEditionsList.map(((card) => {
                                return (
                                    <div key={card.edition_name} id={card.edition_name} className="rate_card_edition">
                                        <div onClick={handle_edition_select} className="click_shadow"></div>

                                        <div className='right_side'>
                                            <h2 className="edition__name">{card.edition_name}</h2>
                                            <p className="meta_data">
                                                max words : {card.maxSep}
                                            </p>
                                        </div>
                                        <div className="left__side">
                                            <p className="min_price">
                                                <p className="symbol">
                                                    ₹ </p>
                                                <p className='price'>{card.price}</p>
                                            </p>
                                            <div className="seperator"></div>
                                            <p className="seprator">
                                                {card.minSep}/{card.sep}
                                            </p>
                                        </div>

                                    </div>
                                )

                            }))}
                        </div>

                    </div>
                </>}

                {fetchedPackageList && <>
                    <div className="packages__display">
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                            background: "#0072ff17",
                            width: "fit-content",
                            padding: "6px",
                            borderRadius: "4px"
                        }}>
                            <PackageSvg style={{
                                width: "20px",
                                height: "20px"
                            }} className='svg' />
                            <h2 style={{
                                color: "black"
                            }}>Special Packages</h2>
                        </div>

                        {fetchedPackageList ? fetchedPackageList.map(((packg, index) => {
                            return (
                                <div className="package__card">
                                    <div className="primary__info">
                                        <h2 className="package__name">{packg.pacakge_name}</h2>
                                        <p className="package__desc">
                                            {packg.package_desc}
                                        </p>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "30px"
                                    }} className="outer__jacket">
                                        <div className="meta__info">
                                            <p className="min__words">
                                                <p className="words">{packg.min_sep}</p>
                                                <p className="set">/{`${packg.sep} `}Min</p>
                                            </p>
                                            <p className="max__words">
                                                <p className="words">{packg.max_sep}</p>
                                                <p className="set">/{`${packg.sep} `}Max</p>
                                            </p>
                                        </div>
                                        <button
                                            id={index}
                                            data-handlercaller="package"
                                            data-packageid={index}
                                            onClick={PROCEED_TO_COMPOSE}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "24px",
                                                width: "200px",
                                                position: "relative"
                                            }} className="proceed__with__package">Select
                                            <p data-handlercaller="package" data-packageid={index} className="price">
                                                ₹{packg.package_price}
                                            </p>

                                            <KeyboardArrowRightIcon data-handlercaller="package" data-packageid={index} sx={{
                                                position: "absolute",
                                                right: "-22px",
                                                top: "50%",
                                                transform: "translateY(-50%)",


                                            }} className='svg' />
                                        </button>
                                    </div>
                                </div>
                            )
                        })) : <p style={{
                            color: "black"
                        }}>No Packages Found!</p>}
                    </div>

                </>}
            </div>
        </section>
    )
}




