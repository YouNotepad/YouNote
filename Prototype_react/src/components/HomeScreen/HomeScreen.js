import React, { Component } from 'react'

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        // DISPLAY WHERE WE ARE
        console.log("\tHomeScreen constructor");
    }
    handleURLEntered = () => {
        this.props.goToNoteCallback();
    }
    render() {
        console.log("\tHomeScreen render");
        
        return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                <div className="container">
                    <a href="index.html" className="navbar-brand">YouNote</a>
                    <button className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
 
    
            <header id="home-section">
                <div className="dark-overlay">
                    <div className="home-inner">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 align-middle d-lg-block">
                                    <div className="card bg-success text-center card-form" id="urlpage">
                                        <div className="card-body">
                                            <h2><strong><i style={{color: "red"}} className="fab fa-youtube h1"></i></strong></h2>
                                            <p>Please enter the video URL</p>
                                            <form>
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-lg" placeholder="Video URL:"></input>
                                                    
                                                </div>
                                                <a href="./main.html" className="btn btn-outline-light btn-block" onClick={this.handleURLEntered}>Go to Video & Notepad</a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-none d-lg-block" >
                                    <h1 className="display-4 text-center"><strong>YouNote</strong></h1>
                                    <div className="d-flex flex-row">
                                        <div className="p-4 align-self-start">
                                            <i className="fa fa-check"></i>
                                        </div>
                                        <div className="p-4 align-self-end">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere voluptates qui beatae ea magnam voluptatem.
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <div className="p-4 align-self-start">
                                            <i className="fa fa-check"></i>
                                        </div>
                                        <div className="p-4 align-self-end">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere voluptates qui beatae ea magnam voluptatem.
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <div className="p-4 align-self-start">
                                            <i className="fa fa-check"></i>
                                        </div>
                                        <div className="p-4 align-self-end">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere voluptates qui beatae ea magnam voluptatem.
                                        </div>
                                    </div> 

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </header>
        </div>


        )


    }



}

export default HomeScreen