import { useCallback, useEffect, useMemo, useRef } from "react";
import { getLongLatFromAddress, createMap, createMarker } from "../../utilities/utilities"

function ContactsList(props) {
    const { contacts = [], fallbackMarkup = "" } = props;
    const lastItemRef = useRef(null);

    const handleAddressClick = useCallback(async (itemId, linkElem) => {
        const mapContainerID = `${itemId}_MAP`;
        const mapElement = document.querySelector(`#${mapContainerID}`);

        linkElem.removeAttribute("href");
        history.replaceState(null, null, "/");
        linkElem.classList.add("c-link-disabled");

        const token = process.env.locationIqToken || "pk.fb844021610d697e23a224e0bee226ce";

        const map = createMap({ mapContainerID, token })

        const result = await getLongLatFromAddress(linkElem.textContent);

        if (result.hasError) {
            mapElement.innerHTML = "<p>Unable to find provided location<p>";
            mapElement.classList.add("has-error");
            return;
        }

        const long = result.location.lon;
        const lat = result.location.lat;

        createMarker({ long, lat, map });

        mapElement.classList.add("is-active");

    }, []);

    useEffect(() => {
        if (lastItemRef && lastItemRef.current) {
            lastItemRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [contacts]);

    const listItems = useMemo(() => {
        return contacts.map((contact, i) => {
            const itemID = `${contact.name.replace(/\s*/g, "")}_${i}`;
            const isLastItem = i === (contacts.length - 1);
            return (
                <>
                    <li className="c-contacts-list__item" key={itemID} id={itemID} ref={isLastItem ? lastItemRef : undefined}>
                        <div className="c-contacts-list__user-info">
                            <figure className="c-contacts-list__image-wrapper">{contact.image && <img src={contact.image} alt="contact photo" width="100" height="100" className="c-contacts-list__image" />}</figure>
                            <p className="c-contacts-list__username">{contact.name}</p>
                        </div>
                        <address className="c-contacts-list__address">
                            <dl className="c-address-list">
                                <div className="c-address-list__field">
                                    <dt className="c-address-list__title">Address:</dt>
                                    <dd className="c-address-list__data"><a href="#x" onClick={(e) => { handleAddressClick(itemID, e.currentTarget) }}>{contact.address}</a></dd>
                                </div>
                                <div className="c-address-list__field">
                                    <dt className="c-address-list__title">Phone:</dt>
                                    <dd className="c-address-list__data">{contact.phone}</dd>
                                </div>
                            </dl>
                        </address>
                        <div id={itemID + "_MAP"} className="c-mapbox-map"></div>
                    </li>
                </>
            );
        });
    }, [contacts]);

    return (
        <ul className="c-contacts-list">
            {listItems || fallbackMarkup}
        </ul>
    );
}


export default ContactsList;