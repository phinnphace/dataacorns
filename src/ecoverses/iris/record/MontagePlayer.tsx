import React, { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const MONTAGE_URL = '/media/iris_montage_page.mp4?v=66d81f05e0a40c5a';

const MontagePlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const popOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const time = videoRef.current?.currentTime ?? 0;
    const player = window.open(
      `${MONTAGE_URL}#t=${Math.floor(time)}`,
      'iris-exhibit-montage',
      'popup,width=1120,height=760,resizable=yes,scrollbars=yes',
    );
    if (player) {
      event.preventDefault();
      videoRef.current?.pause();
      player.opener = null;
      player.focus();
    }
  };

  return (
    <div className="p-4">
      <h3 className="font-serif text-lg font-semibold leading-snug text-[#1a1510]">
        Or watch a montage here
      </h3>
      <video
        ref={videoRef}
        src={MONTAGE_URL}
        controls
        playsInline
        preload="metadata"
        aria-label="Video montage of The Record exhibits"
        className="mt-3 aspect-video w-full bg-black focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
      >
        <a href={MONTAGE_URL}>Watch the exhibit montage (MP4).</a>
      </video>
      <a
        href={MONTAGE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={popOut}
        className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] font-bold text-[#556b2f] underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
        aria-label="Pop out montage player in a new window"
      >
        Pop out player
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
};

export default MontagePlayer;
