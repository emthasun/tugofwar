addEventListener("load", (event) => {

    var selected_letter = 0
    var num = Math.floor(Math.random() * 7) + 1
    // random()
    function random(direction) {
        console.log('hey')
        if (direction === 'up') {
            num = Math.floor(Math.random() * 7) + 1
            selected_letter = 1
            document.getElementsByClassName("letter_1")[0].style.backgroundImage = 'url("./svg/up/img_' + num + '.svg")'
        }
        if (direction === 'down') {
            selected_letter = 2
            document.getElementsByClassName("letter_2")[0].style.backgroundImage = 'url("./svg/down/img_' + num + '.svg")'
        }
    }




    document.getElementById("overlay").onclick = function (e) {
        try {
            
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission().then((state) => {
                    if (state === 'granted') {
                        document.getElementById("overlay").classList.add("hidden");
                        window.addEventListener("deviceorientation", (event) => {
                            document.getElementsByClassName("letter_1")[0].style.transform = 'scaleX(200%) scaleY(' + map_range(event.beta, -90, 90, 0, 2) + ')'
                            document.getElementsByClassName("letter_2")[0].style.transform = 'scaleX(200%) scaleY(' + map_range(event.beta, -90, 90, 2, 0) + ')'
                            document.getElementsByClassName("gradient_1")[0].style.transform = 'scaleY(' + map_range(event.beta, -90, 90, 0, 2) + ')'
                            document.getElementsByClassName("gradient_2")[0].style.transform = 'scaleY(' + map_range(event.beta, -90, 90, 2, 0) + ')'
                            if (event.beta < -75 && (selected_letter == 2 || selected_letter == 0)) {
                                random('up')
                            }
                            if (event.beta > 75 && (selected_letter == 1 || selected_letter == 0)) {
                                random('down')
                            }
                        }, true);
                    } else {
                        document.getElementById("overlay").innerHTML = "access to device gyroscope denied";
                    }
                })
            } else {
                window.addEventListener('deviceorientation', handleOrientation);
            }
        } catch (err) {
            document.getElementById("overlay").innerHTML = "gyroscope not supported";
        }

    };



    function map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
    }


});