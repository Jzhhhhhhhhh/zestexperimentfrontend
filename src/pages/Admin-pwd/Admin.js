import React from 'react'
import { Link} from 'react-router-dom';
import axios from "axios";

class Admin extends React.Component{



    constructor(props) {
        super(props);
        this.state = {
            message:null,
            ques:1,
            questionList:[],
            aliasList:[],
            scheduleList:[],
            finished:0,
            // originUrl:'https://zest-survey-platform.ifi.uzh.ch/api/',
            originUrl:"http://localhost:8080/",
        }
    }
    getFinished=()=>{
        axios.get(this.originUrl+"testees/amount",{params:{finished:"",mode:"pilot"}}).then((res)=>{
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
        axios.get(this.originUrl+"questions").then((res)=>{
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
        axios.get(this.originUrl+"schedules",{headers: {'Content-Type': 'application/json'}}).then((res)=>{
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
        return(<div style={{height:'100vh', position:"relative"}}>
            <div style={{background:"#F6D420",height:"80px",marginLeft:"160px",borderRadius:"32px",position:"absolute",top:'0',right:'0',clear:"both", width:"70%"}}></div>
            <h1 style={{paddingTop:'40vh',fontSize:"44px"}}align="center">
                ZEST Experimentor Admin
            </h1>
            <p align="center">
                <Link to={{pathname: "/adminHomepage",state:{localState: this.state,questionList: this.state.questionList,scheduleList: this.state.scheduleList}}} >
                    <button style={{background:"#5561FF",color:"#FFFFFF",width:"160px",height:"50px",borderRadius:"8px"}} onClick={this.getQuestions}>
                        Login with UZH
                    </button>
                </Link>
            </p>
            <div style={{background:"#F6D420",height:"80px",marginRight:"160px",borderRadius:"32px",position:"absolute",bottom:'0',left:'0',clear:"both", width:"70%"}}>

            </div>

        </div>)
    }
}


export default Admin
