import "./style.css";


const Cats = () => {
    return (
        <div className='category__outer'>
            <h2 className="heading">Book Classified Text/Display Ads</h2>
            <div className="cards">
                <div className="card">
                    <div className="img TextAd">
                       
                    </div>
                    <h2>Classified Text Ads</h2>
                    <p>Text based Classified Ads are best to Advertise information in  with minimal charges yet impactful.</p>
                    <button className="bookyourad">
                        Bokk yours Now
                    </button>
                </div>
                <div className="card">
                    <div className="img TextDisplayAd">

                    </div>
                    <h2>Classified Display Ads</h2>
                    <p>Text based Classified Ads are best to Advertise information in  with minimal charges yet impactful.</p>
                    <button className="bookyourad">
                        Bokk yours Now
                    </button>
                </div>
                <div className="card">
                    <div className="img DisplayAd">

                    </div>
                    <h2>Display Ads</h2>
                    <p>Text based Classified Ads are best to Advertise information in  with minimal charges yet impactful.</p>
                    <button className="bookyourad">
                        Bokk yours Now
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Cats;

