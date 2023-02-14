import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import 'rsuite-table/dist/css/rsuite-table.css';
import {Affix, Button, Input, Modal, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export default function ShowSchedules(){
    // const originUrl = 'https://zest-survey-platform.ifi.uzh.ch/api/'
    const originUrl = "http://localhost:8080/"
    const [id, setId] = useState()
    const [questions, setQuestions] = useState()
    const [data, setData] = useState([])
    const [questionTable, setQuestionTable] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState('failed')
    const [alias, setAlias] = useState()
    const params = useParams()
    const [scheduleType, setScheduleType] = useState("PILOT")
    const [testGroup, setTestGroup] = useState()
    const [stoppingCount, setStoppingCount] = useState()
    const [type, setType] = useState("EarlyStoppingSchedule")
    const [moduleType, setModuleType] = useState("CODE")
    const [scheduleModuleList, setScheduleModuleList] = useState()
    const [questionIdList, setQuestionIdList] = useState()
    const [choices, setChoices] = useState([])
    const [showQuestionPart, setShowQuestionPart] = useState(false);

    const handleDeleteChoice = (index) =>{
        setChoices(choices.filter((choice,i)=>i!==index))
        setScheduleModuleList(scheduleModuleList.filter((module,i)=>i!=index))
    }

    const columns = [
        {title: 'type',
            dataIndex: '@type',},
        {title: 'alias',
            dataIndex: 'alias',
            // ...getColumnSearchProps()
        },
        {title: 'Text',
            dataIndex: 'questionText'}
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



    useEffect(()=>{
        async function fetchData(){
            const result = await axios.get(originUrl+"schedules/"+params['name'])
            setData(result.data)
            //console.log(result.data['scheduleModuleList'][1]['moduleType'])
            setId(result.data['id'])
            setAlias(result.data['alias'])
            setType(result.data['@type'])
            setTestGroup(result.data['testGroup'])
            setStoppingCount(result.data['stoppingCount'])
            setScheduleType(result.data['scheduleType'])
            setScheduleModuleList(result.data['scheduleModuleList'])
            if (result.data['scheduleModuleList'] != null){
                for (let i = 0; i < result.data['scheduleModuleList'].length;i++){
                    setChoices([...choices,'module'+result.data['scheduleModuleList'][i]['moduleType']])
                }
            }
            console.log(result.data)
            const getQuestion = () => {return axios.get(originUrl+"questions")}
            let questions = await getQuestion()
            setQuestions(questions.data)
            const deserializeQuestion = (questions) =>{
                console.log(questions.data)
                let table = []
                table.push(<div style={{marginLeft:"3rem",marginRight:"3rem",marginTop:"5rem",height:"auto"}}>
                    <Table style={{marginTop:"-5rem", borderRadius:"1rem"}} rowKey={record => record.id} rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}dataSource={questions.data} columns={columns}></Table></div>)
                setQuestionTable(table)
            }
            const addModule = (questionIdList) =>{
                deserializeQuestion(questions)
                console.log(questionIdList)
            }
            addModule(questions)
        }
        fetchData()
    },[])



    console.log(data)



    const changeModuleList=()=>{
        let moduleList = []
        if (scheduleModuleList){moduleList = scheduleModuleList}

        moduleList.push({
            questionIdList:questionIdList,
            moduleType:moduleType})

        setScheduleModuleList(moduleList)
        console.log(scheduleModuleList)
        setChoices([...choices, 'module'+moduleType])
    }

    const changeSchedule=()=>{
        let schedule
        schedule = ([{
            id:id,
            alias:alias,
            "@type":type,
            testGroup:testGroup,
            stoppingCount:stoppingCount,
            scheduleType:scheduleType,
            scheduleModuleList:scheduleModuleList
        }])
        axios.post(originUrl+"schedules",JSON.stringify(schedule),{headers: {'Content-Type': 'application/json'}}).then((res)=>{
            console.log(res)
            if (res.status == 200){
                setMessage('successful')}
        })
        console.log(schedule)
    }
    const showModal = () => {
        changeSchedule()
        setIsModalVisible(true);};

    const handleOk = () => {
        window.history.back(-1)
        setIsModalVisible(false);};

    const handleCancel = () => {setIsModalVisible(false);};
    const findQuestions = () =>{
        console.log(questions)
        let question = questions.filter((choice)=>choice['@type']==moduleType)
        console.log(question)
        let table = []
        table.push(<div style={{marginLeft:"3rem",marginRight:"3rem",marginTop:"5rem",height:"auto"}}>
            <Table style={{marginTop:"-5rem", borderRadius:"1rem"}} rowKey={record => record.id} rowSelection={{
                type: "checkbox",
                ...rowSelection,
            }}dataSource={question} columns={columns}></Table></div>)
        setQuestionTable(table)
        console.log(table)
        setShowQuestionPart(true)
    }


    return(<div style={{background:"#cae8d7", height:"150rem"}}>
        <Affix offsetTop={0}>
                <div style={{background:"white",height:"8rem"}}>
                    <div style={{position:"absolute", marginLeft:"50%"}}>

                    <h style={{fontSize:"3rem",marginLeft:"-10rem",fontFamily:"Monaco",marginTop:"1rem"}}>
                        Details</h>
                    <button onClick={showModal} style={{marginLeft:"20rem",marginTop:"-1rem",height:"3rem", width:"5rem",background:"#7f2687",color:"white"}}>Add</button>
                    <Modal title={"Add message"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p>{message}</p></Modal>
                </div>
            </div>

        </Affix>
        <div style={{height:"10rem", marginTop:"3rem"}}>
            <div style={{display:"flex", justifyContent:"centre", flexDirection:"column", alignItems:"space-around", position:"absolute", marginLeft:"50%"}}>
                <div style={{height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>Alias</h1>
                    <div style={{marginLeft:"3rem"}}>
                        <input style={{width:"25rem",height:"1.9rem",borderRadius:"0.5rem",borderStyle:"dashed"}}defaultValue={data['alias']} onChange={(e)=>setAlias(e.target.value)}/></div></div>
                {/*    </div>*/}
                {/*</div>*/}
                {/*    </div>*/}
        {/*</div>*/}
                <div style={{height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>scheduleType</h1>
                    <div style={{marginLeft:"3rem"}}>
                        <select style={{width:"10.8rem",height:"1.9rem",borderRadius:"0.5rem"}}defaultValue={data['scheduleTyoe']} onChange={(e)=>setScheduleType(e.target.value)}>
                            <option value={"PILOT"}>PILOT</option>
                            <option value={"EXPERIMENT"}>EXPERIMENT</option></select></div></div>

                <div style={{height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>testGroup</h1>
                    <div style={{marginLeft:"3rem"}}>
                        <input style={{width:"10.8rem",borderRadius:"0.5rem"}}defaultValue={data['testGroup']} onChange={(e)=>setTestGroup(e.target.value)}/></div></div>

                <div style={{height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>stoppingCount</h1>
                    <div style={{marginLeft:"3rem"}}><input style={{width:"10.8rem",borderRadius:"0.5rem"}}defaultValue={data['stoppingCount']} onChange={(e)=>setStoppingCount(e.target.value)}/></div></div>

                <div style={{height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>type</h1>
                    <div style={{marginLeft:"3rem"}}>
                        <select style={{width:"10.8rem",height:"1.9rem",borderRadius:"0.5rem"}}defaultValue={data['@type']} onChange={(e)=>setType(e.target.value)}>
                            <option value={"EarlyStoppingSchedule"}>EarlyStoppingSchedule</option>
                            <option value={"Schedule"}>Schedule</option></select></div></div>

                <div style={{height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem", display:"inline-block"}}>moduleType</h1>
                    <button onClick={findQuestions} style={{display:"inline-block", marginLeft:"10px"}}>find questions</button>
                    <br/>
                    <div style={{marginLeft:"3rem"}}>
                        <select style={{width:"10.8rem",height:"1.9rem",borderRadius:"0.5rem"}} onChange={(e)=>setModuleType(e.target.value)}>
                            <option value={"CODE"}>CODE</option>
                            <option value={"DEMO"}>DEMO</option></select></div></div>

                <div style={{height:"auto",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <div style={{float:"left"}}><h1 style={{marginLeft:"3rem"}}>Questions</h1></div>
                    <div>
                        <button onClick={changeModuleList} style={{marginLeft:"20rem",marginTop:"-1rem",height:"auto", width:"5rem",background:"#7f2687",color:"white"}} >add module</button></div>
                    {questionTable}
                </div>
                <div style={{height:"auto",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <div >
                        <h1 style={{marginLeft:"3rem"}}>Modules</h1></div>
                    <div style={{marginLeft:"3rem"}}>
                        {choices.length>0 &&(
                            <div>
                                <ul>
                                    {choices.map((module, index)=>(
                                        <li key={index}>
                                            {module}
                                            <button onClick={()=>handleDeleteChoice(index)}>delete</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    </div>)

}
