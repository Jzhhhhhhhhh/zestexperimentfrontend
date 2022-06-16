import React from "react";
import axios from "axios";
import {Checkbox} from "antd";
import {Link} from "react-router-dom";
const CheckboxGroup = Checkbox.Group;

class NewSchedule extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            url:"http://localhost:8000/schedules",
            schedule:[],
            aliasList:[],
            moduleList:[],
            sGroup:null,
            sType:"PILOT",
            selectList:[],
            sAlias:null,
            sCount:0,
            type1:"EarlyStoppingSchedule",
            moduleButton:[],
            choices:[],
            counting:0
        }
    }

    blankSchedule(){
        this.state.moduleList=[]
    }

    getSchedules=()=>{
        axios.get("http://localhost:8000/schedules",{headers: {'Content-Type': 'application/json'}}).then((res)=>{
            console.log(res.data)
            this.state.schedule=res.data
            this.blankSchedule()
            for (let i=0; i<this.state.schedule.length;i++ ){
                for (const x in this.state.schedule[i]){
                    if (x == 'scheduleModuleList'){
                        for (const y in this.state.schedule[i][x]){
                            this.state.moduleList.push(<button style={{height:"3rem",marginLeft:"-1.5rem",width:"15rem",background:"#5561FF",color:"#FFFFFF",borderRadius:"1rem"}}>{y}</button>)
                        }
                    }
                }
            }
            this.setState({
                moduleList:this.state.moduleList
            })
            console.log(this.state.moduleList)
        })
    }

    blankList(){
        this.state.aliasList=[]
    }
    getQuestions=()=>{

        axios.get("http://localhost:8000/questions").then((res)=>{
            this.state.questionList=res.data;
            console.log(this.state.questionList)
            this.blankList()
            for (let i=0;i<this.state.questionList.length;i++){
                for(const x in this.state.questionList[i]){
                    if (x == 'alias'){
                        this.state.aliasList.push(this.state.questionList[i][x])
                    }
                }
                this.setState({
                    aliasList:this.state.aliasList,
                })
                console.log(this.state.aliasList)
            }

        })
    }

    submitSchedules=()=>{
        if (this.state.type1 == "EarlyStoppingSchedule"){
            const newSchedule = [{
                "@type":this.state.type1,
                "alias":this.state.sAlias,
                "stoppingCount":this.state.sCount,
                "scheduleModuleList":this.state.moduleList,
                "scheduleType":this.state.sType,
                "testGroup":"testgroup",
            }]
            axios.post("http://localhost:8000/schedules",JSON.stringify(newSchedule),{headers: {'Content-Type': 'application/json'}}).then((res) =>{
                    console.log(res);
                    this.state.message = res
                }
            )
            console.log(newSchedule)
        }
        else if (this.state.type1 == "Schedule"){
            const newSchedule = [{
                "@type":this.state.type1,
                "alias":this.state.sAlias,
                "scheduleModuleList":this.state.moduleList,
                "scheduleType":this.state.sType,
                "testGroup":"testgroup",
            }]
            axios.post("http://localhost:8000/schedules",JSON.stringify(newSchedule),{headers: {'Content-Type': 'application/json'}}).then((res) =>{
                    console.log(res);
                    this.state.message = res
                }
            )
            console.log(newSchedule)
        }

    }

    onChangeCheck = selectList => {
        this.setState({
            selectList,
        });
    };


    changeAlias(e){
        this.setState({
            sAlias:e.target.value
        })
    }

    changeType1(e){
        this.setState({
            type1:e.target.value
        })
    }

    changesType(e){
        this.setState({
            sType:e.target.value
        })
    }
    changeStopping(e){
        this.setState({
            sCount:e.target.value
        })
    }
    changeChoices(e){
        this.setState({

        })
    }







    addModule=()=>{
        this.state.counting = this.state.counting+1
        this.setState({
            counting:this.state.counting
        })
        this.state.moduleButton.push(
            <button style={{height:"3rem",marginLeft:"1rem",width:"15rem",background:"#5561FF",color:"#FFFFFF",borderRadius:"1rem"}}>{"module"+this.state.counting}</button>
        )
        this.state.moduleList.push({
            "moduleType":"CODE",
            "questionIdList":this.state.selectList
        })
        this.setState({
            moduleButton:this.state.moduleButton,
            moduleList:this.state.moduleList
        })
    }


    render() {
        return(<div>
            <p style={{background:"#F6D420",height:"80px",marginLeft:"160px",borderRadius:"32px"}}>
            </p>
            <div style={{borderColor:"grey",width:"3rem"}}>
                <div style={{float:"left"}}>
                    <h1 style={{marginLeft:"1rem",width:"15rem"}}>
                        Alias：
                    </h1>
                    <input style={{fontSize:"2rem",marginLeft:"1rem",height:"3rem",width:"15rem",borderRadius:"1rem"}}  onChange={this.changeAlias.bind(this)}/>

                    <h1 style={{marginLeft:"1rem",width:"15rem"}}>Type:</h1>
                    <select style={{fontSize:"1rem",marginLeft:"1rem",height:"3rem",width:"15rem",borderRadius:"1rem"}}
                            onChange={this.changeType1.bind(this)}>
                        <option value={"EarlyStoppingSchedule"}>EarlyStoppingSchedule</option>
                        <option value={"Schedule"}>Schedule</option>
                    </select>
                    <h1 style={{marginLeft:"1rem",width:"15rem"}}>
                        StoppingCount:
                    </h1>
                    <input style={{fontSize:"2rem",marginLeft:"1rem",height:"3rem",width:"15rem",borderRadius:"1rem"}}  onChange={this.changeStopping.bind(this)}/>

                    <h1 style={{marginLeft:"1rem",width:"15rem"}}>ScheduleType:</h1>
                    <select style={{fontSize:"1rem",marginLeft:"1rem",height:"3rem",width:"15rem",borderRadius:"1rem"}}
                            onChange={this.changesType.bind(this)}>
                        <option value={"PILOT"}>Pilot</option>
                        <option value={"EXPERIMENT"}>Experiment</option>
                    </select>
                    <ul>

                    </ul>
                    <p>
                        {this.state.moduleButton}
                    </p>


                    <button style={{height:"3rem",marginLeft:"1rem",width:"15rem",background:"#5561FF",color:"#FFFFFF",borderRadius:"1rem"}}
                            onClick={this.getQuestions}>
                        New Module
                    </button>
                    <Link to="/newSchedule">
                        <button style={{height:"3rem",marginLeft:"1rem",width:"15rem",background:"#5561FF",color:"#FFFFFF",borderRadius:"1rem"}}
                                onClick={this.addModule}>
                            Add Module
                        </button>
                    </Link>
                    <Link to={"/adminHomepage"}>
                        <button style={{height:"3rem",marginLeft:"1rem",width:"15rem",background:"#5561FF",color:"#FFFFFF",borderRadius:"1rem"}}
                                onClick={this.submitSchedules}>
                            Add Schedule
                        </button>
                    </Link>
                </div>
                <div style={{marginLeft:"34rem"}}>
                    <p style={{height:"0.5rem"}}></p>
                    <h1 style={{width:"15rem"}}>
                        Question List
                    </h1>
                    <CheckboxGroup
                        style={{ display: "flex", flexDirection:"column" ,width:"20rem",lineHeight:"2rem"}}
                        value={this.state.selectList}
                        onChange={this.onChangeCheck} >
                        {this.state.aliasList.map(function (item) {
                            return (
                                <Checkbox
                                    key={item} value={item}>
                                    {item}
                                </Checkbox>
                            )
                        })}
                    </CheckboxGroup>

                </div>
            </div>
            <p style={{background:"#F6D420",height:"80px",marginRight:"160px",marginTop:"60rem",borderRadius:"32px"}}></p>
        </div>)
    }
}

export default NewSchedule