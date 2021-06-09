import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import React, {useEffect, useState} from 'react';
import {GridList, GridListTile, TextareaAutosize} from '@material-ui/core';
import { Container } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
//import { makeStyles } from '@material-ui/core/styles';
import JobTable from '../JobTable/JobTable';
import ProcessData from '../../Utils/ProcessData';
import PropTypes from "prop-types";
import { CSVLink, CSVDownload } from "react-csv";
import Alert from 'react-popup-alert';

const map= new Map();
///// for table
const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

export function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
    return { name, calories, fat };
}
const maxConcurrentRequest=2;
/*const rows = [
    createData('Cupcake', 305, 3.7),
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));*/
const rows=[];

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

//// table ends

const headers = [
    { label: "ConversationId", key: "conversationId" },
    {label:"Transcript",key:"transcript"},
    { label: "Topics", key: "topics" },
    { label: "Questions", key: "questions" },
    {label: "Action Items",key:"actionItems"}
];
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    gridList: {
        width: 500,
        height: 450,
    }
}));
async function processUrls(val,token,processData,urlCounter,conversationData) {

    console.log("inside symbl parsing"+val);
    console.log("inside symbl parsing"+token);
    let urlStack=processData.makeUrlList(val);
    console.log("url stack"+urlStack.length+urlStack);
    for (let i=0;i<=urlStack.length;++i){
        console.log(urlStack[i]);
    }
    for (const element of urlStack) {
        console.log(element);
    }

    console.log("urlcounter"+urlCounter);

/*
    for(let i=0;i<conversationData.length;i++)
    {
        processData.conversationArray[i]=conversationData[i];
    }*/
    console.log("process data length and conversation data length"+processData.conversationArray.length+""+conversationData.length);
    console.log("conversation data length",conversationData.length)
    for (let i = conversationData.length; i < urlStack.length; i++) {
        console.log("inside url counter for"+urlCounter+""+i);

        if(processData.maxRequest<maxConcurrentRequest) {
            processData.maxRequest=processData.maxRequest+1;
            console.log("inside url counter if"+(urlStack[i]).split(" ").join("")+i);
            console.log("checking conversation data tilll now"+JSON.stringify(conversationData));
            if(!JSON.stringify(conversationData).includes(urlStack[i])) {
                await processData.postAudio((urlStack[i]).split(" ").join(""), token).then(val => {
                    if ((JSON.parse(val)).conversationId) {
                        let newVal = {
                            conversationId: (JSON.parse(val)).conversationId,
                            url: urlStack[i],
                            status: "In Progress",
                            jobId: (JSON.parse(val)).jobId
                        }
                        map.set((JSON.parse(val)).conversationId,
                            {
                                url: urlStack[i],
                                status: "In Progress",
                                jobId: (JSON.parse(val)).jobId
                            }
                        );
                        processData.conversationArray[i] = newVal;
                        console.log(processData.conversationArray);
                    } else {
                        let newVal = {
                            conversationId: "NA",
                            url: urlStack[i],
                            status: "NA",
                            jobId: "NA"
                        }
                        processData.conversationArray[i] = newVal;
                        console.log(processData.conversationArray);
                    }
                });
            }
        }
    }
    console.log("currrent Map from url processing"+[...map.entries()]+[JSON.stringify(...map.values())]);
    console.log(processData.conversationArray);
    return processData.conversationArray;
    //return this.conversationArray.toString();
}
async function getStatus(conversationData,processData,csvData){
    console.log("inside get status1 "+conversationData);
    let temp=[];
    let counter=0;
    for(let i=0;i<conversationData.length;i++){
        if(conversationData[i]!=null&& conversationData[i]!=undefined) {
            console.log("inside get status" + conversationData[i].status + (conversationData[i].status == "completed"));
            if (!(conversationData[i].status == "completed") && !conversationData[i].conversationId.includes("NA")) {
                console.log("inside status check for " + conversationData[i].status, conversationData[i].conversationId);
                await processData.getStatus(conversationData[i].jobId, sessionStorage.getItem('token')).then(val => {
                    let tempJsonObject;
                    if (val != undefined) {
                        if ((JSON.parse(val)).status == "completed") {
                            console.log("job completed");
                            console.log("processData max request" + processData.maxRequest);
                            if (processData.maxRequest != 0) {
                                processData.maxRequest = processData.maxRequest - 1;
                            }
                            console.log(JSON.parse(val));
                            counter++;

                            tempJsonObject = {
                                conversationId: conversationData[i].conversationId,
                                url: conversationData[i].url,
                                status: "completed",
                                jobId: conversationData[i].jobId
                            }
                            processData.conversationArray[i] = tempJsonObject;
                            temp[i] = tempJsonObject;
                            map.set(conversationData[i].conversationId,
                                {
                                    url: conversationData[i].url,
                                    status: "completed",
                                    jobId: conversationData[i].jobId
                                }
                            );
                            console.log("map from status" + [...map.entries()] + [JSON.stringify(...map.values())]);
                        } else {
                            console.log("job still processing");
                            temp[i] = conversationData[i];
                        }
                    }
                })
            }
            else temp[i]=conversationData[i];
        }
    }
    return JSON.stringify({value:temp,counter:counter});
}
async function updateCSV(conversationData,processData,csvData){
    //console.log("inside update CSV "+conversationData);
    let temp=[];

    if(JSON.stringify(csvData).includes(conversationData[conversationData.length-1])){
        console.log("inside return csv data");
        return csvData;
    }
    else {

        for (let i = 0; i < conversationData.length; i++) {
            //console.log("inside update CSV" + JSON.stringify(csvData) + (JSON.stringify(csvData).includes(conversationData[i].conversationId)));
            if(conversationData[i]!=null&&conversationData[i]!=undefined) {
                if (conversationData[i].status.includes("completed")) {
                    await processData.getAllData(conversationData[i].conversationId, sessionStorage.getItem('token')).then(data => {
                        temp[i] = data;
                    })

                } else if (conversationData[i].status.includes("NA")) {
                    temp[i] = {
                        conversationId: "NA",
                        transcript: "NA",
                        topics: "topicTemp",
                        questions: "questionTemp",
                        actionItems: "actionItemTemp"
                    }
                }
            }

        }
        return temp;
    }



}
async function sendUrls(urls) {
    let payload={
        url:urls,
        token:sessionStorage.getItem('token')
    };
    return fetch('http://localhost:8080/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(data => data.text())
    .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
export default function Dashboard() {



    //
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //
    //const classes = useStyles();
    const [buttonDisabled,setButtonDisabled] =useState(false)
    const [urlCounter,setUrlCounter]=useState(0)
    const [urls,setUrls]=useState();
    const [conversationData,setConversationData]=useState([]);
    const [urlSubmitted,setUrlSubmitted]=useState();
    const [processData,setProcessData]=useState(new ProcessData());
    const [statusCheck, setStatusCheck]=useState();
    const [csvData,setCsvData]=useState([{conversationId:"",topics:"",questions:""}]);

    let flag=true;
    useEffect(() => {
        let mounted = true;
        if(urls!=undefined) {
            console.log("urlSubmitted use effect");
            processUrls(urlSubmitted,sessionStorage.getItem('token'),processData,urlCounter,conversationData).then(val => {
                console.log("dashboard"+JSON.stringify(val));
                if(val!=undefined&&val!=null) {
                    setConversationData(val);
                    setStatusCheck(true);
                }
            });
        }
        //return () => mounted = false;
    }, [urlSubmitted,urlCounter])

    useEffect(() => {

            const interval = setInterval(() => {
                if(conversationData!=undefined&&(processData.makeUrlList(urls))!=undefined) {
                    console.log('Logs every 30 seconds' + conversationData.length + "  " + (processData.makeUrlList(urls)).length);
                    if (conversationData.length <= (processData.makeUrlList(urlSubmitted)).length && flag) {
                        if (conversationData.length == (processData.makeUrlList(urlSubmitted)).length) {
                            if (conversationData[conversationData.length - 1].status.includes("completed")||conversationData[conversationData.length - 1].status.includes("NA")) {
                                console.log("inside flag");
                                flag = false;
                            }
                        }
                        if(flag==true) {
                            setUrlCounter(processData.maxRequest);
                        }
                        getStatus(conversationData, processData, csvData).then(val => {
                            console.log("get status counter value" + JSON.parse(val).counter + "" + maxConcurrentRequest);
                            if (JSON.parse(val).value != undefined && JSON.parse(val).value != null) {
                                setConversationData(JSON.parse(val).value);
                                setUrlCounter(processData.maxRequest);
                            }
                        })
                    } else {
                        clearInterval(interval);
                    }
                }
            }, 30000);
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [statusCheck])
    ///Use efffect for updating CSV
    useEffect(() => {
        let mounted = true;

            updateCSV(conversationData,processData,csvData).then(val => {

                //console.log("dashboard"+JSON.stringify(val));
                setCsvData(val)
            });

        //return () => mounted = false;
    }, [conversationData])


    const handleSubmit=async(e)=>{
        console.log("final urls "+urls);
        if(urls!=undefined||urls!=null) {
            setUrlSubmitted(urls);
            setButtonDisabled(true);
        }
        else{
            console.log("Please enter valid url");
        }

    }

    return(

        <Container >
            <GridList cellHeight={"auto"} className={classes.gridList} cols={1} style={{width:"auto",height:"auto"}} >
                    <GridListTile cols={5}>
                        <h2>Please enter the audio url you want to be processed </h2>
                        <div style={{overflowY:"hidden"}}>
                        <TextareaAutosize  style={{width:1200}} aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" onChange={e=>setUrls(e.target.value)} />
                        </div>
                    </GridListTile>
                <GridListTile>
                    <Button

                        variant="contained"
                        color="primary"
                        disabled={buttonDisabled}
                        className={classes.button}
                        endIcon={<Icon></Icon>}
                        onClick={
                            handleSubmit

                        }
                    >
                    Process
                    </Button>
                    <h6 hidden={!buttonDisabled}>Your files are getting processed now ,please dont refresh and close this window and wait for the files to be processed.</h6>
                    <h6 hidden={!buttonDisabled}>You can also use the conversationId genereated here to individually check all the conversations  </h6>
                    <h6 href={"https://docs.symbl.ai/docs/#conversation-api"} hidden={!buttonDisabled}>Please refer to our documentations to learn more</h6>
                </GridListTile>
                <GridListTile>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="custom pagination table">
                            <TableBody>
                                <TableRow key="conversationId">
                                    <TableCell component="th" scope="row">
                                        <strong>Conversation ID for url</strong>
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="right">
                                        <strong> URL</strong>
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="right">
                                        <strong>Job Status</strong>
                                    </TableCell>
                                </TableRow>
                                {console.log(conversationData)}

                                {(conversationData).map((data) => (
                                    (data)?(
                                    <TableRow key={data.conversationId}>
                                    <TableCell component="th" scope="row">
                                {data.conversationId}
                                    </TableCell>
                                    <TableCell style={{width: 160}} align="right">
                                {data.url}
                                    </TableCell>
                                    <TableCell style={{width: 160}} align="right">
                                {data.status}
                                    </TableCell>
                                    </TableRow>):<></>

                                ))}

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={3}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </GridListTile>
                <GridListTile>
                    <CSVLink data={csvData} headers={headers}>Download Excel (All completed jobs data will appear here , you can click this anytime ) </CSVLink>
                </GridListTile>
            </GridList>

        </Container>




    );
}