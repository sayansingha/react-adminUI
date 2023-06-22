import { useState, useEffect } from "react";

const useMembers = () => {
    const [usersData, setUsersData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try{
                const response = await fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`, {method: 'GET'});
                const responseData = await response.json();
                setUsersData(responseData);
                setLoading(false);
                console.log(responseData)
            } catch(error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    return { usersData, error, loading };
}

export default useMembers;