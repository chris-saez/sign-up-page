import {ReactComponent as GoogleLogo} from '../../assets/google-logo.svg';
import {ReactComponent as MetamaskLogo} from '../../assets/metamask-logo.svg';

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
                    buttonStyle == 'google' ? (<GoogleLogo />) 
                    : buttonStyle == 'metamask' ? (<MetamaskLogo />) 
                    : ''
                }
                {children}
            </button>
        </div>
    )
}

export default Button;