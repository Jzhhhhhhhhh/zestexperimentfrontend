import React, { Component } from 'react'
import HandleClick from "./HandleClick";
import {Link} from "react-router-dom";
import axios from "axios";


class NewQuestions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            url: "http://localhost:8000/questions",
            message:null,
            qText:null,
            qType:"SINGLE_CHOICE",
            qChoice:null,
            qAlias:null,
            choice:[],
            temp:null,
            qChoices:[]
        }

    }


    handleSubmit=()=>{
        if (this.state.qChoice != null){
            this.addChoices()
        }
        const newQuestion = [{
            "questionText":this.state.qText,
            "questionType": this.state.qType,
            "questionChoices":this.state.qChoices,
            "alias":this.state.qAlias,
            "@type":"DemographicQuestion"
        }]
        axios.post("http://localhost:8000/questions",JSON.stringify(newQuestion),{headers: {'Content-Type': 'application/json'}}).then((res) =>{
                console.log(res);
                this.state.message = res
            }
        )
    }
    changeAlias(e){
        this.setState({
            qAlias:e.target.value
        })
    }
    changeText(e){
        this.setState({
            qText:e.target.value
        })
    }
    changeType(e){
        this.setState({
            qType:e.target.value
        })
    }
    changeChoices(e){
        this.setState({
            qChoice:e.target.value
        })

    }
    addChoices(){
        this.state.qChoices.push(this.state.qChoice)
        this.setState({
            qChoices:this.state.qChoices
        })
    }


    addQuestionChoices=()=>{
        this.state.choice.push(<input style={{fontSize:"2rem",marginLeft:"3rem",height:"5rem",width:"76rem",borderRadius:"2rem"}}  onChange={this.changeChoices.bind(this)}/>)
        this.setState({
            choice:this.state.choice
        })
        if (this.state.qChoice != null){
            this.addChoices()
        }
        console.log(this.state.qChoices)
    }


    render(){
        return(
            <div>
                <p style={{background:"#F6D420",height:"80px",marginLeft:"160px",borderRadius:"32px"}}></p>
                <div>
                    <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem"}}>
                        Question Alias</p>
                    <input style={{fontSize:"2rem",marginLeft:"6rem",height:"5rem",width:"76rem",borderRadius:"2rem"}}  onChange={this.changeAlias.bind(this)}/>

                </div>
                <div>
                    <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem"}}>
                        Upload question text</p>
                    <input style={{fontSize:"2rem",marginLeft:"6rem",height:"15rem",width:"76rem",borderRadius:"2rem"}} onChange={this.changeText.bind(this)}/>
                </div>
                <div style={{float:"left"}}>
                    <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem"}}>
                        Type of the question</p>
                    <select style={{marginLeft:"6rem",fontSize:"1.5rem",height:"5.5rem",width:"35rem",borderRadius:"1rem"}} onChange={this.changeType.bind(this)}>
                        <option value={"SINGLE_CHOICE"}>single choice question</option>
                        <option value={"MULTI_CHOICE"}>multi choice question</option>
                        <option value={"TEXT"}>text question</option>
                        <option value={"SCALE_CHOICE"}>scale choice question</option>
                    </select>
                </div>
                <div>
                    <p style={{fontSize:"2rem",marginLeft:"47rem",height:"1rem"}}>
                        Exposure Time</p>
                    <input style={{fontSize:"2rem",marginLeft:"6rem",height:"5rem",width:"35rem",borderRadius:"2rem"}}/>

                </div>
                <div>
                    <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem"}}>
                        Question Choices
                    </p>
                    <ul>
                        {this.state.choice}
                    </ul>
                </div>

                <div align={"center"} style={{paddingTop:"3rem"}}>
                    <button style={{background:"#5561FF",color:"#FFFFFF",width:"400px",height:"80px",borderRadius:"8px"}} onClick={this.addQuestionChoices}>
                        Add question Choices</button>
                    <Link to="/adminHomepage">
                        <button  id="continue" style={{marginLeft:"4rem",background:"#5561FF",color:"#FFFFFF",width:"400px",height:"80px",borderRadius:"8px"}} onClick={this.handleSubmit}>
                            Add and Continue
                        </button>
                    </Link>
                </div>

                <p style={{background:"#F6D420",height:"80px",marginRight:"160px",marginTop:"1rem",borderRadius:"32px"}}></p>

            </div>
        )
    }




}

export default NewQuestions;