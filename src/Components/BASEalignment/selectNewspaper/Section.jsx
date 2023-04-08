import { useState, useEffect } from 'react'
import "./style.css";
import debounce from 'lodash.debounce';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {
    mark_paper_info_step_status,
    set_paper_basic_info,
    set_paper_editions,
    set_paper_package,
    mark_first_step_status

} from "../../../app/features/ad_config/ad_booking_config_slice";




import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import LinearProgress from '@mui/material/LinearProgress';



import Firebase_Utils from '../../../Api/Firebase/firebase_utils';






export const Section = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const ad_state = useSelector((state) => state.ad_booking_config);


    const [newsPapers, setNewsPapers] = useState(null);
    const [slectedPaper, setSelectedPaper] = useState(null);

    const [editions, setEditions] = useState([]);
    const [selectedEditions, setEditionsList] = useState([]);


    const [packages, setPackages] = useState(null);
    const [selectPackage, setPackage] = useState(null);


    const [isFetching, setFetching] = useState(false);
    const [isUiRendered, setUIRendred] = useState(false);




    // Handler_function
    const STEP_FORWARD_HANDLER = (e) => {
        dispatch(mark_paper_info_step_status(true));
        dispatch(set_paper_basic_info({
            nid: slectedPaper.NID,
            paperName: slectedPaper.paperName,
            cat_config_id: slectedPaper.CAT_CONFIG_ID,
        }))

        if (ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.isDone === true && ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.isDone === true) {
            dispatch(mark_first_step_status(true));
        }

        if (ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.isDone === true && ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.isDone === true) {
            navigate(`/ad/compose/${ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.config_info.ad_type === 'classified_text' ? 'textad' :
                true === 'textdisplayad' ? '' : 'textad'}`);
        } else {
            navigate(`/ad/select/category`);
        }
    }

    const delay = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 1500);
        })
    }

    // fetch_packages_prices
    const fetch_prices = async (selected_editions) => {
        setFetching(true);
        setUIRendred(false);
        await delay();
        setFetching(false);
        setUIRendred(true);
    }

    const debounced_fetch_prices = debounce(fetch_prices, 1500);


    // handle_editions_change
    const handle_editions_change = (e) => {
        setEditionsList(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value);

        if (e.target.value[0] === "None") {
            return 0;
        } else {
            debounced_fetch_prices(e.target.value);
        }

    }





    // handle_paper_Select
    const handlePaperSelect = (e) => {
        setUIRendred(false);
        if (e.target.value === "None") {
            setEditionsList([]);
            setEditions([]);
            return 0;
        }
        setEditionsList([]);
        setEditions([]);
        const current_paper = newsPapers.filter((paper) => {
            if (paper.NID === e.target.value) {
                return paper;
            }
        })
        setSelectedPaper(current_paper[0]);
    }

    const fetch_editions = async () => {
        setFetching(true);
        let response = await Firebase_Utils.fetch_editions_by_nid(slectedPaper?.NID);

        if (response.status === 200) {
            setEditions(response.data.editions_list);
            setFetching(false);
        } else {
            setFetching(false);
            alert(response.status_txt);
        }
    }


    // fetching-Newspapers-on-page-load
    useEffect(() => {
        async function fetch_newspapers() {
            setFetching(true);

            let response = await Firebase_Utils.get_newspapers();
            if (response?.status === 200) {
                setNewsPapers(response.data.newspaper_collection);
                setFetching(false);
            }
        }
        fetch_newspapers();
    }, [])


    useEffect(() => {
        if (slectedPaper !== null) {
            fetch_editions();
        }
    }, [slectedPaper])



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
                <FormControl disabled={isFetching === true ? true : false} sx={{ m: 1, maxWidth: "300px", width: "100%" }} size="meadium">
                    <InputLabel id="select_newspaper">Newspaper</InputLabel>
                    <Select
                        labelId="select_newspaper"
                        id="select_newspaper"
                        onChange={handlePaperSelect}
                        value={slectedPaper?.NID}
                        label="Newspaper"

                    >
                        <MenuItem value="None">
                            <em>Select Newspaper</em>
                        </MenuItem>

                        {newsPapers?.map((paper) => {
                            return (
                                <MenuItem disabled={isFetching === true ? true : false} value={paper?.NID}>
                                    {paper.paperName}
                                </MenuItem>
                            )
                        })}


                    </Select>
                </FormControl>

                <FormControl disabled={isFetching === true ? true : false} sx={{ m: 1, maxWidth: "300px", width: "100%" }} size="meadium">
                    <InputLabel id="select_editions">Editions</InputLabel>
                    <Select
                        labelId="select_editions"
                        id="select_editions"
                        multiple
                        value={selectedEditions}
                        onChange={handle_editions_change}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 48 * 4.5 + 8,
                                    width: 250,
                                },
                            },
                        }}
                    >    <MenuItem value="None">
                            <em>Select Editions</em>
                        </MenuItem>
                        {editions?.map((edition) => (
                            <MenuItem disabled={isFetching === true ? true : false} key={edition} value={edition}>
                                <Checkbox checked={selectedEditions?.indexOf(edition) > -1} />
                                <ListItemText primary={edition} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </div>

            <div className={`price_list_outlet_main ${isUiRendered == true ? "show_results" : null}`}>

            </div>
        </section>
    )
}




