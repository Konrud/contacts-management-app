

async function getLongLatFromAddress(address, token) {
    token = token || process.env.locationIqToken || "pk.fb844021610d697e23a224e0bee226ce";
    const url = `https://eu1.locationiq.com/v1/search.php?key=${token}&q=${address}&format=json`;

    try {
        const response = await fetch(url);
        const locationData = await response.json();

        if (locationData && locationData[0] && locationData[0].lat) {
            return { location: locationData[0] };
        }

        return { hasError: true, location: locationData };

    } catch (e) {
        return { hasError: true, error: e };
    }

}


function createMap(props) {
    const map = new mapboxgl.Map({
        container: props.mapContainerID,
        attributionControl: false,
        style: 'https://tiles.locationiq.com/v2/streets/vector.json?key=' + props.token,
        zoom: 10,
        center: [32.0853, 34.7818]
    });

    return map;
}

function createMarker(props) {
    const long = props.long;
    const lat = props.lat;
    const map = props.map;
    //Here's an example where we use external CSS to specify background image, size, etc
    //https://www.mapbox.com/mapbox-gl-js/api#marker
    // first create DOM element for the marker
    var el = document.createElement('div');
    el.classList.add("o-marker");
    // create the marker
    var markerWithExternalCss = new mapboxgl.Marker(el)
        .setLngLat([long, lat])
        .addTo(map);

    map.flyTo({
        center: [long, lat],
        zoom: 14,
        essential: true
    });

    return el;
}

function isEmptyObject(obj, checkPrototype) {
    for (let prop in obj) {
        return false;
    }
    return true;
}

export { getLongLatFromAddress, createMap, createMarker, isEmptyObject };