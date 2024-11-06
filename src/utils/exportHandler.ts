import Axios from "axios";

const URL =
    process.env.NODE_ENV == "development"
        ? `http://localhost:5000/share/export`
        : `https://codeditorapi.azurewebsites.net/share/export`;

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
