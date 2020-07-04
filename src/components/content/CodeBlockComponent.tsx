
import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';

import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ProgressBar } from 'react-bootstrap';

interface CodeBlockProps {
    code: string,
    progress?: number
}

export default class CodeBlockComponent extends React.Component<CodeBlockProps> {
    constructor(props: CodeBlockProps) {
        super(props);
        SyntaxHighlighter.registerLanguage('xml', xml);
    }

    render(): JSX.Element {
        return (
            <div className="col-sm" style={{ width: 520, overflow: 'auto', textAlign: 'left' }}>
                <SyntaxHighlighter
                    language="xml"
                    showLineNumbers={true}
                    style={androidstudio}
                    customStyle={{ height: 400 }}>
                    {this.props.code}
                </SyntaxHighlighter>{
                    this.props.progress && <ProgressBar now={this.props.progress} />
                }
                
            </div>
        );
    }
}  