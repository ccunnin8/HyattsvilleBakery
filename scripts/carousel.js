document.addEventListener("DOMContentLoaded", () => {
    const slides = document.getElementsByClassName("slide__each");
    const slideCount = slides.length;
    const widthOfSlide = slides[0].clientWidth;
    const dot = document.getElementsByClassName("pagination__dot");
    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");
    let index = 0; 

    const moveSlidesLeft = () => {
        // shift slides to the left using their width and offset 
        // update the current dot
        let offset = (index + 1) * widthOfSlide;
        for (let slide of slides) {
            slide.style.left = `-${offset}px`;
        }
        dot[index].className = "pagination__dot";
        dot[index + 1].className += " on"
        index++;
    }

    const moveSlidesRight = () => {
        // shift slides to the right using their width and offset 
        // update the current dot
        dot[index].className = "pagination__dot";
        if (index == 0) {
            index = slideCount - 1;
        } else {
            index--;
        }
        const offset = index * widthOfSlide;
        for (let slide of slides) {
            slide.style.left = `-${offset}px`;
        }

        dot[index].className += " on"
    }

    const resetSlides = () => {
        // set slides to the initial position
        // set pagination to initial position 
        for (let slide of slides) {
            slide.style.left = "0px";
        }
        dot[0].classList = "pagination__dot on";
        dot[index].className = "pagination__dot";
        index = 0;
    }

    const autoSlide = () => {
        if (index < slideCount - 1) {
            moveSlidesLeft();
        } else {
            resetSlides();
        }
    }

    // move slides every 1000ms 
    let interval = setInterval(autoSlide, 1000);

    // stop and restart the interval when mouse enters and leaves 
    carousel.addEventListener("mouseenter", () => clearInterval(interval));
    carousel.addEventListener("mouseleave", () => {
        interval = setInterval(autoSlide, 1000);
    });

    // click handlers for right and left arrows 
    leftArrow.addEventListener("click", () => {
        moveSlidesRight();
    });

    rightArrow.addEventListener("click", () => {
       if (index < slideCount - 1 ) {
            moveSlidesLeft();
       } else {
           resetSlides();
       }
    })


})