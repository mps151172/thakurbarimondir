// Firebase কনফিগারেশন
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase ইনিশিয়ালাইজ
firebase.initializeApp(firebaseConfig);

// রিয়েলটাইম ডাটাবেস রেফারেন্স
const database = firebase.database();

// নোটিশ লোড করার ফাংশন
function loadNotices() {
    const noticesRef = database.ref('notices');
    noticesRef.on('value', (snapshot) => {
        const notices = snapshot.val();
        let noticesHTML = '';
        
        for(let id in notices) {
            noticesHTML += `
                <div class="notice ${notices[id].priority}">
                    <p>${notices[id].text}</p>
                    <small>${new Date(notices[id].timestamp).toLocaleString()}</small>
                </div>
            `;
        }
        
        document.getElementById('notice-board').innerHTML = noticesHTML;
    });
}