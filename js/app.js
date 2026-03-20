// assets/js/app.js
// Main Application State
function mainApp() {
    return {
        state: 'input',
        username: '',
        progress: 0,
        modalOpen: false,
        modalContent: '',
        
        checkEarnings() {
            if(this.username.length < 3) return;
            
            this.state = 'loading';
            this.progress = 0;

            let interval = setInterval(() => {
                this.progress += Math.floor(Math.random() * 20) + 10;

                if (this.progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        this.state = 'ready';
                    }, 400);
                }
            }, 150);
        },

        async openModal() {
            this.modalOpen = true;
            
            if(this.modalContent.length > 100) return; 

            try {
                const response = await fetch('api.php?action=get_modal', {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });
                const html = await response.text();
                setTimeout(() => {
                     this.modalContent = html;
                }, 800);
            } catch (error) {
                console.error('Error loading modal');
                this.modalContent = '<div class="h-full flex items-center justify-center p-6 text-center text-red-500">Connection Error. Please reload.</div>';
            }
        }
    }
}

function slider() {
    return {
        step: 0,
        mounted: false,
        direction: 'next',

        init() {
            setTimeout(() => {
                this.mounted = true;
            }, 150);
        },

        next() {
            if (this.step < 10) {
                this.direction = 'next';
                this.step++;
            }
        },
        prev() {
            if (this.step > 0) {
                this.direction = 'prev';
                this.step--;
            }
        },
        
        touchStartX: 0,
        touchEndX: 0,
        touchStart(e) { this.touchStartX = e.changedTouches[0].screenX; },
        touchEnd(e) {
            this.touchEndX = e.changedTouches[0].screenX;
            if (this.touchEndX < this.touchStartX - 50) this.next();
            if (this.touchEndX > this.touchStartX + 50) this.prev();
        }
    }
}