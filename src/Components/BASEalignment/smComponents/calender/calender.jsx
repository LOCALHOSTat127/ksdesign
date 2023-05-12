import { useState, useEffect, useDeferredValue } from 'react'
import "./style.css";
import { debounce } from 'lodash';
import { ReactComponent as RightArrow } from "../../../../assets/svg/rightArrowSvg.svg";
import { ReactComponent as LeftArrow } from "../../../../assets/svg/leftArrowSvg.svg";
import { useDispatch, useSelector } from 'react-redux';
import { set_selected_dates } from "../../../../app/features/ad_config/ad_booking_config_slice";

const Calender = ({ OFFER_CONFIG }) => {

    const dispatch = useDispatch();
    const ad_state = useSelector((state) => state.ad_booking_config);






    const months = [
        "January", "Febuary", "March", "April", "May", "June", "July"
        , "August", "September", "October",
        "November", "December"
    ]


    let selectedDates = [...ad_state.THIRD_STEP.config_info.selected_dates];


    let date = ad_state.THIRD_STEP.config_info.date_config.date;
    let currentYear = ad_state.THIRD_STEP.config_info.date_config.currentYear;
    let currentMonth = ad_state.THIRD_STEP.config_info.date_config.currentMonth;
    let fixed_current_month = ad_state.THIRD_STEP.config_info.date_config.fixed_current_month;
    let fixed_current_year = ad_state.THIRD_STEP.config_info.date_config.fixed_current_year;
    let currentDate_month = ad_state.THIRD_STEP.config_info.date_config.currentDate_month;
    let lock_next_date = ad_state.THIRD_STEP.config_info.date_config.lock_next_date;
    let today = ad_state.THIRD_STEP.config_info.date_config.today;
    let lastDayOnMonth = ad_state.THIRD_STEP.config_info.date_config.lastDayOnMonth;







    const dispatch_to_store = () => {
        dispatch(set_selected_dates({
            dates_arr: selectedDates,
            date: ad_state.THIRD_STEP.config_info.date_config.date,
            currentYear: currentYear,
            currentMonth: currentMonth,
            fixed_current_month: fixed_current_month,
            fixed_current_year: fixed_current_year,
            currentDate_month: currentDate_month,
            lock_next_date: lock_next_date,
            today: today,
            lastDayOnMonth: lastDayOnMonth,
        }));

    }


   



    


    const handle_date_select = (e) => {
      
        if (e) {
            if (e.target.classList.contains("disabled") === false) {

                e.target.classList.toggle("selected")
                if (e.target.classList.contains("selected") === false) {
                    let filtred_dates = selectedDates.filter((data) => {
                        if (data !== `${e.target.innerText}/${currentMonth}/${currentYear}`) {
                            return data;
                        }
                    })

                    selectedDates = filtred_dates;
                } else {
                    selectedDates.push(`${e.target.innerText}/${currentMonth}/${currentYear}`);
                }

                dispatch_to_store()
            }
        }
    }






    const reHydrateCalender = () => {

        const currentDate = document.getElementById("current_date");
        const daysWrapper = document.getElementById("days__wrapper");
        currentDate.innerText = `${months[currentMonth]}, ${currentYear}`;
        lastDayOnMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        let days_li_tag = '';



        for (let i = 1; i <= lastDayOnMonth; i++) {
            if (currentMonth === fixed_current_month && currentYear === fixed_current_year && currentDate_month === i) {
                days_li_tag += `<li class="day today disabled"  >${i}</li>`
            } else {
                let isSelected = selectedDates.find((data) => data === `${i}/${currentMonth}/${currentYear}`);
                let appended_date = isSelected != undefined ? `<li class="day selected" >${i}</li>` : `<li class="day" >${i}</li>`
                let target_date_running = new Date(currentYear, currentMonth, i);
                let today_active_date = new Date(fixed_current_year, fixed_current_month, currentDate_month);
                let rendred_date = target_date_running > today_active_date ? appended_date : `<li class="day disabled"" >${i}</li>`;
                days_li_tag += `${i}/${currentMonth}/${currentYear}` === lock_next_date ? `<li class="day disabled"" >${i}</li>` : rendred_date;
            }
        }



        daysWrapper.innerHTML = days_li_tag;

        const dayscoll = document.getElementsByClassName('day');

        for (let i = 0; i < dayscoll.length; i++) {
            dayscoll[i].addEventListener('click', handle_date_select);
        }
    }

    const renderCalender = () => {
        const currentDate = document.getElementById("current_date");

        date = new Date();
        currentYear = date.getFullYear();
        fixed_current_year = date.getFullYear();
        currentMonth = date.getMonth();
        fixed_current_month = date.getMonth();
        currentDate_month = date.getDate();
        today = new Date(currentYear, currentMonth, currentDate_month);
        lastDayOnMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        currentDate.innerText = `${months[currentMonth]}, ${currentYear}`;




        reHydrateCalender();
    }




    const handleCalender_change = (e) => {



        currentMonth = e.target.dataset.btn === "prev" ? (currentMonth - 1) : (currentMonth + 1);
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear = currentYear - 1;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear = currentYear + 1;
        }

        reHydrateCalender();
    }


    const lock_date_by_time = () => {
        let time = new Date();
        const lock_time = '17:00:00';
        const current_time = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

        const [hours1, minutes1, seconds1] = lock_time.split(':');

        const [hours2, minutes2, seconds2] = current_time.split(':');

        const lock_timer = new Date(time.getFullYear(), time.getMonth(), time.getDate(), +hours1, +minutes1, +seconds1);
        const current_timer = new Date(time.getFullYear(), time.getMonth(), time.getDate(), +hours2, +minutes2, +seconds2);

        if (current_timer >= lock_timer) {
            lock_next_date = `${time.getDate() + 1}/${time.getMonth()}/${time.getFullYear()}`;
        }
    }


    useEffect(() => {
        lock_date_by_time();
        renderCalender();

    }, [])


    return (
        <div className="calender__wrapper">
            <header>
                <p className="current_date" id='current_date'>

                </p>
                <div className="calander__controlls">
                    <div data-btn="prev" onClick={handleCalender_change} id="prev_month" className='cntrls'>

                        <LeftArrow data-btn="prev" className='svg' />
                    </div>
                    <div data-btn="next" onClick={handleCalender_change} id="next_month" className='cntrls'>

                        <RightArrow data-btn="next" className='svg' />
                    </div>

                </div>
            </header>

            <ul className="weeks">
                <li className="weak">{date}</li>
                <li className="weak">Mon</li>
                <li className="weak">Tue</li>
                <li className="weak">Wed</li>
                <li className="weak">Thu</li>
                <li className="weak">Fri</li>
                <li className="weak">Sat</li>
            </ul>

            <ul className="days" id='days__wrapper'>

            </ul>
        </div>
    )
}

export default Calender