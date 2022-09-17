import { useState} from 'react';
import {Link} from'react-router-dom';

import heroImage02 from '../../assets/hero-image-02.jpeg';

import { signUpUserWithEmailAndPassword,
         signInWithGooglePopup,
         createUserDocumentFromAuth,
         signInAuthUserWithEmailAndPassword,
          } from '../../utils/firebase/firebase.utils';

import FormInput from '../../components/form-inputs/form-inputs.component';
import Button from '../../components/button/button.component';

const defaultForm = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignInPage = () => {
    const [formField, setFormField] = useState(defaultForm);
    const { displayName, email, password, confirmPassword } = formField;

    const userInput = (event) => { // User inputs into the form field are stored into an object
        const { name, value } = event.target;
        setFormField({...formField, [name]: value});
    }

    const submitSignInForm = async (event) => {
        event.preventDefault();
        const res = await signInAuthUserWithEmailAndPassword(formField);
        console.log(res);
    }

    const signUpWithGoogle = async (event) => {
        event.preventDefault();
        const response = await signInWithGooglePopup();
        createUserDocumentFromAuth(response);
    }

    const resetFormFields = () => {
        setFormField(defaultForm);
    }

    return(
        <div className='sign-up-page-container'>
            <div className='sign-up-form-container'>
                <h2 className='sign-header'>Sign In</h2>
                <p className='sign-description'>Welcome back! Explore the latest collections from your favorite artists</p>

                <form onSubmit={submitSignInForm}>
                        <FormInput inputOptions={{
                        required:true, 
                        type:'email', 
                        placeholder:'Email', 
                        name:'email', 
                        onChange:userInput,
                        value:email,
                    }}
                    />
                    <FormInput inputOptions={{
                        required:true, 
                        type:'password', 
                        placeholder:'Password', 
                        name:'password', 
                        onChange:userInput,
                        value:password,
                    }}
                    />

                    <Button buttonStyle={'gradient'} className='buttonComponent'>Sign In</Button>
                </form>
                
                <p className='or-break-line'>
                    <span>or</span>
                </p>

                <Button buttonStyle={'google'} onClick={signUpWithGoogle}>Login with Google</Button>
                <Button buttonStyle={'metamask'}>Login with Metamask</Button>

                <p className='already-auth-link'>Don’t have an account?  
                    {<Link className='gradient-letters' to={'/sign-up'}> 
                        Sign up here 
                    </Link>}
                </p>
            </div>
            
            <div className='hero-image-container'>
                <img className='hero-image'src={heroImage02}/>
            </div>
        </div>
    )
};

export default SignInPage;