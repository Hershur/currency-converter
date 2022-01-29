export const fetchHelper = async (url, method)=> {
    try {
        const resp = await fetch(url, {method: method});

        return resp.json();
    } catch (error) {
        throw new Error({message: "An error occurred", details: error.message});
    }
}