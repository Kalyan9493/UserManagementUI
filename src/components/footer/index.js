import React from 'react'
import './footer.css'
import LinkedInIcon from '../../assets/linkedin_icon.png'
import GithubIcon from '../../assets/github_icon.png'
import TwitterIcon from '../../assets/twitter.png'
import FacebookIcon from '../../assets/facebook.png'
import InstagramIcon from '../../assets/instagram.svg'
const Footer = () => {
  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/kalyankumarreddy-kavalakuntla-6554a3164/','_blank')
  }
  const handleGithubClick = () => {
    window.open('https://github.com/Kalyan9493', '_blank')
  }
  const handleFacebookIconClick = () => {
    window.open('https://www.facebook.com/kalyankumarreddy098/', '_blank')
  }
  const handleTwitterIconClick = () => {
    window.open('https://twitter.com/Kalyank51947212', '_blank')
  }
  const handleInstagramIconClick = () => {
    window.open('https://www.instagram.com/kalyankumar279/', '_blank')
  }
  return (
    <div className='footer'>
        <div className='linkedin'>
          <img src={LinkedInIcon} onClick={handleLinkedInClick} className='linkedin_icon'></img>
          <img src={GithubIcon} onClick={handleGithubClick} className='linkedin_icon'></img>
          <img src={TwitterIcon} onClick={handleTwitterIconClick} className='linkedin_icon'></img>
          <img src={FacebookIcon} onClick={handleFacebookIconClick} className='linkedin_icon'></img>
          <img src={InstagramIcon} onClick={handleInstagramIconClick} className='linkedin_icon'></img>
        </div>
    </div>
  )
}

export default Footer