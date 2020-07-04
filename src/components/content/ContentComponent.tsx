import React, { ChangeEvent } from 'react';
import { Button } from 'react-bootstrap';

import { json2xml, xml2json } from 'xml-js';
import XmlString from '../../models/XmlString';
import FileUtils from '../utils/FileUtils';
import StringUtils from '../utils/StringUtils';
import LangUtils from '../utils/LangUtils';
import FileUploadComponent from './FileUploadComponent';
import CodeBlockComponent from './CodeBlockComponent';
import LanguageSelectComponent from './LanguageSelectComponent';
import Language from '../../models/Language';
import ErrorMsgComponent from './ErrorMsgComponent';

interface ContentProps {
    languageArray: Language[]
}

interface ContentState {
    inputText: string,
    translatedText: string,
    language: string,
    file?: File,
    errorMsg?: string | undefined,
    translationComplete: boolean,
    translationProgress?: number
}

export default class ContentComponent extends React.Component<ContentProps, ContentState> {

    private translatedXmlString: XmlString[];
    private translatedString: string;

    constructor(props: ContentProps) {
        super(props);
        this.state = {
            inputText: "Select your Strings.xml file from resources",
            translatedText: "Hit 'Translate' to start",
            language: "es",
            translationComplete: false
        };
        this.translatedXmlString = [];
        this.translatedString ="";
    }

    render(): JSX.Element {
        let file;
        if (this.state.translationComplete) {
            file = new Blob([this.state.translatedText], { type: 'text/xml' });
        }

        return (
            <div className="container">
                <FileUploadComponent onFileSelect={this.onFileInput} />

                <div>
                    <ErrorMsgComponent errorMsg={this.state.errorMsg} />
                </div>

                {this.state.translationComplete &&
                    <div className="alert alert-success alert">
                        String.xml generated successfully. <a href={URL.createObjectURL(file)} download="strings.xml" >Download </a>
                    </div>
                }

                <div className="container pt-md-3 pb-md-3 mx-auto">
                    <div className="row">
                        <CodeBlockComponent code={this.state.inputText} />
                        <CodeBlockComponent code={this.state.translatedText} progress={this.state.translationProgress} />
                    </div>
                </div>
                <LanguageSelectComponent
                    selectedLanguageCode={this.state.language}
                    languageArray={this.props.languageArray}
                    selectLanguageHandler={this.onLanguageChange} />

                <div className="row pt-md-4">
                    <Button className="col-sm" onClick={this.startTranslation} name="Click Me">Translate</Button>
                </div>
            </div>
        );
    }

    private onLanguageChange = (language: string): void => {
        this.setState({ language: language });
    }

    private startTranslation = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {

        if (this.state.file) {
            this.translatedXmlString = [];
            FileUtils.getFileFromInput(this.state.file).then((binary) => {
                const jsonObj = JSON.parse(xml2json(binary, { compact: true }));
                this.setState({
                    inputText: binary,
                    errorMsg: undefined,
                    translatedText: ".....",
                    translationProgress: undefined
                })

                const arrSize = jsonObj.resources.string.length;

                jsonObj.resources.string.forEach((element: XmlString) => {
                    if (!element._attributes.translatable) {
                        const translatedText = LangUtils.translateText(this.state.language, element._text);
                        translatedText.then((value: Response) => {
                            value.json().then(value => {
                                if (value.data?.translations[0]) {
                                    element._text = value.data.translations[0].translatedText;
                                    this.translatedXmlString.push(element);
                                    this.translatedString = json2xml(StringUtils.getXmlTree(JSON.stringify(this.translatedXmlString)), { compact: true, spaces: 4 });
                                    if (this.translatedXmlString.length === arrSize - 2) {
                                        this.setState({
                                            translatedText: this.translatedString,
                                            translationComplete: true
                                        })
                                    } else {
                                        const percent = (this.translatedXmlString.length / arrSize * 100);
                                        
                                        this.setState({
                                            translationProgress: percent
                                        });
                                    }
                                } else {
                                    this.setState({
                                        errorMsg: "Something went wrong, please try again."
                                    });
                                    return;
                                }
                            });
                        });
                    } else {
                        this.translatedXmlString.push(element);
                    }
                });
            });
        } else {
            this.setState({
                errorMsg: "Please select a file"
            });
        }
    }

    private onFileInput = (event: ChangeEvent<HTMLInputElement>): void => {

        event.persist();

        if (event.target.files) {
            const file: File = event.target.files[0];

            FileUtils.getFileFromInput(file).then((binary) => {
                try {
                    this.setState({
                        file: file,
                        inputText: binary
                    });
                } catch (err) {
                    this.setState({
                        errorMsg: "Please select a valid XML. " + err
                    })
                }

            });
        }
    }
}