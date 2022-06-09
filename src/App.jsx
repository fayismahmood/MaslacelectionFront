import { useEffect, useState } from 'react'
import './App.css'
//import 'antd/dist/antd.less';
import { Button, DatePicker, Modal, message, Steps, Card, Row, Col, Radio, Badge, Space, Spin } from 'antd';

import { Typography } from 'antd';
import Scanner from './scanner';
import axios from 'axios';
import { ArrowRightOutlined, ArrowLeftOutlined,Loading3QuartersOutlined } from '@ant-design/icons';


let isDev = import.meta.env.DEV
console.log(isDev, "eeeee");
let serHost;
if (isDev) {
  serHost = "https://192.168.0.113:8000/"
} else {
  serHost = "./"
}


function App() {
  const [CurrentStep, setCurrentStep] = useState(0);
  const [ShowScanner, setShowScanner] = useState(false);
  const [QrResult, setQrResult] = useState(null);
  const [Voter, setVoter] = useState(null);
  const [votes, setVotes] = useState({});

  const [Cant, setCant] = useState(null);
useEffect(() => {
  axios.get("./Cant.json").then(({data})=>{
    setCant(data)
  })
 
}, [0]);
  useEffect(() => {
    if (QrResult) {
      axios.post(serHost + "varify", { hash: QrResult }).then(({ data }) => {
        setVoter(data)
      })
    }
  }, [QrResult])


  return (
    <div className="App">

      <div className='Hero'>

        <div className='Head'>
          <div>Maslac</div>
          <span>General Election</span>
        </div>
      </div>
      {
        !Cant&&<div style={{marginTop:"60px"}}>
          <Typography.Title><Spin size='large'/></Typography.Title>
        </div>
      }
      {
        !Voter &&Cant&& <div>
          <div className='vote'>
            <div className='vImg'>
              <svg width="173" height="168" viewBox="0 0 173 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 86.2308H173L152.72 55.8207H124.503L114.383 65.9574H132.113V76.0941H40.8867V65.9574H61.6577L51.5383 55.8207H20.28L0 86.2308ZM0.00371664 116.641H172.996V96.3675H0.00371664V116.641ZM10.14 168H162.86V126.777H10.14V168Z" fill="#cde1c9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M76.3972 23.4002C63.5289 36.27 53 46.9528 53 47.1389L76.4861 70.9574H100.474L135.609 35.8163L99.7945 0L76.3972 23.4002ZM114.706 30.6144C114.706 30.8043 108.473 37.192 100.854 44.8094L87.0022 58.6588L80.2437 51.9064C76.5267 48.1927 73.4855 45.0034 73.4855 44.8188C73.4855 44.6347 75.0411 42.9227 76.9426 41.0146L80.3998 37.5455L87.0062 44.1272L107.773 23.3592L111.24 26.8141C113.146 28.7141 114.706 30.4241 114.706 30.6144Z" fill="#9AAD93" />
              </svg>

            </div>
            <Typography.Title level={3} style={{ marginTop: "20px" }} type='secondary'>
              Scan Id and vote
            </Typography.Title>
            <Button onClick={() => { setShowScanner(true) }} shape='round' size='large' type='primary'>Vote My Cantidate</Button>
          </div>
          <Modal onCancel={() => {
            setShowScanner(false)
          }} footer={[]} visible={ShowScanner}>
            <Scanner onScanSuccess={(decodedResult) => { setQrResult(decodedResult.data); setShowScanner(false) }}></Scanner>
          </Modal>
        </div>
      }
      {Voter && Voter.status == "voted" &&
        <Typography.Title style={{ marginTop: "30px" }}>
          Already Voted
        </Typography.Title>
      }
      {Voter && Voter.status == "not_voted" &&


        <div className="voting">

          <Steps current={CurrentStep}>
            {Cant.map((e, i) => (

              <Steps.Step title={e.type}>

              </Steps.Step>

            ))}
            <Steps.Step title="Confirm">

            </Steps.Step>
          </Steps>
          <div style={{ margin: "20px 0px" }}>

            {Cant.map((e, i) => (
              <>
                {i == CurrentStep &&
                  <div>
                    <Typography.Title type='secondary' level={3}>
                      Select your {e.type}
                    </Typography.Title>
                    <div style={{}}>
                      <Row style={{ justifyContent: "center", flexWrap: "wrap", }} >
                        {e.cants.map((_eCant, i) => (

                          <Col style={{ width: "100%" }}>

                            <div onClick={() => {
                              setVotes((_ => ({ ..._, [e.type]: _eCant.name })))
                              // alert("dfdfa")

                            }} className={`eCant ${votes[e.type] == _eCant.name && "act"}`}>
                              <div className='img'>
                                <img src={_eCant.pic} />
                              </div>
                              <div className='txt'>
                                {_eCant.name}
                              </div>
                            </div>


                          </Col>
                        ))}
                      </Row>

                    </div>
                    <div style={{ marginTop: "25px" }} className='action'>
                      <Row>

                        <Space style={{ margin: "auto" }}>
                          {CurrentStep > 0 && <Button onClick={() => {
                            setCurrentStep((e) => e <= 0 ? 0 : e - 1)
                          }} size='large' shape='round'><ArrowLeftOutlined />Back</Button>}
                          <Button
                            disabled={!votes[e.type]}

                            onClick={() => {
                              setCurrentStep((e) => e + 1)
                            }} size='large' type="primary" shape='round'>Next<ArrowRightOutlined /></Button>
                        </Space>
                      </Row>
                    </div>
                  </div>

                }
              </>
            ))}
            {Cant.length == CurrentStep &&
              <div>
                <Typography.Title type='secondary' level={3}>
                  Conform your submission
                </Typography.Title>

                <Row >
                  <div style={{ margin: "auto", marginTop: "20px", background: "linear-gradient(45deg, rgb(242 247 240), rgb(247 247 251))", borderRadius: "5px" }}>
                    <Row style={{ placeItems: "center", flexDirection: "column" }}>
                      <Col>
                        <img style={{ marginTop: "40px" }} width={100} src="confirm.png" alt="" />
                      </Col>
                      <Col style={{ padding: "20px", color: "#63cba2" }}>
                        {Cant.map(e => (
                          <div>
                            <b>{e.type}: </b>
                            <span>
                              {votes[e.type]}
                            </span>
                          </div>
                        ))}
                      </Col>
                    </Row>
                  </div>
                </Row>
                <Row >
                  <div style={{ margin: "auto", marginTop: "25px", }}>
                    <Button onClick={() => {
                      axios.post(serHost + "vote", { vote: votes, hash: QrResult }).then(e => {
                        alert("Successfully Voted")
                        window.location.reload()
                      })
                    }} type='primary' size='large' shape="round">Confirm</Button>
                  </div>
                </Row>
              </div>

            }
          </div>
        </div>
      }


    </div>
  )
}

export default App
