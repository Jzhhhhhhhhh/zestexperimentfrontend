import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {Affix, Modal, Table, Input, Space, Button} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export default function NewSchedule(){
    const originUrl = 'https://zest-survey-platform.ifi.uzh.ch/api/'
    // const originUrl = "http://localhost:8080/"
    const [questionTable, setQuestionTable] = useState()
    const [questions, setQuestions] = useState()
    const [alias, setAlias] = useState()
    const [scheduleType, setScheduleType] = useState("PILOT")
    const [scheduleModuleList, setScheduleModuleList] = useState([])
    const [testGroup, setTestGroup] = useState()
    const [stoppingCount, setStoppingCount] = useState()
    const [type, setType] = useState("EarlyStoppingSchedule")
    const [questionIdList, setQuestionIdList] = useState()
    const [moduleType, setModuleType] = useState("CODE")
    const [schedule, setSchedule] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState('failed')
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [choices, setChoices] = useState([])
    const [choice, setChoice] = useState('')

    const [showQuestionPart, setShowQuestionPart] = useState(false);
    const [showStoppingCount, setShowStoppingCount] = useState(true);

    const handleDeleteChoice = (index) =>{
        setChoices(choices.filter((choice,i)=>i!==index))
        setScheduleModuleList(scheduleModuleList.filter((module,i)=>i!=index))}

    const handleSearch = (
        selectedKeys: string,
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (alias) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${alias}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, alias)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, alias)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    {/*<Button*/}
                    {/*    type="link"*/}
                    {/*    size="small"*/}
                    {/*    onClick={() => {*/}
                    {/*        confirm({ closeDropdown: false });*/}
                    {/*        setSearchText((selectedKeys)[0]);*/}
                    {/*        setSearchedColumn(dataIndex);*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Filter*/}
                    {/*</Button>*/}
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>{
            if (record[alias]){
                record[alias].toString().toLowerCase().includes((value.toString()).toLowerCase())
            }
        },
            // ,
    onFilterDropdownOpenChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
        }
    },
        render: (text) =>
        searchedColumn === alias ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        ),
});
    const columns = [
        {title: 'type',
            dataIndex: '@type',},
        {title: 'alias',
            dataIndex: 'alias',
            ...getColumnSearchProps()},
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

    useEffect(()=> {
        async function fetchData() {
            const getQuestion = () => {return axios.get(originUrl+"questions")}
            let question = await getQuestion()
            setQuestions(question.data)

            const deserializeQuestion = (questions) =>{
                //console.log(questions.data)
                let table = []
                table.push(<div style={{marginLeft:"3rem",marginRight:"3rem",marginTop:"5rem",height:"auto"}}>
                    <Table style={{marginTop:"-5rem", borderRadius:"1rem"}} rowKey={record => record.id} rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}dataSource={questions.data} columns={columns}></Table></div>)
                setQuestionTable(table)
            }
            deserializeQuestion(question)
            // const addModule = (questionIdList) =>{
            //     deserializeQuestion(question)
            //     console.log(questionIdList)
            // }
            // addModule(question)
        }
        fetchData()
    },[])

    const changeModuleList=()=>{
        let moduleList = []
        if (scheduleModuleList){moduleList = scheduleModuleList}
        moduleList.push({
            questionIdList:questionIdList,
            moduleType:moduleType})
        setScheduleModuleList(moduleList)
        console.log(scheduleModuleList)
        setChoices([...choices,'module:'+moduleType])
    }
    const changeSchedule=()=>{
        let schedule = [{
            alias:alias,
            "@type":type,
            testGroup:testGroup,
            stoppingCount:stoppingCount,
            scheduleType:scheduleType,
            scheduleModuleList:scheduleModuleList
        }]
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



    return(<div style={{background:"#cae8d7", height:"130rem"}}>
        <Affix offsetTop={0}>
            <div style={{background:"white",height:"8rem"}}>
                <div style={{marginLeft:"50%"}}>
                    <h style={{fontSize:"3rem",fontFamily:"Monaco",marginTop:"1rem",marginLeft:"-8rem"}}>
                        New Plan</h>
                    <button onClick={showModal} style={{marginLeft:"20rem",marginTop:"-1rem",height:"3rem", width:"5rem",background:"#7f2687",color:"white"}}>Add</button>
                    <Modal title={"Add message"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p>{message}</p></Modal></div></div>
        </Affix>

        <div style={{height:"10rem", marginTop:"3rem"}}>
            <div style={{display:"flex", justifyContent:"centre", flexDirection:"column", alignItems:"space-around", position:"absolute", marginLeft:"50%"}}>
                <div style={{height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>Alias</h1>
                    <div style={{marginLeft:"3rem"}}>
                        <input style={{width:"25rem",height:"1.9rem",borderRadius:"0.5rem",borderStyle:"dashed"}}onChange={(e)=>setAlias(e.target.value)}/></div></div>

                <div style={{height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>testGroup</h1>
                    <div style={{marginLeft:"3rem"}}>
                        <input style={{width:"10.8rem",borderRadius:"0.5rem"}} onChange={(e)=>setTestGroup(e.target.value)}/></div></div>

                <div style={{height:"10.5rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem", display:"inline-block"}}>scheduleType</h1>
                    <p style={{marginLeft:"3rem"}}>If scheduleType is pilot, the first module should be a code evaluation module.</p>
                    <div style={{marginLeft:"3rem"}}>
                        <select style={{width:"10.8rem",height:"1.9rem",borderRadius:"0.5rem"}} onChange={(e)=>setScheduleType(e.target.value)}>
                            <option value={"PILOT"}>PILOT</option>
                            <option value={"EXPERIMENT"}>EXPERIMENT</option></select>

                    </div>

                </div>



                <div style={{height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem", display:"inline-block"}}>type</h1>
                    <div style={{marginLeft:"3rem"}}>
                        <select style={{width:"10.8rem",height:"1.9rem",borderRadius:"0.5rem"}} onChange={(e)=> {
                            setType(e.target.value)
                            if (e.target.value == "Schedule"){
                                setShowStoppingCount(false)
                            }
                            else{
                                setShowStoppingCount(true)
                            }
                        }}>
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

                {showQuestionPart &&<div style={{
                    height: "auto",
                    marginTop: "1rem",
                    width: "40rem",
                    background: "white",
                    borderRadius: "1rem",
                    marginLeft: "-20rem"
                }}>
                    <p style={{background: "#118847", height: "1rem", borderRadius: "1rem"}}></p>
                    <div style={{float: "left"}}><h1 style={{marginLeft: "3rem"}}>Questions</h1></div>
                    <div>
                        <button onClick={changeModuleList} style={{
                            marginLeft: "20rem",
                            marginTop: "-1rem",
                            height: "auto",
                            width: "5rem",
                            background: "#7f2687",
                            color: "white"
                        }}>add module
                        </button>
                    </div>
                    {questionTable}

                </div>}
                <div style={{height:"auto",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>Modules</h1>
                    <div style={{marginLeft:"3rem"}}>
                        {choices.length>0 &&(<div>
                            <ul>{choices.map((module, index)=>(
                                <li key={index}>
                                    {module}
                                    <button onClick={()=>handleDeleteChoice(index)}>delete</button>
                                </li>))}
                            </ul>
                        </div>)}
                    </div>
                    <p style={{height:"1rem"}}></p>
                </div>
                {showStoppingCount &&
                <div style={{height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem", marginLeft:"-20rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>stoppingCount</h1>
                    <div style={{marginLeft:"3rem"}}><input style={{width:"10.8rem",borderRadius:"0.5rem"}}onChange={(e)=>setStoppingCount(e.target.value)}/></div></div>
                }

            </div>
    </div >
    <div>
    </div>
    </div>)
}