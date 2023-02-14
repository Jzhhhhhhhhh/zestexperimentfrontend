import React, {useEffect, useState, ReactPropTypes} from "react";
import axios from "axios";
import {Link, useHref} from "react-router-dom";
//import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import { Table, Column, HeaderCell, Cell} from 'rsuite-table';
import {Modal} from 'antd'
// //import { Column, Cell, HeaderCell, Pagination, ActionCell } from 'rsuite-enhanced';
// import 'rsuite-table/dist/css/rsuite-table.css';
// import {checkNode} from "@testing-library/jest-dom/dist/utils";
// import {Delete} from "@mui/icons-material";
import {Affix} from "antd";
import {Button} from "@mui/material";

export default function AdminHome(){
    let alertContent = ''
    let questionInSchedule
    let escapedString
    const originUrl = "https://zest-survey-platform.ifi.uzh.ch/api/"
    // const originUrl = "http://localhost:8080/"
    const [finished, setFinished] = useState()
    const [pilotFinished, setPilotFinished] = useState()
    const [experimentFinished, setExperimentFinished] = useState()
    const [experimentAttended, setExperimentAttended] = useState()
    const [pilotAttended, setPilotAttended] = useState()
    const [scheduleTable, setScheduleTable] = useState()
    const [questionTable, setQuestionTable] = useState()
    const [invitationInput, setInvitationInput] = useState()
    const [invitation, setInvitation] = useState("twitter")
    const [typeInput, setTypeInput] = useState()
    const [type, setType] = useState("PILOT")
    const [invitationTable, setInvitationTable] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState("This question is used in some schedules, please delete the schedule first.")
    const escapeIllegalCharacters=(string)=> {
        return string.replace(/[\$\(\)\[\]\{\}\<\>\?\*\+\^\|\\]/g, function (match) {
            return "\\" + match;
        });
    }



    const showModal = () => {
        setMessage("This question is used in some schedules, please delete the schedule first.")
        setIsModalVisible(true);};

    const handleOk = () => {
        window.location.reload()
        setIsModalVisible(false);};

    const handleCancel = () => {setIsModalVisible(false);};


    const EditSchedule = ({ rowData, dataKey, ...props }) => {
        return(<Cell {...props}>
            <Link to={"/showSchedule/"+ rowData[dataKey]}>
                <button>Edit</button>
            </Link>
        </Cell>)
    }
    const EditQuestion = ({rowData,dataKey,...props}) =>{
        return(<Cell {...props}>
            <Link to={"/showQuestion/"+ rowData[dataKey]}>
                <button>Edit</button>
            </Link>
        </Cell>)
    }
    const DeleteSchedule = ({ rowData, dataKey, ...props}) =>{
        return(<Cell{...props}>
            <span>
                <button onClick={()=>deleteSchedule(rowData[dataKey])}>delete</button>
            </span>
        </Cell>)
    }
    const deleteSchedule = (url) =>{
        axios.delete(originUrl+'schedule/'+url).then((res)=>{
            console.log(res)
            window.location.reload()
        })
    }
    const DeleteQuestion = ({ rowData, dataKey, ...props}) =>{
        //console.log(rowData[dataKey])
        return(<Cell{...props}>
            <button onClick={()=>deleteQuestion(rowData[dataKey])}>delete</button>
        </Cell>)
    }
    const deleteQuestion = (url) =>{
        console.log(url)
        axios.get(originUrl+'schedule/question/'+url).then((res)=>{
            const data = res.data
            questionInSchedule=data
        })
        console.log(questionInSchedule)
        if (questionInSchedule.length==0){
            console.log(questionInSchedule)
            axios.delete(originUrl+'questions/'+url).then((res)=>{
                console.log(res)
                window.location.reload()
            })
        }
        else {
            showModal()
            console.log(questionInSchedule)
        }

    }
    const DeleteLinks = ({ rowData, dataKey, ...props}) =>{
        return(<Cell{...props}>
            <span>
                <button onClick={()=>deleteLinks(rowData[dataKey])}>delete</button>
            </span>
        </Cell>)
    }
    const deleteLinks = (url) =>{
        let result = url.match(/\/([0-9][0-9a-z]+)/)
        console.log(result[1])
        axios.delete(originUrl+'invitations/'+result[1]).then((res)=>{
            console.log(res)
            window.location.reload()
        })
    }

    useEffect(()=>{
        const changeInvitation=(e)=>{
            setInvitation(escapeIllegalCharacters(e.target.value))}
        setInvitationInput(<div style={{marginLeft:"6rem",marginRight:"2rem",float:"left"}}>
            <input style={{width:"10.8rem",height:"1.9rem", borderRadius:"0.5rem"}}placeholder={"source(default as twitter)"} onChange={changeInvitation}></input>
        </div>)
        const changeType=(e)=>{
            setType(e.target.value)}
        setTypeInput(<div style={{marginLeft:"2rem",marginRight:"2rem",float:"left"}}>
            <select style={{width:"10.8rem",height:"1.9rem", borderRadius:"0.5rem"}}onChange={changeType}>
                <option value={"PILOT"}>Pilot</option>
                <option value={"EXPERIMENT"}>Experiment</option>
            </select>
        </div>)

        async function fetchData(){
            const getPilotFinished = () =>{
                return axios.get(originUrl+"testees/amount",{params:{finished:"true",mode:"pilot"}})}
            let numberPilot = await getPilotFinished()
            console.log(numberPilot.data)
            setPilotFinished(numberPilot.data)
            const getExperimentFinished = () =>{
                return axios.get(originUrl+'testees/amount', {params:{finished:"true", mode:"experiment"}})
            }
            let numberExperiment=await getExperimentFinished()
            console.log(numberExperiment.data)
            setExperimentFinished(numberExperiment.data)
            const getPilotAttended = () =>{
                return axios.get(originUrl+"testees/amount",{params:{finished:"false",mode:"pilot"}})}
            let numberPilotAttended = await getPilotFinished()
            console.log(numberPilot.data)
            setPilotAttended(numberPilot.data)
            const getExperimentAttended = () =>{
                return axios.get(originUrl+'testees/amount', {params:{finished:"false", mode:"experiment"}})
            }
            let numberExperimentAttended=await getExperimentFinished()
            console.log(numberExperiment.data)
            setExperimentAttended(numberExperiment.data)


            const getSchedules = () =>{return axios.get(originUrl+"schedules")}
            let schedules = await getSchedules()
            //console.log(schedules.data)
            const getQuestions = () =>{return axios.get(originUrl+"questions")}
            let questions = await getQuestions()
            const getInvitation = () =>{return axios.get(originUrl+"invitations")}
            let invitations = await getInvitation()
            console.log(invitations.data)
            const generateInvitation = (invitation) =>{setInvitationInput(...invitation, ...invitation.push(invitation))}
            console.log(questions.data)
            const freshFinished = (number) =>{
                let finishedNumber = number.data
                let finishedButton = []
                const exportPILOT = () =>{
                    axios.get(originUrl+"csv",{params:{mode:"pilot"}}).then((res) =>{
                        console.log(res.data)})
                }
                finishedButton.push(<div style={{textAlign:"right"}}>
                    <p style={{fontSize:"1.5rem",marginRight:"6rem"}}>{finishedNumber} Finished</p>
                </div>)
                setFinished(finishedButton)
            }

            const deserializeSchedule = (schedules) =>{
                console.log(schedules.data)
                let table = []
                table.push(<div style={{marginLeft:"6rem",marginRight:"6rem"}}>
                    <h1>Plans</h1>
                    <Link to="/newSchedule">
                        <button style={{background:"DodgerBlue",borderRadius:"0.5rem",height:"2rem", color:"white"}}>Add new Schedule</button>
                    </Link>
                    <Table data={schedules.data} style={{marginTop:"2rem", borderRadius:"0.5rem", background:"white"}}>
                        <Column  width={180} sort="true" resizable>
                            <HeaderCell>type</HeaderCell>
                            <Cell dataKey="@type" />
                        </Column>
                        <Column  width={300} sort="true" resizable>
                            <HeaderCell>alias</HeaderCell>
                            <Cell dataKey="alias" />
                        </Column>
                        <Column  width={120} sort="true" resizable>
                            <HeaderCell>scheduleType</HeaderCell>
                            <Cell dataKey="scheduleType" />
                        </Column>
                        <Column  width={100} sort="true" resizable>
                            <HeaderCell>testGroup</HeaderCell>
                            <Cell dataKey="testGroup" />
                        </Column>
                        <Column  width={100} fixed={'right'} sort="true" resizable>
                            <HeaderCell>Edit</HeaderCell>
                            <EditSchedule dataKey={"id"}></EditSchedule>
                        </Column>
                        <Column  width={100} fixed={"right"} sort="true" resizable>
                            <HeaderCell>Delete</HeaderCell>
                            <DeleteSchedule dataKey={"id"}></DeleteSchedule>
                        </Column>
                    </Table>
                </div>)
                setScheduleTable(table)
            }
            const deserializeQuestion = (questions) =>{
                console.log(questions.data)
                let table = []
                table.push(<div style={{marginLeft:"6rem",marginRight:"6rem"}}>
                    <h1>Questions</h1>
                    <Link to="/newQuestions">
                        <button style={{background:"DodgerBlue",borderRadius:"0.5rem",height:"2rem", color:"white"}}>Add new Question</button>
                    </Link>
                    <Table data={questions.data} style={{marginTop:"2rem", borderRadius:"0.5rem", background:"white"}}>
                        <Column  width={200} sort="true" resizable>
                            <HeaderCell>type</HeaderCell>
                            <Cell dataKey="@type" />
                        </Column>
                        <Column  width={500} sort="true" resizable>
                            <HeaderCell>alias</HeaderCell>
                            <Cell dataKey="alias" />
                        </Column>
                        <Column  width={100} sort="true" resizable>
                            <HeaderCell>Edit</HeaderCell>
                            <EditQuestion dataKey="id" />
                        </Column>
                        <Column>
                            <HeaderCell>Delete</HeaderCell>
                            <DeleteQuestion dataKey={"id"}></DeleteQuestion>
                        </Column>
                    </Table>
                </div>)
                setQuestionTable(table)
            }
            // const getInvitations= () =>{
            //     return axios.get("https://localhost:8443/testees/amount",{params:{finished:"",mode:"pilot"}})
            // }
            // let invitation = await getInvitations()
            // console.log(number.data)
            console.log(invitations)
            const deserializeInvitation = (invitations) =>{
                for(const i in invitations.data){
                    console.log(invitations.data[i])
                    for (const j in invitations.data[i]){
                        if (j == "id")
                            invitations.data[i][j] = originUrl
                                +invitations.data[i]['type'].toLowerCase()+'/'+invitations.data[i][j]
                    }
                }
                console.log(invitations.data)
                let table = []
                table.push(<div style={{marginLeft:"6rem",marginRight:"6rem"}}>
                    <h1>Links</h1>
                    <Table data={invitations.data} style={{marginTop:"2rem", borderRadius:"0.5rem", background:"white"}}>
                        <Column  width={300} sort="true">
                            <HeaderCell>source</HeaderCell>
                            <Cell dataKey="source" />
                        </Column>
                        <Column  width={650} sort="true">
                            <HeaderCell>link</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>
                        <Column>
                            <HeaderCell>Delete</HeaderCell>
                            <DeleteLinks dataKey={"id"}></DeleteLinks>
                        </Column>
                </Table>
                </div>)
                setInvitationTable(table)
            }
            deserializeSchedule(schedules)
            deserializeQuestion(questions)
            deserializeInvitation(invitations)
        }
        fetchData()
    },[type])
    const getInvitation=() =>{
        let data = {
            source:invitation,
            type:type
        }
        console.log(data)
        return axios.post(originUrl+"invitations",JSON.stringify(data),{headers: {'Content-Type': 'application/json'}}).then((res)=>{
            console.log(res)
            window.location.reload()
        })
    }

    return(<div style={{background:"#cae8d7", height:"80rem"}}>
        <Affix offsetTop={0}>
            <div style={{background:"white",height:"10rem"}}>
                <h style={{fontSize:"3rem",marginLeft:"6rem",fontFamily:"Monaco",marginTop:"1rem"}}>
                    Admin</h>
                <div style={{position:"absolute", marginLeft:"60%", width:"30rem"}}>
                    <div style={{display:"inline-block", width:"20rem"}}>
                        <p style={{display:"inline-block", fontFamily:"Monaco", fontWeight:"bold"}}>Pilot:</p>
                        <p style={{display:"inline-block"}}>Finished:{pilotFinished},</p>
                        <p style={{display:"inline-block", marginLeft:"1rem"}}>Attended:{pilotAttended}</p>
                    </div>
                    <button style={{display:"inline-block",borderRadius:"0.5rem",background:"DodgerBlue", color:"white", width:"8rem"}}onClick={()=>{window.location.href=originUrl+"csv?mode=pilot"}}>export results</button>
                </div>
                <div style={{position:"absolute", marginLeft:"60%", width:"30rem", marginTop:"2rem"}}>
                    <div style={{display:"inline-block", width:"20rem"}}>
                        <p style={{display:"inline-block", fontFamily:"Monaco", fontWeight:"bold"}}>Experiment:</p>
                        <p style={{display:"inline-block"}}>Finished:{experimentFinished},</p>
                        <p style={{display:"inline-block", marginLeft:"1rem"}}>Attended:{experimentAttended}</p>
                    </div>
                    <button style={{display:"inline-block",borderRadius:"0.5rem",background:"DodgerBlue", color:"white", width:"8rem"}}onClick={()=>{window.location.href=originUrl+"csv?mode=pilot"}}>export results</button>
                </div>

                {/*<div style={{position:"absolute", marginLeft:"70%", marginTop:"2rem"}}>*/}
                {/*    <p style={{float:"left"}}>*/}
                {/*        finished:{experimentFinished}*/}
                {/*        attended:{experimentAttended}*/}
                {/*    </p>*/}
                {/*    <button style={{borderRadius:"0.5rem",background:"DodgerBlue", color:"white", width:"15rem"}}onClick={()=>{window.location.href=originUrl+"csv?mode=experiment"}}>Experiment systems results</button>*/}
                {/*</div>*/}
                <Modal title={"Add message"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>{message}</p>
                </Modal>
            </div>
        </Affix>
        <div style={{marginTop:"3rem",marginLeft:"3rem",marginRight:"3rem"}}>{invitationInput}
            {typeInput}
            <button onClick={getInvitation} style={{marginRight:"6rem",borderRadius:"0.5rem",height:"2rem",background:"DodgerBlue", color:"white"}}>Generate Link</button>
        </div>
        <div style={{marginLeft:"3rem",marginRight:"3rem"}}>
            {invitationTable}
            {scheduleTable}
            {questionTable}
        </div>
    </div>)

}