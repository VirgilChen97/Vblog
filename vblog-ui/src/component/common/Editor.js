import MonacoEditor from "react-monaco-editor";
import React, { useRef } from "react";
import Card from "@material-ui/core/Card";

const Editor = props => {
	const editorRef = useRef()

	const handleEditorMount = (editor, monaco) => {
		editorRef.current = monaco
	}

	const options = {
		minimap: {
			enabled: false
		},
		autoClosingBrackets: true,
		autoIndent: true,
		fontSize: 15,
		automaticLayout: true
	}

	return (
		<MonacoEditor
			editorDidMount={handleEditorMount}
			{...props}
			name="mdContent"
			theme="vs-light"
			language="markdown"
			options={options}
		/>
	)

}

export default Editor