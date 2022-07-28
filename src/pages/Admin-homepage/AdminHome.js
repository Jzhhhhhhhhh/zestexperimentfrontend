import React, {useEffect, useState, ReactPropTypes} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import { Table, Column, HeaderCell, Cell} from 'rsuite-table';
//import { Column, Cell, HeaderCell, Pagination, ActionCell } from 'rsuite-enhanced';
import 'rsuite-table/dist/css/rsuite-table.css';
import {checkNode} from "@testing-library/jest-dom/dist/utils";

export default function AdminHome(){
    const [finished, setFinished] = useState()
    const [scheduleTable, setScheduleTable] = useState()
    const [questionTable, setQuestionTable] = useState()
    const [invitationInput, setInvitationInput] = useState()
    const [invitation, setInvitation] = useState()
    const [actionCell, setActionCell] = useState()
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
    useEffect(()=>{
        const changeInvitation=(e)=>{
            setInvitation(e.target.value)
        }
        setInvitationInput(<div style={{marginLeft:"6rem",marginRight:"2rem",float:"left"}}>
            <select style={{width:"10.8rem",height:"1.9rem"}}onChange={changeInvitation}>
                <option value={"twitter"}>Twitter</option>
                <option value={"facebook"}>Facebook</option>
            </select>
        </div>)

        async function fetchData(){
            const getFinished = () =>{
                return axios.get("https://localhost:8000/testees/amount",{params:{finished:"",mode:"pilot"}})
            }
            let number = await getFinished()
            console.log(number.data)
            const getSchedules = () =>{
                return axios.get("https://localhost:8000/schedules")
            }
            let schedules = await getSchedules()
            //console.log(schedules.data)
            const getQuestions = () =>{
                return axios.get("https://localhost:8000/questions")
            }
            let questions = await getQuestions()
            const getInvitation = () =>{
                return axios.get("https://localhost:8000/invitations")
            }
            let invitations = await getInvitation()
            console.log(invitations.data)
            //console.log(questions.data)
            const freshFinished = (number) =>{
                let finishedNumber = number.data
                let finishedButton = []
                const exportPILOT = () =>{
                    axios.get("https://localhost:8000/csv/",{params:{mode:"PILOT"}}).then((res) =>{
                        console.log(res.data)
                    })
                }
                finishedButton.push(<div style={{textAlign:"right"}}>
                    <button onClick={getFinished} style={{float:"right",marginRight:"6rem",borderRadius:"1rem",height:"2rem",marginLeft:"2rem",background:"DodgerBlue", color:"white"}}>GetFinished</button>
                    <p style={{fontSize:"1.5rem"}}>{finishedNumber}</p>
                    <button style={{float:"right",borderRadius:"1rem",height:"2rem",marginRight:"6rem",marginLeft:"2rem", background:"DodgerBlue", color:"white"}} onClick={exportPILOT}>Pilot systems results</button>
                    <button style={{float:"right",borderRadius:"1rem",height:"2rem",marginLeft:"2rem",background:"DodgerBlue", color:"white"}}>Experiment systems results</button>

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
                        <button style={{background:"DodgerBlue",borderRadius:"1rem",height:"2rem", color:"white"}}>Add new Schedule</button>
                    </Link>
                    <Table data={schedules.data} style={{marginTop:"2rem"}}>
                        <Column  width={300} sort="true" resizable>
                            <HeaderCell>type</HeaderCell>
                            <Cell dataKey="@type" />
                        </Column>
                        <Column  width={350} sort="true" resizable>
                            <HeaderCell>alias</HeaderCell>
                            <Cell dataKey="alias" />
                        </Column>
                        <Column  width={150} sort="true" resizable>
                            <HeaderCell>scheduleType</HeaderCell>
                            <Cell dataKey="scheduleType" />
                        </Column>
                        <Column  width={150} sort="true" resizable>
                            <HeaderCell>testGroup</HeaderCell>
                            <Cell dataKey="testGroup" />
                        </Column>
                        <Column  width={100} sort="true" resizable>
                            <HeaderCell>Edit</HeaderCell>
                            <EditSchedule dataKey={"id"}></EditSchedule>
                        </Column>
                        {/*<Column  width={100} sort="true" resizable>*/}
                        {/*    <HeaderCell>Delete</HeaderCell>*/}
                        {/*    <DeleteScheduleCell dataKey={"id"}></DeleteScheduleCell>*/}
                        {/*</Column>*/}
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
                        <button style={{background:"DodgerBlue",borderRadius:"1rem",height:"2rem", color:"white"}}>Add new Question</button>
                    </Link>
                    <Table data={questions.data} style={{marginTop:"2rem"}}>
                        <Column  width={300} sort="true" resizable>
                            <HeaderCell>type</HeaderCell>
                            <Cell dataKey="@type" />
                        </Column>
                        <Column  width={650} sort="true" resizable>
                            <HeaderCell>alias</HeaderCell>
                            <Cell dataKey="alias" />
                        </Column>
                        <Column  width={100} sort="true" resizable>
                            <HeaderCell>Edit</HeaderCell>
                            <EditQuestion dataKey="id" />
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
                            invitations.data[i][j] = "http://localhost:3000/#/pilot/"+invitations.data[i][j]
                    }
                }
                console.log(invitations.data)
                let table = []
                table.push(<div style={{marginLeft:"6rem",marginRight:"6rem"}}>
                    <h1>Links</h1>
                    <Table data={invitations.data} style={{marginTop:"2rem"}}>
                    <Column  width={300} sort="true" resizable>
                        <HeaderCell>source</HeaderCell>
                        <Cell dataKey="source" />
                    </Column>
                    <Column  width={650} sort="true" resizable>
                        <HeaderCell>link</HeaderCell>
                        <Cell dataKey="id" />
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
        axios.post("https://localhost:8000/invitations",JSON.stringify(data),{headers: {'Content-Type': 'application/json'}}).then((res)=>{
            console.log(res)
        })
    }


    return(<div>
        <p style={{background:"#F6D420",height:"80px",marginLeft:"160px",borderRadius:"32px"}}></p>
        {/*<link to={"/evaluation"}>*/}
        {/*<button>*/}
        {/*    linklink*/}
        {/*</button>*/}
        {/*</link>*/}

        <div>{invitationInput}
            <button onClick={getInvitation} style={{float:"left",marginRight:"6rem",borderRadius:"1rem",height:"2rem",background:"DodgerBlue", color:"white"}}>Generate Link</button>
            {finished}
        </div>

        {invitationTable}

        {scheduleTable}
        {questionTable}
        <p style={{background:"#F6D420",height:"80px",marginRight:"160px",marginTop:"3rem",borderRadius:"32px"}}></p>

    </div>)

}