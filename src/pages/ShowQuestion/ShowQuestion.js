import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Modal} from 'antd'
import 'rsuite-table/dist/css/rsuite-table.css';
import {Affix} from "antd";
import {DEFAULT_URL} from "../../Components/Url";

export default function ShowQuestion(){
   // const originUrl = 'https://zest-survey-platform.ifi.uzh.ch/api/'
    const originUrl = DEFAULT_URL
    const [id, setId] = useState()
    const [data, setData] = useState([])
    const [question, setQuestion] = useState()
    const [type, setType] = useState()
    const [questionText, setQuestionText] = useState()
    const [questionChoiceType, setQuestionChoiceType] = useState("MULTI_CHOICE")
    const [alias, setAlias] = useState()
    const [exposureTime, setExposureTime] = useState(0)
    const [codeText, setCodeText] = useState()
    const [codeType, setCodeType] = useState("java")
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [message, setMessage] = useState('failed')
    const params = useParams()
    const [showChangeType, setShowChangeType] = useState(false)
    const [selectedOption, setSelectedOption] = useState("DemographicQuestion")
    const [choices, setChoices] = useState([])
    const [choice, setChoice] = useState('')
    const handleAddChoice = () => {
        setChoices([...choices, choice])
        setChoice('')}
    const handleDeleteChoice = (index) =>{
        setChoices(choices.filter((choice,i)=>i!==index))}
    useEffect(()=>{
        async function fetchData(){
            const result = await axios.get(originUrl+"questions/"+params['name'])
            setData(result.data)
            setChoices(result.data['questionChoices'])
            console.log(result.data)
            if (result.data['@type'] == "DemographicQuestion"){
                setId(result.data['id'])
                setAlias(result.data['alias'])
                setQuestionText(result.data['questionText'])
                setType('DemographicQuestion')
                setQuestionChoiceType(result.data['questionChoiceType'])}

            else if (result.data['@type'] == "CodeEvaluation"){
                setId(result.data['id'])
                setAlias(result.data['alias'])
                setQuestionText(result.data['questionText'])
                setType('CodeEvaluation')
                setQuestionChoiceType(result.data['questionChoiceType'])
                setExposureTime(result.data['exposureTime'])
                setCodeText(result.data['codeText'])
                setCodeType(result.data['codeType'])}
        }
        fetchData()
    },[])



    console.log(choices)
    const changeQuestion=()=>{
        console.log(choices)
        let question
        console.log(type)
        if (type == "DemographicQuestion"){
            question = ([{
                id:id,
                alias:alias,
                "@type":"DemographicQuestion",
                questionText:questionText,
                questionChoiceType:questionChoiceType,
                questionChoices:choices}])}
        else if (type == "CodeEvaluation"){
            question = ([{
                id:id,
                alias:alias,
                "@type":"CodeEvaluation",
                questionText:questionText,
                questionChoiceType:questionChoiceType,
                questionChoices:choices,
                exposureTime:exposureTime,
                codeText:codeText,
                codeType:codeType}])}
        console.log(question)
        axios.post(originUrl+"questions",JSON.stringify(question),{headers: {'Content-Type': 'application/json'}}).then((res)=>{
            console.log(res)
            if (res.status == 200)
                setMessage('successful')})
        console.log(question)
    }

    const showModal = () => {
        changeQuestion()
        setIsModalVisible(true);};
    const handleOk = () => {window.history.back(-1)
        setIsModalVisible(false);};
    const handleCancel = () => {setIsModalVisible(false);};
    const handleOptionChange = (event) =>{setSelectedOption(event.target.value);
        setType(event.target.value)}
    console.log(data['@type'])
    return(
        <div style={{backgroundColor:"#cae8d7", height:"130rem"}}>
            <Affix offsetTop={0}>
                <div style={{background:"white",height:"8rem"}}>
                    <div style={{position:"absolute", marginLeft:"50%"}}>
                        <h style={{fontSize:"3rem",marginLeft:"-10rem",fontFamily:"Monaco",marginTop:"1rem"}}>
                            Details</h>
                        <Modal title={"Add message"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <p>{message}</p></Modal></div></div></Affix>

            <div style={{display:"flex", justifyContent:"centre", flexDirection:"column", alignItems:"space-around", position:"absolute", marginLeft:"50%"}}>
                <div style={{float:"left", marginLeft:"-20rem",height:"8rem",marginTop:"2rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                    <h1 style={{marginLeft:"3rem"}}>QuestionType</h1>
                    <div style={{float:"left"}}>
                        <div style={{marginLeft:"3rem"}}>
                            <p style={{width:"10.8rem"}}>{data['@type']}</p></div></div>
                    <div>
                        {data['@type'] == "DemographicQuestion"?(
                            <div style={{ marginTop:"4.5rem"}}>
                                <div style={{height:"8rem",marginTop:"3rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                                    <h1 style={{marginLeft:"3rem"}}>Alias</h1>
                                    <input style={{marginLeft:"3rem",width:"25rem",height:"1.9rem",borderRadius:"0.5rem",borderStyle:"dashed",}}defaultValue={data['alias']} onChange={(e)=>setAlias(e.target.value)}/></div>
                                <div style={{height:"10rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                                    <h1 style={{marginLeft:"3rem"}}>QuestionText</h1>
                                    <input  style={{marginLeft:"3rem",width:"25rem",height:"3rem",borderRadius:"0.5rem",borderStyle:"dashed"}}defaultValue={data['questionText']} onChange={(e)=>setQuestionText(e.target.value)}/></div>
                                <div style={{height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                                    <h1 style={{marginLeft:"3rem"}}>questionChoicesType</h1>
                                        <p style={{marginLeft:"3rem", display:"inline-block"}}>{data['questionChoiceType']}</p>
                                        <button style={{display:"inline-block"}} onClick={()=>setShowChangeType(true)}> change type</button>

                                    </div>
                                {showChangeType &&<div style={{
                                    height: "8rem",
                                    marginTop: "1rem",
                                    width: "40rem",
                                    background: "white",
                                    borderRadius: "1rem"
                                }}>
                                    <p style={{background: "#118847", height: "1rem", borderRadius: "1rem"}}></p>
                                    <h1 style={{marginLeft: "3rem"}}>change question choices type</h1>
                                    <select style={{
                                        marginLeft: "3rem",
                                        width: "10.8rem",
                                        height: "1.9rem",
                                        borderRadius: "0.5rem",
                                        borderStyle: "solid"
                                    }} defaultValue={data['questionChoicesType']}
                                            onChange={(e) => setQuestionChoiceType(e.target.value)}>
                                        <option value={"MULTI_CHOICE"}>multi_choice</option>
                                        <option value={"SINGLE_CHOICE"}>single_choice</option>
                                        <option value={"TEXT"}>text</option>
                                        <option value={"SCALE_CHOICE"}>scale_choice</option>
                                    </select>
                                </div>}

                                <div style={{height:"auto",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                                    <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                                    <h1 style={{marginLeft:"3rem"}}>questionChoices</h1>
                                    <div style={{marginLeft:"3rem"}}>
                                        <input style={{borderRadius:"0.5rem", width:"20rem", height:"2.5rem"}} type={"text"} value={choice} onChange={(e)=>setChoice(e.target.value)}/>
                                        <button style={{background: "#7f2687", color:"white", borderRadius:"1rem", marginLeft:"2rem"}} onClick={handleAddChoice}>add choice</button>
                                        <ul>
                                            {choices.map((choice, index)=>(
                                                <li key={index}>
                                                    <button style={{background: "#7f2687", color:"white", borderRadius:"1rem", marginRight:"3rem"}} onClick={()=>handleDeleteChoice(index)}>Delete</button>
                                                    {choice}{''}
                                                </li>))}
                                        </ul>
                                    </div>
                                    <p style={{height:"1rem"}}></p>
                                </div>
                                <div style={{height:"auto",marginTop:"5rem",width:"40rem",borderRadius:"1rem"}}>
                                    <button onClick={showModal} style={{marginTop:"-1rem",height:"3rem", width:"5rem",background:"#7f2687",color:"white"}}>Add</button>
                                </div>
                            </div>
                        ):(<div style={{marginTop:"4.5rem"}}>
                            <div style={{height:"10rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                                <h1 style={{marginLeft:"3rem"}}>Alias</h1>
                                <input style={{marginLeft:"3rem",width:"25rem",height:"1.9rem",borderRadius:"0.5rem",borderStyle:"dashed"}}defaultValue={data['alias']} onChange={(e)=>setAlias(e.target.value)}/></div>
                            <div style={{height:"10rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                                <h1 style={{marginLeft:"3rem"}}>QuestionText</h1>
                                <input  style={{marginLeft:"3rem",width:"25rem",height:"3rem",borderRadius:"0.5rem",borderStyle:"dashed"}}defaultValue={data['questionText']} onChange={(e)=>setQuestionText(e.target.value)}/></div>
                            <div style={{height:"10rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                                <h1 style={{marginLeft:"3rem"}}>questionChoicesType</h1>
                                <p style={{marginLeft:"3rem"}}>scale_choice</p></div>
                            <div style={{height:"auto",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem",position:"unset"}}>
                                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                                <div style={{marginLeft:"3rem"}}>
                                    <h1>questionChoices</h1></div>
                                <p style={{marginLeft:"3rem"}}>The choices for this type of question are defined as follows.</p>
                                <p style={{marginLeft:"3rem"}}>choice1: 1</p>
                                <p style={{marginLeft:"3rem"}}>choice2: 2</p>
                                <p style={{marginLeft:"3rem"}}>choice3: 3</p>
                                <p style={{marginLeft:"3rem"}}>choice4: 4</p>
                                <p style={{marginLeft:"3rem"}}>choice5: 5</p>
                                <p style={{marginLeft:"3rem"}}>choice6: can not tell</p></div>
                            <div style={{height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                                <h1 style={{marginLeft:"3rem"}}>exposuretime</h1>
                                <input style={{marginLeft:"3rem",width: "25rem", height: "1.9rem", borderRadius: "0.5rem", borderStyle: "dashed"}}defaultValue={data['exposureTime']} onChange={(e)=>setExposureTime(e.target.value)}/></div>
                            <div style={{height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                                <h1 style={{marginLeft:"3rem"}}>codeType</h1>
                                <select style={{marginLeft:"3rem",width: "10.8rem", height: "1.9rem", borderRadius: "0.5rem", borderStyle: "solid"}}defaultValue={data['codeType']} onChange={(e)=>setCodeType(e.target.value)}>
                                    <option value={"java"}>Java</option>
                                    <option value={"C++"}>C++</option>
                                    <option value={"python"}>Python</option></select></div>
                            <div style={{height:"auto",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                                <h1 style={{marginLeft:"3rem"}}>codeText</h1>
                                <textarea style={{marginLeft:"3rem",width: "30rem", height: "20rem", borderRadius: "0.5rem", borderStyle: "dashed"}}defaultValue={data['codeText']} onChange={(e)=>setCodeText(e.target.value)}/></div>
                            <div style={{height:"auto",marginTop:"5rem",width:"40rem",borderRadius:"1rem"}}>
                                <button onClick={showModal} style={{marginTop:"-1rem",height:"3rem", width:"5rem",background:"#7f2687",color:"white"}}>Add</button>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}