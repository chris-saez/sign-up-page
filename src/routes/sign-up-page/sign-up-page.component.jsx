import { useState} from 'react';

import heroImage01 from '../../assets/hero-image.png';
import './sign-up-page.styles.css';

import { signUpUserWithEmailAndPassword,
         signInWithGooglePopup,
         createUserDocumentFromAuth,
          } from '../../utils/firebase/firebase.utils';

const defaultForm = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpPage = () => {
    const [formField, setFormField] = useState(defaultForm);
    const { displayName, email, password, confirmPassword } = formField;

    const userInput = (event) => { // User inputs into the form field are stored into an object
        const { name, value } = event.target;
        setFormField({...formField, [name]: value});
    }

    const submitSignUpForm = async (event) => {
        event.preventDefault();
        try {
            const response = await signUpUserWithEmailAndPassword(formField);
            await createUserDocumentFromAuth(response);
            resetFormFields(); 
        } catch(error) {
            console.log(error);
            alert('Error creating new user. Try again');
        }
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
                <h2>Sign Up</h2>
                <p>Browse through thousands of collections on multiple chains</p>

                <form>
                    <input required type='text' placeholder='Username' name='displayName' onChange={ userInput } value={ displayName }></input>
                    <input required type='email' placeholder='Email' name='email' onChange={ userInput } value={ email }></input>
                    <input required type='password' placeholder='Password' name='password' onChange={ userInput } value={ password }></input>
                    <input required type='password' placeholder='Confirm Password' name='confirmPassword' onChange={ userInput } value={ confirmPassword }></input>
                    <button type='submit' onClick={ submitSignUpForm }>Sign Up</button>
                </form>

                <p>or</p>

                <button onClick={ signUpWithGoogle }>Sign up with Google</button>
                <button>Sign up with Metamask</button>
                <p>Already signed up? Sign in here</p>
            </div>

            <img src={heroImage01}/>
        </div>
    )
};

export default SignUpPage;