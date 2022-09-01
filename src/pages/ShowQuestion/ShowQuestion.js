import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams, withRouter} from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import {Modal} from 'antd-mobile'
// import cx from 'classnames'
// import SVGIcon from 'components/SVGIcon'
// import styles from './Dialog.scss'

import 'rsuite-table/dist/css/rsuite-table.css';
import {Affix} from "antd";


export default function ShowQuestion(){

    const params = useParams()
    console.log(params)
    const [questionTable, setQuestionTable] = useState()
    const [deleteButton, setDeleteButton] = useState()
    useEffect(()=>{
        async function fetchData(){
            const getQuestion = () =>{
                return axios.get("http://localhost:8080/questions/"+params['name'])
            }
            let question =await getQuestion()


            const deserializeQuestion = (question) =>{
                console.log(question.data)
                let data = []
                data.push(question.data)
                let table = []
                if (question.data["@type"] == "DemographicQuestion"){
                    table.push(<div style={{marginLeft:"9rem", marginRight:"9rem", height:"33rem",marginTop:"6rem"} }>
                        <h1>Question Infomation</h1>
                        <Table data={data} wordWrap="break-word">
                            <Column  width={180} sort="true" resizable>
                                <HeaderCell>type</HeaderCell>
                                <Cell dataKey="@type" />
                            </Column>
                            <Column  width={100} sort="true" resizable>
                                <HeaderCell>alias</HeaderCell>
                                <Cell dataKey="alias" />
                            </Column>
                            <Column  width={180} sort="true" resizable>
                                <HeaderCell>questionChoiceType</HeaderCell>
                                <Cell dataKey="questionChoiceType" />
                            </Column>
                            <Column  width={300} sort="true" resizable>
                                <HeaderCell>questionText</HeaderCell>
                                <Cell dataKey="questionText" />
                            </Column>
                            <Column  width={150} sort="true" resizable>
                                <HeaderCell>questionChoices</HeaderCell>
                                <Cell dataKey="questionChoices" />
                            </Column>
                        </Table>
                    </div>)
                }
                if (question.data["@type"] == "CodeEvaluation"){
                    table.push(<div style={{marginLeft:"6rem", marginRight:"6rem", height:"33rem",marginTop:"6rem",borderRadius:"0.5rem"}}>
                        <h1>Question Information</h1>
                        <Table data={data} style={{borderRadius:"0.5rem"}}wordWrap="break-word" height={500}>
                            <Column  width={180} sort="true" resizable>
                                <HeaderCell>type</HeaderCell>
                                <Cell dataKey="@type" />
                            </Column>
                            <Column  width={100} sort="true" resizable>
                                <HeaderCell>alias</HeaderCell>
                                <Cell dataKey="alias" />
                            </Column>
                            <Column  width={180} sort="true" resizable>
                                <HeaderCell>codeText</HeaderCell>
                                <Cell dataKey="codeText" />
                            </Column>
                            <Column  width={100} sort="true" resizable>
                                <HeaderCell>codeType</HeaderCell>
                                <Cell dataKey="codeType" />
                            </Column>
                            <Column  width={150} sort="true" resizable>
                                <HeaderCell>exposureTime</HeaderCell>
                                <Cell dataKey="exposureTime" />
                            </Column>
                            <Column  width={300} sort="true" resizable>
                                <HeaderCell>questionChoices</HeaderCell>
                                <Cell dataKey="questionChoices" />
                            </Column>
                        </Table>
                    </div>)
                }


                setQuestionTable(table)
            }
            deserializeQuestion(question)
        }
        fetchData()
    },[])


    return(<div style={{background:"#cae8d7", height:"100rem"}}>
        <Affix offsetTop={0}>
        <div style={{background:"white",height:"8rem"}}>
            <h style={{fontSize:"3rem",marginLeft:"6rem",fontFamily:"Monaco",marginTop:"1rem"}}>
                Details
            </h>
        </div>
    </Affix>
        {questionTable}

    </div>)
}