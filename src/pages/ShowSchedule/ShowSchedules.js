import React, {useEffect} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';

export default function ShowSchedules(){
    const params = useParams();
    const [tableList, setTableList] = React.useState()
    const EditQuestion = ({rowData,dataKey,...props}) =>{
        return(<Cell {...props}>
            <Link to={"/showQuestion/"+ rowData[dataKey]}>
                <button>Edit</button>
            </Link>
        </Cell>)
    }
    useEffect( ()=>{
        async function fetchData(){
            const getSchedule = () =>{
                return axios.get("https://localhost:8443/schedules/"+params['name'])
            }
            let schedule =await getSchedule()
            const moduleList = []
            const getModuleList = () =>{
                for (const i in schedule.data){
                    if (i === "scheduleModuleList"){
                        for (const j in schedule.data[i]){
                            moduleList.push(schedule.data[i][j])
                        }

                    }
                }
            }
            getModuleList()
            const getQuestionById = async (id) =>{
                return axios.get("https://localhost:8443/questions/"+id)
            }
            //console.log(moduleList)
            const questionIdList = []
            const moduleType = []
            const moduleInfo = []
            const deserializeSchedule = () =>{
                moduleList.forEach(async (module)=>{
                    moduleType.push({
                        "moduleType":module["moduleType"]
                    })
                    questionIdList.push({
                        "questionIdList":module["questionIdList"]
                    })
                    //console.log(questionIdList)
                })

                async function deserializeQuestion(){
                    for (let questionList of questionIdList){
                        let questionInfo = []
                        //console.log(questionList["questionIdList"])
                        for (let id of questionList["questionIdList"]){
                            //console.log(id)
                            let question = await getQuestionById(id)
                            //console.log(question.data)
                            questionInfo.push({
                                "@type":question.data["@type"],
                                "alias":question.data["alias"],
                                "questionChoiceType":question.data["questionChoiceType"],
                                "id":question.data["id"]
                            })
                        }
                        moduleInfo.push(questionInfo)
                        //console.log(moduleInfo)
                        //setQuestion(moduleInfo)
                    }
                    let table = []
                    const makeTable = (item) =>{
                        for (const i in item){
                            console.log(item[i])
                            table.push(<div style={{marginLeft:"6rem", marginRight:"6rem", height:"33rem"}}>
                                <h1>ModuleType:{moduleType[i]["moduleType"]}</h1>
                                <Table data={item[i]}>
                                    <Column  width={300} sort="true" fixed="true" resizable>
                                        <HeaderCell>type</HeaderCell>
                                        <Cell dataKey="@type" />
                                    </Column>
                                    <Column  width={100} sort="true" fixed="true" resizable>
                                        <HeaderCell>alias</HeaderCell>
                                        <Cell dataKey="alias" />
                                    </Column>
                                    <Column  width={300} sort="true" fixed="true" resizable>
                                        <HeaderCell>questionChoiceType</HeaderCell>
                                        <Cell dataKey="questionChoiceType" />
                                    </Column>
                                    <Column  width={300} sort="true" fixed="true" resizable>
                                        <HeaderCell>Edit</HeaderCell>
                                        <EditQuestion dataKey="id" />
                                    </Column>
                                </Table>
                            </div>)
                        }
                        //makeTable(moduleInfo)
                        setTableList(table)
                    }
                    makeTable(moduleInfo)
                }
                deserializeQuestion()
            }
            deserializeSchedule()
        }
        fetchData()

    },[])
    return(<div>
        <p style={{background:"#F6D420",height:"80px",marginLeft:"160px",borderRadius:"32px"}}></p>

        {tableList}
        <p style={{background:"#F6D420",height:"80px",marginRight:"160px",marginTop:"3rem",borderRadius:"32px"}}></p>

    </div>)

}
