import { useState, useRef } from 'react';
import GlitchingButton from './glitchingButton';
export default function TPB({ name }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [note, setNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const silenceTimeoutRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/detect-note', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setNote(data.note);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert('An error occurred while detecting the note.');
      console.error(error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      const dataArray = new Uint8Array(analyser.fftSize);
      
      analyser.fftSize = 2048;
      source.connect(analyser);

      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(await convertToWav(audioBlob));
        audioChunksRef.current = []; // Clear the array for the next recording
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      const checkForSilence = () => {
        analyser.getByteTimeDomainData(dataArray);
        let maxVolume = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const currentVolume = Math.abs(dataArray[i] - 128);
          if (currentVolume > maxVolume) {
            maxVolume = currentVolume;
          }
        }

        // Set threshold and silence duration
        const silenceThreshold = 5;
        const silenceDuration = 2000;

        if (maxVolume < silenceThreshold) {
          if (!silenceTimeoutRef.current) {
            silenceTimeoutRef.current = setTimeout(stopRecording, silenceDuration);
          }
        } else {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }

        if (isRecording) {
          requestAnimationFrame(checkForSilence);
        }
      };

      checkForSilence();
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
  };

  const convertToWav = async (audioBlob) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const numOfChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numOfChannels * 2 + 44; // WAV header size + audio data size
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);

    // Write WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, length - 8, true); // File size
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1 size (16 for PCM)
    view.setUint16(20, 1, true); // Audio format (1 for PCM)
    view.setUint16(22, numOfChannels, true); // Number of channels
    view.setUint32(24, audioBuffer.sampleRate, true); // Sample rate
    view.setUint32(28, audioBuffer.sampleRate * 2 * numOfChannels, true); // Byte rate
    view.setUint16(32, numOfChannels * 2, true); // Block align
    view.setUint16(34, 16, true); // Bits per sample
    writeString(view, 36, 'data');
    view.setUint32(40, length - 44, true); // Subchunk2 size (data size)

    // Write audio data
    const channels = [];
    for (let i = 0; i < numOfChannels; i++) {
      channels[i] = audioBuffer.getChannelData(i);
    }

    let offset = 44;
    const samples = audioBuffer.length;
    for (let i = 0; i < samples; i++) {
      for (let channel = 0; channel < numOfChannels; channel++) {
        const sample = channels[channel][i];
        view.setInt16(offset, sample * 32767, true);
        offset += 2;
      }
    }

    return new Blob([view], { type: 'audio/wav' });
  };

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const handleUpload = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');

    try {
      const response = await fetch('http://localhost:5000/detect-note', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Detected Note: ${data.note}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('An error occurred while uploading the recording:', error);
    }
  };

  return (
    <div className='test'>
     {/*  <form onSubmit={handleSubmit}>
        <input type="file" accept=".wav" onChange={handleFileChange} />
        <button type="submit">Upload and Detect Note</button>
      </form> */}
      {/* {note && <p>Detected Note: {note}</p>} */}
      <h1>Try playing the note  {name}</h1>
      <GlitchingButton name={isRecording ? 'Stop Recording' : 'Start Recording'} handleClick={isRecording ? stopRecording : startRecording} aria={"true"}></GlitchingButton>

     
      {audioBlob && (
        <div>
          <audio controls src={URL.createObjectURL(audioBlob)}></audio>
          <GlitchingButton name={"Upload and Detect Note"} handleClick={handleUpload}></GlitchingButton>
          <button onClick={handleUpload}>Upload and Detect Note</button>
        </div>
      )}
    </div>
  );
}
