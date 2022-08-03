import React, {useEffect, useState} from "react";
import axios from "axios";
import {Checkbox} from "antd";
import { Divider, Radio, Table } from 'antd';
import 'antd/dist/antd.css'
import {Link} from "react-router-dom";

export default function NewQuestions(){
    const [question, setQuestion] = useState()
    const [type, setType] = useState("DemographicQuestion")
    const [questionText, setQuestionText] = useState()
    const [questionChoiceType, setQuestionChoiceType] = useState("MULTI_CHOICE")
    const [questionChoices, setQuestionChoices] = useState()
    const [alias, setAlias] = useState()
    const [typeInput, setTypeInput] = useState()
    const [questionTextInput, setQuestionTextInput] = useState()
    const [questionChoiceTypeInput, setQuestionChoiceTypeInput] = useState()
    const [questionChoicesInput, setQuestionChoicesInput] = useState()
    const [aliasInput, setAliasInput] = useState()
    const [questionTable, setQuestionTable] = useState()
    const [exposureTimeInput, setExposureTimeInput] = useState()
    const [exposureTime, setExposureTime] = useState(0)
    const [codeTextInput, setCodeTextInput] = useState()
    const [codeText, setCodeText] = useState()
    const [codeTypeInput, setCodeTypeInput] = useState()
    const [codeType, setCodeType] = useState("java")
    const columns = [
        {title:"name",
            dataIndex: "name",
            width:60},
        {title:"info",
        dataIndex:"info"}]


    const demoData = [{
        name:"alias",
        info:aliasInput},
        {
            name:"questionText",
            info:questionTextInput},
        {
            name:"questionChoicesType",
            info:questionChoiceTypeInput},
        {name:"questionChoices",
        info:questionChoicesInput}]

    const codeData = [
        {
            name:"alias",
            info:aliasInput},
        {
            name:"exposureTime",
            info:exposureTimeInput
        },
        {
            name:"questionChoiceType",
            info:questionChoiceTypeInput
        },
        {
            name:"codeType",
            info:codeTypeInput
        },
        {
            name:"questionChoices",
            info:questionChoicesInput
        },
        {
            name:"questionText",
            info:questionTextInput
        },
        {
            name:"codeText",
            info:codeTextInput
        }
    ]


    const insertInfo=()=>{
        if (type == "DemographicQuestion"){
            let table = []
            table.push(<div style={{marginLeft:"17rem",marginRight:"6rem",marginTop:"2rem"}}>
                <h1 style={{marginTop:"3rem"}}>Question</h1>
                <Divider></Divider>
                <Table columns={columns} dataSource={demoData} pagination={false}>
            </Table>
                </div>)
            setQuestionTable(table)
        }
        else if (type == "CodeEvaluation"){
            let table = []
            // setQuestionChoiceType("SCALE_CHOICE")
            // setQuestionChoiceTypeInput("scale_choice")
            // setQuestionChoices("1","2","3","4","5","can not tell")
            // setQuestionChoicesInput("1,2,3,4,5,can not tell")
            table.push(<div style={{marginLeft:"17rem",marginRight:"6rem",marginTop:"2rem"}}>
                <h1 style={{marginTop:"3rem"}}>Question</h1>
                <Divider></Divider>
                <Table columns={columns} dataSource={codeData} pagination={false}>
            </Table>
            </div>)
            setQuestionTable(table)
        }
    }
    useEffect(()=>{
        const changeAlias=(e)=>{
            setAlias(e.target.value)
        }
        setAliasInput(<div>
            <input style={{width:"55rem"}} onChange={changeAlias}/>
        </div>)

        const changeType=(e)=>{
            setType(e.target.value)
        }
        setTypeInput(<div>
            <select style={{width:"10.8rem",height:"1.9rem"}}onChange={changeType}>
                <option value={"DemographicQuestion"}>DemographicQuestion</option>
                <option value={"CodeEvaluation"}>CodeEvaluation</option>
            </select>
        </div>)

        const changeQuestionText=(e)=>{
            setQuestionText(e.target.value)
        }
        setQuestionTextInput(<div>
            <input  style={{width:"55rem", height:"6rem"}}onChange={changeQuestionText}/>
        </div>)

        const changeQuestionChoiceType=(e)=>{
            setQuestionChoiceType(e.target.value)
        }
        setQuestionChoiceTypeInput(<div>
            <select style={{width:"10.8rem",height:"1.9rem"}} onChange={changeQuestionChoiceType}>
                <option value={"MULTI_CHOICE"}>multi_choice</option>
                <option value={"SINGLE_CHOICE"}>single_choice</option>
                <option value={"TEXT"}>text</option>
                <option value={"SCALE_CHOICE"}>scale_choice</option>
            </select>
        </div>)

        const changeExposureTime=(e)=>{
            setExposureTime(e.target.value)
        }
        setExposureTimeInput(<div>
            <input style={{width:"55rem"}}onChange={changeExposureTime}/>
        </div>)

        const changeQuestionChoices=(e)=>{
            setQuestionChoices(e.target.value)
        }
        if (questionChoiceType == "TEXT"){
            setQuestionChoicesInput(<div>
            </div>)
        }
        else if (questionChoiceType == "SCALE_CHOICE"){
            setQuestionChoicesInput(<div>
                <input style={{width:"10.8rem"}}onChange={changeQuestionChoices}/>
            </div>)
        }
        else{
            setQuestionChoicesInput(<div>
                <input style={{width:"10.8rem"}}onChange={changeQuestionChoices}/>
            </div>)
        }


        const changeCodeText=(e)=>{
            setCodeText(e.target.value)
        }
        setCodeTextInput(<div>
            <input style={{width:"55rem"}}onChange={changeCodeText}/>
        </div>)

        const changeCodeType=(e)=>{
            setCodeType(e.target.value)
        }
        setCodeTypeInput(<div>
            <select style={{width:"10.8rem",height:"1.9rem"}} onChange={changeCodeType}>
                <option value={"java"}>Java</option>
                <option value={"C++"}>C++</option>
                <option value={"python"}>Python</option>
            </select>
        </div>)


    },[questionChoiceType])
    const changeQuestion=()=>{
        if (type == "DemographicQuestion"){
            setQuestion([{
                alias:alias,
                "@type":"DemographicQuestion",
                questionText:questionText,
                questionChoiceType:questionChoiceType,
                questionChoices:[questionChoices]
            }])
        }
        else if (type == "CodeEvaluation"){
            setQuestion([{
                alias:alias,
                "@type":"CodeEvaluation",
                questionText:questionText,
                questionChoiceType:questionChoiceType,
                questionChoices:[questionChoices],
                exposureTime:exposureTime,
                codeText:codeText,
                codeType:codeType
            }])
        }
        console.log("sgasd")
        if (question){
            axios.post("https://localhost:8443/questions",JSON.stringify(question),{headers: {'Content-Type': 'application/json'}}).then((res)=>{
                console.log(res)
            })
            console.log(question)
        }
    }
    return(
        <div >
            <p style={{background:"#F6D420",height:"80px",marginLeft:"160px",borderRadius:"32px"}}></p>
            <div style={{float:"left", marginLeft:"2rem",height:"10rem",marginTop:"2rem"}}>
                <h1>NewQuestion</h1>
                <Divider style={{marginTop:"7.5rem"}}></Divider>
                <div>
                    {typeInput}
                    <p></p>
                    <button onClick={insertInfo} style={{width:"10.8rem"}}>Add</button>
                    <p></p>
                        <button onClick={changeQuestion} style={{width:"10.8rem"}}>Add Question</button>
                </div>

            </div>
            <div style={{height:"29rem"}}>
                {questionTable}
            </div>
            <p style={{background:"#F6D420",height:"80px",marginRight:"160px",marginTop:"22rem",borderRadius:"32px"}}></p>
        </div>)
}