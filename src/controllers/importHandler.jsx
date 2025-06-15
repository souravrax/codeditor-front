import Axios from "axios";
import { BASE_URL } from "../constants";

const URL = `${BASE_URL}/share/import`;

const importHandler = async (
    id,
    setCode,
    setInput,
    setLanguage,
    setShow
) => {
    console.log({ id });
    try {
        const response = await Axios.post(URL, { id });
        console.log(response);
        
        if (response.data.success) {
            console.log(response.data.data);
            const { code, input, language } = response.data.data;
            return {code, language, input};
        } else {
            throw new Error("Unable to import code");
        }
    } catch (e) {
        console.error(e)
        return null;
    }
};

export default importHandler;
