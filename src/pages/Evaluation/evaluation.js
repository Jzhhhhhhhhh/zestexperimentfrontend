import React from 'react'
import CodeEvaluation from './questions/code_evaluation'
import Axios from 'axios'
import {Box, CircularProgress, Paper} from "@mui/material";
import BareQuestion from "./questions/bare_question";
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import {DEFAULT_URL} from "../../Components/Url";


class Evaluation extends React.Component{
    constructor(props) {
        super(props);
        let href = window.location.href
        let index = href.lastIndexOf("/");
        let invitation_id = this.props.iniviation_id;
        // let invitation_id = href.split('/')[href.split('/').length-1]
        this.state = {
            done: false,
            mode: this.props.mode,
            // url: 'https://zest-survey-platform.ifi.uzh.ch/api/' + this.props.mode + '/' + invitation_id,
            url: DEFAULT_URL + this.props.mode + '/' + invitation_id,
            questionEntities: null,
        }
        console.log(window.location.href)
    }
    componentDidMount(){


        Axios.post(this.state.url,[],{withCredentials: true}).then((res) => {
            this.setQuestion(res.data);
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    setQuestion(newEntities){
        this.setState({questionEntities:newEntities});
        console.log("The current question entities are" + this.state.questionEntities);
        if(newEntities === null){
            this.setState({done:true});
        }
    }

    processQuestions(){
        if(this.state.done){
            return (
                <Box sx={{textAlign:'center'}}>
                    <h1> Thank you for your participation! </h1>
                </Box>
            );
        }
        if(this.state.questionEntities === null){
            return(
                <CircularProgress />
            );
        }
        else if(this.state.questionEntities[0]['@type'] === "CodeEvaluation"){
            return <CodeEvaluation key={Date.now()} url={this.state.url} questionEntities={this.state.questionEntities}
                                   getNewQuestions={this.setQuestion.bind(this)} />
        }
        else{
            return <BareQuestion key={Date.now()} url={this.state.url} questionEntities={this.state.questionEntities}
                                 getNewQuestions={this.setQuestion.bind(this)} />
        }
    }


    render(){
        return(
            <div >
                <Box sx={{margin:3, outline:1,display:'flex', flexDirection:'column'}}>
                    <Paper sx={{borderRadius:5,padding:2}} elevation={3}>
                        {this.processQuestions()}
                    </Paper>
                </Box>
            </div>
        )
            ;}
}

export default Evaluation