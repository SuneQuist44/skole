export class MagnetEffect {
    constructor(el) {
        // Default custom settings
        this.static = {
            x: 0,
            y: 0,
            hoverSize: el.getBoundingClientRect().width / 8, // Spotlight effect, if el is text keep this on, if it's not text, change the default value to 2
        }

        // Global DOM objects
        this.el = el;
        this.body = document.body;
        this.mouse = document.querySelector('.cursor');
        this.bind();
    }

    // Startup, when MagnetEffect is inizialized
    bind() {
        this.el.onmouseenter = () => {
            this.mouse.style.transform = `scale(${this.static.hoverSize})`; // Give custom cursor new size
            this.body.style.cursor = 'none'; // Display cursor as none
            this.mouse.style.opacity = "0.25";
            this.el.parentElement.style.transition = 'all 0.2s ease-in'; // Make no animation when enter, it will only lag the element behind
        }

        // After we entered the element, calculate the cordinates
        this.el.onmousemove = (e) => {
            this.bound = this.el.getBoundingClientRect(); // Get the boundaries of element
            this.el.parentElement.style.transition = ''; // Make no animation when moving, it will only lag the element behind

            // x and y coordinates
            let x = e.clientX - this.el.parentElement.offsetLeft + window.pageXOffset;
            let y = e.clientY - this.el.parentElement.offsetTop + window.pageYOffset;

            // Set positin on mouse over
            this.static.x = (x - 0) * (8 - -8) / (this.bound.width - 0) + -8;
            this.static.y = (y - 0) * (8 - -8) / (this.bound.height - 0) + -8;

            this.setMousePosition(); // Call on View
        }

        // Set element position back after leaving element
        this.el.onmouseleave = () => {
            this.mouse.style.transform = `scale(1)`; // Set custom cursor to original size
            this.body.style.cursor = 'default'; // Show cursor again
            this.mouse.style.opacity = "1";
            this.el.parentElement.style.transition = 'all 0.2s ease-out'; // Set a transition on leaving

            // Default settings
            this.static.y = 0;
            this.static.x = 0;

            this.setMousePosition(); // Call on View
        }
    }

    setMousePosition() {
        // Set item position to calculated positions, we do -5 for it to be at the point of the cursor.
        this.el.parentElement.style.transform = `translateX(${this.static.x + 'px'}) translateY(${this.static.y + 'px'})`;
    }
}