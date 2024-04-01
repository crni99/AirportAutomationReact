import React from 'react';

export default function LoadingSpinner({ loadingText = 'Loading...' }) {
    return (
        <div class="text-center mt-4 mb-4">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">{loadingText}</span>
            </div>
        </div>
    );
}
