import React from 'react';

export interface LanguageProps {
    handler: (languageCode: string) => void,
    languageName: string,
    isSelected: boolean,
    languageCode: string

}

export default class LanguageButton extends React.PureComponent<LanguageProps> {

    render(): JSX.Element {

        let className = "btn btn-link col-sm";
        if (this.props.isSelected) {
            className = "btn btn-success col-sm";
        }
        
        return (
            <button className={className} name={this.props.languageName} onClick={this.onClick}>
                {this.props.languageName}
            </button>
        );
        
    }

    onClick = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        this.props.handler(this.props.languageCode);
    }

}