import Corousal from "./corousal/Corousal";
import React from "react";
import Buttons from "../LeftandRightButtons/buttons";
import "./GoodMorning.css";
import underwaterImg from "../../assets/neom-underwater.jpg";
import Suggestion from "./Suggestion/Suggestion";
import food from "../../assets/food.jpg";
import city from "../../assets/city.jpg";
import Recommadation from "./recommadation/recommadation";
import Visited from "./visited/visited";

export default function GoodMorning() {
  return (
    <>
      <div className="gmContainer">
        {/* <p className="gmContainer_title">Good Morning Charlie!</p>
        <p>
          {" "}
          Below listed are your itineraries, have a look to the timing and the
          location <br />
          We wish you to enjoy the activities and the weather
        </p>

        <div className="CorousalSlider">
          <Corousal
            title="Round of Golf"
            description="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            dateandTime="Nov 10, 9:40 AM - Nov 22, 10:00 AM"
            locationName="Chapra bihar"
            categoryName="Golf"
            ImgUrl={underwaterImg}
            stars="5.0"
            reviews="23"
            Scheduled
          />
          <Corousal
            title="Round of Golf"
            description="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            dateandTime="Nov 10, 9:40 AM - Nov 22, 10:00 AM"
            locationName="Chapra bihar"
            categoryName="Golf"
            ImgUrl={underwaterImg}
            stars="5.0"
            reviews="23"
            Scheduled
          />
          <Corousal
            title="Round of Golf"
            description="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            dateandTime="Nov 10, 9:40 AM - Nov 22, 10:00 AM"
            locationName="Chapra bihar"
            categoryName="Golf"
            ImgUrl={underwaterImg}
            stars="5.0"
            reviews="23"
            Scheduled
          />
          <Corousal
            title="Round of Golf"
            description="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            dateandTime="Nov 10, 9:40 AM - Nov 22, 10:00 AM"
            locationName="Chapra bihar"
            categoryName="Golf"
            ImgUrl={underwaterImg}
            stars="5.0"
            reviews="23"
            Scheduled
          />
        </div>
        <Buttons />

        <div className="SuggestionSection">
          <div className="suggestionSection_title">
            <p>Charlie Hope, We Understand you better</p>
          </div>

          <div className="SuggestionSectionSlider">
            <Suggestion
              imgUrl={food}
              title="Shudh bihari Resturant"
              description="just adfja dfafkjsalsdfasf asdfasfsdafsa afsafsafs afsafd afasa s sa fasfasdfa fdfk ajdfjasdfkasjf salkf jdsafklasjfasfjskfjasldkfjaslkdfjaslfkjasflkasjfslfj"
              dateandTime="Nov 10, 9:40 AM"
              food
            />
            <Suggestion
              imgUrl={city}
              title="Dubai city"
              description="just adfja dfafkjsalsdfasf asdfasfsdafsa afsafsafs afsafd afasa s sa fasfasdfa fdfk ajdfjasdfkasjf salkf jdsafklasjfasfjskfjasldkfjaslkdfjaslfkjasflkasjfslfj"
              dateandTime="Nov 14, 19:40 AM"
            />
            <Suggestion
              imgUrl={food}
              title="Shudh bihari Resturant"
              description="just adfja dfafkjsalsdfasf asdfasfsdafsa afsafsafs afsafd afasa s sa fasfasdfa fdfk ajdfjasdfkasjf salkf jdsafklasjfasfjskfjasldkfjaslkdfjaslfkjasflkasjfslfj"
              dateandTime="Nov 10, 9:40 AM"
            />
          </div>
        </div>
        <Buttons /> */}

        {/* <div className="recommandationContainer">
          <Recommadation/>  
        </div>      
           */}

        {/* <div className="visitedContainer">
          <p className="visitedContainer_title">
            Vaibhav, here is your journey with us so far
          </p>
          <div className="visitedContainer_slider">
            {Array.from({ length: 4 }, (_, index) => (
              <Visited
                imgUrl={[city, underwaterImg, food, city][index]}
                title={["Round of Golf", "UnderwaterCity", "meonly", "QSS Technosoft"].filter((_, i) => i === index)}
                attented={index + 1}
                dateandTime={new Date().toDateString()}
                rating={index + 1}
              />
            ))}
          </div>

          <Buttons />
        </div> */}


        

      </div>
    </>
  );
}
