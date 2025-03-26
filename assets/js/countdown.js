// পূজার তারিখ সেট করুন (অক্টোবর 10, 2024 সকাল 10টা)
const pujaDate = new Date("October 10, 2024 10:00:00").getTime();

const countdownTimer = setInterval(function() {
    const now = new Date().getTime();
    const distance = pujaDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown-timer").innerHTML = `
        <div class="countdown-box">
            <span>${days}</span>
            <small>দিন</small>
        </div>
        <div class="countdown-box">
            <span>${hours}</span>
            <small>ঘণ্টা</small>
        </div>
        <div class="countdown-box">
            <span>${minutes}</span>
            <small>মিনিট</small>
        </div>
        <div class="countdown-box">
            <span>${seconds}</span>
            <small>সেকেন্ড</small>
        </div>
    `;

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdown-timer").innerHTML = "<p>পূজা শুরু হয়েছে!</p>";
    }
}, 1000);