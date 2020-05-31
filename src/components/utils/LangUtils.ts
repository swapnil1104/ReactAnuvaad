export default class LangUtils {

    public static translateText = (language:string, textToTranslate: string): Promise<Response> => {
        const apiKey = process.env.REACT_APP_GITHUB_TRANSLATION_KEY
        let url = "https://translation.googleapis.com/language/translate/v2?key="+apiKey+"&source=en&target=" +    language;
        url += "&q=" + textToTranslate;
        return fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    }
}
