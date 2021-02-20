import { useCallback, useEffect, useRef, useState } from "react";
import { isEmptyObject } from "../../utilities/utilities";

const initialDataObj = { name: "", phone: "", image: "", imageFile: {}, address: "" };


function Form(props) {
    const { handleSubmitData } = props;
    const [formInputs, setFormInputs] = useState(initialDataObj);
    const fakeFileInput = useRef();
    const isIE11 = useRef(false);
    debugger;

    useEffect(() => {
        if (isIE11) {
            isIE11.current = document.isIE11;
        }

        debugger;
    }, []);

    const handleInputChange = useCallback((e) => {
        setFormInputs((prevState) => {
            const { name, value, files } = e.target;

            const newState = { [name]: value };

            if (files && files[0]) {
                newState["imageFile"] = files[0];
                if (fakeFileInput.current) {
                    fakeFileInput.current.textContent = files[0].name || fakeFileInput.current.getAttribute("data-empty-text");
                }
            }

            return { ...prevState, ...newState };
        })
    }, []);

    const submitForm = useCallback((e) => {

        e.preventDefault();

        if (!formInputs.name || !formInputs.address) return;

        const dataToSend = { ...formInputs };

        if (isEmptyObject(dataToSend.imageFile)) {
            dataToSend.image = "https://www.fakenamegenerator.com/images/sil-male.png";
        } else {
            dataToSend.image = URL.createObjectURL(dataToSend.imageFile);
        }

        handleSubmitData(dataToSend);

        fakeFileInput.current.textContent = fakeFileInput.current.getAttribute("data-empty-text");

        setFormInputs(initialDataObj);

    }, [handleSubmitData, formInputs]);

    debugger;
    return (
        <form onSubmitCapture={submitForm} className="c-form">
            <fieldset className="c-form__field">
                <label className="c-form__label" aria-describedby="nameInfoLabel">
                    <span className="c-form__label-text">Name</span>
                    <small className="c-form__label-info" id="nameInfoLabel">(Provide your fullname)</small>
                    <input type="text" name="name" className="c-form__input" autoComplete="name" value={formInputs.name} onChange={handleInputChange} required minLength="2" pattern="^(?!\s+)[\w\s]+" placeholder="john doe" />
                    <p className="c-form__error">Can not be empty. Must include at least 2 characters</p>
                </label>
            </fieldset>
            <fieldset className="c-form__field">
                <label className="c-form__label" aria-describedby="phoneInfoLabel">
                    <span className="c-form__label-text">Phone</span>
                    <small className="c-form__label-info" id="phoneInfoLabel">(Provide your phone number)</small>
                    <input type="text" name="phone" autoComplete="tel" inputMode="tel" className="c-form__input" value={formInputs.phone} onChange={handleInputChange} pattern="\(?\+?\d*\)?\d{6,}" required placeholder="+9729874598235" />
                    <p className="c-form__error">Allowed characters are: digits, parenthesis and + sign. Example: (+972)047854578</p>
                </label>
            </fieldset>
            <fieldset className="c-form__field">
                <label className="c-form__label c-form__label--input-file" aria-describedby="imageInfoLabel">
                    <span className="c-form__label-text">Image</span>
                    <small className="c-form__label-info" id="imageInfoLabel">(Provide your image)</small>
                    <input type="file" name="image" className="c-form__input c-form__input--file u-visually-hidden" accept="image/*" value={formInputs.image} onChange={handleInputChange} />
                    <span className="c-form__input c-form__input--fake c-form__input--file" ref={fakeFileInput} aria-hidden="true" data-empty-text="Click to upload image">Click to upload image</span>
                </label>
            </fieldset>
            <fieldset className="c-form__field">
                <label className="c-form__label" aria-describedby="addressInfoLabel">
                    <span className="c-form__label-text">Address</span>
                    <small className="c-form__label-info" id="addressInfoLabel">(Provide your address)</small>
                    <input type="text" name="address" autoComplete="on" className="c-form__input" value={formInputs.address} onChange={handleInputChange} required minLength="5" pattern={isIE11.current ? undefined : "^(?!\s+)[\w\s]+"} placeholder="Israel Tel-Aviv Pinsker 15" />
                    <p className="c-form__error">Can not be empty. Must include at least 5 characters. Permitted characters are letters and digits</p>
                </label>
            </fieldset>
            <fieldset className="c-form__field">
                <button type="submit" className="c-form__button c-form__button--submit">Add</button>
            </fieldset>
        </form>
    );
}

export default Form;