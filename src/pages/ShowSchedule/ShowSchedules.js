import React, {useEffect} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';
import {Affix} from "antd";

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
                return axios.get("http://localhost:8080/schedules/"+params['name'])
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
                return axios.get("http://localhost:8080/questions/"+id)
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
                            table.push(<div style={{marginLeft:"9rem", marginRight:"9rem", height:"auto"}}>
                                <h1>ModuleType:{moduleType[i]["moduleType"]}</h1>
                                <Table data={item[i]} style={{borderRadius:"0.5rem"}}>
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
    return(<div style={{background:"#cae8d7", height:"100rem"}}>
        <Affix offsetTop={0}>
            <div style={{background:"white",height:"8rem"}}>
                <h style={{fontSize:"3rem",marginLeft:"6rem",fontFamily:"Monaco",marginTop:"1rem"}}>
                    Details
                </h>
            </div>
        </Affix>
        <div style={{marginTop:"3rem"}}>
            {tableList}

        </div>

    </div>)

}
