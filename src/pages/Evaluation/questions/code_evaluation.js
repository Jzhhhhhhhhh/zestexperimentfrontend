import React from 'react'
import hljs from 'highlight.js';
import {Box, Paper} from "@mui/material";

import BareQuestion from './bare_question'


class CodeEvaluation extends React.Component{

    maskCodeSnippet(){
        document.getElementsByClassName('codeSnippet')[0].style.filter = 'blur(5px)';
        console.log('Masked the code snippets')
        clearInterval(this.intervalId);
    }

    componentDidMount() {
        // console.log('The exposure time is ' + this.props.questionEntities[0].exposureTime);
        hljs.highlightAll();
        if(this.props.questionEntities[0].exposureTime > 0) {
            this.intervalId = setInterval(() => this.maskCodeSnippet(),this.props.questionEntities[0].exposureTime)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        hljs.highlightAll();
        if(this.props.questionEntities[0].exposureTime > 0) {
            this.intervalId = setInterval(() => this.maskCodeSnippet(),this.props.questionEntities[0].exposureTime)
        }
    }

    htmlspecialchars(str) {
        var map = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#39;" // ' -> &apos; for XML only
        };
        return str.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    render() {
        return (
            <Box sx={{
                width: '100%',
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'center',}}>
                <Paper  sx={{borderRadius:5, backgroundColor:'#282c34', width:'50%',margin:4}} elevation={5}>
                    <Box sx={{margin:'5vh', }}>
                        <h1 style={{color:'#FFFFFF'}}>Please read the following code snippet</h1>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', height: '60vh', margin:3, justifyContent:"center",paddingBottom:0, paddingRight:0,
                        "*::-webkit-scrollbar": {
                            width: 20,
                        },
                        "*::-webkit-scrollbar-track": {
                            backgroundColor: "#888888",
                            borderRadius: 1
                        },
                        "*::-webkit-scrollbar-thumb": {
                            backgroundColor: "black",
                            borderRadius:1
                        }}} className={'codeSnippet'}>
                            <pre>
                                <code className={'language-'.concat(this.props.questionEntities[0].codeType)} >
                                    {this.props.questionEntities[0].codeText}
                                </code>
                            </pre>
                    </Box>
                </Paper>
                <Box sx={{display: 'flex', flexDirection: 'column', p: 3, m: 3, width: '50%'}}>
                    <Box >
                        <BareQuestion key={this.props.questionEntities[0].id + "bare"} url={this.props.url} questionEntities={this.props.questionEntities}
                                      getNewQuestions={this.props.getNewQuestions}/>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default CodeEvaluation