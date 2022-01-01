const audioClips = [
    {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://sb-usa.online/music/JColeLoveYourz.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://sb-usa.online/music/kanye-west.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://sb-usa.online/music/Protojeft.Koffee.mp3'
      }
  
    ];
    

function App() {
  
  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState("");
  const [speed, setSpeed] = React.useState(0.1);
  
  const playRecording = () => {
    
    let index = 0;
    let recordArray = recording.split(" ");
    
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
  audioTag.volume = volume;
  audioTag.currentTime = 0;
  audioTag.play();
  index++
    }, speed * 300);
    setTimeout(() => clearInterval(interval), 300 * speed * recordArray.length - 1);
  };
  
    return (
        <div className="bg-info min-vh-100 text-white">
            <div className="text-center">
              <br />
              <br />
                <div className='title'>
                  <h2>DJ CodeWithVico</h2>
              </div>
                 {audioClips.map((clip) => (
                     <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording} />
    ))}
   <br />
 
              <h4>Volume</h4>          
          <input 
            type="range" 
            step="0.01"
            onChange={(e) => setVolume(e.target.value)}
            value={volume} 
            max="1" 
            min="0" 
            className="w-50" 
           />
              <h3>{recording}</h3>
              {recording && (
                 <>
                  <button onClick={playRecording} className="btn btn-success"> Play </button> 
                  <button onClick={() => setRecording("")} className="btn btn-danger"> Clear</button>
            <br />  
            <br />
                  <h4>Speed</h4>
                 <input 
            type="range" 
            step="0.01"
            onChange={(e) => setSpeed(e.target.value)}
            value={speed} 
            max="1.2" 
            min="0.1" 
            className="w-50" 
           /> 
                  
          <br />
            <br />
                <br />
                  
                  <button className="btn">
  <span className="spinner"></span>
  <span className="btn__text">playing...</span>
</button>
                 </>
              )}
            </div>
        </div>
    );
}

function Pad({ clip, volume, setRecording }) {
  
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
     document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, []);
  

  const handleKeyPress = (e) => {
    if(e.keyCode === clip.keyCode) {
      playSound();
    }
  }
  
  
const playSound = () => {
  const audioTag = document.getElementById(clip.keyTrigger);
  setActive(true);
  setTimeout(() => setActive(false), 200);
  audioTag.volume = volume;
  audioTag.currentTime = 0;
  audioTag.play();
  setRecording(prev => prev + clip.keyTrigger + " ");
}

    return (
        <div onClick={playSound} className={`btn btn-secondary p-5 m-3 ${active && "btn-warning"}`}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url} />
            {clip.keyTrigger}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))
