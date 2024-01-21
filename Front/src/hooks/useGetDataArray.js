import { useEffect, useState } from "react";
import axios from "axios";

export const useGetDataArray = (endpoint) => {
    const [values, setValues] = useState([]);

    useEffect(() => {
        axios
            .get(endpoint)
            .then(({ data }) => {
            setValues(data);
        })
            .catch((error) => {
            console.error(error);
        });
    }, []);

    return {
    values,
    };
};