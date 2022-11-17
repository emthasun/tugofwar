addEventListener("load", (event) => {

    var selected_letter = 0
    var num = Math.floor(Math.random()*7)+1
    // random()
    function random(direction){
        console.log('hey')
        if(direction === 'up'){
            num = Math.floor(Math.random()*7)+1
            selected_letter = 1
            document.getElementsByClassName("letter_1")[0].style.backgroundImage = 'url("./images/up/img_' + num + '.png")'
        }
        if(direction === 'down'){
            selected_letter = 2
            document.getElementsByClassName("letter_2")[0].style.backgroundImage = 'url("./images/down/img_' + num + '.png")'
        }
    }




    document.getElementById("overlay").onclick = function(e) {
        document.getElementById("overlay").classList.add("hidden");
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission().then((state) => {
                if (state === 'granted') {
                   window.addEventListener("deviceorientation", (event) => {
                     document.getElementsByClassName("letter_1")[0].style.transform =  'scaleY('+map_range(event.beta, -90, 90, 0.000000001, 1.8)+')'
                     document.getElementsByClassName("letter_2")[0].style.transform =  'scaleY('+map_range(event.beta, -90, 90, 1.8, 0.000000001)+')'
                     document.getElementsByClassName("gradient_1")[0].style.transform =  'scaleY('+map_range(event.beta, -90, 90, 0.1, 1.9)+')'
                     document.getElementsByClassName("gradient_2")[0].style.transform =  'scaleY('+map_range(event.beta, -90, 90, 1.9, 0.1)+')'
                     if(event.beta < -75 && (selected_letter == 2 || selected_letter == 0)){
                        random('up')
                     }
                     if(event.beta > 75  && (selected_letter == 1 || selected_letter == 0)){
                        random('down')
                     }
                   }, true);
                } else {
                    document.getElementById("box").innerHTML = "access to device gyroscope denied";
                }
                })
            .catch(console.error);
        } else {
            window.addEventListener('deviceorientation', handleOrientation);
        }
    };



    function map_range(value, low1, high1, low2, high2){
        return low2 + (high2 - low2)*(value - low1)/(high1 - low1)
    }


});