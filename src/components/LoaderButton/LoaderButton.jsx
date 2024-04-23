import { Player, Controls } from '@lottiefiles/react-lottie-player';
import cat from '../../image/animations/buttonLoad.json';

const LoaderButton = () => {
    return (
        <Player
            autoplay
            loop
            src={cat}
            style={{ height: '38px', width: '38px', marginBottom: '11px' }}
            controls={true}
        >
        </Player>
    )
};

export default LoaderButton;