// Show Login Page
function showLogin() {
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
}

// Show Sign-Up Page
function showSignUp() {
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("signUpPage").classList.remove("hidden");
}

// Handle Login
function login() {
  const username = document.getElementById("username").value;
  if (username) {
    alert("Login successful!");
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("learningPlatform").classList.remove("hidden");
  } else {
    alert("Please enter a username and password!");
  }
}

// Handle Sign-Up
function signUp() {
  const newUsername = document.getElementById("newUsername").value;
  if (newUsername) {
    alert("Sign-up successful! Please login.");
    document.getElementById("signUpPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
  } else {
    alert("Please fill out all fields!");
  }
}

// Skill-based recommendations
const skillRecommendations = { 
  cooking: {
    auditory: [
      { topic: "Cooking Podcast: Cooking with the Pros", link: "https://podcasts.apple.com/us/podcast/good-food/id1476845124" },
    ],
    visual: [
      { topic: "Beginner Cooking Techniques - YouTube", link: "https://youtu.be/wnHxGBnLP5w?si=NXZbEmy0ZQYUO1cE" },
    ],
    kinesthetic: [
      { topic: "Cook with Me - Interactive Cooking Guide", link: "https://cookwithmeonline.com/" },
    ],
  },
  coding: {
    auditory: [
      { topic: "Coding Podcast: Learn to Code", link: "https://www.cloudways.com/blog/best-coding-podcasts/" },
    ],
    visual: [
      { topic: "Learn JavaScript Basics - YouTube", link: "https://youtu.be/eKqY-oP1d_Y?si=mnuWRNWW2cdVFegs" },
    ],
    kinesthetic: [
      { topic: "Interactive JavaScript Exercises", link: "https://medium.com/@shinik.d.cupo/kinesthetically-learning-to-code-afed015961c7" },
    ],
  },
  math: {
    auditory: [
      { topic: "Math Podcast: Understanding Algebra", link: "https://podcasts.ox.ac.uk/series/secrets-mathematics" },
    ],
    visual: [
      { topic: "Algebra Basics - YouTube", link: "https://youtu.be/JvUvxN-A5O4?si=e3ezSqB_mJ3skZjw" },
    ],
    kinesthetic: [
      { topic: "Interactive Math Problems", link: "https://numberdyslexia.com/kinesthetic-learning-strategies-for-mathematics/" },
    ],
  },
  drawing: {
    visual: [
      { topic: "Learn drawing - YouTube", link: "https://youtu.be/Wz6DrQeQ5rI?si=xGBY4RtKm4vpCYVp" },
    ],
    kinesthetic: [
      { topic: "Interactive drawing Exercises", link: "https://www.thoughtco.com/the-kinesthetic-learning-style-3212046" },
    ],
  },
  dance: {
    auditory: [
      { topic: "Learning Podcast: Learn to dance", link: "https://library.dancetolearn.co/pages/podcast" },
    ],
    visual: [
      { topic: "Learn Dancing Step By Step - YouTube", link: "https://youtu.be/SAXkYgoy6cY?si=VjWKHQS4932qE_5t" },
    ],
  },
  singing: {
    auditory: [
      { topic: "Singing Podcast: Learn to sing", link: "https://player.fm/podcasts/Singing-Lessons" },
    ],
    visual: [
      { topic: "Learn Singing - YouTube", link: "https://youtu.be/b66-sa8kvE4?si=OKh_Yx84W9fg3Hd5" },
    ],
  },
  machine_learning: {
    auditory: [
      { topic: "ML-Podcast: Learn Machine Learning", link: "https://machinelearningmastery.com/5-free-podcasts-that-demystify-machine-learning-concepts/" },
    ],
    visual: [
      { topic: "Learn Machine Learning Basics - YouTube", link: "https://youtu.be/gmvvaobm7eQ?si=x_vJ89QTPedJ6cx3" },
    ],
    kinesthetic: [
      { topic: "Interactive Machine Learning Program", link: "https://www.sciencedirect.com/science/article/pii/S2949678023000326" },
    ],
  },
  english_learning: {
    auditory: [
      { topic: "English Learning Podcast", link: "https://improving-your-english.com/learn-english/podcasts/" },
    ],
    visual: [
      { topic: "Learn English - YouTube", link: "https://youtu.be/pKRqgXt2AFY?si=OeQ-66j9iqIyQHqR" },
    ],
  },
  python: {
    auditory: [
      { topic: "Python Podcast: Learn Python", link: "https://realpython.com/podcasts/rpp/" },
    ],
    visual: [
      { topic: "Learn Python Basics - YouTube", link: "https://youtu.be/QXeEoD0pB3E?si=JIT9KsYU_JUAbxO6" },
    ],
  },
};

// Initialize Progress Tracker
const progress = JSON.parse(localStorage.getItem("learningProgress")) || {};

// Get Recommendations Based on Inputs
function getRecommendation() {
  const strengths = document.getElementById("strengths").value.trim().toLowerCase();
  const weaknesses = document.getElementById("weaknesses").value.trim().toLowerCase();
  const learningStyle = document.getElementById("learningStyle").value.trim().toLowerCase();

  const recommendationDiv = document.getElementById("recommendation");
  recommendationDiv.innerHTML = ""; // Clear previous recommendations

  if (!strengths && !weaknesses) {
    recommendationDiv.innerHTML = `<p style="color: red;">Please provide at least one strength or weakness.</p>`;
    return;
  }

  let recommendations = [];

  const skills = [
    { skill: strengths, label: "strength" },
    { skill: weaknesses, label: "weakness" },
  ];

  skills.forEach(({ skill, label }) => {
    if (skill && skillRecommendations[skill]) {
      const recommendation = skillRecommendations[skill][learningStyle]?.[0];
      if (recommendation) {
        const resourceId = `${skill}-${learningStyle}`;
        recommendations.push(`
          <div id="${resourceId}" class="recommendation-item">
            <p><strong>Based on your ${label} (${skill}):</strong> ${recommendation.topic}</p>
            <a href="${recommendation.link}" target="_blank" onclick="markClicked('${resourceId}')">Start Learning Here</a><br>
            <label>
              <input type="checkbox" onchange="markCompleted('${resourceId}')"> I have completed this resource
            </label>
          </div>
        `);
      }
    }
  });

  if (recommendations.length === 0) {
    recommendationDiv.innerHTML = `<p style="color: red;">No recommendations found. Please try different inputs or check the spelling.</p>`;
  } else {
    recommendationDiv.innerHTML = recommendations.join("");
  }
}

// Mark a Resource as Clicked
function markClicked(resourceId) {
  if (!progress[resourceId]) {
    progress[resourceId] = { clicked: true, completed: false };
  } else {
    progress[resourceId].clicked = true;
  }
  saveProgress();
}

// Mark a Resource as Completed
function markCompleted(resourceId) {
  if (!progress[resourceId]) {
    progress[resourceId] = { clicked: false, completed: true };
  } else {
    progress[resourceId].completed = true;
  }
  saveProgress();
  updateProgressTracker();
}

// Save Progress to Local Storage
function saveProgress() {
  localStorage.setItem("learningProgress", JSON.stringify(progress));
}

// Update Progress Tracker Display
function updateProgressTracker() {
  const progressPercentage = document.getElementById("progressPercentage");

  const maxResourcesForFullCompletion = 2;
  const completedResources = Object.values(progress).filter((item) => item.clicked && item.completed).length;

  const percentage = Math.min((completedResources / maxResourcesForFullCompletion) * 100, 100).toFixed(2);
  progressPercentage.textContent = `Progress: ${percentage}%`;
}
