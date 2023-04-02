import { useState, useEffect } from 'react'
import "./style.css";
import generalColorPallerConfig from "../../../data/config/general_style_pallet_config.json";

import Button from '@mui/material/Button';
import { ReactComponent as ShowSVG } from "../../../assets/svg/show.svg";
import { ReactComponent as EditSvg } from "../../../assets/svg/edit.svg";
import { ReactComponent as UpdateSvg } from "../../../assets/svg/update.svg";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




const EditorText = () => {







    const HEADING__CONFIG = {
        "categorys": [
            {
                "cat_name": "Wanted Bride",
                "index": 0,
                "SubCatgory": [
                    {
                        "sub_cat_name": "By Caste",
                        "index": 0,
                        "values": ["Agarwal- Bisa",
                            "Bahai",
                            "Bari",
                            "Brahmin",
                            "Chandravanshi Kshatriya",
                            "Chaurasia",
                            "Dhobi",
                            "Garhwali",
                            "Gujar",
                            "Gujarati Patidar",
                            "Gujarati Vaishnav",
                            "Gurjjar",
                            "Jain",
                            "Jaiswal",
                            "Jatav",
                            "Kashyap",
                            "Khatri",
                            "Khukhrain",
                            "Kshatriya",
                            "Kumauni",
                            "Kutchi",
                            "Lingayat",
                            "Mahajan",
                            "Maheshwari",
                            "Mallah",
                            "Maurya",
                            "Mina",
                            "Mogaveera",
                            "Prajapati",
                            "Saini",
                            "Saryuparin",
                            "Yadav"
                        ]
                    },
                    {
                        "sub_cat_name": "By Community",
                        "index": 1,
                        "values": [
                            "Aga Khani",
                            "Agarwal",
                            "Anglo Indian",
                            "Bihari",
                            "Arora",
                            "Dawoodi Bohra",
                            "Goan",
                            "Jat",
                            "Keralite",
                            "Kharwar",
                            "Kumbhakar",
                            "Mangaloreans",
                            "Maratha",
                            "Marwaris",
                            "North Indian",
                            "Probashi Bengali",
                            "Rajput",
                            "Shetty",
                            "Up Yadav"
                        ]
                    },
                    {
                        "sub_cat_name": "By Language",
                        "index": 2,
                        "values": [
                            "Assamese",
                            "Bengali",
                            "Gujarati",
                            "Himachali",
                            "Kannadiga",
                            "Kashmiri",
                            "Malayali",
                            "Marathi/konkani",
                            "Oriya",
                            "Punjabi",
                            "Rajasthani",
                            "Sindhi",
                            "Tamil",
                            "Telugu"
                        ]
                    },
                    {
                        "sub_cat_name": "By Nationality",
                        "index": 3,
                        "values": [
                            "American",
                            "British",
                            "European",
                            "Gulf Muslims",
                            "Japanese",
                            "Nepali",
                            "Nri/green Card",
                            "Other Foreigners",
                            "Pakistani",
                            "West Asian"
                        ]
                    }, {
                        "sub_cat_name": "By Profession",
                        "index": 4,
                        "values": [
                            "Accountant",
                            "Administrative",
                            "Advt / Mktg",
                            "Architect",
                            "Chef",
                            "Chemist",
                            "Clerical",
                            "Corporate",
                            "Dentist",
                            "Doctors",
                            "Educationist",
                            "Engineers",
                            "Finance / Banking",
                            "Goldsmith",
                            "Government / Defence",
                            "Home Maker",
                            "Hotel / Shipping / Airlines",
                            "Ias / Allied Services",
                            "Industrialist",
                            "Interior Designer",
                            "Journalist",
                            "Law Enforcement",
                            "Lawyers",
                            "Lecturer",
                            "Mba / ca",
                            "Media",
                            "Medical Assistant",
                            "Multinational",
                            "Nurse",
                            "Other Professionals",
                            "Pharmacist",
                            "Physician",
                            "Post Graduates",
                            "Real Estate",
                            "Research",
                            "Sales",
                            "Self Employed",
                            "Social Worker",
                            "Software Professional",
                            "Student",
                            "Technician",
                            "Web Designer"
                        ]
                    },
                    {
                        "sub_cat_name": "By Religion",
                        "index": 5,
                        "values": [
                            "Buddhist",
                            "Christian",
                            "Hindu",
                            "Jews",
                            "Muslim",
                            "Parsi",
                            "Sikh",
                            "Sindhi/ Sikh"
                        ]
                    },
                    {
                        "sub_cat_name": "General",
                        "index": 6,
                        "values": [
                            "Caste No Bar",
                            "Civil Marriage",
                            "Cosmopolitan",
                            "Disabled/ Handicapped",
                            "Manglik",
                            "No Dowry / Spiritual",
                            "Non-working Girls",
                            "Religion No Bar",
                            "Sans Dowry",
                            "Sc/st",
                            "Second Marriage",
                            "Senior Citizen",
                            "Sindhi- NRI",
                            "Widow / Widower"
                        ]
                    }
                ]
            },
            {
                "cat_name": "Wanted Groom",
                "index": 1,
                "SubCatgory": [
                    {
                        "sub_cat_name": "By Caste",
                        "index": 0,
                        "values": ["Agarwal- Bisa",
                            "Bahai",
                            "Bari",
                            "Brahmin",
                            "Chandravanshi Kshatriya",
                            "Chaurasia",
                            "Dhobi",
                            "Garhwali",
                            "Gujar",
                            "Gujarati Patidar",
                            "Gujarati Vaishnav",
                            "Gurjjar",
                            "Jain",
                            "Jaiswal",
                            "Jatav",
                            "Kashyap",
                            "Khatri",
                            "Khukhrain",
                            "Kshatriya",
                            "Kumauni",
                            "Kutchi",
                            "Lingayat",
                            "Mahajan",
                            "Maheshwari",
                            "Mallah",
                            "Maurya",
                            "Mina",
                            "Mogaveera",
                            "Prajapati",
                            "Saini",
                            "Saryuparin",
                            "Yadav"
                        ]
                    },
                    {
                        "sub_cat_name": "By Community",
                        "index": 1,
                        "values": [
                            "Aga Khani",
                            "Agarwal",
                            "Anglo Indian",
                            "Bihari",
                            "Arora",
                            "Dawoodi Bohra",
                            "Goan",
                            "Jat",
                            "Keralite",
                            "Kharwar",
                            "Kumbhakar",
                            "Mangaloreans",
                            "Maratha",
                            "Marwaris",
                            "North Indian",
                            "Probashi Bengali",
                            "Rajput",
                            "Shetty",
                            "Up Yadav"
                        ]
                    },
                    {
                        "sub_cat_name": "By Language",
                        "index": 2,
                        "values": [
                            "Assamese",
                            "Bengali",
                            "Gujarati",
                            "Himachali",
                            "Kannadiga",
                            "Kashmiri",
                            "Malayali",
                            "Marathi/konkani",
                            "Oriya",
                            "Punjabi",
                            "Rajasthani",
                            "Sindhi",
                            "Tamil",
                            "Telugu"
                        ]
                    },
                    {
                        "sub_cat_name": "By Nationality",
                        "index": 3,
                        "values": [
                            "American",
                            "British",
                            "European",
                            "Gulf Muslims",
                            "Japanese",
                            "Nepali",
                            "Nri/green Card",
                            "Other Foreigners",
                            "Pakistani",
                            "West Asian"
                        ]
                    }, {
                        "sub_cat_name": "By Profession",
                        "index": 4,
                        "values": [
                            "Accountant",
                            "Administrative",
                            "Advt / Mktg",
                            "Architect",
                            "Chef",
                            "Chemist",
                            "Clerical",
                            "Corporate",
                            "Dentist",
                            "Doctors",
                            "Educationist",
                            "Engineers",
                            "Finance / Banking",
                            "Goldsmith",
                            "Government / Defence",
                            "Home Maker",
                            "Hotel / Shipping / Airlines",
                            "Ias / Allied Services",
                            "Industrialist",
                            "Interior Designer",
                            "Journalist",
                            "Law Enforcement",
                            "Lawyers",
                            "Lecturer",
                            "Mba / ca",
                            "Media",
                            "Medical Assistant",
                            "Multinational",
                            "Nurse",
                            "Other Professionals",
                            "Pharmacist",
                            "Physician",
                            "Post Graduates",
                            "Real Estate",
                            "Research",
                            "Sales",
                            "Self Employed",
                            "Social Worker",
                            "Software Professional",
                            "Student",
                            "Technician",
                            "Web Designer"
                        ]
                    },
                    {
                        "sub_cat_name": "By Religion",
                        "index": 5,
                        "values": [
                            "Buddhist",
                            "Christian",
                            "Hindu",
                            "Jews",
                            "Muslim",
                            "Parsi",
                            "Sikh",
                            "Sindhi/ Sikh"
                        ]
                    },
                    {
                        "sub_cat_name": "General",
                        "index": 6,
                        "values": [
                            "Caste No Bar",
                            "Civil Marriage",
                            "Cosmopolitan",
                            "Disabled/ Handicapped",
                            "Manglik",
                            "No Dowry / Spiritual",
                            "Non-working Girls",
                            "Religion No Bar",
                            "Sans Dowry",
                            "Sc/st",
                            "Second Marriage",
                            "Senior Citizen",
                            "Sindhi- NRI",
                            "Widow / Widower"
                        ]
                    }
                ]

            }
        ]
    }






    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSubCategory, setActiveSubCategory] = useState(null);

    const [showPreview, setPreview] = useState(0);
    const [adBGcolor, setBGcolor] = useState(generalColorPallerConfig.color__pallet[0] ? generalColorPallerConfig.color__pallet[0].clr : "#FFFFFF");
    const [isMarkerOn, setMarker] = useState(false);
    const [isBorderOn, setBorder] = useState(false);
    const [ADTEXT, handleADTEXT] = useState("");
    const [words, setWords] = useState(0);
    const [price, setPrice] = useState(0);
    const [chars, setChars] = useState(0);
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



        }
        setWords((count) => count = wordscount);
        setChars((count) => count = charscount);


    }



    return (
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
                            {generalColorPallerConfig.color__pallet.map(({ value, name, id }) => {
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
                                value={HEADING__CONFIG.categorys[activeCategory]?.cat_name}
                                label="Sub-Category"
                                onChange={((e) => {
                                    setActiveCategory((prev) => prev = e.target.value);
                                })}
                            >
                                <MenuItem value="None">
                                    <em>None</em>
                                </MenuItem>

                                {HEADING__CONFIG.categorys.map((cat) => {


                                    return (
                                        <MenuItem value={cat.index}>
                                            {cat.cat_name}
                                        </MenuItem>
                                    )
                                })}

                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, maxWidth: "200px", minWidth: "100%" }} size="meadium">
                            <InputLabel id="select__classification">Classification</InputLabel>
                            <Select
                                labelId="select__classification"
                                id="select__classification"
                                value={HEADING__CONFIG.categorys[activeCategory]?.SubCatgory?.sub_cat_name}
                                onChange={((e) => {
                                    setActiveSubCategory((prev) => prev = e.target.value);
                                })}

                                label="Classification"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {HEADING__CONFIG.categorys[activeCategory]?.SubCatgory.map((subcat) => {
                                    return (
                                        <MenuItem value={subcat.index}>
                                            {subcat.sub_cat_name}
                                        </MenuItem>
                                    )
                                })}
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
                                {HEADING__CONFIG.categorys[activeCategory]?.SubCatgory[activeSubCategory]?.values.map((value, index) => {
                                    return (
                                        <MenuItem value={index}>
                                            {value}
                                        </MenuItem>
                                    )
                                })}

                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="price__list">
                    <h2>Basic Rates </h2>
                    <div className="price__slider">
                        <div className="rate__card">
                            <h3 className="newspaper__name">
                                Rajasthan Patrika
                            </h3>
                            <p className="package__desc">
                                (Rajasthan + Madhya Pradesh+ Chhattisgarh)
                            </p>

                            <div className="prices">
                                <p className="price__primery">Rs. 3000 / 20 Words</p>
                                <p className="price__extra">Rs. 20 /extra Words</p>
                            </div>
                        </div>
                        <div className="rate__card">
                            <h3 className="newspaper__name">
                                Rajasthan Patrika
                            </h3>
                            <p className="package__desc">
                                (Rajasthan + Madhya Pradesh+ Chhattisgarh)
                            </p>

                            <div className="prices">
                                <p className="price__primery">Rs. 3000 / 20 Words</p>
                                <p className="price__extra">Rs. 20 /extra Words</p>
                            </div>
                        </div>
                        <div className="rate__card">
                            <h3 className="newspaper__name">
                                Rajasthan Patrika
                            </h3>
                            <p className="package__desc">
                                (Rajasthan + Madhya Pradesh+ Chhattisgarh)
                            </p>

                            <div className="prices">
                                <p className="price__primery">Rs. 3000 / 20 Words</p>
                                <p className="price__extra">Rs. 20 /extra Words</p>
                            </div>
                        </div>
                        <div className="rate__card">
                            <h3 className="newspaper__name">
                                Rajasthan Patrika
                            </h3>
                            <p className="package__desc">
                                (Rajasthan + Madhya Pradesh+ Chhattisgarh)
                            </p>

                            <div className="prices">
                                <p className="price__primery">Rs. 3000 / 20 Words</p>
                                <p className="price__extra">Rs. 20 /extra Words</p>
                            </div>
                        </div>
                        <div className="rate__card">
                            <h3 className="newspaper__name">
                                Rajasthan Patrika
                            </h3>
                            <p className="package__desc">
                                (Rajasthan + Madhya Pradesh+ Chhattisgarh)
                            </p>

                            <div className="prices">
                                <p className="price__primery">Rs. 3000 / 20 Words</p>
                                <p className="price__extra">Rs. 20 /extra Words</p>
                            </div>
                        </div>

                        <div className="rate__card">
                            <h3 className="newspaper__name">
                                Rajasthan Patrika
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
                        <p className="newspapername">Rajasthan Patrika : </p>
                        <p className="innertext__inline">Kindly give appropriate spacing between each word. Use standard abbreviations.Kindly Note : Maximum word limit is upto 50 words. Please do not use abbreviations such as BHK, SM4, BTECH etc. If used , they will be counted as expanded words and you will be charged extra. For Example - 3BHK = 4 Words, PQM4 = 4 Words. Also Email id is counted as 3 Words & Mobile number as 2 Words. Kindly compose your ad accordingly.</p>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default EditorText;