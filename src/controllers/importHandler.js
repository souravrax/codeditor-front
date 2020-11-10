import Axios from "axios";

const URL = `https://codeditorapi.azurewebsites.net/share/import`;

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
            console.log(error);
            return "";
        });
};

export default importHandler;
