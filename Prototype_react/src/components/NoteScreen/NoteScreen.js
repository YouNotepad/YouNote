import React, {Component} from 'react';
import './Note.css';
import 'suneditor/dist/css/suneditor.min.css'
import suneditor from 'suneditor'
import plugins from 'suneditor/src/plugins'



class NoteScreen extends Component {
    constructor(props) {
        super(props);

        // DISPLAY WHERE WE ARE
        console.log("\tNoteScreen constructor");

        
    }


componentDidMount = () =>{
  suneditor.create('sample', {
    plugins: plugins,
    height: 200,
    
    buttonList: [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        '/', // Line break
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
        ['fullScreen', 'showBlocks'],
        ['preview', 'print'],
        ['save', 'template']
    ]
})

}

handleGoHome = () =>{
    this.props.goToHomeCallback();
}


  render(){ 
     return(<div>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
            <div className="container">
                <a href="index.html" className="navbar-brand" onClick={this.handleGoHome}>YouNote</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a href="#home" className="nav-link"><i className="far fa-folder-open"></i> Open Note</a>
                        </li>
                        <li className="nav-item">
                            <a href="#explore-head-section" className="nav-link"><i className="far fa-save"></i> Save Note</a>
                        </li>
                        <li className="nav-item">
                            <a href="#create-head-section" className="nav-link"><i className="fas fa-code"></i> Code Block</a>
                        </li>
                        <li className="nav-item">
                            <a href="#contactModal" data-toggle="modal" data-target="#contactModal" className="nav-link"><i className="fab fa-youtube"></i> <i className="fas fa-arrow-right"></i> <i className="fas fa-tv"></i> Resize</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    
        <section className="content">
            <div className="cell a">
                <iframe id="ytplayer" type="text/html"  
                        src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
                        allowfullscreen="allowfullscreen"
                        mozallowfullscreen="mozallowfullscreen" 
                        msallowfullscreen="msallowfullscreen" 
                        oallowfullscreen="oallowfullscreen" 
                        webkitallowfullscreen="webkitallowfullscreen"
                        frameborder="0"></iframe>
            </div>
            <div className="cell b">
                <div className="input-group">
                    <textarea style= {{width: '100%'}} id="sample">Hi hello</textarea>    
                </div>
                  </div>
            
        </section>
        </div>
      

)
    
  
}

}

export default NoteScreen;
