
export const fetchData = async (url) => {

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const postData = async (url, data) => {

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Failed to post data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};


export const updateData = async (url, data) => {

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Failed to post data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};