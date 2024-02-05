//libs
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
//styles
import styles from './styles.module.scss'
//types
import {RegistrationFormInputs} from "../../types";
//images
import img from './images/signup-image.png'
import phone from './images/phone.svg'
import person from './images/person.svg'
import spinner from './images/spinner.svg'

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting, isSubmitSuccessful}
    } = useForm<RegistrationFormInputs>();
    const [agreement, setAgreement] = useState(false);

    useEffect(() => {
        console.log(errors)
    }, [errors]);
    const onSubmit = async (data: RegistrationFormInputs) => {
        const response =  await fetch('http://localhost:9000/api/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            reset();
        }
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.left}>
                <div className={styles.field_wrapper}>
                    <div className={styles.field}>
                        <label htmlFor="firstName" className={styles.icon}>
                            <img src={person} alt="person icon"/>
                        </label>
                        <input type="text" className={`${errors.firstName && styles.error} ${styles.input}`}
                               id="firstName" placeholder="First Name"
                               {...register('firstName',
                                   {
                                       required: {value: true, message: 'Field is required'},
                                       minLength: {value: 1, message: 'Field should not be blank'},
                                       validate: (value) => !!value.trim() || 'Field should not be blank'
                                   })}
                        />
                    </div>
                    <p className={styles.field_error}>{errors.firstName?.message}</p>
                </div>

                <div className={styles.field_wrapper}>
                    <div className={styles.field}>
                        <label htmlFor="lastName" className={styles.icon}>
                            <img src={person} alt="person icon"/>
                        </label>
                        <input type="text" className={`${errors.lastName && styles.error} ${styles.input}`}
                               id="lastName" placeholder="Last Name"
                               {...register('lastName',
                                   {
                                       required: {value: true, message: 'Field is required'},
                                       minLength: {value: 1, message: 'Field should not be blank'},
                                       validate: (value) => !!value.trim() || 'Field should not be blank'
                                   })}
                        />
                    </div>
                    <p className={styles.field_error}>{errors.lastName?.message}</p>
                </div>

                <div className={styles.field_wrapper}>
                    <div className={styles.field}>
                        <label htmlFor="phone" className={styles.icon}>
                            <img src={phone} alt="phone icon"/>
                        </label>
                        <input type="number" className={`${errors.phone && styles.error} ${styles.input}`}
                               id="phone" placeholder="Phone Number"
                               {...register('phone',
                                   {required: {value: true, message: 'Field is required'}})}
                        />
                    </div>
                    <p className={styles.field_error}>{errors.phone?.message}</p>
                </div>

                <div className={styles.field_wrapper}>
                    <div className={styles.field}>
                        <div className={styles.select_box}>
                            <select className={`${errors.gender && styles.error} ${styles.select}`}
                                    {...register('gender',
                                        {required: {value: true, message: 'Field is required'}})}
                            >
                                <option value="">Select gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>
                    </div>
                    <p className={styles.field_error}>{errors.gender?.message}</p>
                </div>

                <div className={styles.field}>
                    <div className={styles.checkbox_container}>
                        <div className={styles.checkbox_wrapper}>
                            <input onChange={() => setAgreement(prev => !prev)} type="checkbox" id="check-1"/>
                            <label htmlFor="check-1">
                                <svg viewBox="0,0,50,50">
                                    <path d="M5 30 L 20 45 L 45 5"></path>
                                </svg>
                            </label>
                        </div>
                        <label htmlFor="check-1" className={styles.agreement_text}>
                            I agree to <span>Terms</span> and <span>Privacy Policy</span>
                        </label>
                    </div>
                </div>
                {!isSubmitSuccessful && !isSubmitting &&
                    <button type={"submit"} disabled={!agreement} className={styles.submit}>
                        Register
                    </button>}
                {isSubmitting && <img src={spinner} alt="spinner" className={styles.spinner}/>}
                {isSubmitSuccessful && <p className={styles.success}>Registered !</p>}
            </div>
            <div className={styles.right}>
                <img src={img} alt="signup-image" className={styles.img}/>
            </div>
        </form>
    );
};

export default LoginForm;
