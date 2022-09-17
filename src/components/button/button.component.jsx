import {ReactComponent as GoogleLogo} from '../../assets/google-logo.svg';
import {ReactComponent as MetamaskLogo} from '../../assets/metamask-logo.svg';

import './button.styles.css';

const buttonStyles = {
    google: 'google',
    metamask: 'metamask',
    gradient: 'gradient'
}

const Button = ({children, buttonStyle, onClick}) => {
    return(
        <div className='button-container'>        
            <button className= { `${buttonStyles[buttonStyle]} button-main` } onClick={onClick}>
                {
                    buttonStyle == 'google' ? (<GoogleLogo className='auth-provider-logo'/>) 
                    : buttonStyle == 'metamask' ? (<MetamaskLogo className='auth-provider-logo' />) 
                    : ''
                }
                {children}
            </button>
        </div>
    )
}

export default Button;