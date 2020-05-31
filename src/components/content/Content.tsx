import React, { ChangeEvent } from 'react';
import { Button } from 'react-bootstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { tomorrowNight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { json2xml, xml2json } from 'xml-js';
import LanguageButton from '../LanguageButton';
import { coy, funky, okaidia, twilight, prism, atomDark, base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { dark, solarizedDark, tomorrow, dracula, androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, { IFileWithMeta, StatusValue } from 'react-dropzone-uploader'


import ReactDropzone, { FileRejection, DropEvent } from "react-dropzone";
interface HeaderProps {

}

interface HeaderState {
    inputText: string,
    translatedText: string,
    language: string,
    file?: File
}

interface XmlString {
    _attributes: Attributes,
    _text: string
}

interface Attributes {
    name: string,
    translatable: boolean
}


export default class Content extends React.Component<HeaderProps, HeaderState> {
    private translatedXmlString: XmlString[];

    constructor(props: HeaderProps) {
        super(props);
        this.state = {
            inputText: "Select your Strings.xml file from resources",
            translatedText: "Hit 'Translate' to start",
            language: "es",

        };
        this.translatedXmlString = [];
    }

    onChangeHandler2 = (fileWMeta: IFileWithMeta, status: StatusValue, allFiles: IFileWithMeta[], ): { meta: { [name: string]: any } } | void => {

        if (fileWMeta.file) {
            this.getFileFromInput(fileWMeta.file).then((binary) => {
                const jsonObj = JSON.parse(xml2json(binary, { compact: true }));
                this.setState({
                    file: fileWMeta.file,
                    inputText: binary
                });
            });

        }
    }


    onDrop = (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent): void => {
    }


    render() {
        return (
            <div className="container">

                <div className="custom-file left-align alert alert-info">
                    <input id="logo" type="file" className="custom-file-input" onChange={this.onChangeHandler} accept=".xml" multiple={false} />
                    <label htmlFor="logo" className="custom-file-label text-truncate">Select strings.xml file</label>
                </div>

                <div className="container pt-md-3 pb-md-3 mx-auto">
                    <div className="row">
                        <div className="col-sm" style={{ width: 520, height: 400, overflow: 'auto', textAlign: 'left' }}>
                            <SyntaxHighlighter language="xml" showLineNumbers={true} style={androidstudio} customStyle={{height: 400}}>
                                {this.state.inputText}
                            </SyntaxHighlighter>
                        </div>
                        <div className="col-sm" style={{ width: 520, height: 400, overflow: 'auto', textAlign: 'left' }}>
                            <SyntaxHighlighter language="xml" showLineNumbers={true} style={androidstudio} customStyle={{height: 400}}>
                                {this.state.translatedText}
                            </SyntaxHighlighter>

                        </div>

                    </div>
                </div>
                <div className="row">

                    <LanguageButton languageCode="hi" languageName="Hindi (हिन्दी)" isSelected={this.state.language == "hi"} handler={this.onLanguageChange} />
                    <LanguageButton languageCode="es" languageName="Spanish (español)" isSelected={this.state.language == "es"} handler={this.onLanguageChange} />
                    <LanguageButton languageCode="zh" languageName="Chinese (Zhōngwén)" isSelected={this.state.language == "zh"} handler={this.onLanguageChange} />
                    <LanguageButton languageCode="ar" languageName="Arabic (اَلْعَرَبِيَّةُ)" isSelected={this.state.language == "ar"} handler={this.onLanguageChange} />
                    <LanguageButton languageCode="ru" languageName="Russian (русский язык)" isSelected={this.state.language == "ru"} handler={this.onLanguageChange} />
                </div>

                <div className="row pt-md-4">
                    <Button className="col-sm" onClick={this.startTranslation} name="Click Me">Translate</Button>
                </div>
            </div>
        );
    }

    private onLanguageChange = (language: string): void => {
        this.setState({ language: language });
    }

    private startTranslation = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {

        if (this.state.file) {
            this.translatedXmlString = [];
            this.getFileFromInput(this.state.file).then((binary) => {
                const jsonObj = JSON.parse(xml2json(binary, { compact: true }));
                this.setState({
                    inputText: binary
                })

                jsonObj.resources.string.forEach((element: XmlString, index: number) => {
                    if (!element._attributes.translatable) {
                        const translatedText = this.translateText(element._text);
                        translatedText.then((value: Response) => {
                            value.json().then(value => {
                                element._text = value.data.translations[0].translatedText;
                                this.translatedXmlString.push(element);


                                this.setState({
                                    translatedText: json2xml(this.getXmlTree(JSON.stringify(this.translatedXmlString)), { compact: true, spaces: 4 })
                                });
                            });
                        });
                    }
                });
            });
        }


    }


    private getFileFromInput(file: File): Promise<any> {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = function () { resolve(reader.result); };
            reader.readAsBinaryString(file); // here the file can be read in different way Text, DataUrl, ArrayBuffer
        });
    }


    private onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {

        event.persist();

        if (event.target.files) {
            const file: File = event.target.files[0];

            this.getFileFromInput(file).then((binary) => {
                const jsonObj = JSON.parse(xml2json(binary, { compact: true }));
                this.setState({
                    file: file,
                    inputText: binary
                });
            });
        }
    }

    getXmlTree(jsonArray: string): string {

        return "{\"resources\": {\"string\":" + jsonArray + "}}";

    }


    translateText = (textToTranslate: string): Promise<Response> => {

        let url = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyAMq9xOA3Yz4ainz4kU9Nw6zCMAHOQid_g&source=en&target=" + this.state.language;
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