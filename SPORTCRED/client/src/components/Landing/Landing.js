import React from 'react';

const VideoBackground = () => {
    const Source = 'https://www.youtube.com/watch?v=668nUCeBHyY'
    return (
        <div className = {classes.Container}>
            <video autoplay = 'autoplay' loop = 'loop' muted classname = {classes.Video}>
            <source src = {Source} type = 'video/mp4'/>
            </video>
        </div>
    )
}

// export default class landing extends React.Component {
    
// }
export default VideoBackground