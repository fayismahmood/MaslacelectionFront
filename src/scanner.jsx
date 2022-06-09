import { useEffect, useState, useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import QrScanner from "qr-scanner";


export default function Scanner({ onScanSuccess }) {
  let _vid = useRef(null)

  useEffect(() => {
    if (_vid.current) {
     
     // console.log(qrScanner, _vid.current);

    }


  }, [0])
  return (

    <div>
      <video  width={300} height={300} ref={(_vid)=>{
        if(_vid){
          console.log();
          const qrScanner = new QrScanner(_vid, result => {
            console.log('decoded qr code:', result)
            onScanSuccess(result)
          }, {
            highlightScanRegion: true,
            highlightCodeOutline: true,
          });
          qrScanner.start().then(e => {console.log(e);})
        }
      }}></video>
    </div>

  )
}


