import { useState} from 'react';

import heroImage01 from '../../assets/hero-image.png';
import './sign-up-page.styles.css';

import { signUpUserWithEmailAndPassword,
         signInWithGooglePopup,
         createUserDocumentFromAuth,
          } from '../../utils/firebase/firebase.utils';

import FormInput from '../../components/form-inputs/form-inputs.component';

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

                <form>
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