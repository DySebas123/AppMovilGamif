const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

        const response = await fetch(url, {
            headers: {
                "User-Agent": "HabitQuest-App/1.0",
            },
        });

        const data = await response.json();
        const address = data.address || {};

        return {
            displayName: data.display_name || "",
            street: address.road || address.pedestrian || "",
            number: address.house_number || "",
            district:
                address.suburb ||
                address.neighbourhood ||
                address.city_district ||
                "",
            city:
                address.city ||
                address.town ||
                address.village ||
                "",
            region: address.state || "",
            country: address.country || "",
            postalCode: address.postcode || "",
        };

    } catch (error) {
        return {
            displayName: "",
            street: "",
            number: "",
            district: "",
            city: "",
            region: "",
            country: "",
            postalCode: "",
        };
    }
};

module.exports = {
    getAddressFromCoordinates,
};