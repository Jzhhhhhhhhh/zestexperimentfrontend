import React, {useEffect, useState, ReactPropTypes} from "react";
import axios from "axios";
import {Link, useHref} from "react-router-dom";
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import { Table, Column, HeaderCell, Cell} from 'rsuite-table';
import {Modal} from 'antd-mobile'
//import { Column, Cell, HeaderCell, Pagination, ActionCell } from 'rsuite-enhanced';
import 'rsuite-table/dist/css/rsuite-table.css';
import {checkNode} from "@testing-library/jest-dom/dist/utils";
import {Delete} from "@mui/icons-material";
import {Affix} from "antd";
const alert = Modal.alert



export default function AdminHome(){
    let alertContent = ''
    const [finished, setFinished] = useState()
    const [scheduleTable, setScheduleTable] = useState()
    const [questionTable, setQuestionTable] = useState()
    const [invitationInput, setInvitationInput] = useState()
    const [invitation, setInvitation] = useState("twitter")
    const [typeInput, setTypeInput] = useState()
    const [type, setType] = useState("pilot")
    const [invitationTable, setInvitationTable] = useState()
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
        axios.delete('https://localhost:8000/schedule/'+url).then((res)=>{
            console.log(res)
        })
    }
    const DeleteQuestion = ({ rowData, dataKey, ...props}) =>{
        console.log(rowData[dataKey])
        return(<Cell{...props}>
            <button onClick={()=>deleteQuestion(rowData[dataKey])}>delete</button>
        </Cell>)
    }
    const deleteQuestion = (url) =>{
        console.log(url)
        axios.delete('https://localhost:8000/questions/'+url).then((res)=>{
            console.log(res)
        })
        // axios.get('https://localhost:8000/schedule/question/'+url).then((res)=>{
        //     console.log(res)
        //     if (res.data == []){
        //         axios.delete('https://localhost:8000/questions/'+url).then((response)=>{
        //             console.log(response)
        //         })
        //     }
        //     else{
        //         alertContent = 'this question is in some of the schedules, please delete the schedule first'
        //         alert(alertContent[{
        //             text:'yes',
        //             onPress:()=>{
        //             }
        //         }])
        //     }
        // })
    }


    const DeleteLinks = ({ rowData, dataKey, ...props}) =>{
        return(<Cell{...props}>
            <span>
                <button onClick={()=>deleteLinks(rowData[dataKey])}>delete</button>
            </span>
        </Cell>)
    }

    const deleteLinks = (url) =>{
        axios.delete(url).then((res)=>{
            console.log(res)
        })
    }



    useEffect(()=>{

        const changeInvitation=(e)=>{
            setInvitation(e.target.value)
        }
        setInvitationInput(<div style={{marginLeft:"6rem",marginRight:"2rem",float:"left"}}>
            <select style={{width:"10.8rem",height:"1.9rem", borderRadius:"0.5rem"}}onChange={changeInvitation}>
                <option value={"twitter"}>Twitter</option>
                <option value={"facebook"}>Facebook</option>
            </select>
        </div>)
        const changeType=(e)=>{
            setType(e.target.value)
        }
        setTypeInput(<div style={{marginLeft:"2rem",marginRight:"2rem",float:"left"}}>
            <select style={{width:"10.8rem",height:"1.9rem", borderRadius:"0.5rem"}}onChange={changeType}>
                <option value={"pilot"}>Pilot</option>
                <option value={"experiment"}>Experiment</option>
            </select>
        </div>)

        async function fetchData(){
            const getFinished = () =>{
                return axios.get("https://localhost:8443/testees/amount",{params:{finished:"",mode:"pilot"}})
            }
            let number = await getFinished()
            console.log(number.data)
            const getSchedules = () =>{
                return axios.get("https://localhost:8443/schedules")
            }
            let schedules = await getSchedules()
            //console.log(schedules.data)
            const getQuestions = () =>{
                return axios.get("https://localhost:8443/questions")
            }
            let questions = await getQuestions()
            const getInvitation = () =>{
                return axios.get("https://localhost:8443/invitations")
            }
            let invitations = await getInvitation()
            console.log(invitations.data)
            //console.log(questions.data)
            const freshFinished = (number) =>{
                let finishedNumber = number.data
                let finishedButton = []
                const exportPILOT = () =>{
                    axios.get("https://localhost:8443/csv",{params:{mode:"pilot"}}).then((res) =>{
                        console.log(res.data)
                    })
                }
                finishedButton.push(<div style={{textAlign:"right"}}>
                    <p style={{fontSize:"1.5rem",marginRight:"6rem"}}>{finishedNumber} Finished</p>

                </div>)
                //console.log(finishedNumber)
                setFinished(finishedButton)
            }

            const deserializeSchedule = (schedules) =>{
                console.log(schedules.data)
                let table = []
                table.push(<div style={{marginLeft:"6rem",marginRight:"6rem"}}>
                    <h1>Schedules</h1>
                    <Link to="/newSchedule">
                        <button style={{background:"DodgerBlue",borderRadius:"0.5rem",height:"2rem", color:"white"}}>Add new Schedule</button>
                    </Link>
                    <Table data={schedules.data} style={{marginTop:"2rem", borderRadius:"0.5rem"}}>
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
                        <Column  width={100} sort="true" resizable>
                            <HeaderCell>Edit</HeaderCell>
                            <EditSchedule dataKey={"id"}></EditSchedule>
                        </Column>
                        <Column  width={100} sort="true" resizable>
                            <HeaderCell>Edit</HeaderCell>
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
                    <Table data={questions.data} style={{marginTop:"2rem", borderRadius:"0.5rem"}}>
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
            const deserializeInvitation = (invitations) =>{
                for(const i in invitations.data){
                    console.log(invitations.data[i])
                    for (const j in invitations.data[i]){
                        if (j == "id")
                            invitations.data[i][j] = "http://localhost:3000/#/"+type+'/'+invitations.data[i][j]
                    }
                }
                console.log(invitations.data)
                let table = []
                table.push(<div style={{marginLeft:"6rem",marginRight:"6rem"}}>
                    <h1>Links</h1>
                    <Table data={invitations.data} style={{marginTop:"2rem", borderRadius:"0.5rem"}}>
                        <Column  width={300} sort="true" resizable>
                            <HeaderCell>source</HeaderCell>
                            <Cell dataKey="source" />
                        </Column>
                        <Column  width={650} sort="true" resizable>
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
            freshFinished(number)
            deserializeSchedule(schedules)
            deserializeQuestion(questions)
            deserializeInvitation(invitations)
        }
        fetchData()
    },[invitation])
    const getInvitation=() =>{
        let data = {
            source:invitation
        }
        axios.post("https://localhost:8443/invitations",JSON.stringify(data),{headers: {'Content-Type': 'application/json'}}).then((res)=>{
            console.log(res)
        })
    }


    return(<div style={{background:"#cae8d7", height:"80rem"}}>
        <Affix offsetTop={0}>
            <div style={{background:"white",height:"8rem"}}>
                <h style={{fontSize:"3rem",marginLeft:"6rem",fontFamily:"Monaco",marginTop:"1rem"}}>
                    Admin
                </h>
                <div style={{marginTop:"1rem"}}>
                    <button style={{float:"right",borderRadius:"0.5rem",height:"2rem",marginRight:"6rem",marginLeft:"2rem", background:"DodgerBlue", color:"white"}}
                            onClick={()=>{window.location.href="https://localhost:8000/csv?mode=pilot"}}>Pilot systems results</button>
                    <button style={{float:"right",borderRadius:"0.5rem",height:"2rem",marginLeft:"2rem",background:"DodgerBlue", color:"white"}}
                            onClick={()=>{window.location.href="https://localhost:8000/csv?mode=experiment"}}>Experiment systems results</button>

                </div>

            </div>
        </Affix>

        {/*<link to={"/evaluation"}>*/}
        {/*<button>*/}
        {/*    linklink*/}
        {/*</button>*/}
        {/*</link>*/}

        <div style={{marginTop:"3rem",marginLeft:"3rem",marginRight:"3rem"}}>{invitationInput}
            {typeInput}
            <button onClick={getInvitation} style={{float:"left",marginRight:"6rem",borderRadius:"0.5rem",height:"2rem",background:"DodgerBlue", color:"white"}}>Generate Link</button>
            {finished}
        </div>
        <div style={{marginLeft:"3rem",marginRight:"3rem"}}>
            {invitationTable}

            {scheduleTable}
            {questionTable}
        </div>



    </div>)

}