import React, {useEffect, useState} from "react";
import axios from "axios";
import {Checkbox} from "antd";
import {Link, useParams, withRouter} from "react-router-dom";
const CheckboxGroup = Checkbox.Group;


export default function ShowSchedules(){
    const params = useParams();
    let data = null
    axios.get("http://localhost:8000/schedules/"+params['name']).then((res)=>{
        console.log(res.data)
    })

    return(<div>
        {data}
    </div>)

}


// class ShowSchedules extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state={
//             url:"http://localhost:8000/schedules",
//             schedule:[],
//             aliasList:[],
//             moduleList:[],
//             sGroup:null,
//             sType:null,
//             selectList:[],
//             mQuestions:[]
//         }
//
//         this.getSchedules();
//     }
//
//     getQuestionsfromSchedule(v){
//         for (let i=0; i<this.state.schedule.length;i++ ){
//             for (const x in this.state.schedule[i]){
//                 if (x == 'scheduleModuleList'){
//                     for (const y in this.state.schedule[i][x]){
//
//                         this.state.moduleList.push(<button style={{height:"2.5rem",width:"10rem",background:"#5561FF",color:"#FFFFFF",borderRadius:"1rem"}}
//                                                            onClick={this.getQuestionsfromSchedule(y)}>{y}</button>)
//
//                     }
//                 }
//             }
//         }
//     }
//
//
//     blankmQuestions(){
//         this.state.mQuestions=[]
//     }
//
//     blankSchedule(){
//         this.state.moduleList=[]
//     }
//
//     getSchedules=()=>{
//         console.log(this.props.history)
//         axios.get("http://localhost:8000/schedules",{headers: {'Content-Type': 'application/json'}}).then((res)=>{
//             //console.log(res.data)
//             this.state.schedule=res.data
//             console.log(this.state.schedule)
//             this.blankSchedule()
//             for (let i=0; i<this.state.schedule.length;i++ ){
//                 for (const x in this.state.schedule[i]){
//                     if (x == 'scheduleModuleList'){
//                         for (const y in this.state.schedule[i][x]){
//
//                             this.blankmQuestions()
//                             for (const z in this.state.schedule[i][x][y]){
//                                 if (z == 'questionIdList'){
//                                     for (const a in this.state.schedule[i][x][y][z]){
//                                         this.state.mQuestions.push(<button style={{height:"2.5rem",width:"10rem",background:"#5561FF",color:"#FFFFFF",borderRadius:"1rem"}}>{"question"+a}</button>)
//                                     }
//
//                                 }
//                             }
//                             this.setState({
//                                 mQuestions:this.state.mQuestions
//                             })
//                             //console.log(this.state.mQuestions)
//                             this.state.moduleList.push(<div>
//                                 <div style={{float:"left"}}>
//                                     <button style={{height:"2.5rem",width:"10rem",background:"#5561FF",color:"#FFFFFF",borderRadius:"1rem"}}
//                                     >{"module"+y}</button>
//                                 </div>
//                                 <div style={{marginLeft:"30rem"}}>
//                                     {this.state.mQuestions}
//                                 </div>
//                                 <p style={{height:"3rem"}}></p>
//                             </div>)
//                         }
//                     }
//                 }
//             }
//             this.setState({
//                 moduleList:this.state.moduleList
//             })
//             console.log(this.props.location)
//         })
//     }
//
//
//     showQuestions=()=>{
//         console.log(this.state.mQuestions)
//         return(
//             <ul>
//                 {this.state.mQuestions}
//             </ul>
//         )
//
//
//     }
//
//     blankList(){
//         this.state.aliasList=[]
//     }
//     getQuestions=()=>{
//
//         axios.get("http://localhost:8000/questions").then((res)=>{
//             this.state.questionList=res.data;
//             console.log(this.state.questionList)
//             this.blankList()
//             for (let i=0;i<this.state.questionList.length;i++){
//                 for(const x in this.state.questionList[i]){
//                     if (x == 'alias'){
//                         this.state.aliasList.push(this.state.questionList[i][x])
//                     }
//                 }
//                 this.setState({
//                     aliasList:this.state.aliasList,
//                 })
//                 console.log(this.state.aliasList)
//             }
//
//         })
//     }
//
//
//     onChangeCheck = selectList => {
//         this.setState({
//             selectList,
//             checkAll: selectList.length === this.state.aliasList.length,
//         });
//     };
//
//
//
//
//     render() {
//         return(<div>
//             <p style={{background:"#F6D420",height:"80px",marginLeft:"160px",borderRadius:"32px"}}>
//             </p>
//             <div style={{height:"100%",borderColor:"grey",width:"3rem"}}>
//                 <h1 style={{marginLeft:"1rem",width:"15rem"}}>
//                     Test
//                 </h1>
//                 <div style={{float:"left"}}>
//                     <ul>
//                         {this.state.moduleList}
//                     </ul>
//                 </div>
//                 <div style={{marginLeft:"34rem"}}>
//
//
//
//                 </div>
//             </div>
//
//
//         </div>)
//     }
// }
//
// export default withRouter(ShowSchedules)
