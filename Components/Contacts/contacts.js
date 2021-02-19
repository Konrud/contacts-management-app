import { useCallback, useState } from "react";
import Form from "../Form/form";
import ContactsList from "../ContactsList/contactsList";


function Contacts() {
    const [contacts, setContacts] = useState([]);

    const handleSubmitData = useCallback((formData) => {
        setContacts((prevState) => {
            return prevState.concat(formData);
        });
    }, []);

    return (
        <section className="c-contacts">
            <Form handleSubmitData={handleSubmitData}></Form>
            <article className="c-contacts__list-wrapper">
                <ContactsList fallbackMarkup="No Contacts Added Yet!" contacts={contacts} />
            </article>
        </section>
    );
}


export default Contacts;