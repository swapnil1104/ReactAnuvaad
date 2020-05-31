import React, { ChangeEvent } from 'react';


interface FileUploadProps {
    onFileSelect: (event: ChangeEvent<HTMLInputElement>)=> void
}

export default class FileUploadComponent extends React.PureComponent<FileUploadProps> {

    render() {
        return (
            <div className="custom-file left-align alert alert-info">
            <input id="logo" type="file" className="custom-file-input" onChange={this.props.onFileSelect} accept=".xml" multiple={false} />
            <label htmlFor="logo" className="custom-file-label text-truncate">Select strings.xml file</label>
        </div>
        );
    }

}