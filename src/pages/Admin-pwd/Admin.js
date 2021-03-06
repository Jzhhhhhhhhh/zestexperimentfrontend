import React, { Component } from 'react'
import { HashRouter as Router, Link, Route, Redirect,Switch } from 'react-router-dom';
import axios from "axios";

class Admin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            url: "http://localhost:8000/questions",
            message:null,
            ques:1,
            questionList:[],
            aliasList:[],
            scheduleList:[],
            finished:0,
        }
    }
    getFinished=()=>{
        axios.get("http://localhost:8000/testees/amount",{params:{finished:"",mode:"pilot"}}).then((res)=>{
            this.setState({
                finished:res.data
            })
            console.log(this.state.finished)
        })
    }


    blankList(){
        this.state.aliasList=[]
    }
    getQuestions=()=>{
        this.getSchedules()
        axios.get("http://localhost:8000/questions").then((res)=>{
            this.state.questionList=res.data;
            console.log(this.state.questionList)
            this.blankList()
            for (let i=0;i<this.state.questionList.length;i++){
                for(const x in this.state.questionList[i]){
                    if (x == 'alias'){
                        this.state.aliasList.push(<button style={{marginLeft:"2rem",background:"#5561FF",color:"#FFFFFF",width:"25rem",height:"50px",borderRadius:"8px"}} key={x}>{this.state.questionList[i][x]}</button>)
                    }
                }
                this.setState({
                    aliasList:this.state.aliasList,
                })
                console.log(this.state.aliasList)
                this.props.history.push({AHalias:this.state.aliasList})

            }

        })
    }
    blankSchedule(){
        this.state.scheduleList=[]
    }

    getSchedules=()=>{
        axios.get("http://localhost:8000/schedules",{headers: {'Content-Type': 'application/json'}}).then((res)=>{
            this.state.schedule=res.data
            this.blankSchedule()
            for (let i=0; i<this.state.schedule.length;i++ ){
                for (const x in this.state.schedule[i]){
                    if (x == 'alias'){
                        this.state.scheduleList.push(<button style={{marginLeft:"0.8rem",background:"#5561FF",color:"#FFFFFF",width:"25rem",height:"50px",borderRadius:"8px"}} key={x}>{this.state.schedule[i][x]}</button>)

                    }
                }
            }
            this.setState({
                scheduleList:this.state.scheduleList
            })
            console.log(this.state.scheduleList)
            this.props.history.push({AHschedule: this.state.scheduleList})
        })
    }



    render(){
        return(<div style={{height:"100%"}}>
            <p style={{background:"#F6D420",height:"80px",marginLeft:"160px",borderRadius:"32px"}}>

            </p>
            <h1 style={{paddingTop:'200px',fontSize:"44px"}}align="center">
                ZEST Experimentor Admin
            </h1>
            <p align="center">
                <input style={{width:"300px",height:"50px",borderRadius:"8px"}}/>
            </p>
            <p align="center">
                <Link to={{pathname: "/adminHomepage",state:{localState: this.state,questionList: this.state.questionList,scheduleList: this.state.scheduleList}}} >
                    <button style={{background:"#5561FF",color:"#FFFFFF",width:"160px",height:"50px",borderRadius:"8px"}} onClick={this.getQuestions}>
                        Login
                    </button>
                </Link>
            </p>
            <p style={{background:"#F6D420",height:"80px",marginRight:"160px",marginTop:"11rem",borderRadius:"32px"}}>

            </p>

        </div>)
    }
}


export default Admin
