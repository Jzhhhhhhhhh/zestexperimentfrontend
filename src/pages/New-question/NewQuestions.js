import React, {useEffect, useState} from "react";
import axios from "axios";
import {Affix, Checkbox} from "antd";
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css'

export default function NewQuestions(){
    const [question, setQuestion] = useState()
    const [type, setType] = useState("DemographicQuestion")
    const [questionText, setQuestionText] = useState()
    const [questionChoiceType, setQuestionChoiceType] = useState("MULTI_CHOICE")
    const [questionChoices1, setQuestionChoices1] = useState()
    const [questionChoices2, setQuestionChoices2] = useState()
    const [questionChoices3, setQuestionChoices3] = useState()
    const [questionChoices4, setQuestionChoices4] = useState()
    const [questionChoices5, setQuestionChoices5] = useState()
    const [alias, setAlias] = useState()
    const [typeInput, setTypeInput] = useState()
    const [questionTextInput, setQuestionTextInput] = useState([])
    const [questionChoiceTypeInput, setQuestionChoiceTypeInput] = useState()
    const [questionChoicesInput, setQuestionChoicesInput] = useState([])
    const [aliasInput, setAliasInput] = useState()
    const [questionTable, setQuestionTable] = useState()
    const [exposureTimeInput, setExposureTimeInput] = useState()
    const [exposureTime, setExposureTime] = useState(0)
    const [codeTextInput, setCodeTextInput] = useState()
    const [codeText, setCodeText] = useState()
    const [codeTypeInput, setCodeTypeInput] = useState()
    const [codeType, setCodeType] = useState("java")
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState('failed')
    const [questionChoicesList, setQuestionChoicesList] = useState([])



    useEffect(()=>{
        const changeAlias=(e)=>{
            setAlias(e.target.value)
        }
        setAliasInput(
            <div style={{marginLeft:"3rem"}}>
                <input style={{width:"25rem",height:"1.9rem",borderRadius:"0.5rem",borderStyle:"dashed"}} onChange={changeAlias} defaultValue={"alias"}/>
            </div>
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

        const changeQuestionChoices1=(e)=>{
            setQuestionChoices1(e.target.value)
        }
        const changeQuestionChoices2=(e)=>{
            setQuestionChoices2(e.target.value)
        }
        const changeQuestionChoices3=(e)=>{
            setQuestionChoices3(e.target.value)
        }
        const changeQuestionChoices4=(e)=>{
            setQuestionChoices4(e.target.value)
        }
        const changeQuestionChoices5=(e)=>{
            setQuestionChoices5(e.target.value)
        }


        setQuestionChoicesInput(<div style={{marginLeft:"3rem"}}>
            <input style={{width:"25rem",height:"2rem",borderRadius:"0.5rem",borderStyle:"solid"}}onChange={changeQuestionChoices1}/>
            <input style={{width:"25rem",height:"2rem",borderRadius:"0.5rem",borderStyle:"solid", marginTop:"0.3rem"}}onChange={changeQuestionChoices2}/>
            <input style={{width:"25rem",height:"2rem",borderRadius:"0.5rem",borderStyle:"solid", marginTop:"0.3rem"}}onChange={changeQuestionChoices3}/>
            <input style={{width:"25rem",height:"2rem",borderRadius:"0.5rem",borderStyle:"solid", marginTop:"0.3rem"}}onChange={changeQuestionChoices4}/>
            <input style={{width:"25rem",height:"2rem",borderRadius:"0.5rem",borderStyle:"solid", marginTop:"0.3rem",marginBottom:"1rem"}}onChange={changeQuestionChoices5}/>
        </div>)







        // if (questionChoiceType == "TEXT"){
        //     let questions = []
        //     setQuestionChoicesInput(questions)
        // }
        // else if (questionChoiceType == "SCALE_CHOICE"){
        //     let questions = []
        //     questions.push(<div style={{marginLeft:"3rem"}}>
        //         <input style={{width:"25rem",height:"3rem",borderRadius:"0.5rem",borderStyle:"dashed"}}onChange={changeQuestionChoices}/>
        //         <button style={{marginLeft:"10rem",marginTop:"-3rem", width:"5rem",background:"#7f2687",color:"white"}} >add choice
        //         </button>
        //     </div>)
        //     setQuestionChoicesInput(questions)
        // }
        // else{
        //     let questions = []
        //     questions.push(<div style={{marginLeft:"3rem"}}>
        //         <div style={{float:"left"}}>
        //             <input style={{width:"25rem",height:"3rem",borderRadius:"0.5rem",borderStyle:"dashed"}}onChange={changeQuestionChoices}/>
        //             <button style={{marginLeft:"10rem",marginTop:"-3rem", width:"5rem",background:"#7f2687",color:"white"}} >add choice
        //             </button>
        //
        //         </div>
        //     </div>)
        //     setQuestionChoicesInput(questions)
        // }
        //
        // const addChoicesList = () =>{
        //     let list = questionChoicesList
        //     if (questionChoices != ''){
        //         list.push(questionChoices)
        //         setQuestionChoicesInput(list)
        //     }
        //     console.log(questionChoicesList)
        // }


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
        console.log(type)




    },[questionChoiceType])



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
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"auto",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
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
                {alias}
            </div>)
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"10rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>QuestionText</h1>
                {questionTextInput}
                {questionText}
            </div>)
            table.push( <div style={{float:"left", marginLeft:"16rem",height:"10rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <h1 style={{marginLeft:"3rem"}}>questionChoicesType</h1>
                {questionChoiceTypeInput}
            </div>)
            table.push( <div style={{float:"left",height:"auto", marginLeft:"16rem",marginTop:"1rem",width:"40rem",background:"white",borderRadius:"1rem",position:"unset"}}>
                <p style={{background:"#118847", height:"1rem",borderRadius:"1rem"}}></p>
                <div style={{float:"left",marginLeft:"3rem"}}>
                    <h1>questionChoices</h1>
                </div>
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

    const changeQuestion=()=>{
        if (questionChoices1 != null){
            let question = questionChoicesList
            question.push(questionChoices1)
            setQuestionChoicesList([...questionChoicesList,question])
        }
        if (questionChoices2 != null){
            let question = questionChoicesList
            question.push(questionChoices2)
            setQuestionChoicesList([...questionChoicesList,question])
        }
        if (questionChoices3 != null){
            let question = questionChoicesList
            question.push(questionChoices3)
            setQuestionChoicesList([...questionChoicesList,question])
        }
        if (questionChoices4 != null){
            let question = questionChoicesList
            question.push(questionChoices4)
            setQuestionChoicesList([...questionChoicesList,question])
        }
        if (questionChoices5 != null){
            let question = questionChoicesList
            question.push(questionChoices5)
            setQuestionChoicesList([...questionChoicesList,question])
        }
        if (type == "DemographicQuestion"){
            setQuestion([{
                alias:alias,
                "@type":"DemographicQuestion",
                questionText:questionText,
                questionChoiceType:questionChoiceType,
                questionChoices:questionChoicesList
            }])
        }
        else if (type == "CodeEvaluation"){
            setQuestion([{
                alias:alias,
                "@type":"CodeEvaluation",
                questionText:questionText,
                questionChoiceType:questionChoiceType,
                questionChoices:questionChoicesList,
                exposureTime:exposureTime,
                codeText:codeText,
                codeType:codeType
            }])
        }
        // if (question){
        axios.post("https://zest-survey-platform.ifi.uzh.ch/api/questions",JSON.stringify(question),{headers: {'Content-Type': 'application/json'}}).then((res)=>{
            console.log(res)
            if (res.status == 200)
                setMessage('successful')
        })
        console.log(question)
        // }
    }

    const showModal = () => {
        changeQuestion()
        setIsModalVisible(true);
    };

    const handleOk = () => {
        window.history.back(-1)
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };






    return(
        <div style={{background:"#cae8d7", height:"100rem"}}>
            <Affix offsetTop={0}>
                <div style={{background:"white",height:"8rem"}}>
                    <h style={{fontSize:"3rem",marginLeft:"12rem",fontFamily:"Monaco",marginTop:"1rem"}}>
                        New Question
                    </h>
                    <button onClick={showModal} style={{marginLeft:"20rem",marginTop:"-1rem",height:"3rem", width:"5rem",background:"#7f2687",color:"white"}}>Add</button>
                    <Modal title={"Add message"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p>{message}</p>
                    </Modal>
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
            </div>




            <div style={{height:"29rem"}}>
                {questionTable}
            </div>


        </div>)
}