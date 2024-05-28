import React, {useRef} from 'react'
import dynamic from 'next/dynamic'

const Player = dynamic(() => import('./videojs/player'),
 { ssr: false }
)
 
const PlayerComponent = () => {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    height: 500,
    fluid: true,
    sources: [
      {
        src: "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    console.log('Player is ready: ', player);

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <>
      <Player options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  )
}

export default PlayerComponent