import { useEffect, useState } from "react";
import axios from "axios";

export const useGetDataObject = (endpoint) => {
    const [info, setInfo] = useState({});

    useEffect(() => {
        axios
            .get(endpoint)
            .then(({ data }) => {
            setInfo(data);
        })
            .catch((error) => {
            console.error(error);
        });
    }, []);

    return {
    info,
    };
};
