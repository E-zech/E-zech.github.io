import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { GeneralContext } from '../App';
import './LandingPage.css';

export default function LPNavbar({ card}) {
  const navigate = useNavigate();
  const {user} = useContext(GeneralContext);
return (
<>
<section className="LP-container-navbar" id="up">
  <nav className="LP-navbar">

    <div className="LP-navbar-BtnImg-wrapper">
      {user && (
        <img
          className="LP-navbarImg"
          src={user.imgUrl || "https://media.istockphoto.com/id/1016744034/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=Rqti26VQj_fs-_hL15mJj6b84FEZNa00FJgZRaG5PD4="}
          alt="a photo of the user"/>)}

      <button className="LP-navbarBtn" onClick={()=>navigate('/')}>Back To App</button>
    </div>  

    <span className="LP-navbarOwner">Owned By {card.userName}</span>

  </nav>
</section>
</>
)
}


