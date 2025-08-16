// src/components/GenerateClips.tsx
import { useState , useRef} from 'react';
import { useClipStore } from '../stores/clipStore';
import { useVideoStore } from '../stores/videoStore';
import { useSpeechStore } from '../stores/speechStore';
import type { generateClipsPayload } from '../types/generateClips';
import type { FileResponseMetaData } from '../types/apiFiles';
import type { SpeechRequest } from '../types/speech';
import { Card, CardHeader, CardTitle, CardContent } from '../components/UI/card';
import Button from '../components/UI/Button';
import ButtonRed from '../components/UI/ButtonRed';
import { generateSpeech } from '../services/apiSpeech';
import { useVoiceStore } from '../stores/voicesStore';


const GenerateClips: React.FC = () => {
    const {allSpeechGenerated} = useSpeechStore();
    // const { generateClip} = useClipStore();
  const { generatedClipsResponse } = useClipStore();
  const { videosCollection,  } = useVideoStore();
  const { voicesCollection } = useVoiceStore();
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);
  const [selectedVoiceId, setSelectedVoiceId] = useState<number | null>(null);
  const [selectedSpeechId, setSelectedSpeechId] = useState<number | null>(null);
   const [text, setText] = useState<string>('');
   const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClip = async () => {
    if (!selectedVideoId || !selectedVoiceId) {
      setError('Please select both a video and a speech');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const speechPayload : SpeechRequest = {
        text:text.trim(),
        voice: selectedSpeechId || (allSpeechGenerated?.[0]?.voice || null),
      };
      const speechResponse = await generateSpeech(speechPayload);
      const speechId = speechResponse?.id;
      if(!speechId){ throw new Error('speech generate nai hoga idhar pr')}

      const generateClipPayload: generateClipsPayload = {
         source_video_file_id:selectedVideoId,
      speech_generation_id:speechId,
      };
      console.log(generateClipPayload);
      // await generateClip(generateClipPayload);
    } catch (err) {
      setError('Failed to generate clip');
      console.error('error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleReset = () => {
    setSelectedSpeechId(null);
    setSelectedVideoId(null);
    setText('');
    setError(null);

  }
  const handleVoiceChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVoiceId(Number(e.target.value) || null);
}

  return (
    <div className="flex my-1 rounded-sm border-1 border-neutral-800
        py-4 px-8 bg-[#0d0d0fd6] mx-1 text-white w-full h-full  flex-col  font-geist">
           <div>
        <h1 className="text-xl font-semibold my-2 font-geist">GENERATE CLIPS</h1>
        <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
      </div>
        <div className='w-full h-full py-2 px-1 flex gap-4'>
         <div className="w-full h-full flex items-start justify-center border-1 border-neutral-700 rounded-md">
        <Card className="h-full rounded-none border-0 w-full">
        <CardHeader>
          <CardTitle className="text-md p-[1px] w-fit rounded-sm bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"><div className='bg-black w-full rounded-sm px-5 py-1'>Generated Clip Preview</div></CardTitle>
          
        </CardHeader>
       <CardContent className="flex items-center justify-center h-full">
            {generatedClipsResponse ? (
              <p>{generatedClipsResponse.title}</p>
            ) : (
              <p className="text-gray-400">No clip generated yet</p>
            )}
        </CardContent>
      </Card>
      </div>
       <div>
        {/* sidebar selection yaha se hogsa */}
        <div className="w-full min-w-120   h-full border-1 bg-[#060606ad] rounded-md border-neutral-700">
        <Card className="w-full rounded-none border-0">
          <CardHeader className='mb-5'>
            <CardTitle className="text-sm p-[1px] w-fit rounded-sm bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"><div className='bg-black w-full rounded-sm px-5 py-1'>Control Panel</div></CardTitle>
          
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <select  value={selectedVideoId ?? ''}  onChange={(e) => setSelectedVideoId(Number(e.target.value) || null)}  className="p-2 rounded bg-black text-white ring-1 ring-neutral-800 text-sm"  disabled={isLoading}
              >
                <option value="">Video Selection</option>
                {videosCollection?.map((video: FileResponseMetaData) => (
                  <option key={video.id} value={video.id} className="bg-white/9">Video ID: {video.id}  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <select 
                  className=" px-2 w-full h-12 rounded-md flex justify-center items-center border-1  border-neutral-800 text-sm cursor-pointer bg-black"
                  value={selectedVoiceId ?? ''}
                  onChange={handleVoiceChange}
                >
                 { voicesCollection.length>0? (
                        voicesCollection.map((voice)=> (
                            <option className="bg-white/9 text-white"  key={voice.id} value={voice.id}>
                                 {voice.name}
                            </option>
                        ))
                    ) 
                    :(<option value="" disabled> No voices available</option>)

                    }
              </select>
            </div>
            <div className="flex flex-col gap-2"> <textarea ref={textAreaRef}value={text} onChange={(e) => setText(e.target.value)} placeholder="Text Input" className="p-2 rounded text-sm bg-white/1 text-white ring-1 ring-neutral-700 h-36" />
            </div>
            <div className="flex w-full justify-center items-center gap-4">
              <ButtonRed type="button" text="Clear" onClick={handleReset}/>
              <Button type="button" text={isLoading ? 'Generating...' : 'Generate Clip'} onClick={handleGenerateClip} />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </CardContent>
        </Card>
      </div>
      </div>
      </div>
      </div>
  );
};

export default GenerateClips;