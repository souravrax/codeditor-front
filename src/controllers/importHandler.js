import Axios from "axios";

const URL =
    process.env.NODE_ENV == "development"
        ? `http://localhost:5000/share/import`
        : `https://codeditorapi.azurewebsites.net/share/import`;

const importHandler = (
    id,
    isLoading,
    setCode,
    setInput,
    setLanguage,
    setShow
) => {
    console.log({
        id: id,
        isLoading: isLoading,
        setCode: setCode,
        setInput: setInput,
        setLanguage: setLanguage,
        setShow: setShow,
    });
    Axios.post(URL, {
        id: id,
    })
        .then((response) => {
            isLoading(false);
            console.log(response);
            if (response.data.success) {
                console.log(response.data.data);
                const { code, input, language } = response.data.data;
                setCode(code);
                setInput(input);
                setLanguage(language);
                isLoading(false);
                setShow(false);
            }
        })
        .catch((error) => {
            isLoading(false);
            console.log(error);
            return "";
        });
};

export default importHandler;
