import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import useClipboard from "react-use-clipboard";
import { useState, useEffect } from "react";
import TextToSpeech from "./TextToSpeech";

const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    
    // const [isCopied, setCopied] = useClipboard(textToCopy, {
        // successDuration: 1000
    // });
    const [listeningTimeout, setListeningTimeout] = useState(null);

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    };

    const { transcript,  browserSupportsSpeechRecognition } = useSpeechRecognition();
    const txt = transcript;

    useEffect(() => {
        // Clear the timeout if transcript changes
        if (transcript) {
            clearTimeout(listeningTimeout);
            // Set a new timeout
            setListeningTimeout(setTimeout(() => {
                SpeechRecognition.stopListening();
            }, 2400)); // Stop listening after 5 seconds of no change
        }
    }, [transcript]);

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            return null;
        }
        // Cleanup on unmount
        return () => clearTimeout(listeningTimeout);
    }, []);

    return (
        <>
       
            <div className="container">

              <div style={{"border" : "2px solid black", "padding" : "40px"}}>

              
                <h2>Speech to Text Converter</h2>
                <br />

                <div  className="main-content" onClick={() => setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="btn-style">

                    <button onClick={startListening}>Start Listening</button>
              </div>

              </div>

              <div>
                |
                |
                |
                |
                |
                | 
                |
              </div>

              <div style={{"border" : "2px solid black" , "padding" : "40px"}}>

                <h2>Text to Speech Converter</h2>
                <br />
                <br />
                <TextToSpeech text = {txt} />
              </div>
             

                
                

            </div>

        </>
    );
};

export default App;