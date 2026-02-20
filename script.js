// =================== STATE MANAGEMENT ===================
let currentPage = 1;
const totalPages = 5;
let candlesBlownOut = 0;

// =================== DOM ELEMENTS ===================
const introScreen = document.getElementById('intro-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const bookScreen = document.getElementById('book-screen');
const cakeScreen = document.getElementById('cake-screen');
const celebrationScreen = document.getElementById('celebration-screen');

const giftBox = document.getElementById('giftBox');
const mainBook = document.getElementById('mainBook');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageIndicator = document.getElementById('pageIndicator');
const restartBtn = document.getElementById('restartBtn');
const birthdaySong = document.getElementById('birthdaySong');

// =================== GIFT BOX CLICK ===================
giftBox.addEventListener('click', () => {
    giftBox.classList.add('opening');
    createGiftSparkles();
    setTimeout(() => {
        switchScreen(introScreen, welcomeScreen);
    }, 1200);
});

function createGiftSparkles() {
    const giftRect = giftBox.getBoundingClientRect();
    const centerX = giftRect.left + giftRect.width / 2;
    const centerY = giftRect.top + giftRect.height / 2;
    
    // Create 50 sparkles
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 50;
            const velocity = 100 + Math.random() * 150;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            sparkle.style.cssText = `
                position: fixed;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: ${['#ffd700', '#ff6b35', '#ff6b9d', '#fff'][Math.floor(Math.random() * 4)]};
                border-radius: 50%;
                left: ${centerX}px;
                top: ${centerY}px;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 0 10px currentColor;
            `;
            
            document.body.appendChild(sparkle);
            
            let posX = centerX;
            let posY = centerY;
            let currentVX = vx;
            let currentVY = vy;
            let opacity = 1;
            
            const animate = () => {
                currentVY += 5; // Gravity
                posX += currentVX * 0.016;
                posY += currentVY * 0.016;
                opacity -= 0.02;
                
                sparkle.style.left = posX + 'px';
                sparkle.style.top = posY + 'px';
                sparkle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    sparkle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }, i * 10);
    }
}

// =================== BOOK COVER CLICK ===================
mainBook.addEventListener('click', () => {
    mainBook.style.transform = 'rotateY(-180deg) scale(0)';
    mainBook.style.opacity = '0';
    
    setTimeout(() => {
        switchScreen(welcomeScreen, bookScreen);
        showPage(1);
    }, 800);
});

// =================== PAGE NAVIGATION ===================
function showPage(pageNumber) {
    currentPage = pageNumber;
    
    // Hide all pages
    document.querySelectorAll('.page-wrapper').forEach(wrapper => {
        wrapper.classList.remove('active');
    });
    
    // Show current page
    const currentWrapper = document.querySelector(`.page-wrapper[data-page="${pageNumber}"]`);
    if (currentWrapper) {
        currentWrapper.classList.add('active');
    }
    
    // Update page indicator
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Update buttons
    prevBtn.disabled = currentPage === 1;
    
    if (currentPage === totalPages) {
        nextBtn.textContent = 'Continue →';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    } else {
        // Go to cake screen
        switchScreen(bookScreen, cakeScreen);
    }
});

// =================== CANDLE BLOWING ===================
const candles = document.querySelectorAll('.candle');

candles.forEach(candle => {
    candle.addEventListener('click', () => {
        if (!candle.classList.contains('blown-out')) {
            candle.classList.add('blown-out');
            candlesBlownOut++;
            
            // Add smoke effect
            createSmoke(candle);
            
            // Check if all candles are blown out
            if (candlesBlownOut === candles.length) {
                setTimeout(() => {
                    switchScreen(cakeScreen, celebrationScreen);
                    startCelebration();
                }, 1000);
            }
        }
    });
});

function createSmoke(candle) {
    const smoke = document.createElement('div');
    smoke.style.cssText = `
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 40px;
        background: rgba(200, 200, 200, 0.6);
        border-radius: 50%;
        filter: blur(5px);
        animation: smokeRise 1s ease-out forwards;
    `;
    
    candle.appendChild(smoke);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes smokeRise {
            to {
                transform: translateX(-50%) translateY(-50px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => smoke.remove(), 1000);
}

// =================== CELEBRATION CONFETTI ===================
function startCelebration() {
    // Try to play birthday song
    birthdaySong.play().catch(error => {
        console.log('Autoplay blocked. Song will play on user interaction.');
        // Add a click listener to play on next interaction
        document.body.addEventListener('click', function playOnce() {
            birthdaySong.play();
            document.body.removeEventListener('click', playOnce);
        }, { once: true });
    });
    
    // Start confetti
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const confettiCount = 300;
    const colors = ['#ff6b9d', '#c44569', '#667eea', '#764ba2', '#ffd700', '#ff6b35', '#f093fb', '#f5576c'];
    
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 10 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.shape = Math.random() > 0.5 ? 'circle' : 'square';
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            
            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            }
            
            ctx.restore();
        }
    }
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confetti.push(new ConfettiPiece());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Add sparkles
    createSparkles();
}

function createSparkles() {
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, #fff, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            animation: sparkleAnimation 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }, 100);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// =================== RESTART BUTTON ===================
restartBtn.addEventListener('click', () => {
    // Stop song
    birthdaySong.pause();
    birthdaySong.currentTime = 0;
    
    // Reset state
    currentPage = 1;
    candlesBlownOut = 0;
    
    // Reset candles
    candles.forEach(candle => {
        candle.classList.remove('blown-out');
    });
    
    // Reset book
    mainBook.style.transform = '';
    mainBook.style.opacity = '1';
    
    // Reset gift box
    giftBox.classList.remove('opening');
    
    // Go back to intro screen
    switchScreen(celebrationScreen, introScreen);
});

// =================== SCREEN SWITCHING ===================
function switchScreen(fromScreen, toScreen) {
    fromScreen.classList.remove('active');
    fromScreen.style.display = 'none';
    toScreen.style.display = 'flex';
    toScreen.classList.add('active');
}

// =================== WINDOW RESIZE ===================
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// =================== INITIALIZE ===================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial page
    showPage(1);
    
    // Placeholder images disabled - using real photos now
    // createPlaceholderImages();
});

// =================== PLACEHOLDER IMAGES ===================
// Not needed anymore - using real photos
/*
function createPlaceholderImages() {
    const images = [
        'image1', 'image2', 'image3', 'image4', 'image5'
    ];
    
    images.forEach((imgId, index) => {
        const img = document.getElementById(imgId);
        if (img && !img.src.startsWith('http')) {
            // Create a colorful gradient placeholder
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 600;
            const ctx = canvas.getContext('2d');
            
            // Gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            const colors = [
                ['#667eea', '#764ba2'],
                ['#f093fb', '#f5576c'],
                ['#4facfe', '#00f2fe'],
                ['#43e97b', '#38f9d7'],
                ['#fa709a', '#fee140'],
                ['#30cfd0', '#330867']
            ];
            
            const colorPair = colors[index % colors.length];
            gradient.addColorStop(0, colorPair[0]);
            gradient.addColorStop(1, colorPair[1]);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add text
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = 'bold 60px Poppins, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`Photo ${index + 1}`, canvas.width / 2, canvas.height / 2 - 40);
            
            ctx.font = '30px Poppins, sans-serif';
            ctx.fillText('(Replace with your image)', canvas.width / 2, canvas.height / 2 + 20);
            
            // Add decorative elements
            for (let i = 0; i < 20; i++) {
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
                ctx.beginPath();
                ctx.arc(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    Math.random() * 30 + 10,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }
            
            img.src = canvas.toDataURL();
        }
    });
}
*/
