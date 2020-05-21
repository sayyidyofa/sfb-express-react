import { useErrorStatus } from './ErrorHandler';
import * as React from "react";
import axios from "axios";

const useQuery = ({ url, method, headers, data }) => {
    const { setErrorStatusCode } = useErrorStatus();
    const [apiData, setApiData] = React.useState();

    React.useEffect(() => {
        axios({
            url: url,
            method: method || 'get',
            headers: headers || {},
            data: data || {}
        }).then(response => {
            response.status === 200
                ? setApiData(response.data)
                : setErrorStatusCode(response.status);
        });
        /*fetch(url)
            .then(data => data.json())
            .then(({ code, status, ...apiData }) => {
                if (code > 400) {
                    setErrorStatusCode(400)
                } else {
                    setApiData(apiData);
                }
            });*/
    }, [url]);

    return { data: apiData }
}
export default useQuery;