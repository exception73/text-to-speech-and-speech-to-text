import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState, useEffect } from "react";
import BlogPost from "./BlogPost";
import TextToSpeech from "./TextToSpeech";

const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    const txt = ` Hi there! I'm Bard, a large language model from Google AI. I'm still under development, but I've been trained on a massive dataset of text and code, allowing me to generate text, translate languages, write different kinds of creative content, and answer your questions in an informative way.

    I'm constantly learning and improving, and I'm excited about the potential to assist people in various fields.
    
    Now, to learn more about you, tell me about your background and what excites you most about this position.  What are some challenges you've faced in your previous work, and how did you overcome them?  Additionally, do you have any questions for me to see if I'm a good fit for this role?
    
    This exchange should give us both a chance to understand each other's capabilities and see if there's a good match. `;
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });
    const [listeningTimeout, setListeningTimeout] = useState(null);

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    };

    const { transcript,  browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => {
        // Clear the timeout if transcript changes
        if (transcript) {
            clearTimeout(listeningTimeout);
            // Set a new timeout
            setListeningTimeout(setTimeout(() => {
                SpeechRecognition.stopListening();
            }, 5000)); // Stop listening after 5 seconds of no change
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
        <TextToSpeech text = {txt} />
            <div className="container">
                <h2>Speech to Text Converter</h2>
                <br />
                <p style={{"color":"black"}}>A React hook that converts speech from the microphone to text and makes it available to your React
                    components.</p>

                <div  className="main-content" onClick={() => setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="btn-style">

                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button onClick={startListening}>Start Listening</button>

                </div>

                
                

            </div>

        </>
    );
};

export default App;