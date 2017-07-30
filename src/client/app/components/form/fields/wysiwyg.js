import React, { PropTypes } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import {
    convertFromHTML,
    ContentState,
    EditorState
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { updateFormField } from '../../../actions/formActions';

const editorOptions = [
    'inline',
    'blockType',
    'fontSize',
    'fontFamily',
    'list',
    'textAlign',
    'colorPicker',
    'link',
    'embedded',
    'emoji',
    'remove',
    'history'
];

const Wysiwyg = (props) => {
    const onEdChange = (v) => {
        const { fieldName, dispatch } = props;
        const htmlStr = draftToHtml(v);

        return dispatch(updateFormField(fieldName, htmlStr));
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
                toolbar={{ options: editorOptions }}
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
