import React from 'react';
import UpNavbar from '../components/UpNavbar';
import faqImage from '../images/faq.png'; // Adjust this path if incorrect

const Faq = () => {
  // Styles defined here for clarity
  const containerStyle = {
    position: 'relative',
    minHeight: '200vh',
  };

  const navbarStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    backgroundColor: 'white',
    zIndex: '1000',
  };

  const faqImageStyle = {
    position: 'absolute',
    top: '96px',
    left: '0',
    width: '1535px',
    height: '608px',
  };

  // Ensure the component renders correctly and the path is correct
  console.log("Image path:", faqImage);

  return (
    <div style={containerStyle}>
      <div style={navbarStyle}>
        <UpNavbar />
      </div>
      {/* Check if the image URL is correct by inspecting the element or checking the console */}
      <img src={faqImage} alt="FAQ" style={faqImageStyle} />
    </div>
  );
};

export default Faq;
