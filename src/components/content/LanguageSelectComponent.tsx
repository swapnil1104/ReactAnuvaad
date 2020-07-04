import React from 'react';
import LanguageButton from '../LanguageButton';
import Language from '../../models/Language';
import { Container, Row } from 'react-bootstrap';

interface LanguageSelectProps {
    selectedLanguageCode: string,
    selectLanguageHandler: (languageCode: string) => void,
    languageArray: Language[]
}

export default class LanguageSelectComponent extends React.Component<LanguageSelectProps> {

    rowSize = 4;
    lang2DArray: Language[][];

    constructor(props: LanguageSelectProps) {
        super(props);

        this.lang2DArray = [];

        const arrayLength = props.languageArray.length;

        let rowIndex = 0;
        let colIndex = 0;
        for (let i = 0; i < arrayLength; i++) {
            if (this.lang2DArray[rowIndex] === undefined) {
                this.lang2DArray[rowIndex] = [];
            }
            this.lang2DArray[rowIndex][colIndex] = props.languageArray[i] as Language;

            if (this.lang2DArray[rowIndex].length === this.rowSize) {
                colIndex = 0;
                rowIndex++;
            } else {
                colIndex++;
            }
        }
    }

    render(): JSX.Element {

        const content = this.lang2DArray.map((langArr: Language[]) => 
            this.renderRow(langArr)
        );

        return (
            <Container>
                {content} 
            </Container>
        );

    }

    renderRow(langArr: Language[]): JSX.Element {

        const languages = langArr.map((language: Language) =>
            this.getLanguageButton(language)
        );

        return (
            <Row>
                {languages}
            </Row>
        );
    }

    getLanguageButton(language: Language): JSX.Element {
        return (
            <LanguageButton
                key={language.code}
                languageCode={language.code}
                languageName={language.name}
                handler={this.props.selectLanguageHandler}
                isSelected={this.props.selectedLanguageCode === language.code} />
        );
    }

}