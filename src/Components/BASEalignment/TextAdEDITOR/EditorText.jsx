import React from 'react'
import "./style.css";

const EditorText = () => {
    return (
        <section className="editor__ground">
            <div className='editor_n_preview_panel outer__panel'>
                <div className="preview__editor__outer">
                    <div className="editorboxwindow">
                       <textarea name="ad_content" id="ad__copy__area" draggable={false}  cols="30" rows="10" placeholder='Enter your AD copy here...'></textarea>
                    </div>
                    <div className="adpreviewdindow">
                   
                    </div>
                </div>
                <div className="metainfo__outer">
                   
                </div>
            </div>
            <div className='ad_enhansment_panel outer__panel'>
               
            </div>
            <div className='proceed__panel outer__panel'>
               
            </div>

        </section>
    )
}

export default EditorText;