import { useState} from 'react';
import { Route, Routes, Link} from'react-router-dom';

import heroImage01 from '../../assets/hero-image.png';
import './sign-up-page.styles.css';

import { signUpUserWithEmailAndPassword,
         signInWithGooglePopup,
         createUserDocumentFromAuth,
          } from '../../utils/firebase/firebase.utils';

import FormInput from '../../components/form-inputs/form-inputs.component';
import Button from '../../components/button/button.component';

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
        console.log(value);
    }

    const submitSignUpForm = async (event) => {
        event.preventDefault();

        if(password != confirmPassword) {
            alert('Passwords do not match! Enter your password again');
            return;
        }

        try {
            const response = await signUpUserWithEmailAndPassword(formField);
            await createUserDocumentFromAuth(response);
            resetFormFields(); 
        } catch(error) {
            console.log(error);
            if(error.code == 'auth/email-already-in-use'){
                alert('Email is already in use. Try logging in instead');
            }
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

                <form onSubmit={submitSignUpForm}>
                    <FormInput inputOptions={{
                        required:true, 
                        type:'text', 
                        placeholder:'Username', 
                        name:'displayName', 
                        onChange:userInput,
                        value:displayName,
                    }}
                    />

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

                    <FormInput inputOptions={{
                        required:true, 
                        type:'password', 
                        placeholder:'Confirm Password', 
                        name:'confirmPassword', 
                        onChange:userInput,
                        value:confirmPassword,
                    }}
                    />

                    <Button buttonStyle={'gradient'}>Sign up</Button>
                </form>

                <p>or</p>

                <Button buttonStyle={'google'} onClick={signUpWithGoogle}>Sign up with Google</Button>
                <Button buttonStyle={'metamask'}>Sign up with Metamask</Button>

                <p>Already signed up? {<Link className='gradient-letters' to={'/sign-in'}> Sign in here </Link>}</p>
            </div>

            <img src={heroImage01}/>
        </div>
    )
};

export default SignUpPage;