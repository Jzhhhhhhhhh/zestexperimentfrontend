import React, { Component } from 'react'
import HandleClick from "./HandleClick";
import {Link} from "react-router-dom";
import axios from "axios";



class NewQuestions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            url: "https://localhost:8000/questions",
            message:null,
            qText:null,
            qType:"SINGLE_CHOICE",
            qChoice:null,
            qAlias:null,
            choice:[],
            temp:null,
            qChoices:[],
            Qtype:"CodeEvaluation",
            codeE:[],
            qChoiceType:null,
        }

    }


    handleSubmit=()=>{
        if (this.state.qChoice != null){
            this.addChoices()
        }
        if (this.state.Qtype == "DemographicQuestion"){
            const newQuestion = [{
                "questionText":this.state.qText,
                "questionChoices":this.state.qChoices,
                "questionChoiceType":this.state.qType,
                "alias":this.state.qAlias,
                "@type":this.state.Qtype
            }]
            axios.post("https://localhost:8000/questions",JSON.stringify(newQuestion),{headers: {'Content-Type': 'application/json'}}).then((res) =>{
                    console.log(res);
                    this.state.message = res
                }
            )
        }
        if (this.state.Qtype == "CodeEvaluation"){
            const newQuestion = [{
                "questionChoices":["can not tell", "1", "2", "3", "4", "5"],
                "questionChoiceType":this.state.qType,
                "alias":this.state.qAlias,
                "@type":this.state.Qtype,
                "codeText":this.state.cText,
                "codeType":this.state.cType,
                "exposureTime":this.state.eTime,
                "questionText":this.state.qText
            }]
            axios.post("https://localhost:8000/questions",JSON.stringify(newQuestion),{headers: {'Content-Type': 'application/json'}}).then((res) =>{
                    console.log(res);
                    this.state.message = res
                }
            )
        }

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
    changeqType(e){
        this.setState({
            Qtype:e.target.value
        })
    }
    blankcodeE(){
        this.state.codeE = []
    }
    addQuestionChoices=()=>{
        this.state.choice.push(<input style={{fontSize:"2rem",marginLeft:"6rem",height:"5rem",width:"76rem",borderRadius:"2rem"}}  onChange={this.changeChoices.bind(this)}/>)
        this.setState({
            choice:this.state.choice
        })
        if (this.state.qChoice != null){
            this.addChoices()
        }
        console.log(this.state.qChoices)
    }



    codeEvaluation=()=>{
        console.log(this.state.Qtype)
        this.blankcodeE()
        if (this.state.Qtype == "CodeEvaluation"){
            this.state.codeE.push(<div>
                <div >
                    <div>
                        <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem"}}>
                            Question Alias</p>
                        <input style={{fontSize:"2rem",marginLeft:"6rem",height:"5rem",width:"35rem",borderRadius:"2rem"}}  onChange={this.changeAlias.bind(this)}/>
                    </div>
                    <div>
                        <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem",marginTop:"1rem"}}>
                            Type of the code</p>
                        <select style={{marginLeft:"6rem",fontSize:"1.5rem",height:"5.5rem",width:"35rem",borderRadius:"1rem"}} onChange={this.changeType.bind(this)}>
                            <option value={"JAVA"}>java</option>
                            <option value={"PYTHON"}>python</option>
                            <option value={"C++"}>C++</option>
                        </select>
                        <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem"}}>
                            Exposure Time</p>
                        <input style={{fontSize:"2rem",marginLeft:"6rem",height:"5rem",width:"35rem",borderRadius:"2rem"}}/>
                    </div>

                </div>
                <div>


                </div>
                <div >
                    <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem"}}>
                        Question Choices
                    </p>
                    <input style={{fontSize:"2rem",marginLeft:"6rem",height:"5rem",width:"35rem",borderRadius:"2rem"}}
                    defaultValue={"Can not tell"}/>
                    <input style={{fontSize:"2rem",marginLeft:"6rem",height:"5rem",width:"35rem",borderRadius:"2rem"}}
                           defaultValue={"1"}/>
                    <input style={{fontSize:"2rem",marginLeft:"6rem",height:"5rem",width:"35rem",borderRadius:"2rem"}}
                           defaultValue={"2"}/>
                    <input style={{fontSize:"2rem",marginLeft:"6rem",height:"5rem",width:"35rem",borderRadius:"2rem"}}
                           defaultValue={"3"}/>
                    <input style={{fontSize:"2rem",marginLeft:"6rem",height:"5rem",width:"35rem",borderRadius:"2rem"}}
                           defaultValue={"4"}/>
                    <input style={{fontSize:"2rem",marginLeft:"6rem",height:"5rem",width:"35rem",borderRadius:"2rem"}}
                           defaultValue={"5"}/>
                </div>
                <div>
                    <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem"}}>
                        Type of the code</p>
                    <input style={{fontSize:"2rem",marginLeft:"6rem",height:"5rem",width:"76rem",borderRadius:"2rem"}}
                           defaultValue={"scale choices"}/>
                </div>

            </div>)
            this.setState({
                codeE:this.state.codeE
            })
        }
        else if (this.state.Qtype == "DemographicQuestion"){
            this.state.codeE.push(<div>
                <div >
                    <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem"}}>
                        Question Alias</p>
                    <input style={{fontSize:"2rem",marginLeft:"6rem",height:"5rem",width:"35rem",borderRadius:"2rem"}}  onChange={this.changeAlias.bind(this)}/>
                </div>
                <div>
                    <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem"}}>
                        Upload question text</p>
                    <input style={{fontSize:"2rem",marginLeft:"6rem",height:"15rem",width:"76rem",borderRadius:"2rem"}} onChange={this.changeText.bind(this)}/>
                </div>
                <div >
                    <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem"}}>
                        Type of the question choices</p>
                    <div style={{float:"left"}}>
                        <select style={{marginLeft:"6rem",fontSize:"1.5rem",height:"5rem",width:"35rem",borderRadius:"1rem"}} onChange={this.changeType.bind(this)}>
                            <option value={"SINGLE_CHOICE"}>single choice question</option>
                            <option value={"MULTI_CHOICE"}>multi choice question</option>
                            <option value={"TEXT"}>text question</option>
                            <option value={"SCALE_CHOICE"}>scale choice question</option>
                        </select>
                    </div>
                    <div style={{marginTop:"2rem"}}>
                        <button style={{background:"DodgerBlue",marginLeft:"2rem",color:"#FFFFFF",width:"15rem",height:"4.5rem",borderRadius:"8px"}} onClick={this.addQuestionChoices}>
                            Add question Choices</button>
                    </div>
                </div>
                <div >
                    <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem"}}>
                        Question Choices
                    </p>
                </div>
            </div>)
            this.setState({
                codeE:this.state.codeE
            })
        }

    }






    render(){
        return(
            <div>
                <div style={{height:"100rem"}}>
                    <p style={{background:"#F6D420",height:"80px",marginLeft:"160px",borderRadius:"32px"}}></p>

                    <p style={{fontSize:"2rem",marginLeft:"6rem",height:"1rem"}}>
                        Question Type</p>
                    <select style={{marginLeft:"6rem",fontSize:"1.5rem",height:"5rem",width:"15rem",borderRadius:"1rem"}} onChange={this.changeqType.bind(this)}>
                        <option value={"CodeEvaluation"}>CodeEvaluation</option>
                        <option value={"DemographicQuestion"}>DemographicQuestion</option>
                    </select>
                    <button style={{marginLeft:"2rem",background:"DodgerBlue",color:"#FFFFFF",width:"15rem",height:"4.5rem",borderRadius:"8px"}} onClick={this.codeEvaluation}>
                        Add
                    </button>
                    <div>
                        {this.state.codeE}
                    </div>
                    <div>
                        {this.state.choice}
                    </div>

                </div>
                <div align={"center"}>
                    <Link to="/adminHomepage">
                        <button  id="continue" style={{marginLeft:"4rem",background:"DodgerBlue",color:"#FFFFFF",width:"400px",height:"80px",borderRadius:"8px"}} onClick={this.handleSubmit}>
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