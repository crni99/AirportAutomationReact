export const validateField = (type, field, value) => {
    switch (type) {
        case 'Airline':
            if (field === 'name') {
                if (!value.trim()) {
                    return "Airline name is required.";
                }
                if (value.length > 255) {
                    return "Airline name cannot exceed 255 characters.";
                }
            }
            break;
        case 'Destination':
            if (field === 'city') {
                if (!value.trim()) {
                    return "Destination city is required.";
                }
                if (value.length > 255) {
                    return "Destination city cannot exceed 255 characters.";
                }
            }
            if (field === 'airport') {
                if (!value.trim()) {
                    return "Destination airport is required.";
                }
                if (value.length > 255) {
                    return "Destination airport cannot exceed 255 characters.";
                }
            }
            break;
        case 'Passenger':
            if (field === 'firstName') {
                if (!value.trim()) {
                    return "Passenger first name is required.";
                }
                if (value.length > 50) {
                    return "Passenger first name cannot exceed 50 characters.";
                }
            }
            if (field === 'lastName') {
                if (!value.trim()) {
                    return "Passenger last name is required.";
                }
                if (value.length > 50) {
                    return "Passenger last name cannot exceed 50 characters.";
                }
            }
            if (field === 'uprn') {
                if (!value.trim()) {
                    return "Passenger UPRN is required.";
                }
                if (value.length !== 13) {
                    return "Passenger UPRN must be exactly 13 characters.";
                }
            }
            if (field === 'passport') {
                if (!value.trim()) {
                    return "Passenger passport is required.";
                }
                if (value.length !== 9) {
                    return "Passenger passport must be exactly 9 characters.";
                }
            }
            if (field === 'address') {
                if (!value.trim()) {
                    return "Passenger address is required.";
                }
                if (value.length > 200) {
                    return "Passenger address cannot exceed 200 characters.";
                }
            }
            if (field === 'phone') {
                if (!value.trim()) {
                    return "Passenger phone is required.";
                }
                if (value.length > 30) {
                    return "Passenger phone cannot exceed 30 characters.";
                }
            }
            break;
        case 'Pilot':
            if (field === 'firstName') {
                if (!value.trim()) {
                    return "Pilot first name is required.";
                }
                if (value.length > 50) {
                    return "Pilot first name cannot exceed 50 characters.";
                }
            }
            if (field === 'lastName') {
                if (!value.trim()) {
                    return "Pilot last name is required.";
                }
                if (value.length > 50) {
                    return "Pilot last name cannot exceed 50 characters.";
                }
            }
            if (field === 'uprn') {
                if (!value.trim()) {
                    return "Pilot UPRN is required.";
                }
                if (value.length !== 13) {
                    return "Pilot UPRN must be exactly 13 characters.";
                }
            }
            if (field === 'flyingHours') {
                if (!value.trim() || isNaN(value)) {
                    return "Pilot flying hours is required and must be a number.";
                }
                const flyingHours = parseInt(value, 10);
                if (flyingHours > 40000) {
                    return "Pilot flying hours cannot exceed 40000";
                }
                if (flyingHours < 0) {
                    return "Pilot flying hours cannot be lower than 0.";
                }
            }
            break;
        case 'ApiUser':
            if (field === 'username') {
                if (!value.trim()) {
                    return "ApiUser username is required.";
                }
                if (value.length > 255) {
                    return "ApiUser username cannot exceed 50 characters.";
                }
            }
            if (field === 'password') {
                if (!value.trim()) {
                    return "ApiUser password is required.";
                }
                if (value.length > 255) {
                    return "ApiUser password cannot exceed 50 characters.";
                }
            }
            break;
        default:
            return null;
    }
    return null;
}