import React, {useEffect, useState} from "react";
import axios from "axios";
import {Affix, Checkbox} from "antd";
import { Divider, Radio, Table } from 'antd';
//import 'antd/dist/antd.css';
//import type, { ColumnsType } from 'antd/es/table';
import {Link} from "react-router-dom";
const { Column } = Table
const CheckboxGroup = Checkbox.Group;
export default function NewSchedule(){
    const [questionTable, setQuestionTable] = useState()
    const [aliasInput, setAliasInput] = useState()
    const [alias, setAlias] = useState()
    const [scheduleTypeInput, setScheduleTypeInput] = useState()
    const [scheduleType, setScheduleType] = useState("PILOT")
    const [scheduleModuleListInput, setScheduleModuleListInput] = useState()
    const [scheduleModuleList, setScheduleModuleList] = useState()
    const [testGroupInput, setTestGroupInput] = useState()
    const [testGroup, setTestGroup] = useState()
    const [stoppingCountInput, setStoppingCountInput] = useState()
    const [stoppingCount, setStoppingCount] = useState()
    const [typeInput, setTypeInput] = useState()
    const [type, setType] = useState("EarlyStoppingSchedule")
    const [questionIdList, setQuestionIdList] = useState()
    const [moduleTypeInput, setModuleTypeInput] = useState()
    const [moduleType, setModuleType] = useState("CODE")
    const [schedule, setSchedule] = useState()
    const [scheduleInput, setScheduleInput] = useState()
    const columns = [
        {
            title: 'type',
            dataIndex: '@type'
        },
        {
            title: 'alias',
            dataIndex: 'alias'
        },
        {
            title: 'Text',
            dataIndex: 'questionText'
        }
    ]
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            const idList = []
            //console.log(selectedRows)
            for (const i in selectedRows){
                //console.log(selectedRows[i])
                idList.push(selectedRows[i]["id"])
            }
            //console.log(idList)
            setQuestionIdList(idList)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };


    useEffect(()=> {
        async function fetchData() {
            const getQuestion = () => {
                return axios.get("https://localhost:8443/questions")
            }
            let questions = await getQuestion()
            const deserializeQuestion = (questions) =>{
                //console.log(questions.data)
                let table = []
                table.push(<div style={{marginLeft:"3rem",marginRight:"3rem",marginTop:"5rem",height:"30rem"}}>
                    <Table style={{marginTop:"-5rem", borderRadius:"1rem"}} rowKey={record => record.id} rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}dataSource={questions.data} columns={columns}></Table>
                </div>)
                setQuestionTable(table)
            }
            const addModule = (questionIdList) =>{
                deserializeQuestion(questions)
                console.log(questionIdList)

            }
            addModule(questions)
        }
        fetchData()

        const changeAlias=(e)=>{
            setAlias(e.target.value)
        }
        setAliasInput(<div style={{marginLeft:"3rem"}}>
        <input style={{width:"25rem",height:"1.9rem",borderRadius:"0.5rem",borderStyle:"dashed"}}onChange={changeAlias}/>
        </div>)

        const changeScheduleType=(e)=>{
            setScheduleType(e.target.value)
        }
        setScheduleTypeInput(<div style={{marginLeft:"3rem"}}>
            <select style={{width:"10.8rem",height:"1.9rem",borderRadius:"0.5rem"}} onChange={changeScheduleType}>
                <option value={"PILOT"}>PILOT</option>
                <option value={"EXPERIMENT"}>EXPERIMENT</option>
            </select>
        </div>)

        const changeTestGroup=(e)=>{
            setTestGroup(e.target.value)
        }
        setTestGroupInput(<div style={{marginLeft:"3rem"}}>
            <input style={{width:"10.8rem",borderRadius:"0.5rem"}} onChange={changeTestGroup}/>
        </div>)

        const changeStoppingCount=(e)=>{
            setStoppingCount(e.target.value)
        }
        setStoppingCountInput(<div style={{marginLeft:"3rem"}}>
            <input style={{width:"10.8rem",borderRadius:"0.5rem"}}onChange={changeStoppingCount}/>
        </div>)

        const changeType=(e)=>{
            setType(e.target.value)
        }
        setTypeInput(<div style={{marginLeft:"3rem"}}>
            <select style={{width:"10.8rem",height:"1.9rem",borderRadius:"0.5rem"}} onChange={changeType}>
                <option value={"EarlyStoppingSchedule"}>EarlyStoppingSchedule</option>
                <option value={"Schedule"}>Schedule</option>
            </select>
        </div>)

        const changeModuleType=(e)=>{
            setModuleType(e.target.value)
        }
        setModuleTypeInput(<div style={{marginLeft:"3rem"}}>
            <select style={{width:"10.8rem",height:"1.9rem",borderRadius:"0.5rem"}} onChange={changeModuleType}>
                <option value={"CODE"}>CODE</option>
                <option value={"DEMO"}>DEMO</option>
            </select>
        </div>)

        const changeSchedule=()=>{
            setSchedule([{
                alias:alias,
                "@type":type,
                testGroup:testGroup,
                stoppingCount:stoppingCount,
                scheduleType:scheduleType,
                scheduleModuleList:scheduleModuleList
            }])
            axios.post("https://localhost:8443/schedules",JSON.stringify(schedule),{headers: {'Content-Type': 'application/json'}}).then((res)=>{
                console.log(res)
            })
            console.log(schedule)
        }
        setScheduleInput(<button style={{width:"7.5rem"}} onClick={changeSchedule}>AddSchedule</button>)
    },[questionIdList,scheduleModuleList,schedule])

    const changeModuleList=()=>{
        let moduleList = []
        if (scheduleModuleList){
            moduleList = scheduleModuleList
        }
        moduleList.push({
            questionIdList:questionIdList,
            moduleType:moduleType
        })
        setScheduleModuleList(moduleList)
        console.log(scheduleModuleList)
    }
    const changeSchedule=()=>{
        setSchedule([{
            alias:alias,
            "@type":type,
            testGroup:testGroup,
            stoppingCount:stoppingCount,
            scheduleType:scheduleType,
            scheduleModuleList:scheduleModuleList
        }])
        axios.post("https://localhost:8443/schedules",JSON.stringify(schedule),{headers: {'Content-Type': 'application/json'}}).then((res)=>{
            console.log(res)
        })
        console.log(schedule)
    }

    return(<div style={{background:"#cae8d7", height:"130rem"}}>
        <Affix offsetTop={0}>
            <div style={{background:"white",height:"8rem"}}>
                <h style={{fontSize:"3rem",marginLeft:"12rem",fontFamily:"Monaco",marginTop:"1rem"}}>
                    New Schedule
                </h>
                    <button onClick={changeSchedule} style={{marginLeft:"20rem",marginTop:"-1rem",height:"3rem", width:"5rem",background:"#7f2687",color:"white"}}>Add</button>

            </div>
        </Affix>

        <div style={{height:"10rem", marginTop:"3rem"}}>
            <div >
                <div style={{float:"left", marginLeft:"16rem",height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>Alias</h1>
                    {aliasInput}
                </div>
                <div style={{float:"left", marginLeft:"16rem",height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>scheduleType</h1>
                    {scheduleTypeInput}
                </div>
                <div style={{float:"left", marginLeft:"16rem",height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>testGroup</h1>
                    {testGroupInput}
                </div>
                <div style={{float:"left", marginLeft:"16rem",height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>stoppingCount</h1>
                    {stoppingCountInput}
                </div>
                <div style={{float:"left", marginLeft:"16rem",height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>type</h1>
                    {typeInput}
                </div>
                <div style={{float:"left", marginLeft:"16rem",height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>moduleType</h1>
                    {moduleTypeInput}
                </div>



                {/*{scheduleTypeInput}*/}
                {/*{testGroupInput}*/}
                {/*{stoppingCountInput}*/}
                {/*{typeInput}*/}
                {/*{moduleTypeInput}*/}
            </div>
    </div >
    <div>


        <div style={{float:"left", marginLeft:"16rem",height:"auto",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
            <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
            <div style={{float:"left"}}><h1 style={{marginLeft:"3rem"}}>Questions</h1></div>
            <div>
                <button onClick={changeModuleList}style={{marginLeft:"20rem",marginTop:"-1rem",height:"3rem", width:"5rem",background:"#7f2687",color:"white"}} >add module
                </button>
            </div>

            {questionTable}
        </div>

        {/*<div style={{marginLeft:"75.5rem",marginRight:"9rem"}}>*/}
        {/*    {scheduleModuleListInput}*/}
        {/*</div>*/}
        {/*<div style={{marginLeft:"75.5rem",marginRight:"9rem"}}>*/}
        {/*    {scheduleInput}*/}
        {/*</div>*/}
    </div>
    </div>)
}
