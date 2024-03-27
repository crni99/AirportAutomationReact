export async function createData(data, dataType, navigate) {
    try {
        const response = await fetch(`https://localhost:44362/api/${dataType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to create data');
        }

        const responseData = await response.json();
        navigate(`/Airline/${responseData.id}`);
    } catch (error) {
        console.error('Error creating data:', error);
        return error.message;
    }
}
