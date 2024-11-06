import Axios from "axios";
import { BASE_URL } from "../constants";

const URL = `${BASE_URL}/share/export`;

const exportHandler = (code, language, input, expire, setIsLoading, setId) => {
    // console.log({
    //     code: code,
    //     language: language,
    //     input: input,
    //     expire: expire,
    //     setIsLoading: setIsLoading,
    //     setId,
    //     setId,
    // });
    Axios.post(URL, {
        code: code,
        language: language,
        input: input,
        expireIndex: expire.value,
    })
        .then((response) => {
            console.log(response);
            setIsLoading(false);
            if (response.data.success) {
                // console.log(response["data"]["id"]);
                setId(response["data"]["id"]);
            }
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            setId("Cannot Share your code");
        });
};

export default exportHandler;
