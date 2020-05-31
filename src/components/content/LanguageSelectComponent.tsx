import React from 'react';
import LanguageButton from '../LanguageButton';
import Language from '../../models/Language';

interface LanguageSelectProps {
    selectedLanguageCode: string,
    selectLanguageHandler: (languageCode: string) => void,
    languageArry: Language[]

}

export default class LanguageSelectComponent extends React.Component<LanguageSelectProps> {

    render() {

        const languages = this.props.languageArry.map((language: Language) =>
            <LanguageButton
                languageCode={language.code}
                languageName={language.name}
                handler={this.props.selectLanguageHandler}
                isSelected={this.props.selectedLanguageCode === language.code} />
        );

        return (
            <div className="row">
                {languages}
            </div>
        );
    }

}