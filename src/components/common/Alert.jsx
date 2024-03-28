import React from "react";

export default function Alert({ alertType, alertText }) {

    let alertClasses = "text-center mt-4 alert ";

    if (alertType === 'success') {
        alertClasses += "alert-success";
    }
    else if (alertType === 'info') {
        alertClasses += "alert-info";
    }
    else if (alertType === 'danger' || alertType === 'error') {
        alertClasses += "alert-danger";
    }
    else {
        console.log('Alert type does not exist');
    }

    return (
        <div className={alertClasses} role="alert">
            {alertText}
        </div>
    );
}
