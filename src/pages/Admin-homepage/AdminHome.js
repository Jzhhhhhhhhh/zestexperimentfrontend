import React from "react";
import axios from "axios";
import Qs from 'qs';
import { useRef, useState } from 'react'
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import {createSearchParams, Link, Router, withRouter} from "react-router-dom";
import Admin from "../Admin-pwd/Admin";



class AdminHome extends React.Component{
    constructor(props) {
        super(props);
        const {content} = this.props
        this.state = {
            url: "http://localhost:8000/questions",
            message:null,
            ques:1,
            questionList:[],
            aliasList:[],
            scheduleList:[],
            finished:0,
        }
        this.getQuestions()
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
                        this.state.aliasList.push(
                            <Link to="/showQuestion">
                                <button style={{marginLeft:"2rem",background:"#5561FF",color:"#FFFFFF",width:"25rem",height:"50px",borderRadius:"8px"}} key={x}
                                >{this.state.questionList[i][x]}</button>
                            </Link>
                            )
                    }
                }
                this.setState({
                    aliasList:this.state.aliasList,
                })
                console.log(this.state.aliasList)
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
                        for (const y in this.state.schedule[i]){
                            if (y == 'id'){
                                this.state.url = this.state.schedule[i][y]
                            }
                        }
                        this.state.scheduleList.push(
                            <Link to={"/showSchedule/"+ this.state.url}>
                            <button style={{marginLeft:"0.8rem",background:"#5561FF",color:"#FFFFFF",width:"25rem",height:"50px",borderRadius:"8px"}} key={x}>{this.state.schedule[i][x]}</button>
                            </Link>)

                    }
                }
            }
            this.setState({
                scheduleList:this.state.scheduleList
            })
            console.log(res.data)
        })
    }



    render(){
        return(
            <div style={{height:"100%"}}>
                <p style={{background:"#F6D420",height:"80px",marginLeft:"160px",borderRadius:"32px"}}></p>
                <div style={{float:"left"}}>
                    <div style={{marginLeft:"10rem"}}>
                        <p style={{fontSize:"3rem"}}>
                            Exports
                        </p>
                        <div style={{whiteSpace:"pre-wrap",background:"#F5F5F5",height:"12rem",width:"33rem",borderRadius:"2rem"}}align="centre">

                            <button style={{marginTop:"1.5rem",color:"white",fontSize:"2.3rem",background:"#008B00",height:"9rem",width:"9rem",paddingTop:"0.5rem",marginLeft:"2rem",borderRadius:"1rem",float:"left",textAlign:"center"}}
                            onClick={this.getFinished}>
                                <b>{this.state.finished}</b>
                                Finish
                            </button>
                            <p style={{width:"100%",height:"2rem"}}></p>
                            <button style={{background:"yellow",height:"3.5rem",align:"center",marginLeft:"1rem",borderRadius:"1rem",width:"20rem",Left:"1rem",fontSize:"1rem",textAlign:"center"}}>
                                pilot systems results</button>
                            <button style={{background:"blue",height:"3.5rem",color:"white",marginLeft:"1rem",borderRadius:"1rem",width:"20rem",fontSize:"1rem",textAlign:"center"}}>
                                formal systems results</button>



                        </div>
                        <div >
                            <p style={{fontSize:"3rem"}}>
                                Experiment Schedules</p>
                            <div style={{whiteSpace:"pre-wrap",background:"#F5F5F5",height:"50rem",width:"33rem",borderRadius:"2rem"}}>
                                <p style={{height:"1rem"}}></p>
                                <ul style={{minHeight:"80vh"}}>{this.state.scheduleList}</ul>
                                <Link to="/newSchedule">
                                    <button  id="continue" style={{marginLeft:"3.3rem",background:"#5561FF",color:"#FFFFFF",width:"25rem",height:"50px",borderRadius:"8px"}}>
                                        New Schedules
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p style={{width:"100%",height:"0.1rem"}}></p>
                    <p style={{marginLeft:"48rem",fontSize:"3rem"}}>
                        All Questions</p>
                    <div style={{marginLeft:"48rem",background:"#F5F5F5",height:"71.5rem",width:"33rem",borderRadius:"2rem"}}>
                        <p style={{height:"1rem"}}></p>
                        <ul style={{minHeight:"123vh"}}>
                            {this.state.aliasList}
                        </ul>
                        <Link to="/newQuestions">
                            <button  id="continue" style={{marginLeft:"4.5rem",background:"#5561FF",color:"#FFFFFF",width:"25rem",height:"50px",borderRadius:"8px"}}>
                                New Questions
                            </button>
                        </Link>
                    </div>
                </div>
                <p style={{background:"#F6D420",height:"80px",marginRight:"160px",marginTop:"3rem",borderRadius:"32px"}}></p>
            </div>

        )
    }

}

export default AdminHome







