import React, {useEffect, useState} from "react";
import axios from "axios";
import {Checkbox} from "antd";
import { Divider, Radio, Table } from 'antd';
import 'antd/dist/antd.css'

import type, { ColumnsType } from 'antd/es/table';
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
                return axios.get("https://localhost:8000/questions")
            }
            let questions = await getQuestion()
            const deserializeQuestion = (questions) =>{
                //console.log(questions.data)
                let table = []
                table.push(<div style={{marginLeft:"17rem",marginRight:"6rem",marginTop:"2rem"}}>
                    <h1 style={{marginTop:"3rem"}}>QuestionList</h1>
                    <Divider></Divider>
                    <Table style={{marginTop:"3rem"}} rowKey={record => record.id} rowSelection={{
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
        setAliasInput(<div>
            <h2>Alias</h2>
        <input style={{width:"10.8rem"}}onChange={changeAlias}/>
        </div>)

        const changeScheduleType=(e)=>{
            setScheduleType(e.target.value)
        }
        setScheduleTypeInput(<div>
            <h2>Schedule Type</h2>
            <select style={{width:"10.8rem",height:"1.9rem"}} onChange={changeScheduleType}>
                <option value={"PILOT"}>PILOT</option>
                <option value={"EXPERIMENT"}>EXPERIMENT</option>
            </select>
        </div>)

        const changeTestGroup=(e)=>{
            setTestGroup(e.target.value)
        }
        setTestGroupInput(<div>
            <h2>Test Group</h2>
            <input style={{width:"10.8rem"}} onChange={changeTestGroup}/>
        </div>)

        const changeStoppingCount=(e)=>{
            setStoppingCount(e.target.value)
        }
        setStoppingCountInput(<div>
            <h2>Stopping Count</h2>
            <p>number or empty</p>
            <input style={{width:"10.8rem"}}onChange={changeStoppingCount}/>
        </div>)

        const changeType=(e)=>{
            setType(e.target.value)
        }
        setTypeInput(<div>
            <h2>Type</h2>
            <select style={{width:"10.8rem",height:"1.9rem"}} onChange={changeType}>
                <option value={"EarlyStoppingSchedule"}>EarlyStoppingSchedule</option>
                <option value={"Schedule"}>Schedule</option>
            </select>
        </div>)

        const changeModuleType=(e)=>{
            setModuleType(e.target.value)
        }
        setModuleTypeInput(<div>
            <h2>ModuleType</h2>
            <select style={{width:"10.8rem",height:"1.9rem"}} onChange={changeModuleType}>
                <option value={"CODE"}>CODE</option>
                <option value={"DEMO"}>DEMO</option>
            </select>
        </div>)

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
        setScheduleModuleListInput(<button style={{width:"7.5rem"}} onClick={changeModuleList}>AddModule</button>)

        const changeSchedule=()=>{
            setSchedule([{
                alias:alias,
                "@type":type,
                testGroup:testGroup,
                stoppingCount:stoppingCount,
                scheduleType:scheduleType,
                scheduleModuleList:scheduleModuleList
            }])
            axios.post("https://localhost:8000/schedules",JSON.stringify(schedule),{headers: {'Content-Type': 'application/json'}}).then((res)=>{
                console.log(res)
            })
            console.log(schedule)
        }
        setScheduleInput(<button style={{width:"7.5rem"}} onClick={changeSchedule}>AddSchedule</button>)
    },[questionIdList,scheduleModuleList,schedule])
    return(<div><p style={{background:"#F6D420",height:"80px",marginLeft:"160px",borderRadius:"32px"}}></p>
        <div style={{float:"left",marginLeft:"2rem",height:"10rem",marginTop:"2rem"}}>
            <h1>NewSchedule</h1>
            <Divider style={{marginTop:"7.5rem"}}></Divider>
            <div >
                {aliasInput}
                {scheduleTypeInput}
                {testGroupInput}
                {stoppingCountInput}
                {typeInput}
                {moduleTypeInput}
            </div>
    </div >
    <div>
    {questionTable}
        <div style={{marginLeft:"75.5rem",marginRight:"9rem"}}>
            {scheduleModuleListInput}
        </div>
        <div style={{marginLeft:"75.5rem",marginRight:"9rem",marginTop:"1rem"}}>
            {scheduleInput}
        </div>
    </div>
        <p style={{background:"#F6D420",height:"80px",marginRight:"160px",marginTop:"15rem",borderRadius:"32px"}}></p>
    </div>)
}
