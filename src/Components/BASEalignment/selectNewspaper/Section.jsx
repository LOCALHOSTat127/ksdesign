import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import {
    mark_paper_info_step_status,
    set_paper_basic_info,
    set_paper_editions,
    set_paper_package,
    mark_first_step_status

} from "../../../app/features/ad_config/ad_booking_config_slice";

import "./style.css";

import { useNavigate } from 'react-router-dom';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};




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

    const fetch_newspapers = async () => {
        let server_response = await axios({
            method: 'get',
            url: 'http://172.20.10.2:5000/db/get_newspapers',
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",

                // API_KEY_INCREPTED
                Authorization: 'Bearer ' + process.env.REACT_APP_BACKEND_API_KEY,
            },
        });
        if (server_response.data?.status === 200) {
            setNewsPapers(server_response.data.data.newspaper_collection);

        }
    }
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setEditionsList(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    // fetch_editions
    const fetch_editions = async (NID) => {
        let server_response = await axios({
            method: 'post',
            url: 'http://172.20.10.2:5000/db/get_editions',
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",

                // API_KEY_INCREPTED
                Authorization: 'Bearer ' + process.env.REACT_APP_BACKEND_API_KEY,
            },
            data: {
                NID: NID
            }
        });
        if (server_response.data?.status === 200) {
            setEditions(server_response.data.data.editions_list);
        }
    }

    // handle_paper_Select
    const handlePaperSelect = (e) => {
        setEditionsList([]);
        const current_paper = newsPapers.filter((paper) => {
            if (paper.NID === e.target.value) {
                return paper;
            }
        })
        setSelectedPaper(current_paper[0]);
        fetch_editions(slectedPaper?.NID);


    }

    // fetching Newspapers
    useEffect(() => {
        fetch_newspapers();
    }, [])


    return (
        <section className="select_newspaper_n_edition">
            <div className="selection__controlls__jacket">
                <div className="heading__outer">
                    <h2>Select Newspaper & Editions</h2>
                    <p>Select from any Special  Offer(s) if available.</p>
                </div>
                <FormControl sx={{ m: 1, maxWidth: "300px", width: "100%" }} size="meadium">
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
                                <MenuItem value={paper?.NID}>
                                    {paper.paperName}
                                </MenuItem>
                            )
                        })}


                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, maxWidth: "300px", width: "100%" }} size="meadium">
                    <InputLabel id="select_editions">Editions</InputLabel>
                    <Select
                        labelId="select_editions"
                        id="select_editions"
                        multiple
                        value={selectedEditions}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >    <MenuItem value="Select Editions">
                            <em>Select Editions</em>
                        </MenuItem>
                        {editions?.map((edition) => (
                            <MenuItem key={edition} value={edition}>
                                <Checkbox checked={selectedEditions?.indexOf(edition) > -1} />
                                <ListItemText primary={edition} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </section>
    )
}




{/* 

<button onClick={STEP_FORWARD_HANDLER}>Compose AD</button> */}