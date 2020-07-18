import MonacoEditor from "react-monaco-editor";
import React, { useRef } from "react";
import CodeBlock from "../../util/CodeBlock";
import ReactMarkdown from "react-markdown";
import SplitterLayout from 'react-splitter-layout';
import makeStyles from "@material-ui/core/styles/makeStyles";
import './Editor.css';

const Editor = ({value, ...rest}) => {
	const editorRef = useRef()

	const handleEditorMount = (editor, monaco) => {
		editorRef.current = editor
		editor.layout()
	}

	const options = {
		minimap: {
			enabled: false
		},
		autoClosingBrackets: true,
		autoIndent: true,
		fontSize: 15,
		wordWrap: true
	}

	window.onresize = () => {
		editorRef.current.layout()
	}

	return (
		<SplitterLayout onDragEnd={()=>editorRef.current.layout()} percentage={true} primaryMinSize={20}>
			<MonacoEditor
				editorDidMount={handleEditorMount}
				{...rest}
				value={value}
				name="mdContent"
				theme="vs-light"
				language="markdown"
				options={options}
			/>
			<div className="markdown-body">
				<ReactMarkdown
					source={value}
					renderers={{ code: CodeBlock }}
				/>
			</div>
		</SplitterLayout>
	)
}

export default Editor