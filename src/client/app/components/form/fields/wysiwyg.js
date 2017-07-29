import React, { PropTypes } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import {
    convertFromHTML,
    ContentState,
    EditorState,
    convertToRaw,
    convertFromRaw
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const Wysiwyg = (props) => {
    const onEdChange = (v) => {
        const htmlStr = draftToHtml(v);
        // dispatch redux action to update value
    };

    const generateContentBlock = (value) => {
        const contentBlock = convertFromHTML(value);
        const contentState = ContentState.createFromBlockArray(contentBlock);

        return EditorState.createWithContent(contentState);
    };

    const { label, value, hintText } = props;

    return (
        <div>
            <span>{label}</span>
            <Editor
                defaultEditorState={generateContentBlock(value)}
                onChange={onEdChange}
                placeholder={hintText}
            />
        </div>
    );
};

Wysiwyg.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    hintText: PropTypes.string
};

export default Wysiwyg;
