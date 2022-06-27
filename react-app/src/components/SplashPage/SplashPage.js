import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./SplashPage.css";
import travel from "./travel.jpg";
import intro1 from "./intro1.jpg";
import intro2 from "./intro2.png";
import intro3 from "./intro3.png";
import intro4 from "./intro4.jpg";

function SplashPage() {
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <>
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <a>
        <img src={travel} alt="Travel" className="travel" />
      </a>
      <div id='intro-text'>
        The best site to plan your next trip!
      </div>
      <div className="gallery">
        <div className="gallery_info">
          <div>
            <figure>
              <img src={intro1} className="gallery_img" alt=""></img>
            </figure>
          </div>
          <div className="gallery_name">
            Add places you wanna go with 1 click
          </div>
          <div className="gallery_description">
            Ready for a vacation? Travel Bucket is here
          </div>
          <div className="gallery_description">
            to help you sort out trips and events.
          </div>
        </div>

        <div className="gallery_info">
          <div>
            <figure>
              <img src={intro2} className="gallery_img" alt=""></img>
            </figure>
          </div>
          <div className="gallery_name">Optimize your trip with events</div>
          <div className="gallery_description">
            Don't know what to do? We’ll plan out your events
          </div>
          <div className="gallery_description">
            with a daily schedule to make the most of your day.
          </div>
        </div>

        <div className="gallery_info">
          <div>
            <figure>
              <img src={intro3} className="gallery_img" alt=""></img>
            </figure>
          </div>
          <div className="gallery_name">Take personalized notes</div>
          <div className="gallery_description">
            With smart notes based on your itinerary,
          </div>
          <div className="gallery_description">
            never forget anything again!
          </div>
        </div>

        <div className="gallery_info">
          <div>
            <figure>
              <img src={intro4} className="gallery_img" alt=""></img>
            </figure>
          </div>
          <div className="gallery_name">
            Collaborate with friends in real time
          </div>
          <div className="gallery_description">
            Plan along with your friends with trip invites.
          </div>
          <div className="gallery_description">
            Never worry again about trip sharing hassles!
          </div>
        </div>
      </div>
    </>
  );
}

export default SplashPage;
