import React, { ChangeEvent } from 'react';
import { Button } from 'react-bootstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { json2xml, xml2json } from 'xml-js';
import LanguageButton from '../LanguageButton';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import XmlString from '../../models/XmlString';
import FileUtils from '../utils/FileUtils';
import StringUtils from '../utils/StringUtils';
import LangUtils from '../utils/LangUtils';
import FileUploadComponent from './FileUploadComponent';
import CodeBlockComponent from './CodeBlockComponent';
import LanguageSelectComponent from './LanguageSelectComponent';
import Language from '../../models/Language';

interface ContentProps {
    languageArray: Language[]
}

interface ContentState {
    inputText: string,
    translatedText: string,
    language: string,
    file?: File
}

export default class Content extends React.Component<ContentProps, ContentState> {

    private translatedXmlString: XmlString[];

    constructor(props: ContentProps) {
        super(props);
        this.state = {
            inputText: "Select your Strings.xml file from resources",
            translatedText: "Hit 'Translate' to start",
            language: "es",

        };
        this.translatedXmlString = [];
    }

    render() {
        return (
            <div className="container">
                <FileUploadComponent onFileSelect={this.onFileInput} />

                <div className="container pt-md-3 pb-md-3 mx-auto">
                    <div className="row">
                        <CodeBlockComponent code={this.state.inputText} />
                        <CodeBlockComponent code={this.state.translatedText} />
                    </div>
                </div>
                <LanguageSelectComponent
                    selectedLanguageCode={this.state.language}
                    languageArry={this.props.languageArray}
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

    private startTranslation = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {

        if (this.state.file) {
            this.translatedXmlString = [];
            FileUtils.getFileFromInput(this.state.file).then((binary) => {
                const jsonObj = JSON.parse(xml2json(binary, { compact: true }));
                this.setState({
                    inputText: binary
                })

                jsonObj.resources.string.forEach((element: XmlString, index: number) => {
                    if (!element._attributes.translatable) {
                        const translatedText = LangUtils.translateText(this.state.language, element._text);
                        translatedText.then((value: Response) => {
                            value.json().then(value => {
                                element._text = value.data.translations[0].translatedText;
                                this.translatedXmlString.push(element);

                                this.setState({
                                    translatedText: json2xml(StringUtils.getXmlTree(JSON.stringify(this.translatedXmlString)), { compact: true, spaces: 4 })
                                });
                            });
                        });
                    }
                });
            });
        }
    }

    private onFileInput = (event: ChangeEvent<HTMLInputElement>): void => {

        event.persist();

        if (event.target.files) {
            const file: File = event.target.files[0];

            FileUtils.getFileFromInput(file).then((binary) => {
                const jsonObj = JSON.parse(xml2json(binary, { compact: true }));
                this.setState({
                    file: file,
                    inputText: binary
                });
            });
        }
    }
}