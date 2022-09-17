import './form-inputs.styles.css';

const FormInput = ( {inputOptions} ) => {
    return (
        <div className='form-input-container'>
            <input className='form-input'{...inputOptions}/>
        </div>
    )
}

export default FormInput;