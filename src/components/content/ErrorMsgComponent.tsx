import React from 'react';

interface ErrorProps {
    errorMsg?: string
}

export default class ErrorMsgComponent extends React.Component<ErrorProps> {

    render() {

        if (!this.props.errorMsg) {
            return null;
        }

        return (
            <div className="alert alert-warning alert">
                {this.props.errorMsg}
            </div>
        );
    }

}