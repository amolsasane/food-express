import User from "./UserClass";
import UserContext from "../utils/UserContext";

const About = () => {
  return (
    <div className="user-component-class">
      <h1>About Us</h1>
      <UserContext.Consumer>
        {({ loggedInUser }) => <h1 className="font-bold">{loggedInUser}</h1>}
      </UserContext.Consumer>
      <User name={"Default User"} location={"Pune"} />
    </div>
  );
};

export default About;
