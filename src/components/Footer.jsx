import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { BsTelephone } from "react-icons/bs";
import "../style/footer.css";

const Footer = () => {
  return (
    <div
      className="footer bg-dark text-white text-center py-5"
      style={{
        background:
          'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), center url("https://i.imgur.com/gQz4ijq.png")',
        backgroundSize: "cover",
      }}
    >
      <p className="contact-links">
        <a href="tel:+972526573553" target="_blank">
          <BsTelephone />
        </a>
        <a href="mailto:websruly@gmail.com" target="_blank">
          <SiGmail />
        </a>
        <a
          href="https://wa.me/+97252657355
        3"
          target="_blank"
        >
          <FaWhatsapp />
        </a>
        <a href="https://www.linkedin.com/in/sruly-chaimowitz/" target="_blank">
          <AiFillLinkedin />
        </a>
        <a href="https://github.com/srulychaimo" target="_blank">
          <AiFillGithub />
        </a>
      </p>
      <span>&copy; Made with &#10084; by Sruly Chaimowitz</span>
    </div>
  );
};

export default Footer;
