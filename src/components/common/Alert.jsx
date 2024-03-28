import React from "react";

export function Alert({ alertType, alertText }) {

    let alertClasses = "alert ";

    if (alertType === 'success') {
        alertClasses += "alert-success";
    }
    else if (alertType === 'info') {
        alertClasses += "alert-info";
    }
    else if (alertType === 'danger') {
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
