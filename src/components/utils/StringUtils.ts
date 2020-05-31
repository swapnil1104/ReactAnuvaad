

export default class StringUtils {

    
    public static getXmlTree(jsonArray: string): string {
        return "{\"resources\": {\"string\":" + jsonArray + "}}";
    }
}
