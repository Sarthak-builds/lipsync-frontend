// src/components/GenerateClips.tsx
import { useState } from 'react';
import { useClipStore } from '../stores/clipStore';
import { useVideoStore } from '../stores/videoStore';
import { useSpeechStore } from '../stores/speechStore';
import type { generateClipsPayload } from '../types/generateClips';
import type { FileResponseMetaData } from '../types/apiFiles';
import { Card, CardHeader, CardTitle, CardContent } from '../components/UI/card';
import Button from '../components/UI/Button';
import ButtonRed from '../components/UI/ButtonRed';


const GenerateClips: React.FC = () => {
    const {allSpeechGenerated} = useSpeechStore();
    const { generateClip} = useClipStore();
  const { generatedClipsResponse } = useClipStore();
  const { videosCollection,  } = useVideoStore();
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);
  const [selectedSpeechId, setSelectedSpeechId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleGenerateClip = async () => {
    if (!selectedVideoId || !selectedSpeechId) {
      setError('Please select both a video and a speech');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const generateClipPayload: generateClipsPayload = {
         source_video_file_id:selectedVideoId,
      speech_generation_id:selectedSpeechId,
      };
      console.log(generateClipPayload);
      await generateClip(generateClipPayload);
    } catch (err) {
      setError('Failed to generate clip');
      console.error('Clip generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleReset = () => {
    setSelectedSpeechId(null);
    setSelectedVideoId(null);
    setError(null);

  }

  return (
    <div className="flex py-10 px-20 bg-black/30 mx-1 rounded-2xl text-white w-full h-full min-h-screen flex-col gap-10 font-grotesk">
       <div>
        <h1 className="text-3xl font-semibold my-2">GENERATE CLIPS</h1>
        <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
      </div>
 
{/* Selection Section */}
     <Card className="w-full bg-black rounded-3xl  border border-gray-500">
        <CardHeader>
          <CardTitle className="text-lg">Select Video and Voice</CardTitle>
          <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
        </CardHeader>
        <CardContent className="flex  my-5 gap-6 w-full   justify-center items-center">
          <div className="flex flex-col gap-2 w-full">
            {/* <label className="text-white">Select Video</label> */}
            <select
              value={selectedVideoId ?? ''}
              onChange={(e) => setSelectedVideoId(Number(e.target.value) || null)}
              className="p-2 rounded bg-black text-white font-grotesk ring-1 ring-gray-500"
              disabled={isLoading}
            >
              <option value="">Select a video</option>
              {videosCollection?.map((video: FileResponseMetaData) => (
                <option key={video.id} value={video.id} className='bg-white/9'>
                  Video ID: {video.id}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full bg-black">
            {/* <label className="text-white">Select Voice</label> */}
            <select
              value={selectedSpeechId ?? ''}
              onChange={(e) => setSelectedSpeechId(Number(e.target.value) || null)}
              className="p-2 rounded  text-white font-grotesk bg-black ring-1 ring-gray-500"
              disabled={isLoading}
            >
              <option value="" >Select a voice</option>
              {allSpeechGenerated?.map((speech) => (
                <option key={speech.id} value={speech.id} className='bg-white/9'>
                  {speech.voice || `Voice ${speech.id}`}
                </option>
              ))}
            </select>
          </div>
          
          {error && <p className=" text-center">{error}</p>}
          
        </CardContent>
        <div className="flex gap-4 justify-center">
            <ButtonRed
              type="button"
              text="Reset"
              onClick={handleReset}
              // disabled={isLoading}
            />
            <Button
              type="button"
              text={isLoading ? 'Generating...' : 'Generate Clip'}
              onClick={handleGenerateClip}
              
            />
          </div>
      </Card>


        {/* Preview Section */}
        <Card className="w-full bg-black rounded-3xl border-gray-500">
        <CardHeader>
          <CardTitle className="text-lg">Generated Clip</CardTitle>
          <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="w-full h-80 bg-black/20 rounded-xl flex items-center justify-center overflow-hidden">
            {generatedClipsResponse ? (
              <p>{generatedClipsResponse.title}</p>
            ) : (
              <p className="text-gray-400 ring-gray-500 px-2 py-1">No clip generated yet</p>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
  );
};

export default GenerateClips;