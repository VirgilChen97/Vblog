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
		<Card>
			<MonacoEditor
				editorDidMount={handleEditorMount}
				{...props}
				name="mdContent"
				height="600"
				theme="vs-light"
				language="markdown"
				options={options}
			/>
		</Card>
	)

}

export default Editor