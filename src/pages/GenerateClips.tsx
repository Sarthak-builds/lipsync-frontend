// src/components/GenerateClips.tsx
import { useState } from 'react';
import { useClipStore } from '../stores/clipStore';
import { useVideoStore } from '../stores/videoStore';
import { useSpeechStore } from '../stores/speechStore';
import type { generateClipsPayload } from '../types/generateClips';
import type { FileResponseMetaData } from '../types/apiFiles';

const GenerateClips: React.FC = () => {
    const {allSpeechGenerated} = useSpeechStore();
    // const { generateClip} = useClipStore();
  const { generatedClipsResponse } = useClipStore();
  const { videosCollection,  } = useVideoStore();
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);
  const [selectedAudioId, setSelectedAudioId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch videos on mount
  

  const handleGenerateClip = async () => {
    if (!selectedVideoId || !selectedAudioId) {
      setError('Please select both a video ID and an audio ID');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const generateClipPayload: generateClipsPayload = {
         source_video_file_id:selectedVideoId,
      speech_generation_id:selectedAudioId,
      };
      console.log(generateClipPayload);
      // await generateClip(generateClipPayload);
    } catch (err) {
      setError('Failed to generate clip');
      console.error('Clip generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex py-10 bg-neutral-800 mx-1 rounded-2xl text-white w-full h-full min-h-screen flex-col gap-10">
 <div className="flex w-full h-full bg-red-400 p-7 gap-2">
{/* Selection Section */}
     <div className="w-full h-150 rounded-2xl bg-black text-white px-4 py-2">
     <h2 className="text-xl mb-4">Select Video and Audio</h2>
     <div className="flex flex-col gap-4">
     <div className="flex flex-col gap-2">
     <label className="text-white">Video ID</label>
 <select value={selectedVideoId ?? ''} onChange={(e) => setSelectedVideoId(Number(e.target.value) || null)} className="p-2 rounded bg-gray-800 text-white"  disabled={isLoading} >
                <option value="">Select a video ID</option>
                {videosCollection?.map((video: FileResponseMetaData) => (
                  <option key={video.id} value={video.id}>
                    Video {video.id}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white">Audio ID</label>
              <select
                value={selectedAudioId ?? ''}
                onChange={(e) => setSelectedAudioId(Number(e.target.value) || null)}
                className="p-2 rounded bg-gray-800 text-white"
                disabled={isLoading}
              >
                <option value="">Select an audio ID</option>
                {allSpeechGenerated?.map((clip) => (
                  <option key={clip.id} value={clip.id}>
                    { `Audio ${clip.id}`}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleGenerateClip}
              disabled={isLoading}
              className={`bg-blue-500 text-white px-4 py-2 rounded ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Generating...' : 'Generate Clip'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full h-150 rounded-2xl bg-black text-white px-4 py-2">
          <h2 className="text-xl mb-4">Generated Clip Response</h2>
          {generatedClipsResponse ? (
            <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(generatedClipsResponse, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500">No clip generated yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateClips;