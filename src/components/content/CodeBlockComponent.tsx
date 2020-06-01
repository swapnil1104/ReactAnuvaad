
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeBlockProps {
    code: string
}

export default class CodeBlockComponent extends React.Component<CodeBlockProps> {
    render(): JSX.Element {
        return (
            <div className="col-sm" style={{ width: 520, overflow: 'auto', textAlign: 'left' }}>
                <SyntaxHighlighter
                    language="xml"
                    showLineNumbers={true}
                    style={androidstudio}
                    customStyle={{ height: 400 }}>
                    {this.props.code}
                </SyntaxHighlighter>
            </div>
        );
    }
}  