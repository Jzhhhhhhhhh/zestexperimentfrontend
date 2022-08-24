import React, {useEffect, useState} from "react";
import axios from "axios";
import {Affix, Checkbox} from "antd";
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
            name:"questionChoicesType",
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
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>Alias</h1>
                {aliasInput}
            </div>)
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"10rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>QuestionText</h1>
                {questionTextInput}
            </div>)
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>questionChoicesType</h1>
                {questionChoiceTypeInput}
            </div>)
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"10rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>questionChoices</h1>
                {questionChoicesInput}
            </div>)

            setQuestionTable(table)
        }
        else if (type == "CodeEvaluation"){
            let table = []
            // setQuestionChoiceType("SCALE_CHOICE")
            // setQuestionChoiceTypeInput("scale_choice")
            // setQuestionChoices("1","2","3","4","5","can not tell")
            // setQuestionChoicesInput("1,2,3,4,5,can not tell")
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"10rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>Alias</h1>
                {aliasInput}
            </div>)
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"10rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>QuestionText</h1>
                {questionTextInput}
            </div>)
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"10rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>questionChoicesType</h1>
                {questionChoiceTypeInput}
            </div>)
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"10rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>questionChoices</h1>
                {questionChoicesInput}
            </div>)
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>exposuretime</h1>
                {exposureTimeInput}
            </div>)
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"8rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>codeType</h1>
                {codeTypeInput}
            </div>)
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"10rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>codeText</h1>
                {codeTextInput}
            </div>)
            setQuestionTable(table)
        }
    }

    useEffect(()=>{
        const changeAlias=(e)=>{
            setAlias(e.target.value)
        }
        setAliasInput(
            <div style={{marginLeft:"3rem"}}>
            <input style={{width:"25rem",height:"1.9rem",borderRadius:"0.5rem",borderStyle:"dashed"}} onChange={changeAlias} defaultValue={"alias"}/>
        </div>
        // <div style={{float:"left", marginLeft:"15rem",height:"10rem",marginTop:"2rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
        //     <input style={{width:"55rem"}} onChange={changeAlias}/>
        // </div>
        )

        const changeQuestionText=(e)=>{
            setQuestionText(e.target.value)
        }
        setQuestionTextInput(<div style={{marginLeft:"3rem"}}>
            <input  style={{width:"25rem",height:"3rem",borderRadius:"0.5rem",borderStyle:"dashed"}} onChange={changeQuestionText}/>
        </div>)

        const changeQuestionChoiceType=(e)=>{
            setQuestionChoiceType(e.target.value)
        }
        setQuestionChoiceTypeInput(<div style={{marginLeft:"3rem"}}>
            <select style={{width:"10.8rem",height:"1.9rem",borderRadius:"0.5rem",borderStyle:"solid"}} onChange={changeQuestionChoiceType}>
                <option value={"MULTI_CHOICE"}>multi_choice</option>
                <option value={"SINGLE_CHOICE"}>single_choice</option>
                <option value={"TEXT"}>text</option>
                <option value={"SCALE_CHOICE"}>scale_choice</option>
            </select>
        </div>)

        const changeExposureTime=(e)=>{
            setExposureTime(e.target.value)
        }
        setExposureTimeInput(<div style={{marginLeft:"3rem"}}>
            <input style={{width:"25rem",height:"1.9rem",borderRadius:"0.5rem",borderStyle:"dashed"}}onChange={changeExposureTime}/>
        </div>)

        const changeQuestionChoices=(e)=>{
            setQuestionChoices(e.target.value)
        }
        if (questionChoiceType == "TEXT"){
            setQuestionChoicesInput(<div>
            </div>)
        }
        else if (questionChoiceType == "SCALE_CHOICE"){
            setQuestionChoicesInput(<div style={{marginLeft:"3rem"}}>
                <input style={{width:"25rem",height:"3rem",borderRadius:"0.5rem",borderStyle:"dashed"}}onChange={changeQuestionChoices}/>
            </div>)
        }
        else{
            setQuestionChoicesInput(<div style={{marginLeft:"3rem"}}>
                <input style={{width:"25rem",height:"3rem",borderRadius:"0.5rem",borderStyle:"dashed"}}onChange={changeQuestionChoices}/>
            </div>)
        }


        const changeCodeText=(e)=>{
            setCodeText(e.target.value)
        }
        setCodeTextInput(<div style={{marginLeft:"3rem"}}>
            <input style={{width:"25rem",height:"3rem",borderRadius:"0.5rem",borderStyle:"dashed"}}onChange={changeCodeText}/>
        </div>)

        const changeCodeType=(e)=>{
            setCodeType(e.target.value)
        }
        setCodeTypeInput(<div style={{marginLeft:"3rem"}}>
            <select style={{width:"10.8rem",height:"1.9rem",borderRadius:"0.5rem",borderStyle:"solid"}} onChange={changeCodeType}>
                <option value={"java"}>Java</option>
                <option value={"C++"}>C++</option>
                <option value={"python"}>Python</option>
            </select>
        </div>)
        const changeType=(e)=>{
            setType(e.target.value)
        }
        setTypeInput(<div style={{marginLeft:"3rem"}}>
            <select style={{width:"10.8rem",height:"1.9rem",borderRadius:"0.5rem",borderStyle:"solid"}}onChange={changeType}>
                <option value={"DemographicQuestion"}>DemographicQuestion</option>
                <option value={"CodeEvaluation"}>CodeEvaluation</option>
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
        <div style={{background:"#cae8d7", height:"100rem"}}>
            <Affix offsetTop={0}>
                <div style={{background:"white",height:"8rem"}}>
                    <h style={{fontSize:"3rem",marginLeft:"12rem",fontFamily:"Monaco",marginTop:"1rem"}}>
                        New Question
                    </h>
                        <button onClick={changeQuestion} style={{marginLeft:"20rem",marginTop:"-1rem",height:"3rem", width:"5rem",background:"#7f2687",color:"white"}}>Add</button>
                </div>
            </Affix>
            <div style={{float:"left", marginLeft:"16rem",height:"10rem",marginTop:"2rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>QuestionType</h1>
                <div style={{float:"left"}}>
                    {typeInput}

                </div>
                <div>
                    <button onClick={insertInfo} style={{borderStyle:"solid",width:"3rem",marginLeft:"3rem",borderRadius:"0.5rem",borderColor:"#118847"}}>Add</button>

                </div>

                {/*<p></p>*/}
                    {/*<button onClick={insertInfo} style={{width:"10.8rem"}}>Add</button>*/}
                    {/*<p></p>*/}


            </div>

            <div style={{height:"29rem"}}>
                {questionTable}
            </div>
        </div>)
}