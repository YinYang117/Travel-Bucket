import { useSelector } from 'react-redux';
import "./SplashPage.css"
import travel from "./travel.jpg";
import intro1 from "./intro1.jpg";
import intro2 from "./intro2.png";
import intro3 from "./intro3.png";
import intro4 from "./intro4.jpg";




function SplashPage() {

    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            {/* {!sessionUser &&
        <h1>Splash Page </h1>
        } */}

            {/* <a>
                <img src="https://s8.gifyu.com/images/ezgif.com-gif-maker-219a8009ec36a1e87.gif" alt="ezgif.com-gif-maker-219a8009ec36a1e87.gif" className="waterfall" border="0" />
            </a> */}

            <a>
                <img src={travel} alt="Travel" className="travel" />
            </a>

            <div className="gallery">
                <div className="gallery_info">
                        <div>
                            <figure><img src={intro1} className="gallery_img" alt=""></img></figure>
                        </div>
                        <div className="gallery_name">Add places you wanna go with 1 click</div>
                    <div className="gallery_description">Ready for a vaca? Travel Bucket is here to help you sort out trips and events!</div>
                </div>



                <div className="gallery_info">
                        <div>
                            <figure><img src={intro2} className="gallery_img" alt=""></img></figure>
                        </div>
                        <div className="gallery_name">Optimize your trip with events</div>
                    <div className="gallery_description">Don't know what to do? We’ll plan the best route to visit your must-dos to make the most of your day.</div>
                </div>



                <div className="gallery_info">
                        <div>
                            <figure><img src={intro3} className="gallery_img" alt=""></img></figure>
                        </div>
                        <div className="gallery_name">Take personalized notes</div>
                    <div className="gallery_description">With smart notes based on your itinerary, never forget anything.</div>
                </div>



                <div className="gallery_info">
                        <div>
                            <figure><img src={intro4} className="gallery_img" alt=""></img></figure>
                        </div>
                        <div className="gallery_name">Collaborate with friends in real time</div>
                    <div className="gallery_description">Plan along with your friends with live syncing.</div>
                </div>
            </div>

        </>


    )

}

export default SplashPage
