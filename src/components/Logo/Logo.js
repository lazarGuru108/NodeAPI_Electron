import "https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.4.3/mobile-detect.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/three.js/r72/three.min.js"
import "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"
import "https://malihu.github.io/custom-scrollbar/jquery.mCustomScrollbar.concat.min.js"
import "./script.js"
import "./Logo.scss"

class Logo extends React.Component {
    render() {
        return (
            <div className="Box">
                <div className="wrapper home">
                    <canvas id="stars" width="1920" height="529" style="display: block;"></canvas>
                    <canvas id="yahia" width="1920" height="529" style="width: 1920px; height: 529px;"></canvas>

                </div>
            </div>
        );
    }
}

export default Logo;