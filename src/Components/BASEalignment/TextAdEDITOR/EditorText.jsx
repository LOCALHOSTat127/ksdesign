import React from 'react'
import "./style.css";

const EditorText = () => {
    return (
        <section className="editor__ground">
            <div className='editor_n_preview_panel outer__panel'>
                <div className="preview__editor__outer">
                    <div className="editorboxwindow">
                        <textarea disabled name="ad_content" id="ad__copy__area" draggable={false} cols="30" rows="10" placeholder='Enter your AD copy here...'></textarea>
                    </div>
                    <div className="adpreviewdindow   flex fd-col">
                        <h2>NewsPaper Preview AD</h2>
                        <div className="previewbox">
                            <div className="preview__ground heilight__marker">
                                <p id='preview__txt'>preview</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="metainfo__outer flex flex-aic">
                    <div className="metainfo__crums flex flex-aic">
                       
                    </div>
                    <div className="btn__jacket">
                        <button id='getPrice' className='getpricebtn btn__sandbox'>Get Price</button>
                    </div>
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